
class Launcher extends Component {

  constructor(config, gameObject) {
    super(config, gameObject);

    this.projectilePrefab = Game.prefabs.find(prefab => prefab.name === config.projectile);
    this.launchVelocity = config.launchVelocity || 2000;
  }

  update(timeDelta) {
  }

  fire() {
    let newBall = this.gameObject.scene.createGameObject(this.projectilePrefab);
    newBall.rigidbody.cannonBody.position = toCannonVector(this.transform.worldPosition.add(this.transform.forward));
    newBall.rigidbody.velocity = this.transform.forward.multiplyScalar(this.launchVelocity);
  }

}
