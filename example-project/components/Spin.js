const Component = require('../../src/library').Component;

class Spin extends Component {

  update(timeDelta) {
    console.log('Spin.update()')
    this.gameObject.getComponent('TransformComponent').rotation.x += 0.1;
    this.gameObject.getComponent('TransformComponent').rotation.y += 0.1;
  }

}

module.exports = Spin;
