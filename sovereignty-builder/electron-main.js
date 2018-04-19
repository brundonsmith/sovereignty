const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

var win;
app.on('ready', () => {

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
})
