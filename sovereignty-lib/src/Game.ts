import { Renderer, WebGLRenderer } from 'three';

import { exists } from 'utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Input from './Input';

import components from 'components';

export default class Game {

  private activeScene: number = 0;
  private scenes: Array<GameScene> = [];
  public static prefabs: Array<any> = [];
  public static materials: Array<any> = [];
  public static componentTypes: Array<any> = components;

  private renderer: WebGLRenderer = new WebGLRenderer();

  private lastUpdate: number = Date.now();

  constructor(config: {[key: string]: any}) {
    console.log(config);
    console.log(this);

    document.title = config.game.title || '';

    // initialize from config
    Game.componentTypes = Game.componentTypes.concat(Object.values(config.components));
    Object.entries(config.materials).forEach(entry =>
      Game.materials.push({
        ...entry[1],
        ...{name: entry[0]}
      }));
    Object.entries(config.prefabs).forEach(entry =>
      Game.prefabs.push({
        ...entry[1],
        ...{name: entry[0]}
      }));
    Object.entries(config.scenes).forEach(entry => this.createScene({
      ...entry[1],
      ...{name: entry[0]}
    }));

    if(exists(config.game.initialScene)) {
      if(typeof config.game.initialScene === 'number') {
        this.activeScene = config.game.initialScene;
      } else if(typeof config.game.initialScene === 'string') {
        this.activeScene = this.scenes.findIndex(scene => scene.name === config.game.initialScene)
        this.activeScene = Math.max(this.activeScene, 0);
      }
    }

    // set up renderer
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMap.enabled = true;
  }

  public createScene(config: {[key: string]: any}): GameScene {
    var newScene = new GameScene(config);
    this.scenes.push(newScene);
    return newScene;
  }

  public start(containerElement: HTMLElement | undefined): void {
    if(containerElement) {
      containerElement.appendChild(this.renderer.domElement);
    } else {
      document.body.appendChild(this.renderer.domElement);
    }

    var updateLoop = () => {
    	requestAnimationFrame(updateLoop);
      this.update();
      this.render();
    }
    updateLoop();
  }

  private update(): void {
    this.scenes[this.activeScene].update(Date.now() - this.lastUpdate);
    Input.update();
    this.lastUpdate = Date.now();
  }

  private render(): void {
    this.scenes[this.activeScene].render(this.renderer);
  }
}
