import { Geometry, BoxGeometry, Material, MeshBasicMaterial, Mesh, Scene } from 'three';
import Component from './Component';

export default class MeshComponent extends Component {

  private geometry: Geometry | undefined = new BoxGeometry(1, 1, 1);
  private material: Material | undefined = new MeshBasicMaterial( { color: 0x00ff00 } );
  private mesh: Mesh | undefined = new Mesh(this.geometry, this.material);

  constructor(config: {[key: string]: any}) {
    super(config);


  }

  public start(scene: Scene): void {
    console.log('MeshComponent.start()')
    if(this.mesh) {
      scene.add(this.mesh);
    }
  }

}
