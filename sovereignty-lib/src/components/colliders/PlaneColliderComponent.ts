import { Mesh, PlaneGeometry } from 'three';
//@ts-ignore
import { Plane } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class PlaneColliderComponent extends ColliderComponent {

  public static get properties() {
    return Object.assign({

    }, ColliderComponent.properties)
  }

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.cannonShapes.push(new Plane());

    if(config.showWireframe) {
      var geometry = new PlaneGeometry(100, 100, 100, 100);

      for(let i = 0; i < 100 * 100; i++) {
        geometry.vertices[i].z = 0;
      }

      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}

// 1.5708
