const path = require('path');
const fs = require('fs');
const recursive = require("recursive-readdir");
const ncp = require('./utils').ncpPromise;
const electronPackager = require('electron-packager');

function getFilePathInfo(fullPath) {
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
}

function build(projectDir, outputDir, targets = []) {

  if(!outputDir) {
    outputDir = path.resolve(projectDir, 'build');
  }

  return loadData(projectDir)
    .then(({ projectDir, gameData }) => {
      // Write web project
      if(!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
      if(!fs.existsSync(path.resolve(outputDir, 'web'))) {
        fs.mkdirSync(path.resolve(outputDir, 'web'));
      }

      return writeWebFiles(projectDir, outputDir, gameData.game.assetsDir, gameData.game, gameData.scenes, gameData.prefabs, gameData.materials, gameData.components).then(() => gameData);
    })
    /*
    .then((data) => {

      // Perform other builds using web build files
      if(targets.length > 0) {

        if(!fs.existsSync(path.resolve(outputDir, '_app'))){
          fs.mkdirSync(path.resolve(outputDir, '_app'));
        }

        fs.writeFileSync(path.resolve(outputDir, '_app', 'package.json'), JSON.stringify({
          name: data.game.title || 'Game',
          version: data.game.version || 1,
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

        return Promise.all([
          ncp(path.resolve(outputDir, 'web'), path.resolve(outputDir, '_app')),
          ncp(path.resolve(__dirname, './electron-main.js'), path.resolve(outputDir, '_app', 'main.js'))
        ]).then(() => data)
      } else {
        return data;
      }
    })
    .then((data) => electronPackager({
      name: data.game.title || 'Game',
      version: data.game.version || 1,
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
    ))*/
    .then(() => outputDir)
}

function writeWebFiles(projectDir, outputDir, assetsDir, game, scenes, prefabs, materials, components) {
  return Promise.all([

    // HTML page
    ncp(path.resolve(__dirname, './index.html'), path.resolve(outputDir, 'web', 'index.html')),

    // TODO remove "../" once it's on NPM
    // Library
    ncp(path.resolve(__dirname, '../sovereignty-lib/index.js'), path.resolve(outputDir, 'web', 'sovereignty-lib.js')),

    // Assets
    assetsDir
      ? ncp(path.resolve(projectDir, assetsDir), path.resolve(outputDir, 'web', assetsDir))
      : undefined
  ])
  .then(() => {
    // Game data
    fs.writeFileSync(path.resolve(outputDir, 'web', 'game.js'), `
      ${components.map(component => component.contents).join('\n\n')}

      var game = new SOVEREIGNTY.Game({
        game: ${game.contents},
        scenes: {
          ${scenes.map(scene => `"${scene.name}": ${scene.contents}`).join(',\n')}
        },
        prefabs: {
          ${prefabs.map(prefab => `"${prefab.name}": ${prefab.contents}`).join(',\n')}
        },
        materials: {
          ${materials.map(material => `"${material.name}": ${material.contents}`).join(',\n')}
        },
        components: {
          ${components.map(component => `"${component.name}": ${component.name}`).join(',\n')}
        }
      })
      game.start(document.body);
    `);
  })
}

function loadData(projectDir) {
  return new Promise((res, rej) => {
    recursive(projectDir, (err, filePaths) => {

      var filePathsInfo = filePaths.map(getFilePathInfo);

      var duplicateFile = filePathsInfo.find((file, index) => filePathsInfo.findIndex(otherFile => otherFile.fileName === file.fileName) !== index);
      if(duplicateFile && (
          duplicateFile.fileName.toLowerCase().includes('game.json') ||
          duplicateFile.extension.toLowerCase().includes('.scene') ||
          duplicateFile.extension.toLowerCase().includes('.prefab') ||
          duplicateFile.extension.toLowerCase().includes('.material') ||
          duplicateFile.extension.toLowerCase().includes('.component.js')
          )) {
        let otherDuplicateFile = filePathsInfo.find((file, index) => file.fileName === duplicateFile.fileName && file.fullPath !== duplicateFile.fullPath);
        console.warn(`There's more than one file named "${duplicateFile.fileName}". Sovereignty uses the file name to identify a resource when it's referenced from somewhere else, so you can't have duplicates, even in different directories.\n` +
                     duplicateFile.fullPath + '\n' +
                     otherDuplicateFile.fullPath)
      }

      function fileContents(filePathInfo) {
        return {
          name: filePathInfo.name,
          contents: fs.readFileSync(filePathInfo.fullPath).toString('utf8')
        };
      }

      // Read project data
      var gameFile = filePathsInfo.find(file => file.fileName.toLowerCase().includes('game.json'));
      var game = fileContents(gameFile);
      var scenes = filePathsInfo
                      .filter(file => file.extension.toLowerCase().includes('.scene'))
                      .map(fileContents);
      var prefabs = filePathsInfo
                      .filter(file => file.extension.toLowerCase().includes('.prefab'))
                      .map(fileContents);
      var materials = filePathsInfo
                      .filter(file => file.extension.toLowerCase().includes('.material'))
                      .map(fileContents);
      var components = filePathsInfo
                      .filter(file => file.extension.toLowerCase().includes('.component.js'))
                      .map(fileContents);

      res({
        projectDir,
        gameData: {
          game,
          scenes,
          prefabs,
          materials,
          components
        }
      })
    })
  })
}

module.exports = { build, loadData };
