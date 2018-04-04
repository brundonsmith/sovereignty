import { PerspectiveCamera } from 'three';

import { Camera } from 'three';
import Component from './Component';

export default class CameraComponent extends Component {

  private camera: Camera | undefined;

  get threeCamera(): Camera | undefined {
    return this.camera;
  }

  constructor(config: {[key: string]: any}) {
    super(config);

    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 5;
  }

}
