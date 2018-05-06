
import { Scene, Renderer, Camera, AxesHelper, PerspectiveCamera, OrthographicCamera } from 'three';
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
      if(typeof config.sky === 'string') {
        // TODO: Load texture
      } else if(typeof config.sky === 'object') {
        let cameraFar;
        if(exists(this.activeCamera)) {
          if(this.activeCamera instanceof PerspectiveCamera) {
            cameraFar = (<PerspectiveCamera>this.activeCamera).far;
          } else if(this.activeCamera instanceof OrthographicCamera) {
            cameraFar = (<OrthographicCamera>this.activeCamera).far;
          }
        }
        config.sky.distance = config.sky.distance || cameraFar - 1 || 1000;
        console.log(config.sky.distance)
        this.sky = new Sky(config.sky);
        this.threeScene.add(this.sky);
      	this.sky.scale.setScalar(config.sky.distance);
      }
    }

    this.threeScene.add(new AxesHelper( 5 ))
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
