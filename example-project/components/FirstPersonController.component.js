
class FirstPersonController extends Component {

  constructor(config, gameObject) {
    super(config, gameObject);

    this.moveSpeed = config.moveSpeed || 500;
    this.turnSpeed = config.turnSpeed || 1;
    this.lookLimit = config.lookLimit || Math.PI / 4;
    this.jumpForce = config.jumpForce || 200;
  }

  update(timeDelta) {
    var moveDelta = this.moveSpeed * timeDelta / 1000;
    var turnDelta = this.turnSpeed * timeDelta / 1000;

    if(Input.keyPressed(' ')) {
      this.rigidbody.applyImpulse(new THREE.Vector3(0, this.jumpForce, 0), new THREE.Vector3(0, 0, 0));
    }

    let movement = new THREE.Vector3(0, 0, 0);
    if(Input.keyDown('w')) {
      movement.add(this.transform.forward);
    }
    if(Input.keyDown('s')) {
      movement.add(this.transform.backward);
    }
    if(Input.keyDown('d')) {
      movement.add(this.transform.right);
    }
    if(Input.keyDown('a')) {
      movement.add(this.transform.left);
    }
    movement.normalize();
    movement.multiplyScalar(moveDelta);

    this.rigidbody.cannonBody.velocity.x = movement.x;
    this.rigidbody.cannonBody.velocity.z = movement.z;

    let rigidbodyEuler = new CANNON.Vec3();
    this.rigidbody.cannonBody.quaternion.toEuler(rigidbodyEuler, 'YZX');
    this.rigidbody.cannonBody.quaternion.setFromEuler(rigidbodyEuler.x, rigidbodyEuler.y - Input.mouseDeltaX() * turnDelta, rigidbodyEuler.z, 'YZX');
    this.rigidbody.cannonBody.angularVelocity = new CANNON.Vec3(0, 0, 0);

    let camera = this.gameObject.children.find(child => child.name === 'Camera');
    camera.transform.rotation.x = Math.max(Math.min(
                                      camera.transform.rotation.x - Input.mouseDeltaY() * turnDelta,
                                      this.lookLimit
                                    ), -1 * this.lookLimit
                                  );


    if(Input.mouseButtonDown(0) && Math.random() < 0.2) {
      let launcher = camera.children.find(child => child.name === 'Launcher');
      launcher.getComponent(Launcher).fire();
    }
  }

}
