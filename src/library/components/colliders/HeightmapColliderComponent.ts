//@ts-ignore
import { Heightfield } from 'cannon';

import GameObject from '../../GameObject';
import ColliderComponent from './ColliderComponent';

export default class HeightmapColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.data = config.data || [];

    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    config.data.forEach(col => col.forEach(point => {
      min = Math.min(min, point)
      max = Math.max(max, point)
    }))

    console.log({ min, max })

    this.cannonShape = new Heightfield(config.data, {
      minValue: min,
      maxValue: max,
      elementSize: config.elementSize
    });
  }

}
