import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';
import * as THREE from 'three';
import GLTF2Loader from 'three-gltf2-loader'
GLTF2Loader(THREE);

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

      this.material = new THREE[(config.material.type || 'MeshStandard') + 'Material'](config.material.parameters);
    } else {
      this.material = new THREE.MeshStandardMaterial();
    }

    if(exists(config.mesh)) {
      //@ts-ignore
      var loader = new THREE.GLTF2Loader();
      loader.load(config.mesh, (model) => {
        this.mesh = model.asset;
      })
    }
  }

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.mesh);
  }

}
