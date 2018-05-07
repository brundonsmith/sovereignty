import { Vector3, Mesh, Group, SphereGeometry, CylinderGeometry } from 'three';
//@ts-ignore
import { Sphere, Cylinder, Vec3 } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class CapsuleColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    let height = config.height || 2;
    let radius = config.radius || 1;

    this.cannonShapes.push(new Cylinder(radius, radius, height, 16));
    this.cannonShapes.push(new Sphere(radius));
    this.cannonShapes.push(new Sphere(radius));

    this.cannonShapeOffsets.push(new Vector3(0, 0, 0));
    this.cannonShapeOffsets.push(new Vector3(0, height / 2, 0));
    this.cannonShapeOffsets.push(new Vector3(0, -1 * height / 2, 0));

    if(config.showWireframe) {
      this.wireframe = new Group();
      let sphere1 = new Mesh(
        new SphereGeometry(radius, 16, 16),
        ColliderComponent.wireframeMaterial
      );
      let sphere2 = new Mesh(
        new SphereGeometry(radius, 16, 16),
        ColliderComponent.wireframeMaterial
      )
      let cylinder = new Mesh(
        new CylinderGeometry(radius, radius, height, 16, 16),
        ColliderComponent.wireframeMaterial
      )

      sphere1.position.y = height / 2;
      sphere2.position.y = -1 * height / 2;

      this.wireframe.add(sphere1);
      this.wireframe.add(sphere2);
      this.wireframe.add(cylinder);
    }
  }

}
