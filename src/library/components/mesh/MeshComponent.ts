import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';

import GameScene from '../../GameScene';
import GameObject from '../../GameObject';
import Component from '../Component';
import TransformComponent from '../TransformComponent';

export default class MeshComponent extends Component {

  public geometry: Geometry;
  public material: Material;
  public mesh: Mesh;

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.mesh);
  }

}
