//@ts-ignore
import { Sphere } from 'cannon';

import GameObject from '../../GameObject';
import ColliderComponent from './ColliderComponent';

export default class SphereColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.cannonShape = new Sphere(config.radius || 1);
  }

}
