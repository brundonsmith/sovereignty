const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

const { build, loadData } = require('../sovereignty-builder');

var win;

electron.app.on('ready', () => {

  // Create the browser window.
  win = new electron.BrowserWindow({
    width: 1200,
    height: 800
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  electron.ipcMain.on('load-project', (e, arg) => {
    loadData(arg).then(data => e.sender.send('project-loaded', JSON.stringify(data)))
  })

  electron.ipcMain.on('build-project', (e, arg) => {
    build(arg).then((outputDir) => e.sender.send('project-built', outputDir))
    /*
    fs.watch(arg, { recursive: true }, () => {
      buildProject(e, arg)
    })*/
  })
})
