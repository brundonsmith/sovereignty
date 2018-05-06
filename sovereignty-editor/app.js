const { ipcRenderer } = require('electron')
const { dialog } = require('electron').remote

onload = function() {
  /*
  const webview = document.querySelector('webview')
  const indicator = document.querySelector('.indicator')

  const loadstart = () => {
    indicator.innerText = 'loading...'
  }

  const loadstop = () => {
    indicator.innerText = ''
  }

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)
  */

  ipcRenderer.on('project-built', (e, arg) => {
    console.log('Built: ' + arg)
    const webview = document.querySelector('webview')
    webview.loadURL(`file://${arg}/web/index.html`)
  })

  dialog.showOpenDialog({
    title: 'Select project directory',
    properties: [ 'openDirectory' ]
  }, function(filePaths) {
    filePaths.forEach(path => ipcRenderer.send('build-project', path))
  })

  document.querySelector('webview').addEventListener('console-message', (e) => {
    switch(e.level) {
      case 2:
        console.error(e.message)
        break;
      case 1:
        console.warn(e.message)
        break;
      default:
        console.log(e.message)
    }
  })

}
