import { BoxGeometry, Mesh } from 'three';
//@ts-ignore
import { Box, Vec3 } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class BoxColliderComponent extends ColliderComponent {

  public static get properties() {
    return Object.assign({
      dimensions: [
        {
          x: [ "number", null ],
          y: [ "number", null ],
          z: [ "number", null ],
        },
        null
      ]
    }, ColliderComponent.properties)
  }

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.dimensions = config.dimensions || {};

    this.cannonShapes.push(new Box(new Vec3(
      config.dimensions.x || 1,
      config.dimensions.y || 1,
      config.dimensions.z || 1
    )));

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
