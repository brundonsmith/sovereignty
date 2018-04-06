import { Renderer, WebGLRenderer } from 'three';

import GameScene from './GameScene';
import GameObject from './GameObject';

import { Component, TransformComponent, CameraComponent, MeshComponent } from './components';

export default class Game {

  private activeScene: number = 0;
  private scenes: Array<GameScene> = [];

  public static prefabs: Array<GameObject> = [];
  public static componentTypes: Array<any> = [ TransformComponent, CameraComponent, MeshComponent ];

  private renderer: Renderer = new WebGLRenderer();

  private lastUpdate: number = Date.now();

  constructor(config: {[key: string]: any}) {

    // initialize from config
    Game.componentTypes = Game.componentTypes.concat(config.components);
    config.prefabs.forEach(c => Game.prefabs.push(new GameObject(c)));
    config.scenes.forEach(c => this.createScene(c));

    // set up renderer
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(this.renderer.domElement);
  }

  public createScene(config: {[key: string]: any}): GameScene {
    var newScene = new GameScene(config);
    this.scenes.push(newScene);
    return newScene;
  }

  public start(): void {
    var updateLoop = () => {
    	requestAnimationFrame(updateLoop);
      this.update();
      this.render();
    }
    updateLoop();
  }

  private update(): void {
    this.scenes[this.activeScene].update(Date.now() - this.lastUpdate);
  }

  private render(): void {
    this.scenes[this.activeScene].render(this.renderer);
  }
}
