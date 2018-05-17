import { BoxGeometry, SphereGeometry, CylinderGeometry, PlaneGeometry, Mesh } from 'three';
import { } from 'cannon';

import { exists } from 'utils';
import GameObject from 'GameObject';
import MeshComponent from 'components/mesh/MeshComponent';

export default class PrimitiveMeshComponent extends MeshComponent {

  public static get properties() {
    return Object.assign({
      shape: [ "string", null ],

      width: [ "number", null ],
      height: [ "number", null ],
      depth: [ "number", null ],

      radius: [ "number", null ],
      widthSegments: [ "number", null ],
      heightSegments: [ "number", null ],

      radiusTop: [ "number", null ],
      radiusBottom: [ "number", null ],
      radialSegments: [ "number", null ],
    }, MeshComponent.properties)
  }

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    switch((exists(config.shape) ? config.shape : 'box').toLowerCase()) {
      case 'box':
        this.geometry = new BoxGeometry(
          config.width,
          config.height,
          config.depth
        );
      break;
      case 'sphere':
        this.geometry = new SphereGeometry(
          config.radius,
          config.widthSegments,
          config.heightSegments
        );
      break;
      case 'cylinder':
        this.geometry = new CylinderGeometry(
          config.radiusTop || config.radius,
          config.radiusBottom || config.radius,
          config.height,
          config.radialSegments,
          config.heightSegments
        );
      break;
      case 'plane':
        this.geometry = new PlaneGeometry(
          config.width,
          config.height
        );
      break;
      default:
        console.error(`"${config.shape}" is not a known primitive mesh shape`)
    }

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

}
