import { Material, SpriteMaterial, Sprite, Texture, TextureLoader } from 'three';
import { } from 'cannon';

import { exists } from '../utils';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class SpriteComponent extends Component {

  public static get properties() {
    return {
      tint: [ "string", "number", null ],
      texture: "string"
    }
  }

  public spriteMap: Texture;
  public material: Material;
  public threeSprite: Sprite;

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
    this.threeSprite = new Sprite(this.material);
  }

  public initialize(scene: Scene): void {
    this.transform.threeGroup.add(this.threeSprite);
  }

}
