import { Scene, Mesh, MeshBasicMaterial } from 'three';
//@ts-ignore
import { Shape, World } from 'cannon';

import GameScene from 'GameScene';
import Component from 'components/Component';

export default class ColliderComponent extends Component {

  public cannonShape: Shape;
  protected wireframe: Mesh | undefined;

  protected static get wireframeMaterial() {
    return  new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  }

  public initialize(scene: GameScene): void {
    if(this.wireframe) {
      this.transform.threeGroup.add(this.wireframe);
    }
  }

}
