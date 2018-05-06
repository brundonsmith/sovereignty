
import { Scene, Renderer, Camera, AxesHelper, PerspectiveCamera,
  OrthographicCamera, MeshBasicMaterial, BoxGeometry, TextureLoader, BackSide,
  Mesh } from 'three';
import { World, NaiveBroadphase } from 'cannon';

import Sky from './three-plugins/Sky';

import { exists } from 'utils';
import GameObject from 'GameObject';
import Component from 'components/Component';
import CameraComponent from 'components/CameraComponent';


export default class GameScene {

  public name: string;

  public threeScene: Scene = new Scene();
  public cannonWorld: World = new World();

  private gameObjects: Array<GameObject> = [];
  public allGameObjects: Array<GameObject> = [];

  public activeCamera: Camera | undefined;
  public sky: any | undefined;

  constructor(config: {[key: string]: any}) {
    this.name = config.name;
    config.objects.forEach(objectConfig => {
      let newObject = this.createGameObject(objectConfig);
      if(newObject.hasComponent(CameraComponent)) {
        this.activeCamera = (<CameraComponent> newObject.getComponent(CameraComponent)).threeCamera;
      }
    })
    this.cannonWorld.gravity.set(0, -9.82, 0);
    this.cannonWorld.broadphase = new NaiveBroadphase();
    this.cannonWorld.solver.iterations = 15;

    if(exists(config.sky)) {
      this.createSkybox(config.sky);
    }

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
    this.cannonWorld.step(1 / 600, timeDelta / 1000, 10);

    this.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.update(timeDelta);
      if(gameObject.hasComponent(CameraComponent)) {
        this.activeCamera = (<CameraComponent> gameObject.getComponent(CameraComponent)).threeCamera;
      }
    });
  }

  public render(renderer: Renderer): void {
    if(this.activeCamera) {
      renderer.render(this.threeScene, this.activeCamera);
    }
  }

}
