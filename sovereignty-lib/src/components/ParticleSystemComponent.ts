import { Vector3, TextureLoader, RepeatWrapping } from 'three';
import { } from 'cannon';

import { GPUParticleSystem } from '../three-plugins/GPUParticleSystem';

import { exists } from '../utils';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

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

  public static get properties() {
    return {
      texture: [ "string", null ],
      noiseTexture: [ "string", null ],
      maxParticles: [ "number", null ],
      spawnRate: [ "number", null ],
      timeScale: [ "number", null ],
      horizontalSpeed: [ "number", null ],
      verticalSpeed: [ "number", null ],
      particleOptions: [
        {
          position: [
            {
              x: [ "number", null ],
              y: [ "number", null ],
              z: [ "number", null ]
            },
            null
          ],
          velocity: [
            {
              x: [ "number", null ],
              y: [ "number", null ],
              z: [ "number", null ]
            },
            null
          ],
          color: [ "string", "number", null ],

          positionRandomness: [ "number", null ],
          velocityRandomness: [ "number", null ],
          colorRandomness: [ "number", null ],

          turbulence: [ "number", null ],
          lifetime: [ "number", null ],
          size: [ "number", null ],
          sizeRandomness: [ "number", null ],
          smoothPosition: [ "boolean", null ],
        },
        null
      ],
    }
  }

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
      this.timeScale = config.timeScale;
    }
    if(exists(config.horizontalSpeed)) {
      this.horizontalSpeed = config.horizontalSpeed;
    }
    if(exists(config.verticalSpeed)) {
      this.verticalSpeed = config.verticalSpeed;
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

  public initialize(scene: Scene): void {
    // NOTE: Unlike other components, the transform is applied to the particle
    // position instead of putting the whole system directly in the transform
    // group
    scene.threeScene.add(this.threeParticleSystem);
  }

  public update(timeDelta: number): void {
    this.particleOptions.position.x = this.transform.position.x;
    this.particleOptions.position.y = this.transform.position.y;
    this.particleOptions.position.z = this.transform.position.z;

    let particleSystemDelta = timeDelta / 1000 * this.timeScale;
    this.timePassed += particleSystemDelta;

		for(let i = 0; i < this.spawnRate * timeDelta; i++ ) {
			this.threeParticleSystem.spawnParticle(this.particleOptions);
		}
    this.threeParticleSystem.update(this.timePassed);
  }

}
