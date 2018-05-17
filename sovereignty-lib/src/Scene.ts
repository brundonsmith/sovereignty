
import { Scene as ThreeScene, Renderer, Camera, AxesHelper, PerspectiveCamera,
  OrthographicCamera, MeshBasicMaterial, BoxGeometry, TextureLoader, BackSide,
  Mesh, AmbientLight, AudioListener } from 'three';
import { World, NaiveBroadphase } from 'cannon';
import check from 'simple-typechecker';

import Sky from './three-plugins/Sky';

import { exists } from 'utils';
import GameObject from 'GameObject';
import CameraComponent from 'components/CameraComponent';
import AudioListenerComponent from 'components/AudioListenerComponent';

export default class Scene {

  public static get properties() {
    return {
      name: "string",
      objects: [ { } ],
      ambientColor: [ "string", "number", null ],
      physics: [
        {
          gravity: [ "number", null ]
        },
        null
      ],
      sky: [
        {
          distance: [ "number", null ],
          right: "string",
          left: "string",
          top: "string",
          bottom: "string",
          front: "string",
          back: "string",
        },
        {
          distance: [ "number", null ],
          luminance: [ "number", null ],
      		turbidity: [ "number", null ],
      		rayleigh: [ "number", null ],
      		mieCoefficient: [ "number", null ],
      		mieDirectionalG: [ "number", null ],
      		sunPosition: [
            {
              x: [ "number", null ],
              y: [ "number", null ],
              z: [ "number", null ]
            },
            null
          ]
        },
        null
      ]
    }
  }

  public name: string;

  public threeScene: ThreeScene = new ThreeScene();
  public cannonWorld: World = new World();

  private gameObjects: Array<GameObject> = [];
  public allGameObjects: Array<GameObject> = [];

  public activeCamera: Camera | undefined;
  public activeListener: AudioListener | undefined;
  public sky: any | undefined;

  constructor(config: {[key: string]: any}) {
    this.name = config.name;

    // objects
    config.objects.forEach(objectConfig => {
      let newObject = this.createGameObject(objectConfig);

      let camera = newObject.findComponentInChildren(CameraComponent);
      if(exists(camera)) {
        if(exists(this.activeCamera)) {
          console.warn(`Found two instances of CameraComponent in the same scene. Which one gets used will be random.`)
        }

        this.activeCamera = (<CameraComponent> camera).threeCamera;
      }

      let listener = newObject.findComponentInChildren(AudioListenerComponent);
      if(exists(listener)) {
        if(exists(this.activeListener)) {
          console.warn(`Found two instances of AudioListenerComponent in the same scene. Which one gets used will be random.`)
        }

        this.activeListener = (<AudioListenerComponent> listener).threeAudioListener;
      }
    })

    if(!exists(this.activeCamera)) {
      console.warn(`Couldn't find an object in the scene with a CameraComponent. A camera is required to make anything visible onscreen.`)
    }

    if(!exists(this.activeListener)) {
      console.warn(`Couldn't find an object in the scene with an AudioListenerComponent. You won't be able to hear any sound without one.`)
    }

    // sky
    if(exists(config.sky)) {
      this.createSkybox(config.sky);
    }

    // cannon world
    config.physics = config.physics || {};
    if(exists(config.physics.gravity)) {
      this.cannonWorld.gravity.set(0, config.physics.gravity, 0);
    } else {
      this.cannonWorld.gravity.set(0, -9.82, 0);
    }
    this.cannonWorld.broadphase = new NaiveBroadphase();
    this.cannonWorld.solver.iterations = 15;

    // helpers
    this.threeScene.add(new AmbientLight(parseInt(config.ambientColor || 0x404040)));
    this.threeScene.add(new AxesHelper( 5 ))
  }

  private createSkybox(config: {[key: string]: any}): void {
    let distance = 1000;
    if(exists(this.activeCamera)) {
      if(this.activeCamera instanceof PerspectiveCamera) {
        distance = (<PerspectiveCamera>this.activeCamera).far - 1;
      } else if(this.activeCamera instanceof OrthographicCamera) {
        distance = (<OrthographicCamera>this.activeCamera).far - 1;
      }
    }

    let sides = ['right', 'left', 'top', 'bottom', 'front', 'back'];
    let skyboxSpecifiesTextures = sides.every(side => exists(config[side]))
    if(skyboxSpecifiesTextures) {
      let textures = {};
      let materials = [];
      sides.forEach(side => {
        textures[side] = new TextureLoader().load(config[side])
        materials.push(new MeshBasicMaterial({
    			map: textures[side],
    			side: BackSide
    		}))
      })
      let geometry = new BoxGeometry(distance, distance, distance);
    	this.sky = new Mesh(geometry, materials);
    } else {
      config.distance = config.distance || distance;
      this.sky = new Sky(config);
      this.sky.scale.setScalar(config.distance);
    }

    this.threeScene.add(this.sky);
  }

  public createGameObject(config: {[key: string]: any}): GameObject {
    check(config, GameObject.properties);
    var newGameObject = new GameObject(config);
    newGameObject.initialize(this);
    this.gameObjects.push(newGameObject);
    return newGameObject;
  }

  public findObject(funcOrName: string | ((item: GameObject) => boolean)): GameObject | undefined {
    if(typeof funcOrName === 'string') {
      return this.allGameObjects.find(obj => obj.name === funcOrName);
    } else {
      return this.allGameObjects.find(funcOrName);
    }
  }

  public update(timeDelta: number): void {
    this.cannonWorld.step(1 / 60);

    this.gameObjects.forEach((gameObject: GameObject) =>
      gameObject.update(timeDelta)
    );
  }

  public render(renderer: Renderer): void {
    if(this.activeCamera) {
      renderer.render(this.threeScene, this.activeCamera);
    }
  }

}
