import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';

import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';

export default class MeshComponent extends Component {

  private geometry: Geometry;
  private material: Material;
  private mesh: Mesh;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({ color: config.color ||  0x00ff00 });
    this.mesh = new Mesh(this.geometry, this.material);
  }

  public start(scene: Scene, world: World): void {
    scene.add(this.mesh);
  }

  public update(timeDelta: number): void {
    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    transform.applyTo(this.mesh);
  }

}
