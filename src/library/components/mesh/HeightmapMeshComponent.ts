import { Geometry, PlaneGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
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
    this.material = new MeshBasicMaterial({ color: config.color ||  0x00ff00 });
    this.mesh = new Mesh(this.geometry, this.material);

    for(let i = 0; i < 100; i++) {
      config.data.push(Math.random());
    }

    for(let i = 0; i < config.data.length; i++) {
      this.geometry.vertices[i].z = config.data[i];
    }
  }

}
