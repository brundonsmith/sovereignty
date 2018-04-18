import { BoxGeometry, Mesh } from 'three';
//@ts-ignore
import { Box, Vec3 } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class BoxColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.dimensions = config.dimensions || {};

    this.cannonShape = new Box(new Vec3(
      config.dimensions.x || 1,
      config.dimensions.y || 1,
      config.dimensions.z || 1
    ));

    if(config.showWireframe) {
      var geometry = new BoxGeometry(
        config.dimensions.x || 1,
        config.dimensions.y || 1,
        config.dimensions.z || 1
      );
      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}
