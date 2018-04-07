import { Scene } from 'three';
//@ts-ignore
import { Body, World, Quaternion, Vec3 } from 'cannon';

import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';
import ColliderComponent from './colliders/ColliderComponent';
import SphereColliderComponent from './colliders/SphereColliderComponent';

export default class RigidbodyComponent extends Component {

  public cannonBody: Body;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    var collider = <ColliderComponent> this.gameObject.getComponent(ColliderComponent);

    if(!collider) {
      console.error(`Rigidbody on object "${this.gameObject.name}" requires a collider`)
    }

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

  public initialize(scene: Scene, world: World): void {
    world.addBody(this.cannonBody);
  }

  public update(timeDelta: number): void {
    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    transform.position.x = this.cannonBody.position.x;
    transform.position.y = this.cannonBody.position.y;
    transform.position.z = this.cannonBody.position.z;


    var euler = new Vec3();
    this.cannonBody.quaternion.toEuler(euler, 'YZX');
    transform.rotation.x = euler.x;
    transform.rotation.y = euler.y;
    transform.rotation.z = euler.z;
  }

}
