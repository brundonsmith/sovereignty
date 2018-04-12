import { Scene, Vector3, Euler } from 'three';
//@ts-ignore
import { Body, World, Quaternion, Vec3 } from 'cannon';

import { toCannonVector, toThreeVector, toThreeQuaternion } from '../utils';
import GameScene from '../GameScene';
import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';
import ColliderComponent from './colliders/ColliderComponent';
import SphereColliderComponent from './colliders/SphereColliderComponent';

export default class RigidbodyComponent extends Component {

  private cannonBody: Body;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    var transform = this.transform;
    var collider = this.collider;

    var quaternion: Quaternion = new Quaternion();
    quaternion.setFromEuler(
      transform.rotation.x,
      transform.rotation.y,
      transform.rotation.z,
      'YZX'
    )

    this.cannonBody = new Body({
      mass: config.mass,
      position: new Vec3(transform.position.x, transform.position.y, transform.position.z),
      quaternion: quaternion,
    })
    this.cannonBody.addShape(collider.cannonShape);

    this.cannonBody.addEventListener('collide', (e) => {
      this.gameObject.components.forEach(component => component.onCollision(e))
    });
  }

  public initialize(scene: GameScene): void {
    scene.cannonWorld.addBody(this.cannonBody);
  }

  public update(timeDelta: number): void {
    var transform = this.transform;

    transform.position.x = this.cannonBody.position.x;
    transform.position.y = this.cannonBody.position.y;
    transform.position.z = this.cannonBody.position.z;

    transform.rotation.setFromQuaternion(toThreeQuaternion(this.cannonBody.quaternion), 'YZX', true);
  }

  // Mirroring body methods
  public applyForce(force: Vector3, worldPoint?: Vector3): void {
    this.cannonBody.applyForce(toCannonVector(force), toCannonVector(worldPoint))
  }
  public applyImpulse(impulse: Vector3, worldPoint?: Vector3): void {
    this.cannonBody.applyImpulse(toCannonVector(impulse), toCannonVector(worldPoint))
  }
  public applyLocalForce(force: Vector3, worldPoint?: Vector3): void {
    this.cannonBody.applyLocalForce(toCannonVector(force), toCannonVector(worldPoint))
  }
  public applyLocalImpulse(impulse: Vector3, worldPoint?: Vector3): void {
    this.cannonBody.applyLocalImpulse(toCannonVector(impulse), toCannonVector(worldPoint))
  }
  public getVelocityAtWorldPoint(worldPoint: Vector3): Vector3 {
    return toThreeVector(this.cannonBody.getVelocityAtWorldPoint(toCannonVector(worldPoint)))
  }
  public pointToLocalFrame(worldPoint: Vector3): Vector3 {
    return toThreeVector(this.cannonBody.pointToLocalFrame(toCannonVector(worldPoint)))
  }
  public pointToWorldFrame(localPoint: Vector3): Vector3 {
    return toThreeVector(this.cannonBody.pointToWorldFrame(toCannonVector(localPoint)))
  }
  public sleep() {
    this.cannonBody.sleep();
  }
  public wakeUp() {
    this.cannonBody.wakeUp();
  }
}
