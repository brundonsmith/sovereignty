import { Geometry, Material, MeshStandardMaterial, Mesh } from 'three';
import { } from 'cannon';
import * as THREE from 'three';
import 'three-plugins/LoaderSupport';
import 'three-plugins/OBJLoader2';
import 'three-plugins/GLTFLoader';

import { exists } from 'utils';
import Game from 'Game';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class MeshComponent extends Component {

  public static get properties() {
    return {
      material: [
        {
          type: "string",
          parameters: { }
        },
        "string",
        null
      ]
    }
  }

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
      this.material = new MeshStandardMaterial();
    }
  }

  public initialize(scene: Scene): void {
    if(exists(this.mesh)) {
      this.transform.threeGroup.add(this.mesh);
    }
  }

}
