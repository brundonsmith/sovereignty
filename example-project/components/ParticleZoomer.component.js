
class ParticleZoomer extends SOVEREIGNTY.Component {

  constructor(config, gameObject) {
    super(config, gameObject);

    this.timePassed = 0;
  }

  update(timeDelta) {
    let deltaSeconds = timeDelta / 1000;
    this.timePassed += deltaSeconds;

    this.transform.position.x = Math.sin( this.timePassed * 1.5 ) * 20;
		this.transform.position.y = Math.sin( this.timePassed * 1.33 ) * 10;
		this.transform.position.z = Math.sin( this.timePassed * 1.5 + 1.33 ) * 5;
  }

}
