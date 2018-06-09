import { BoxGeometry, Mesh, Vector3 } from 'three';
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

  public get bounds(): { min: Vector3, max: Vector3 } {
    return {
      min: new Vector3(
        -1 * this.dimensions.x / 2,
        -1 * this.dimensions.y / 2,
        -1 * this.dimensions.z / 2
      ),
      max: new Vector3(
        this.dimensions.x / 2,
        this.dimensions.y / 2,
        this.dimensions.z / 2
      )
    };
  }

  private dimensions: { x: number, y: number, z: number };

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.dimensions = config.dimensions || {
      x: 1,
      y: 1,
      z: 1
    }

    this.cannonShapes.push(new Box(new Vec3(
      this.dimensions.x,
      this.dimensions.y,
      this.dimensions.z
    )));

    if(config.showWireframe) {
      var geometry = new BoxGeometry(
        this.dimensions.x,
        this.dimensions.y,
        this.dimensions.z
      );
      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}
