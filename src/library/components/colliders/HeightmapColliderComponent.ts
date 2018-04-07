//@ts-ignore
import { Heightfield } from 'cannon';

import GameObject from '../../GameObject';
import ColliderComponent from './ColliderComponent';

export default class HeightmapColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    var data = [];
    for(let x = 0; x < 10; x++) {
      for(let y = 0; y < 10; y++) {
        data.push(0);
      }
    }

    this.cannonShape = new Heightfield(data, {
      elementSize: 1,
      minValue: Number.NEGATIVE_INFINITY,
      maxValue: 0
    });
  }

}
