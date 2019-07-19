import { Mesh, SphereGeometry, Vector3 } from 'three';
//@ts-ignore
import { Sphere } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class SphereColliderComponent extends ColliderComponent {

  public static get properties() {
    return Object.assign({
      radius: [ "number", null ]
    }, ColliderComponent.properties)
  }

  public get bounds(): { min: Vector3, max: Vector3 } {
    return {
      min: new Vector3(
        -1 * this.radius,
        -1 * this.radius,
        -1 * this.radius
      ),
      max: new Vector3(
        -1 * this.radius,
        -1 * this.radius,
        -1 * this.radius
      )
    };
  }

  private radius: number;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.radius = config.radius || 1;

    this.cannonShapes.push(new Sphere(this.radius));

    if(config.showWireframe) {
      var geometry = new SphereGeometry(
        config.radius,
        16,
        16
      );
      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}
