import { Mesh, SphereGeometry } from 'three';
//@ts-ignore
import { Sphere } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class SphereColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.cannonShapes.push(new Sphere(config.radius || 1));

    if(config.showWireframe) {
      var geometry = new SphereGeometry(
        config.radius || 1,
        config.widthSegments || 16,
        config.heightSegments || 16
      );
      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}
