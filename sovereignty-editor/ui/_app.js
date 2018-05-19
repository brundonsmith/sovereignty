
const { dialog } = require('electron').remote

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
      filePaths.forEach(path => ipcRenderer.send('build-project', path))
    })
  },
  template: `
    <div v-bind:class="clazz">
      <panel
        v-bind:initialMode="rootPanel.mode"
        v-bind:children="rootPanel.children"
        v-bind:vertical="rootPanel.vertical" />
    </div>
  `,
  data: () => ({
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
