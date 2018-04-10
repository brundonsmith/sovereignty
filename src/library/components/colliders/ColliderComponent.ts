import { Scene, Mesh, MeshBasicMaterial } from 'three';
//@ts-ignore
import { Shape, World } from 'cannon';

import Component from '../Component';

export default class ColliderComponent extends Component {

  public cannonShape: Shape;
  protected wireframe: Mesh | undefined;

  protected static get wireframeMaterial() {
    return  new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  }

  public initialize(scene: Scene, world: World): void {
    if(this.wireframe) {
      scene.add(this.wireframe);
    }
  }

  public update(timeDelta: number): void {
    if(this.wireframe) {
      this.transform.applyTo(this.wireframe);
    }
  }
}
