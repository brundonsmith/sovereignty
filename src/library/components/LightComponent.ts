import { Light, DirectionalLight, PointLight, SpotLight, Scene } from 'three';
import { World } from 'cannon';

import { exists } from '../utils';
import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';

export default class LightComponent extends Component {

  public threeLight: Light;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    if(!exists(config.color)) {
      config.color = 0xffffff;
    }

    switch(config.type.toLowerCase() || 'point') {
      case 'directional':
      this.threeLight = new DirectionalLight(
        parseInt(config.color),
        config.intensity
      );
      break;
      case 'point':
      this.threeLight = new PointLight(
        parseInt(config.color),
        config.intensity,
        config.distance,
        config.decay
      );
      break;
      case 'spot':
      this.threeLight = new SpotLight(
        parseInt(config.color),
        config.intensity,
        config.distance,
        config.angle,
        config.penumbra,
        config.decay
      );
      break;
    }
  }

  public initialize(scene: Scene, world: World): void {
    this.transform.threeGroup.add(this.threeLight);
  }

}
