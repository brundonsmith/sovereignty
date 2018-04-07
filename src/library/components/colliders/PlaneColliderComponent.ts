//@ts-ignore
import { Plane } from 'cannon';

import GameObject from '../../GameObject';
import ColliderComponent from './ColliderComponent';

export default class PlaneColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.cannonShape = new Plane();
  }

}


// 1.5708
