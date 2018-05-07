import { Vector3, Euler, Object3D, Group, Scene, Quaternion } from 'three';
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
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    return new Vector3(0, 0, -1).applyQuaternion(worldQuat);
  }

  public get backward(): Vector3 {
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    return new Vector3(0, 0, 1).applyQuaternion(worldQuat);
  }

  public get up(): Vector3 {
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    return new Vector3(0, 1, 0).applyQuaternion(worldQuat);
  }

  public get down(): Vector3 {
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    return new Vector3(0, -1, 0).applyQuaternion(worldQuat);
  }

  public get right(): Vector3 {
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    return new Vector3(1, 0, 0).applyQuaternion(worldQuat);
  }

  public get left(): Vector3 {
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    return new Vector3(-1, 0, 0).applyQuaternion(worldQuat);
  }

  public get worldPosition(): Vector3 {
    let worldPosition = new Vector3();
    this.threeGroup.getWorldPosition(worldPosition);
    return worldPosition;
  }

  public get worldRotation(): Euler {
    let worldQuat = new Quaternion();
    this.threeGroup.getWorldQuaternion(worldQuat);
    let euler = new Euler();
    euler.setFromQuaternion(worldQuat);
    return euler;
  }

  public get worldScale(): Vector3 {
    let worldScale = new Vector3();
    this.threeGroup.getWorldScale(worldScale);
    return worldScale;
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
      this.rotation = new Euler(0, 0, 0, 'YZX');
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
    threeObject.position.copy(this.position);
    threeObject.rotation.copy(this.rotation);
    threeObject.scale.copy(this.scale);
  }

}
