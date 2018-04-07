import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';

import GameObject from '../../GameObject';
import Component from '../Component';
import TransformComponent from '../TransformComponent';

export default class MeshComponent extends Component {

  public geometry: Geometry;
  public material: Material;
  public mesh: Mesh;

  public initialize(scene: Scene, world: World): void {
    scene.add(this.mesh);
  }

  public update(timeDelta: number): void {
    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    transform.applyTo(this.mesh);
  }

}
