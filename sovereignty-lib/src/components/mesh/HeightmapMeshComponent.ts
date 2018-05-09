import { Geometry, PlaneGeometry, Material, MeshStandardMaterial, Mesh, Scene, Vector3, Group, Object3D } from 'three';
import { World } from 'cannon';

import GameObject from 'GameObject';
import GameScene from 'GameScene';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';
import MeshComponent from 'components/mesh/MeshComponent';

export default class HeightmapMeshComponent extends MeshComponent {

  private meshContainer: Object3D = new Group();

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.data = config.data || [];

    let dataHeight = config.data.length;
    let dataWidth = config.data.reduce((max, row) => Math.max(row.length, max), 0)

    this.geometry = new PlaneGeometry(
      config.width,
      config.height,
      dataWidth - 1,
      dataHeight - 1
    );
    this.material = new MeshStandardMaterial({ color: config.color || 0xff0000 });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    for(let i = 0; i < dataWidth * dataHeight; i++) {
      this.geometry.vertices[i].z = config.data[Math.floor(i / dataHeight)][i % dataWidth];
    }

    this.mesh.rotateX(-1 * Math.PI / 2);

    this.meshContainer = new Group();
    this.meshContainer.add(this.mesh);
  }

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.meshContainer);
  }

}
