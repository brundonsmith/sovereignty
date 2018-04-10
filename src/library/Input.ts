import { Renderer, WebGLRenderer } from 'three';

import { exists } from './utils';
import GameScene from './GameScene';
import GameObject from './GameObject';

class Input {

  public static readonly DOWN = Symbol('down');
  public static readonly UP = Symbol('up');
  public static readonly PRESSED = Symbol('pressed');
  public static readonly RELEASED = Symbol('released');

  private keyState: {[key: string]: Symbol} = {};
  private justPressed: Array<string> = [];
  private justReleased: Array<string> = [];

  constructor() {
    window.addEventListener('keydown', (e) => {
      if(!this.keyDown(e.key)) {
        this.keyState[e.key] = Input.PRESSED
      }
    })
    window.addEventListener('keyup', (e) => {
      if(!this.keyUp(e.key)) {
        this.keyState[e.key] = Input.RELEASED
      }
    })
  }

  public update(): void {

    Object.keys(this.keyState).forEach(key => {
      if(this.keyState[key] === Input.PRESSED) {
        if(this.justPressed.includes(key)) {
          this.keyState[key] = Input.DOWN;
          this.justPressed.splice(this.justPressed.indexOf(key), 1);
        } else {
          this.justPressed.push(key);
        }
      }
      if(this.keyState[key] === Input.RELEASED) {
        if(this.justReleased.includes(key)) {
          this.keyState[key] = Input.UP;
          this.justReleased.splice(this.justReleased.indexOf(key), 1);
        } else {
          this.justReleased.push(key);
        }
      }
    })
  }

  public keyDown(key: string): boolean {
    return this.keyState[key] === Input.DOWN || this.keyState[key] === Input.PRESSED;
  }

  public keyUp(key: string): boolean {
    return !exists(this.keyState[key]) || this.keyState[key] === Input.UP || this.keyState[key] === Input.RELEASED;
  }

  public keyPressed(key: string): boolean {
    return this.keyState[key] === Input.PRESSED;
  }

  public keyReleased(key: string): boolean {
    return this.keyState[key] === Input.RELEASED;
  }

}

const inputInstance = new Input();

export default inputInstance;
