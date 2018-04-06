import { Vector3, Euler, Object3D } from 'three';

import GameObject from '../GameObject';
import Component from './Component';

export default class TransformComponent extends Component {

  public position: Vector3;
  public rotation: Euler;
  public scale: Vector3;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    if(config.position) {
      this.position = new Vector3(config.position.x || 0, config.position.y || 0, config.position.z || 0);
    } else {
      this.position = new Vector3(0, 0, 0);
    }

    if(config.rotation) {
      this.rotation = new Euler(config.rotation.x || 0, config.rotation.y || 0, config.rotation.z || 0, 'XYZ');
    } else {
      this.rotation = new Euler(0, 0, 0);
    }

    if(config.scale) {
      this.scale = new Vector3(config.scale.x || 1, config.scale.y || 1, config.scale.z || 1);
    } else {
      this.scale = new Vector3(1, 1, 1);
    }

    // TODO: Parenting
  }

  public applyTo(threeObject: Object3D) {
    threeObject.position.x = this.position.x;
    threeObject.position.y = this.position.y;
    threeObject.position.z = this.position.z;

    threeObject.rotation.x = this.rotation.x;
    threeObject.rotation.y = this.rotation.y;
    threeObject.rotation.z = this.rotation.z;

    threeObject.scale.x = this.scale.x;
    threeObject.scale.y = this.scale.y;
    threeObject.scale.z = this.scale.z;
  }

}
