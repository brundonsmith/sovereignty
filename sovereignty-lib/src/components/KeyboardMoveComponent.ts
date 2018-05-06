import { Light, PointLight, PerspectiveCamera, Scene } from 'three';
import { World } from 'cannon';

import GameObject from 'GameObject';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';
import RigidbodyComponent from 'components/RigidbodyComponent';
import Input from 'Input';

export default class KeyboardMoveComponent extends Component {

  public moveSpeed: number = 5;
  public turnSpeed: number = 1;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

  }

  public update(timeDelta: number): void {
    var moveDelta = this.moveSpeed * timeDelta / 1000;
    var turnDelta = this.turnSpeed * timeDelta / 1000;

    if(Input.keyDown('w')) {
      if(this.gameObject.hasComponent(RigidbodyComponent)) {
        this.rigidbody.applyImpulse(this.transform.forward.multiplyScalar(-1 * moveDelta));
      } else {
        this.transform.position.add(this.transform.forward.multiplyScalar(-1 * moveDelta));
      }
    }

    if(Input.keyDown('s')) {
      if(this.gameObject.hasComponent(RigidbodyComponent)) {
        this.rigidbody.applyImpulse(this.transform.forward.multiplyScalar(moveDelta));
      } else {
        this.transform.position.add(this.transform.forward.multiplyScalar(moveDelta));
      }
    }

    this.transform.rotation.y -= Input.mouseDeltaX() * turnDelta;
    this.transform.rotation.x -= Input.mouseDeltaY() * turnDelta;

    /*
    if(Input.keyDown('ArrowRight')) {
      if(this.gameObject.hasComponent(RigidbodyComponent)) {
        //TODO this.rigidbody.cannonBody.applyImpulse(forwardVec3.scale(-1 * delta));
      } else {
        this.transform.rotation.y -= turnDelta;
      }
    }

    if(Input.keyDown('ArrowLeft')) {
      if(this.gameObject.hasComponent(RigidbodyComponent)) {
        //TODO this.rigidbody.cannonBody.applyImpulse(forwardVec3.scale(-1 * delta));
      } else {
        this.transform.rotation.y += turnDelta;
      }
    }
    */
  }



}
