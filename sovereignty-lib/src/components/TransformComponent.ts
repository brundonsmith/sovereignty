import { Vector3, Euler, Object3D, Group, Scene } from 'three';
import { World } from 'cannon';

import { exists } from '../utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class TransformComponent extends Component {

  public position: Vector3;
  public rotation: Euler;
  public scale: Vector3;

  public threeGroup: Group = new Group();

  public get forward(): Vector3 {
    return new Vector3(0, 0, 1).applyEuler(this.rotation);
  }

  public get up(): Vector3 {
    return new Vector3(0, 1, 0).applyEuler(this.rotation);
  }

  public get right(): Vector3 {
    return new Vector3(1, 0, 0).applyEuler(this.rotation);
  }

  public get isRoot(): boolean {
    return !exists(this.threeGroup.parent);
  }

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    if(config.position) {
      this.position = new Vector3(config.position.x || 0, config.position.y || 0, config.position.z || 0);
    } else {
      this.position = new Vector3(0, 0, 0);
    }

    if(config.rotation) {
      this.rotation = new Euler(config.rotation.x || 0, config.rotation.y || 0, config.rotation.z || 0, 'YZX');
    } else {
      this.rotation = new Euler(0, 0, 0);
    }

    if(config.scale) {
      this.scale = new Vector3(config.scale.x || 1, config.scale.y || 1, config.scale.z || 1);
    } else {
      this.scale = new Vector3(1, 1, 1);
    }
  }

  public initialize(scene: GameScene) {
    if(this.isRoot) {
      scene.threeScene.add(this.threeGroup);
    }
  }

  public update(timeDelta: number) {
    this.applyTo(this.threeGroup);
  }

  private applyTo(threeObject: Object3D) {
    threeObject.position.x = this.position.x;
    threeObject.position.y = this.position.y;
    threeObject.position.z = this.position.z;

    threeObject.rotation.x = this.rotation.x;
    threeObject.rotation.y = this.rotation.y;
    threeObject.rotation.z = this.rotation.z;

    threeObject.scale.x = this.scale.x;
    threeObject.scale.y = this.scale.y;
    threeObject.scale.z = this.scale.z;
  }

}