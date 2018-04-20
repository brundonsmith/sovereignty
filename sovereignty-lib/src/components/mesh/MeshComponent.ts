import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';
import * as three from 'three';

import { exists } from 'utils';
import Game from 'Game';
import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';

export default class MeshComponent extends Component {

  public material: Material;
  public geometry: Geometry;
  public mesh: Mesh;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    if(exists(config.material)) {
      if(typeof config.material === 'string') {
        config.material = Game.materials.find(m => m.name === config.material);
      }

      config.material.parameters.color = parseInt(config.material.parameters.color);

      this.material = new three[(config.material.type || 'MeshStandard') + 'Material'](config.material.parameters);
    } else {
      this.material = new three.MeshStandardMaterial();
    }
  }

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.mesh);
  }

}
