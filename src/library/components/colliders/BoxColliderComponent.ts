//@ts-ignore
import { Box, Vec3 } from 'cannon';

import GameObject from '../../GameObject';
import ColliderComponent from './ColliderComponent';

export default class BoxColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    if(config.dimensions) {
      this.cannonShape = new Box(new Vec3(
        config.dimensions.x || 1,
        config.dimensions.y || 1,
        config.dimensions.z || 1
      ));
    } else {
      this.cannonShape = new Box(new Vec3(1, 1, 1));
    }
  }

}
