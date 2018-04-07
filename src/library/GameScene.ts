
import { Scene, Renderer, Camera } from 'three';
import { World, NaiveBroadphase } from 'cannon';

import GameObject from './GameObject';
import { Component, CameraComponent } from './components';


export default class GameScene {

  public name: string;

  private threeScene: Scene = new Scene();
  private cannonWorld: World = new World();

  private gameObjects: Array<GameObject> = [];

  private activeCamera: Camera | undefined;

  constructor(config: {[key: string]: any}) {
    this.name = config.name;
    config.objects.forEach(objectConfig => this.createGameObject(objectConfig))
    this.cannonWorld.gravity.set(0, -9.82, 0);
    this.cannonWorld.broadphase = new NaiveBroadphase();
    this.cannonWorld.solver.iterations = 15;
  }

  public createGameObject(config: {[key: string]: any}): GameObject {
    var newGameObject = new GameObject(config);
    newGameObject.start(this.threeScene, this.cannonWorld);
    this.gameObjects.push(newGameObject);
    return newGameObject;
  }

  public update(timeDelta: number): void {
    this.cannonWorld.step(1 / 600, timeDelta / 1000, 10);

    this.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.update(timeDelta);
      var cameraComponent = <CameraComponent> gameObject.getComponent(CameraComponent);
      if(cameraComponent) {
        this.activeCamera = cameraComponent.threeCamera;
      }
    });
  }

  public render(renderer: Renderer): void {
    if(this.activeCamera) {
      renderer.render(this.threeScene, this.activeCamera);
    }
  }

}
