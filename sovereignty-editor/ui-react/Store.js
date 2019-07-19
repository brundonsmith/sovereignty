
const { dialog } = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer

function arrayToObj(obj, item) {
  obj[item.name] = item;
  return obj;
}

function Store() {

  // data
  var subscribers = [];
  var instance = {
    projectDir: null,
    buildDir: null,
    openScene: null,
    gameTextContent: null,
    gameConfig: null,
    scenes: [],
    prefabs: [],
    materials: [],
    components: [],

    editorGameInstance: null,
    testingGameInstance: null,
  };

  window.ipcRenderer.on('project-loaded', (e, data) => {
    let { projectDir, gameData } = JSON.parse(data);

    instance.projectDir = projectDir;
    instance.gameTextContent = gameData.game;
    instance.gameConfig = JSON.parse(gameData.game);
    instance.scenes = gameData.scenes.map(sceneFile => ({
      name: sceneFile.name,
      textContent: sceneFile.textContent,
      data: JSON.parse(sceneFile.textContent)
    }))
    instance.prefabs = gameData.prefabs.map(prefabFile => ({
      name: prefabFile.name,
      textContent: prefabFile.textContent,
      data: JSON.parse(prefabFile.textContent)
    }))
    instance.materials = gameData.materials.map(materialFile => ({
      name: materialFile.name,
      textContent: materialFile.textContent,
      data: JSON.parse(materialFile.textContent)
    }))
    instance.components = gameData.components.map(componentFile => ({
      name: componentFile.name,
      textContent: componentFile.textContent
    }))

    debugger;

    createEditorGameInstance();

    publish();
  })
  window.ipcRenderer.on('project-built', (e, buildDir) => {
    console.log('Built to: ' + buildDir)
    instance.buildDir = buildDir;

    publish();
  })

  // private methods
  function publish() {
    subscribers.forEach(sub => sub(JSON.parse(JSON.stringify(instance))));
  }
  function createEditorGameInstance(sceneName) {
    instance.editorGameInstance = new SOVEREIGNTY.Game({
      game: instance.gameConfig,
      scenes: instance.scenes.reduce(arrayToObj, {}),
      prefabs: instance.prefabs.reduce(arrayToObj, {}),
      materials: instance.materials.reduce(arrayToObj, {}),
      components: instance.components
                    .map(file => eval(`(${file.textContent})`))
                    .reduce(arrayToObj, {})
    })

    if(sceneName) {
      instance.editorGameInstance.goToScene(sceneName);
    }

    instance.editorGameInstance.activeScene.createGameObject({
      name: "editor_camera",
      components: {
        "Transform": { },
        "Camera": {
          runInEditor: true
        },
        "KeyboardMouse": {
          runInEditor: true
        }
      }
    })
    instance.editorGameInstance.activeScene.threeScene.add(new THREE.AxesHelper( 5 ))
    instance.editorGameInstance.start(this.iframeElement.contentDocument.body, true);
  }

  // public methods
  instance.addSubscriber = function(sub) {
    subscribers.push(sub);
  }


  return instance;
}

window.store = new Store();


if(!window.store.projectDir) {
  dialog.showOpenDialog({
    title: 'Select project directory',
    properties: [ 'openDirectory' ]
  }, function(filePaths) {
    filePaths.forEach(path => ipcRenderer.send('load-project', path))
  })
}
