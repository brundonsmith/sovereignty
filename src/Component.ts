
import { Scene } from 'three';

import GameObject from './GameObject';

export default class Component {

  constructor(config: {[key: string]: any}) {
  }

  public start(scene: Scene): void {
  }
  public update(timeDelta: number): void { }
}
