import { Vector3, Object3D, MeshBasicMaterial } from 'three';
//@ts-ignore
import { Shape, World, Quaternion } from 'cannon';

import Scene from 'Scene';
import Component from 'components/Component';

export default class ColliderComponent extends Component {

  public static get properties() {
    return {
      showWireframe: [ "boolean", null ]
    }
  }

  public get bounds(): { min: Vector3, max: Vector3 } {
    return {
      min: new Vector3(),
      max: new Vector3()
    };
  }

  public cannonShapes: Array<Shape> = [];
  public cannonShapeOffsets: Array<Vector3> = [];
  public cannonShapeEulers: Array<Vector3> = [];
  protected wireframe: Object3D | undefined;

  protected static get wireframeMaterial() {
    return new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  }

  public initialize(scene: Scene): void {
    if(this.wireframe) {
      this.transform.threeGroup.add(this.wireframe);
    }
  }

}
