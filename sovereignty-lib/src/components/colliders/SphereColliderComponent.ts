import { Mesh, SphereGeometry } from 'three';
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

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.cannonShapes.push(new Sphere(config.radius || 1));

    if(config.showWireframe) {
      var geometry = new SphereGeometry(
        config.radius || 1,
        16,
        16
      );
      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}
