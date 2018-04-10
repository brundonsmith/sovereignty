import { Material, SpriteMaterial, Mesh, Scene, Sprite, Texture, TextureLoader } from 'three';
import { World } from 'cannon';

import { exists } from '../utils';
import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';

export default class SpriteComponent extends Component {

  public spriteMap: Texture;
  public material: Material;
  public sprite: Sprite;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    if(!exists(config.tint)) {
      config.tint = 0xffffff;
    }

    this.spriteMap = new TextureLoader().load(config.texture);
    this.material = new SpriteMaterial({
      map: this.spriteMap,
      color: parseInt(config.tint)
    });
    this.sprite = new Sprite(this.material);
  }

  public initialize(scene: Scene, world: World): void {
    scene.add(this.sprite);
  }

  public update(timeDelta: number): void {
    this.transform.applyTo(this.sprite);
  }

}
