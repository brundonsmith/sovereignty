import { Vector3 } from 'three';
//@ts-ignore
import { Body, World, Quaternion, Vec3, Material } from 'cannon';

import { exists, toCannonVector, toThreeVector, toThreeQuaternion } from '../utils';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class RigidbodyComponent extends Component {

  public static get properties() {
    return {
      kinematic: [ "boolean", null ],
      mass: [ "number", null ],
      fixedRotation: [ "boolean", null ],
      friction: [ "number", null ],
    }
  }

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
      mass: config.kinematic ? 0 : (config.mass || 1),
      position: new Vec3(transform.position.x, transform.position.y, transform.position.z),
      quaternion: quaternion,
      fixedRotation: config.fixedRotation,
      material: new Material({
        friction: exists(config.friction) ? config.friction : 0.3
      })
    })
    collider.cannonShapes.forEach((shape, index) => {
      if(exists(collider.cannonShapeEulers[index])) {
        let quat = new Quaternion();
        quat.setFromEuler(collider.cannonShapeEulers[index].x, collider.cannonShapeEulers[index].y, collider.cannonShapeEulers[index].z);
        this.cannonBody.addShape(shape, toCannonVector(collider.cannonShapeOffsets[index]), quat);
      } else {
        this.cannonBody.addShape(shape, toCannonVector(collider.cannonShapeOffsets[index]))
      }
    });

    this.cannonBody.addEventListener('collide', (e) => {
      this.gameObject.components.forEach(component => component.onCollision(e))
    });
  }

  public initialize(scene: Scene): void {
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
