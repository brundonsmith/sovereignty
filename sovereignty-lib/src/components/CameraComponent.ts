import { Camera, PerspectiveCamera, OrthographicCamera } from 'three';

import { exists } from 'utils';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class CameraComponent extends Component {

  public static get properties() {
    return {
      type: [ "string", null ],
      fov: [ "number", null ],
      aspect: [ "number", null ],
      near: [ "number", null ],
      far: [ "number", null ],

      left: [ "number", null ],
      right: [ "number", null ],
      top: [ "number", null ],
      bottom: [ "number", null ],
    }
  }

  public threeCamera: Camera;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    switch((exists(config.type) ? config.type : 'perspective').toLowerCase()) {
      case 'perspective':
        this.threeCamera = new PerspectiveCamera(
          config.fov || 75,
          config.aspect || window.innerWidth / window.innerHeight,
          config.near || 0.1,
          config.far || 1000
        );
        break;
      case 'orthographic':
        var ratio = window.innerWidth / window.innerHeight;
        var height = 5;
        var width = ratio * height;

        this.threeCamera = new OrthographicCamera(
          config.left || -1 * width / 2,
          config.right || width / 2,
          config.top || height / 2,
          config.bottom || -1 * height / 2,
          config.near || 0.1,
          config.far || 1000
        );
        break;
      default:
        console.error(`"${config.type}" is not a known camera type`)
    }
  }

  public initialize(scene: Scene): void {
    this.transform.threeGroup.add(this.threeCamera);
  }

}
