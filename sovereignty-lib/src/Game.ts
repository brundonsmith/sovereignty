import { Renderer, WebGLRenderer, Clock } from 'three';

import { exists } from 'utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';
import Input from './Input';

import components from 'components';

function handleCanvasClick(e) {
  (<HTMLElement>e.target).requestPointerLock();
}

export default class Game {

  private activeScene: number = 0;
  private scenes: Array<GameScene> = [];
  public static prefabs: Array<any> = [];
  public static materials: Array<any> = [];
  public static componentTypes: Array<any> = components;

  private clock: Clock = new Clock();
  private renderer: WebGLRenderer = new WebGLRenderer();

  public get captureCursor(): boolean {
    return this._captureCursor;
  }
  public set captureCursor(val: boolean) {
    this._captureCursor = val;
    if(val === true) {
      this.renderer.domElement.addEventListener('click', handleCanvasClick);
    } else {
      this.renderer.domElement.removeEventListener('click', handleCanvasClick);
      document.exitPointerLock();
    }
  }
  private _captureCursor: boolean = false;

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
    Object.entries(config.prefabs).forEach(entry => {
      let prefab: any = {
        ...entry[1],
        ...{name: entry[0]}
      };

      if(exists(prefab.extends)) {
        if(exists(config.prefabs[prefab.extends])) {
          Object.assign(prefab, config.prefabs[prefab.extends])
        } else {
          console.warn(`Prefab "${prefab.name}" tried to extend prefab "${prefab.extends}", which doesn't exist`)
        }
      }

      Game.prefabs.push(prefab);
    });
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


    this.captureCursor = config.game.captureCursor;
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
    this.scenes[this.activeScene].update(this.clock.getDelta() * 1000);
    Input.update();
  }

  private render(): void {
    this.scenes[this.activeScene].render(this.renderer);
  }
}
