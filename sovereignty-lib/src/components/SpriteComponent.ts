import { Material, SpriteMaterial, Mesh, Scene, Sprite, Texture, TextureLoader } from 'three';
import { World } from 'cannon';

import { exists } from '../utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';

export default class SpriteComponent extends Component {

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

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.threeSprite);
  }

}
