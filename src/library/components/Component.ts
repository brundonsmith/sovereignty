import { Scene } from 'three';
import { World, IBodyEvent } from 'cannon';

import GameScene from '../GameScene';
import GameObject from '../GameObject';
import TransformComponent from './TransformComponent';
import RigidbodyComponent from './RigidbodyComponent';
import ColliderComponent from './colliders/ColliderComponent';

export default class Component {

  public gameObject: GameObject;

  get transform(): TransformComponent {
    return this.gameObject.transform;
  }

  get rigidbody(): RigidbodyComponent {
    return this.gameObject.rigidbody;
  }

  get collider(): ColliderComponent {
    return this.gameObject.collider;
  }

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    this.gameObject = gameObject;
    Object.assign(this, config);
  }

  public initialize(scene: GameScene): void { }
  public update(timeDelta: number): void { }

  public onCollision(e: IBodyEvent) { }
}
