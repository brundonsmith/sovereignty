import { Renderer, WebGLRenderer } from 'three';

import GameScene from './GameScene';
import GameObject from './GameObject';

class Input {

  public readonly DOWN = Symbol('down');
  public readonly UP = Symbol('up');
  public readonly PRESSED = Symbol('pressed');
  public readonly RELEASED = Symbol('released');

  public keyState: {[key: string]: Symbol} = {};
  private justPressed: Array<string> = [];
  private justReleased: Array<string> = [];

  constructor() {
    window.addEventListener('keydown', (e) => this.keyState[e.key] = this.DOWN)
    window.addEventListener('keyup', (e) => this.keyState[e.key] = this.UP)
  }

  public update(): void {
    /*
    Object.keys(this.keyState).forEach(key => {
      if(this.keyState[key] === this.PRESSED) {
        if(this.justPressed.includes(key)) {
          this.keyState[key] = this.DOWN;
          this.justPressed.splice(this.justPressed.indexOf(key), 1);
        } else {
          this.justPressed.push(key);
        }
      }
      if(this.keyState[key] === this.RELEASED) {
        if(this.justReleased.includes(key)) {
          this.keyState[key] = this.UP;
          this.justReleased.splice(this.justReleased.indexOf(key), 1);
        } else {
          this.justReleased.push(key);
        }
      }
    })

    console.log(Input.keyState)*/
  }

}

const inputInstance = new Input();

export default inputInstance;
