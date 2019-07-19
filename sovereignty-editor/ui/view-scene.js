window.ipcRenderer = require('electron').ipcRenderer

Vue.component('view-scene', {
  props: {
  },
  computed: {
    clazz: (c) => `component-view-scene`,
    style: (c) => ``,
    projectEntry: (c) => `file://${c.projectName}/web/index.html`
  },
  created: function() {
    window.ipcRenderer.on('project-loaded', (e, projectDir, data) => {
      data = JSON.parse(data);

      var arrayToObj = (obj, item) => {
        obj[item.name] = item;
        return obj;
      }

      //this.gameData = JSON.parse(JSON.stringify(data));
      this.$game = new SOVEREIGNTY.Game({
        game: JSON.parse(data.game.contents),
        scenes: data.scenes
                  .map(file => Object.assign(JSON.parse(file.contents), {name: file.name}))
                  .reduce(arrayToObj, {}),
        prefabs: data.prefabs
                  .map(file => Object.assign(JSON.parse(file.contents), {name: file.name}))
                  .reduce(arrayToObj, {}),
        materials: data.materials
                  .map(file => Object.assign(JSON.parse(file.contents), {name: file.name}))
                  .reduce(arrayToObj, {}),
        components: data.components
                  .map(file => eval(`(${file.contents})`))
                  .reduce(arrayToObj, {})
      })
      this.$game.activeScene.createGameObject({
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
      this.$game.activeScene.threeScene.add(new THREE.AxesHelper( 5 ))
      this.$game.start(this.$refs.rootElement, true);

      this.loaded = true;
    })
    window.ipcRenderer.on('project-built', (e, arg) => {
      console.log('Built: ' + arg)
      this.projectName = arg;
    })
  },
  template: html`
    <div v-if="loaded" v-bind:class="clazz" v-bind:style="style" ref="rootElement">
      <webview
        v-if="!editorMode"
        v-bind:src="projectEntry"
        v-on:console-message="handleWebviewMessage" />
    </div>
  `,
  data: () => ({
    loaded: false,
    editorMode: true,
    projectName: null,
    gameData: null
  }),
  methods: {
    handleWebviewMessage: function(e) {
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
    }
  }
})
