import { PlaneGeometry, MeshStandardMaterial, Mesh, Group, Object3D } from 'three';
import { } from 'cannon';

import GameObject from 'GameObject';
import Scene from 'Scene';
import MeshComponent from 'components/mesh/MeshComponent';

export default class HeightmapMeshComponent extends MeshComponent {

  public static get properties() {
    return Object.assign({
      data: [ [ "number" ] ],
      width: [ "number", null ],
      height: [ "number", null ],
      color: [ "string", "number", null ]
    }, MeshComponent.properties)
  }

  private meshContainer: Object3D = new Group();

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    config.data = config.data || [];

    let dataHeight = config.data.length;
    let dataWidth = config.data.reduce((max, row) => Math.max(row.length, max), 0)

    this.geometry = new PlaneGeometry(
      config.width || 10,
      config.height || 10,
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

  public initialize(scene: Scene): void {
    this.transform.threeGroup.add(this.meshContainer);
  }

}
