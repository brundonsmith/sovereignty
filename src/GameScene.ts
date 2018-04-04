
import { Scene, Renderer, Camera } from 'three';

import GameObject from './GameObject';
import Component from './Component';
import CameraComponent from './CameraComponent';

export default class GameScene {

  private threeScene: Scene = new Scene();
  private gameObjects: Array<GameObject> = [];

  private activeCamera: Camera | undefined;

  constructor(config: {[key: string]: any}) {
    console.log('GameScene.constructor()')
    config.objects.forEach(objectConfig => this.createGameObject(objectConfig))
  }

  public createGameObject(config: {[key: string]: any}): GameObject {
    var newGameObject = new GameObject(config);
    newGameObject.start(this.threeScene);
    this.gameObjects.push(newGameObject);
    return newGameObject;
  }

  public update(timeDelta: number): void {
    this.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.update(timeDelta);
      var cameraComponent: CameraComponent | undefined = <CameraComponent> gameObject.getComponent(CameraComponent);
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
