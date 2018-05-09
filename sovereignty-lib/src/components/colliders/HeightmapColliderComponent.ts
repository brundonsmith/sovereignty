import { Mesh, PlaneGeometry, Scene, Vector3, Group } from 'three';
//@ts-ignore
import { World, Heightfield } from 'cannon';

import GameObject from 'GameObject';
import ColliderComponent from 'components/colliders/ColliderComponent';

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

    this.cannonShapes.push(new Heightfield(config.data, {
      minValue: min,
      maxValue: max,
      elementSize: config.elementSize
    }));

    if(config.showWireframe) {
      let geometry = new PlaneGeometry(
        dataWidth * config.elementSize,
        dataHeight * config.elementSize,
        dataWidth - 1,
        dataHeight - 1
      );

      let mesh = new Mesh(geometry, ColliderComponent.wireframeMaterial);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      for(let i = 0; i < dataWidth * dataHeight; i++) {
        geometry.vertices[i].z = config.data[Math.floor(i / dataHeight)][i % dataWidth];
      }

      mesh.rotateX(-1 * Math.PI / 2);

      this.wireframe = new Group();
      this.wireframe.add(mesh);
    }
  }

}
