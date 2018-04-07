import { Light, PointLight, PerspectiveCamera, Scene } from 'three';
import { World, Vec3 } from 'cannon';

import GameObject from '../GameObject';
import Component from './Component';
import TransformComponent from './TransformComponent';
import RigidbodyComponent from './RigidbodyComponent';
import Input from '../Input';

export default class KeyboardMoveComponent extends Component {

  public moveSpeed: number = 1;
  public turnSpeed: number = 0.01;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

  }

  public update(timeDelta: number): void {
    var rigidbody = <RigidbodyComponent> this.gameObject.getComponent(RigidbodyComponent);
    var transform = <TransformComponent> this.gameObject.getComponent(TransformComponent);
    var moveDelta = this.moveSpeed * timeDelta / 1000;
    var turnDelta = this.turnSpeed * timeDelta / 1000;
    var forwardVector3 = transform.forward;
    var forwardVec3 = new Vec3(forwardVector3.x, forwardVector3.y, forwardVector3.z);

    if(Input.keyState['ArrowUp'] === Input.DOWN) {
      if(rigidbody) {
        rigidbody.cannonBody.applyImpulse(forwardVec3.scale(moveDelta));
      } else {
        transform.position.add(forwardVector3.multiplyScalar(moveDelta));
      }
    } else if(Input.keyState['ArrowDown'] === Input.DOWN) {
      if(rigidbody) {
        rigidbody.cannonBody.applyImpulse(forwardVec3.scale(-1 * moveDelta));
      } else {
        transform.position.add(forwardVector3.multiplyScalar(-1 * moveDelta));
      }
    } else if(Input.keyState['ArrowRight'] === Input.DOWN) {
      if(rigidbody) {
        //TODO rigidbody.cannonBody.applyImpulse(forwardVec3.scale(-1 * delta));
      } else {
        transform.rotation.y -= turnDelta;
      }
    } else if(Input.keyState['ArrowLeft'] === Input.DOWN) {
      if(rigidbody) {
        //TODO rigidbody.cannonBody.applyImpulse(forwardVec3.scale(-1 * delta));
      } else {
        transform.rotation.y += turnDelta;
      }
    }
  }



}
