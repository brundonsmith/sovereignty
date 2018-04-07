import { Light, PointLight, PerspectiveCamera, Scene } from 'three';
import { World } from 'cannon';

import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';

export default class LightComponent extends Component {

  public threeLight: Light;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.threeLight = new PointLight(
      0xffffff,
      config.intensity,
      config.distance,
      config.decay
    );
  }

  public initialize(scene: Scene, world: World): void {
    scene.add(this.threeLight);
  }

  public update(timeDelta: number): void {
    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    transform.applyTo(this.threeLight);
  }

}
