import { Camera, PerspectiveCamera } from 'three';

import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';

export default class CameraComponent extends Component {

  public threeCamera: Camera;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);
    this.threeCamera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  }

  public update(timeDelta: number): void {
    this.transform.applyTo(this.threeCamera);
    this.threeCamera.rotation.y += 3.14159;
  }

}
