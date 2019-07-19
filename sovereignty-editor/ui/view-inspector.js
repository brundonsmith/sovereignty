window.ipcRenderer = require('electron').ipcRenderer

Vue.component('view-inspector', {
  props: {
  },
  computed: {
    clazz: (c) => `component-view-inspector`,
    style: (c) => ``
  },
  created: function() {
    window.ipcRenderer.on('project-loaded', (e, projectDir, data) => {
      data = JSON.parse(data);

    })
    window.ipcRenderer.on('project-built', (e, arg) => {
      console.log('Built: ' + arg)
      this.projectName = arg;
    })
  },
  template: html`
    <div v-bind:class="clazz" v-bind:style="style">
    </div>
  `,
  data: () => ({
  }),
  methods: {
  }
})
