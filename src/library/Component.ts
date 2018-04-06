
import { Scene } from 'three';

import GameObject from './GameObject';

export default class Component {

  public gameObject: GameObject;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    this.gameObject = gameObject;
    Object.assign(this, config);
  }

  public start(scene: Scene): void { }
  public update(timeDelta: number): void { }
}