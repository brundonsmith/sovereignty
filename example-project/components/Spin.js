const Component = require('../../src/library').Component;

class Spin extends Component {

  update(timeDelta) {
    this.transform.rotation.x += 0.1;
    this.transform.rotation.y += 0.1;
  }

}

module.exports = Spin;
