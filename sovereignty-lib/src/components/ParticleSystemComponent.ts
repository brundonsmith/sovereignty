import { Material, Mesh, Scene, Vector3, TextureLoader, RepeatWrapping } from 'three';
import { World } from 'cannon';

import { GPUParticleSystem, GPUParticleContainer } from '../GPUParticleSystem';

import { exists } from '../utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';

class ParticleOptions {
  public position: Vector3 = new Vector3();
	public velocity: Vector3 = new Vector3();
	public color: number = 0xaa88ff;

	public positionRandomness: number = 1;
	public velocityRandomness: number = 0;
	public colorRandomness: number = 1;

	public turbulence: number = 0;
	public lifetime: number = 1;
	public size: number = 5;
	public sizeRandomness: number = 0;
  public smoothPosition: boolean = false;
}

export default class ParticleSystemComponent extends Component {

  public threeParticleSystem: GPUParticleSystem;

  // spawner
  public maxParticles: number = 1000;
  public spawnRate: number = 100;
  public timeScale: number = 1;
  public horizontalSpeed: number = 0;
  public verticalSpeed: number = 0;

  // particles
  public particleOptions: ParticleOptions = new ParticleOptions();

  private timePassed: number = 0;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    // store config values
    if(exists(config.maxParticles)) {
      this.maxParticles = config.maxParticles;
    }
    if(exists(config.spawnRate)) {
      this.spawnRate = config.spawnRate;
    }
    if(exists(config.timeScale)) {
      this.spawnRate = config.timeScale;
    }
    if(exists(config.horizontalSpeed)) {
      this.spawnRate = config.horizontalSpeed;
    }
    if(exists(config.verticalSpeed)) {
      this.spawnRate = config.verticalSpeed;
    }

    if(exists(config.particleOptions) && typeof config.particleOptions.color === 'string') {
      config.particleOptions.color = parseInt(config.particleOptions.color);
    }

    Object.assign(this.particleOptions, config.particleOptions);


    // create three stuff
    let particleTexture = new TextureLoader().load(config.texture);
    particleTexture.wrapS = RepeatWrapping;

    let noiseTexture = new TextureLoader().load(config.noiseTexture);
    noiseTexture.wrapS = RepeatWrapping;

    // TODO: Store default textures in data URL's, so the project doesn't have
    // to maintain copies

    this.threeParticleSystem = new GPUParticleSystem({
      maxParticles: this.maxParticles,
      particleTexture,
      noiseTexture
    });
  }

  public initialize(scene: GameScene): void {
    this.transform.threeGroup.add(this.threeParticleSystem);
  }

  public update(timeDelta: number): void {
    let particleSystemDelta = timeDelta / 1000 * this.timeScale;
    this.timePassed += particleSystemDelta;

		for(let i = 0; i < this.spawnRate * particleSystemDelta; i++ ) {
			this.threeParticleSystem.spawnParticle(this.particleOptions);
		}
    this.threeParticleSystem.update(this.timePassed);
  }

}
