
// HACK template "tag" which is just the identity substitution, allowing Atom
// syntax highlighting on templates
window.html = (strings, ...substs) =>
  strings.reduce((full, str, index) => full + str + (substs[index] || ''), '');

const { dialog } = require('electron').remote
window.ipcRenderer = require('electron').ipcRenderer

Vue.component('sovereignty-editor', {
  props: {
  },
  computed: {
    clazz: (c) => `component-sovereignty-editor`
  },
  created: function() {
    dialog.showOpenDialog({
      title: 'Select project directory',
      properties: [ 'openDirectory' ]
    }, function(filePaths) {
      //filePaths.forEach(path => ipcRenderer.send('build-project', path))
      filePaths.forEach(path => ipcRenderer.send('load-project', path))
    })

    window.ipcRenderer.on('project-loaded', (e, projectDir, data) => {
      this.projectData = data;
    })
  },
  template: html`
    <div v-bind:class="clazz">
      <panel
        v-bind:initialMode="rootPanel.mode"
        v-bind:children="rootPanel.children"
        v-bind:vertical="rootPanel.vertical" />
    </div>
  `,
  data: () => ({
    projectData: null,
    rootPanel: {
      vertical: true,
      children: [
        {
          mode: 'navigation'
        },
        {
          children: [
            {
              mode: 'hierarchy'
            },
            {
              mode: 'scene'
            },
            {
              mode: 'inspector'
            }
          ]
        },
        {
          mode: 'explorer'
        }
      ]
    }
  }),
})
