import { Renderer, WebGLRenderer } from 'three';

import { exists } from './utils';
import GameScene from './GameScene';
import GameObject from './GameObject';

const DOWN = Symbol('down');
const UP = Symbol('up');
const PRESSED = Symbol('pressed');
const RELEASED = Symbol('released');

class Input {

  private mouseStateX: number = window.innerWidth / 2;
  private mouseStateY: number = window.innerHeight / 2;

  private prevMouseStateX: number = window.innerWidth / 2;
  private prevMouseStateY: number = window.innerHeight / 2;

  private keyState: {[key: string]: Symbol} = {};
  private justPressed: Array<string> = [];
  private justReleased: Array<string> = [];

  constructor() {
    window.addEventListener('mousemove', (e) => {
      this.mouseStateX = e.clientX;
      this.mouseStateY = e.clientY;
    })
    window.addEventListener('keydown', (e) => {
      if(!this.keyDown(e.key)) {
        this.keyState[e.key.toLowerCase()] = PRESSED
      }
    })
    window.addEventListener('keyup', (e) => {
      if(!this.keyUp(e.key)) {
        this.keyState[e.key.toLowerCase()] = RELEASED
      }
    })
  }

  public update(): void {

    // keyboard
    Object.keys(this.keyState).forEach(key => {
      if(this.keyState[key] === PRESSED) {
        if(this.justPressed.includes(key)) {
          this.keyState[key] = DOWN;
          this.justPressed.splice(this.justPressed.indexOf(key), 1);
        } else {
          this.justPressed.push(key);
        }
      }
      if(this.keyState[key] === RELEASED) {
        if(this.justReleased.includes(key)) {
          this.keyState[key] = UP;
          this.justReleased.splice(this.justReleased.indexOf(key), 1);
        } else {
          this.justReleased.push(key);
        }
      }
    })

    this.prevMouseStateX = this.mouseStateX;
    this.prevMouseStateY = this.mouseStateY;
  }

  public keyDown(key: string): boolean {
    return this.keyState[key.toLowerCase()] === DOWN || this.keyState[key.toLowerCase()] === PRESSED;
  }

  public keyUp(key: string): boolean {
    return !exists(this.keyState[key.toLowerCase()]) || this.keyState[key.toLowerCase()] === UP || this.keyState[key.toLowerCase()] === RELEASED;
  }

  public keyPressed(key: string): boolean {
    return this.keyState[key.toLowerCase()] === PRESSED;
  }

  public keyReleased(key: string): boolean {
    return this.keyState[key.toLowerCase()] === RELEASED;
  }

  public mouseX(): number {
    return this.mouseStateX;
  }

  public mouseDeltaX(): number {
    return this.mouseStateX - this.prevMouseStateX;
  }

  public mouseY(): number {
    return this.mouseStateY;
  }

  public mouseDeltaY(): number {
    return this.mouseStateY - this.prevMouseStateY;
  }

}

const inputInstance = new Input();

export default inputInstance;
