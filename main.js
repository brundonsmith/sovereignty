const recursive = require('recursive-readdir');

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

var projectPath = './example-project';
var gameConfigPath = './example-project/Game';

var win;
app.on('ready', () => {
  console.log('createWindow()')

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      devTools: true
    }
  })

  // load and send configuration
  win.once('show', () => {
    console.log('show')

    var configuration = {
      gameConfig: require(gameConfigPath),
      sceneConfigs: [],
      prefabConfigs: [],
      componentTypes: []
    }

    Promise.all([
      new Promise((res, rej) => {
        recursive(path.resolve(projectPath, configuration.gameConfig.scenesPath), (err, files) => {
          files
            .filter(file => file.includes('.js') || file.includes('.json'))
            .forEach(file => configuration.sceneConfigs.push(require(file)))
          res();
        })
      }),
      new Promise((res, rej) => {
        recursive(path.resolve(projectPath, configuration.gameConfig.prefabsPath), (err, files) => {
          files
            .filter(file => file.includes('.js') || file.includes('.json'))
            .forEach(file => configuration.prefabConfigs.push(require(file)))
          res();
        })
      }),
      new Promise((res, rej) => {
        recursive(path.resolve(projectPath, configuration.gameConfig.componentsPath), (err, files) => {
          files
            .filter(file => file.includes('.js'))
            .forEach(file => configuration.componentTypes.push(require(file)))
          res();
        })
      })
    ]).then(() => {
      console.log('resolve')
      setTimeout(() => {
        win.webContents.send('configuration', configuration)
      }, 1000)
    })
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

})
