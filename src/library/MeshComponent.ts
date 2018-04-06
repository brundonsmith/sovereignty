import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';

import GameObject from './GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';

export default class MeshComponent extends Component {

  private geometry: Geometry | undefined = new BoxGeometry(1, 1, 1);
  private material: Material | undefined = new MeshBasicMaterial( { color: 0x00ff00 } );
  private mesh: Mesh = new Mesh(this.geometry, this.material);

  public start(scene: Scene): void {
    scene.add(this.mesh);
  }

  public update(timeDelta: number): void {
    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    transform.applyTo(this.mesh);
  }

}
