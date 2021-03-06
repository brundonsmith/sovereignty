
class FirstPersonShooterController extends SOVEREIGNTY.Component {

  constructor(config, gameObject) {
    super(config, gameObject);

    this.moveSpeed = config.moveSpeed || 10;
    this.turnSpeed = config.turnSpeed || 1;
    this.lookLimit = config.lookLimit || Math.PI / 4;
    this.jumpForce = config.jumpForce || 100;
    this.launchCooldown = config.launchCooldown || 1;

    // private
    this.lastLaunch = 0;
  }

  update(timeDelta) {
    let timeDeltaSeconds = timeDelta / 1000;
    var turnDelta = this.turnSpeed * timeDeltaSeconds;

    if(SOVEREIGNTY.Input.keyPressed('Space')) {
      this.rigidbody.applyImpulse(new THREE.Vector3(0, this.jumpForce, 0), new THREE.Vector3(0, 0, 0));
    }

    let movement = new THREE.Vector3(0, 0, 0);
    if(SOVEREIGNTY.Input.keyDown('KeyW')) {
      movement.add(this.transform.forward);
    }
    if(SOVEREIGNTY.Input.keyDown('KeyS')) {
      movement.add(this.transform.backward);
    }
    if(SOVEREIGNTY.Input.keyDown('KeyD')) {
      movement.add(this.transform.right);
    }
    if(SOVEREIGNTY.Input.keyDown('KeyA')) {
      movement.add(this.transform.left);
    }
    movement.normalize();
    movement.multiplyScalar(this.moveSpeed);

    this.rigidbody.cannonBody.velocity.x = movement.x;
    this.rigidbody.cannonBody.velocity.z = movement.z;

    let rigidbodyEuler = new CANNON.Vec3();
    this.rigidbody.cannonBody.quaternion.toEuler(rigidbodyEuler, 'YZX');
    this.rigidbody.cannonBody.quaternion.setFromEuler(rigidbodyEuler.x, rigidbodyEuler.y - SOVEREIGNTY.Input.mouseDeltaX() * turnDelta, rigidbodyEuler.z, 'YZX');
    this.rigidbody.cannonBody.angularVelocity = new CANNON.Vec3(0, 0, 0);

    let camera = this.gameObject.children.find(child => child.name === 'Camera');
    camera.transform.rotation.x = Math.max(Math.min(
                                      camera.transform.rotation.x - SOVEREIGNTY.Input.mouseDeltaY() * turnDelta,
                                      this.lookLimit
                                    ), -1 * this.lookLimit
                                  );


    if(SOVEREIGNTY.Input.mouseButtonDown(0) && Date.now() - this.lastLaunch > this.launchCooldown * 1000) {
      let launcher = camera.children.find(child => child.name === 'Launcher');
      launcher.getComponent('Launcher').fire();
      this.lastLaunch = Date.now();
    }
  }

}
