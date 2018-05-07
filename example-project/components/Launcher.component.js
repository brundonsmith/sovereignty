
class Launcher extends Component {

  constructor(config, gameObject) {
    super(config, gameObject);

    this.projectilePrefab = Game.prefabs.find(prefab => prefab.name === config.projectile);
    this.launchVelocity = config.launchVelocity || 10;
  }

  update(timeDelta) {
  }

  fire() {
    let newBall = this.gameObject.scene.createGameObject(this.projectilePrefab);
    
    let ballPos = this.transform.worldPosition.add(this.transform.forward);
    newBall.transform.position = ballPos;
    newBall.rigidbody.cannonBody.position = toCannonVector(ballPos);

    let ballVel = this.transform.forward.multiplyScalar(this.launchVelocity);
    newBall.rigidbody.cannonBody.velocity = toCannonVector(ballVel);
  }

}
