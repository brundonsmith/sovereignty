const path = require('path');
const fs = require('fs');
const recursive = require("recursive-readdir");
const ncp = require('./utils').ncpPromise;
const electronPackager = require('electron-packager');

function build(projectDir, outputDir, targets = []) {
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

    // Read project data
    var game = fs.readFileSync(fileInfo.find(file => file.fileName.toLowerCase().includes('game.json')).fullPath);
    var gameConfig = JSON.parse(game);
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

    // Write web project
    if(!fs.existsSync(path.resolve(outputDir, 'web'))){
      fs.mkdirSync(path.resolve(outputDir, 'web'));
    }

    let assetsDir = gameConfig.assetsDir;
    Promise.all([
      ncp('./index.html', path.resolve(outputDir, 'web', 'index.html')),
      // TODO remove "../" once it's on NPM
      ncp('../sovereignty-lib/index.js', path.resolve(outputDir, 'web', 'sovereignty-lib.js')),
      assetsDir ? ncp(path.resolve(projectDir, assetsDir), path.resolve(outputDir, 'web', assetsDir)) : undefined
    ])
    .then(() => {
      fs.writeFileSync(path.resolve(outputDir, 'web', 'game.js'), `
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

      // Perform other builds
      if(targets.length > 0) {

        if(!fs.existsSync(path.resolve(outputDir, '_app'))){
          fs.mkdirSync(path.resolve(outputDir, '_app'));
        }

        fs.writeFileSync(path.resolve(outputDir, '_app', 'package.json'), JSON.stringify({
          name: gameConfig.title || 'Game',
          version: gameConfig.version || 1,
          description: "",
          main: "main.js",
          scripts: { },
          author: "",
          license: "",
          dependencies: { },
          devDependencies: { },
          'dependencies.electron': [],
          'devDependencies.electron': []
        }, null, 2))

        Promise.all([
          ncp(path.resolve(outputDir, 'web'), path.resolve(outputDir, '_app')),
          ncp('./electron-main.js', path.resolve(outputDir, '_app', 'main.js'))
        ])
        .then(() => electronPackager({
          name: gameConfig.title || 'Game',
          version: gameConfig.version || 1,
          dir: path.resolve(outputDir, '_app'),
          asar: true,
          overwrite: true,
          platform: targets.join(', '),
          prune: false,
          //icon: 'Game.icns',
          //osxSign: true
        }))
        .then((appPaths) => Promise.all(
          appPaths.map(p => ncp(p, path.resolve(outputDir, path.basename(p)))),
        ))
      }
    })
  })
}

module.exports = build;
