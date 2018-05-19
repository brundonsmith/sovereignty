window.ipcRenderer = require('electron').ipcRenderer

Vue.component('scene', {
  props: {
  },
  computed: {
    clazz: (c) => `component-scene`,
    style: (c) => ``,
    projectEntry: (c) => `file://${c.projectName}/web/index.html`
  },
  created: function() {
    window.ipcRenderer.on('project-built', (e, arg) => {
      console.log('Built: ' + arg)
      this.projectName = arg;
    })
  },
  template: `
    <div v-bind:class="clazz" v-bind:style="style">
      <webview
        v-bind:src="projectEntry"
        v-on:console-message="handleWebviewMessage" />
    </div>
  `,
  data: () => ({
    projectName: null
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
