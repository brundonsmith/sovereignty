
Vue.component('panel', {
  props: {
    initialMode: String,
    children: Array,
    vertical: Boolean,
    index: Number
  },
  computed: {
    clazz: (c) => `component-panel index-${c.index} ${c.vertical ? 'vertical' : 'horizontal'} ${c.children ? 'has-children' : ''}`,
    style: (c) => `flex-basis: ${c.size}px`,
    possibleModes: (c) => [
      'navigation',
      'explorer',
      'hierarchy',
      'scene',
      'inspector'
    ]
  },
  created: function() {
    this.mode = this.initialMode
  },
  template: html`
    <div v-bind:class="clazz" v-bind:style="style">

      <div
        v-if="index > 1"
        class="resize-bar"
        v-on:mousedown="handleResizeMouseDown" />


      <div class="contents">

        <select v-if="mode" v-model:value="mode">
          <option
            v-for="possibleMode in possibleModes"
            v-bind:value="possibleMode"
            v-bind:label="possibleMode" />
        </select>

        <view-scene v-if="mode === 'scene'" />
        <view-hierarchy v-if="mode === 'hierarchy'" />

        <panel
          v-if="children"
          v-for="(child, index) in children"
          v-bind:initialMode="child.mode"
          v-bind:children="child.children"
          v-bind:vertical="!vertical"
          v-bind:index="index" />

      </div>


      <div
        v-if="index === 0"
        class="resize-bar"
        v-on:mousedown="handleResizeMouseDown" />

    </div>
  `,
  data: () => ({
    size: 200,
    resizing: false,
    mode: null
  }),
  methods: {
    handleResizeMouseDown: function(e) {
      this.resizing = true;
      window.addEventListener('mousemove', this.handleWindowMouseMove);
      window.addEventListener('mouseup', this.handleWindowMouseUp);
    },
    handleWindowMouseMove: function(e) {
      if(this.resizing) {
        if(this.vertical) {
          if(this.index === 0) {
            this.size += e.movementX;
          } else {
            this.size -= e.movementX;
          }
        } else {
          if(this.index === 0) {
            this.size += e.movementY;
          } else {
            this.size -= e.movementY;
          }
        }
      }
    },
    handleWindowMouseUp: function(e) {
      this.resizing = false;
      window.removeEventListener('mousemove', this.handleWindowMouseMove);
      window.removeEventListener('mouseup', this.handleWindowMouseUp);
    }
  }
})
