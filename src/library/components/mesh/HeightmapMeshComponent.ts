import { Geometry, PlaneGeometry, Material, MeshStandardMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';

import GameObject from '../../GameObject';
import Component from '../Component';
import TransformComponent from '../TransformComponent';
import MeshComponent from './MeshComponent';

export default class HeightmapMeshComponent extends MeshComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.data = config.data || [];

    this.geometry = new PlaneGeometry(
      config.width,
      config.height,
      config.dataWidth,
      config.dataHeight
    );
    this.material = new MeshStandardMaterial({ color: config.color ||  0x00ff00 });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    for(let i = 0; i < config.dataWidth * config.dataHeight; i++) {
      this.geometry.vertices[i].z =
        config.data[i % config.dataWidth][Math.floor(i / config.dataWidth)];
    }
  }

}
