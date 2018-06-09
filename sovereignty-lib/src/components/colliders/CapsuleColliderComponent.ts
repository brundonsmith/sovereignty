import { Vector3, Mesh, Group, SphereGeometry, CylinderGeometry } from 'three';
//@ts-ignore
import { Sphere, Cylinder, Vec3 } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class CapsuleColliderComponent extends ColliderComponent {

  public static get properties() {
    return Object.assign({
      height: [ "number", null ],
      radius: [ "number", null ]
    }, ColliderComponent.properties)
  }

  public get bounds(): { min: Vector3, max: Vector3 } {
    return {
      min: new Vector3(
        -1 * this.radius,
        -1 * this.height / 2,
        -1 * this.radius
      ),
      max: new Vector3(
        this.radius,
        this.height / 2,
        this.radius
      )
    };
  }

  private height: number;
  private radius: number;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.height = config.height || 2;
    this.radius = config.radius || 0.5;
    let cylinderHeight = this.height - this.radius / 2;

    this.cannonShapes.push(new Cylinder(this.radius, this.radius, cylinderHeight, 16));
    this.cannonShapes.push(new Sphere(this.radius));
    this.cannonShapes.push(new Sphere(this.radius));

    this.cannonShapeOffsets.push(new Vector3(0, 0, 0));
    this.cannonShapeOffsets.push(new Vector3(0, cylinderHeight / 2, 0));
    this.cannonShapeOffsets.push(new Vector3(0, -1 * cylinderHeight / 2, 0));

    if(config.showWireframe) {
      this.wireframe = new Group();
      let sphere1 = new Mesh(
        new SphereGeometry(this.radius, 16, 16),
        ColliderComponent.wireframeMaterial
      );
      let sphere2 = new Mesh(
        new SphereGeometry(this.radius, 16, 16),
        ColliderComponent.wireframeMaterial
      )
      let cylinder = new Mesh(
        new CylinderGeometry(this.radius, this.radius, cylinderHeight, 16, 16),
        ColliderComponent.wireframeMaterial
      )

      sphere1.position.y = cylinderHeight / 2;
      sphere2.position.y = -1 * cylinderHeight / 2;

      this.wireframe.add(sphere1);
      this.wireframe.add(sphere2);
      this.wireframe.add(cylinder);
    }
  }

}
