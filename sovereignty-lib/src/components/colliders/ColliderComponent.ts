import { Scene, Vector3, Object3D, MeshBasicMaterial } from 'three';
//@ts-ignore
import { Shape, World, Quaternion } from 'cannon';

import GameScene from 'GameScene';
import Component from 'components/Component';

export default class ColliderComponent extends Component {

  public cannonShapes: Array<Shape> = [];
  public cannonShapeOffsets: Array<Vector3> = [];
  public cannonShapeEulers: Array<Vector3> = [];
  protected wireframe: Object3D | undefined;

  protected static get wireframeMaterial() {
    return new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  }

  public initialize(scene: GameScene): void {
    if(this.wireframe) {
      this.transform.threeGroup.add(this.wireframe);
    }
  }

}
