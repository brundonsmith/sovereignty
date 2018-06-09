window.ipcRenderer = require('electron').ipcRenderer

Vue.component('hierarchy-level', {
  props: {
    entries: Array
  },
  computed: {
    clazz: (c) => `component-hierarchy-level`,
    style: (c) => ``
  },
  template: html`
    <div v-bind:class="clazz" v-bind:style="style">
      <div class="entry" v-for="(entry, index) in entries">
        <div class="entry-heading">
          <span class="caret" v-if="entry.children" v-on:click="toggleExpand(index)">
            {{ expandedEntries.includes(index) ? 'v' : '>' }}
          </span>
          {{ entry.name }}
          <hierarchy-leveln v-if="entry.children" v-bind:entries="entry.children" />
        </div>
      </div>
    </div>
  `,
  data: (c) => ({
    expandedEntries: []
  }),
  methods: {
    toggleExpand: function(index) {
      if(c.expandedEntries.includes(index)) {
        c.expandedEntries.splice(c.expandedEntries.indexOf(index), 1);
      } else {
        c.expandedEntries.push(index);
      }
    }
  }
})

Vue.component('view-hierarchy', {
  props: {
  },
  computed: {
    clazz: (c) => `component-view-hierarchy`,
    style: (c) => ``,
    sceneObjects: (c) => []// window.game.activeScene.objects
  },
  created: function() {
    window.ipcRenderer.on('project-loaded', (e, projectDir, data) => {
      let gameData = JSON.parse(data);

      
    })
    window.ipcRenderer.on('project-built', (e, arg) => {
      console.log('Built: ' + arg)
      this.projectName = arg;
    })
  },
  template: html`
    <div v-if="loaded" v-bind:class="clazz" v-bind:style="style">
      <div class="hierarchy">
        <hierarchy-level v-bind:entries="sceneObjects" />
      </div>
    </div>
  `,
  data: () => ({
    loaded: false
  }),
  methods: {
  }
})
