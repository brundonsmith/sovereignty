const path = require('path');
const fs = require('fs');
const recursive = require("recursive-readdir");
const ncp = require('ncp').ncp;

function build(projectDir, outputDir) {
  if(!outputDir) {
    outputDir = path.resolve(projectDir, 'build');
  }

  recursive(projectDir, (err, files) => {

    var fileInfo = files.map(fullPath => {

      let name = path.basename(fullPath);
      let extension = '';
      while(path.extname(name)) {
        extension = path.extname(name) + extension;
        name = path.basename(fullPath, extension);
      }

      return {
        fullPath,
        fileName: path.basename(fullPath),
        name,
        extension
      }
    })

    var game = fs.readFileSync(fileInfo.find(file => file.fileName.toLowerCase().includes('game.json')).fullPath);
    var scenes = fileInfo
                    .filter(file => file.extension.toLowerCase().includes('.scene'))
                    .map(file => ({
                      name: file.name,
                      json: fs.readFileSync(file.fullPath)
                    }));
    var prefabs = fileInfo
                    .filter(file => file.extension.toLowerCase().includes('.prefab'))
                    .map(file => ({
                      name: file.name,
                      json: fs.readFileSync(file.fullPath)
                    }));
    var components = fileInfo
                    .filter(file => file.extension.toLowerCase().includes('.component.js'))
                    .map(file => ({
                      name: file.name,
                      js: fs.readFileSync(file.fullPath)
                    }));

    if (!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir);
    }

    ncp('./index.html', path.resolve(outputDir, 'index.html'));

    ncp('../sovereignty-lib/index.js', path.resolve(outputDir, 'sovereignty-lib.js')); // TODO remove "../" once it's on NPM

    let assetsDir = JSON.parse(game).assetsDir;
    if(assetsDir) {
      ncp(path.resolve(projectDir, assetsDir), path.resolve(outputDir, assetsDir));
    }

    fs.writeFileSync(path.resolve(outputDir, 'game.js'), `
${components.map(component => component.js).join('\n\n')}

var game = new Game({
  game: ${game},
  scenes: {
${scenes.map(scene => `"${scene.name}": ${scene.json}`).join(',\n')},
  },
  prefabs: {
${prefabs.map(prefab => `"${prefab.name}": ${prefab.json}`).join(',\n')},
  },
  components: {
${components.map(component => `"${component.name}": ${component.name}`).join(',\n')},
  }
})
game.start(document.body);
    `);

  })
}

module.exports = build;
