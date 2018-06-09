
import { Vector3 } from 'three';
import { Vec3, RaycastResult } from 'cannon';
import Component from 'components/Component';
import Input from 'Input';

export default class FirstPersonController extends Component {

  public static get properties() {
    return {
      moveSpeed: [ 'number', null ],
      turnSpeed: [ 'number', null ],
      lookLimit: [ 'number', null ],
      jumpForce: [ 'number', null ]
    }
  }

  public moveSpeed: number = 10;
  public turnSpeed: number = 1;
  public lookLimit: number = Math.PI / 2.1;
  public jumpForce: number = 100;

  public get isGrounded(): boolean {
    var result = new RaycastResult();
    result.reset();

    let pos = this.transform.worldPosition;
    let bounds = this.collider.bounds;
    console.log(bounds)
    let from = new Vector3(pos.x, pos.y + bounds.min.y + 0.1, pos.z);
    let to = new Vector3(pos.x, pos.y + bounds.min.y - 0.5, pos.z);
    this.gameObject.scene.cannonWorld.raycastClosest(from, to, {
      collisionFilterMask: ~this.rigidbody.bodyID // collide with everything except this body
    }, result);

    console.log({ from, to })

    return result.hasHit;
  }

  constructor(config, gameObject) {
    super(config, gameObject);

    Object.assign(this, config);
  }

  public update(timeDelta: number): void {
    let timeDeltaSeconds = timeDelta / 1000;
    let turnDelta = this.turnSpeed * timeDeltaSeconds;

    if(Input.keyPressed('Space') && this.isGrounded) {
      this.rigidbody.applyImpulse(new Vector3(0, this.jumpForce, 0), new Vector3(0, 0, 0));
    }

    console.log(this.isGrounded)

    let movement = new Vector3(0, 0, 0);
    if(Input.keyDown('KeyW')) {
      movement.add(this.transform.forward);
    }
    if(Input.keyDown('KeyS')) {
      movement.add(this.transform.backward);
    }
    if(Input.keyDown('KeyD')) {
      movement.add(this.transform.right);
    }
    if(Input.keyDown('KeyA')) {
      movement.add(this.transform.left);
    }
    movement.normalize();
    movement.multiplyScalar(this.moveSpeed);

    this.rigidbody.cannonBody.velocity.x = movement.x;
    this.rigidbody.cannonBody.velocity.z = movement.z;

    let rigidbodyEuler = new Vec3();
    this.rigidbody.cannonBody.quaternion.toEuler(rigidbodyEuler, 'YZX');
    this.rigidbody.cannonBody.quaternion.setFromEuler(rigidbodyEuler.x, rigidbodyEuler.y - Input.mouseDeltaX() * turnDelta, rigidbodyEuler.z, 'YZX');
    this.rigidbody.cannonBody.angularVelocity = new Vec3(0, 0, 0);

    let camera = this.gameObject.children.find(child => child.name === 'Camera');
    camera.transform.rotation.x = Math.max(Math.min(
                                      camera.transform.rotation.x - Input.mouseDeltaY() * turnDelta,
                                      this.lookLimit
                                    ), -1 * this.lookLimit
                                  );
  }

}
