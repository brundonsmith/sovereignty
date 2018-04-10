import { Mesh, PlaneGeometry, Scene, Vector3 } from 'three';
//@ts-ignore
import { World, Heightfield } from 'cannon';

import GameObject from '../../GameObject';
import ColliderComponent from './ColliderComponent';

export default class HeightmapColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.data = config.data || [ [] ];
    config.elementSize = config.elementSize || 1;

    var dataWidth = config.data.length;
    var dataHeight = config.data[0].length;

    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    config.data.forEach(col => col.forEach(point => {
      min = Math.min(min, point)
      max = Math.max(max, point)
    }))

    this.cannonShape = new Heightfield(config.data, {
      minValue: min,
      maxValue: max,
      elementSize: config.elementSize
    });

    if(config.showWireframe) {
      var geometry = new PlaneGeometry(
        dataWidth * config.elementSize,
        dataHeight * config.elementSize,
        dataWidth,
        dataHeight
      );
      geometry.vertices = config.data
        .reduce((flat, col, indexX) => flat.concat(col.map((height, indexY) =>
          new Vector3(
            indexX * config.elementSize - (dataWidth * config.elementSize / 2),
            height,
            indexY * config.elementSize - (dataHeight * config.elementSize / 2)
          ))),
        [])
      this.wireframe = new Mesh(geometry, ColliderComponent.wireframeMaterial);
    }
  }

}
