import { Mesh, PlaneGeometry, Vector3, Group } from 'three';
//@ts-ignore
import { World, Heightfield } from 'cannon';

import { exists } from 'utils';
import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class HeightmapColliderComponent extends ColliderComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.data = config.data || [ [] ];
    config.elementSize = exists(config.elementSize) ? config.elementSize : 1;

    var dataWidth = config.data.length;
    var dataHeight = config.data[0].length;
    var spatialWidth = dataWidth * config.elementSize;
    var spatialHeight = dataHeight * config.elementSize;

    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    config.data.forEach(col => col.forEach(point => {
      min = Math.min(min, point)
      max = Math.max(max, point)
    }));

    let flippedData = [];
    for(let i = 0; i < dataHeight; i++) {
      flippedData.push([]);
    }
    config.data.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        flippedData[colIndex][dataWidth - rowIndex - 1] = col;
      })
    })

    this.cannonShapes.push(new Heightfield(flippedData, {
      minValue: min,
      maxValue: max,
      elementSize: config.elementSize
    }));
    this.cannonShapeOffsets.push(new Vector3(-1 * spatialWidth / 2, 0, 1 * spatialHeight / 2))
    this.cannonShapeEulers.push(new Vector3(-1 * Math.PI / 2, 0, 0));

    if(config.showWireframe) {
      let geometry = new PlaneGeometry(
        spatialWidth,
        spatialHeight,
        dataWidth - 1,
        dataHeight - 1
      );

      let mesh = new Mesh(geometry, ColliderComponent.wireframeMaterial);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      for(let i = 0; i < dataWidth * dataHeight; i++) {
        geometry.vertices[i].z = flippedData[Math.floor(i / dataHeight)][i % dataWidth];
      }

      mesh.rotateY(1 * Math.PI / 2);
      mesh.rotateX(-1 * Math.PI / 2);

      this.wireframe = new Group();
      this.wireframe.add(mesh);
    }
  }

}
