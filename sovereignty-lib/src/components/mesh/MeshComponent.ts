import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';

import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';

export default class MeshComponent extends Component {

  public geometry: Geometry;
  public material: Material;
  public mesh: Mesh;

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.mesh);
  }

}
