import { Renderer, WebGLRenderer } from 'three';

import { exists } from './utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';

const DOWN = Symbol('down');
const UP = Symbol('up');
const PRESSED = Symbol('pressed');
const RELEASED = Symbol('released');

class Input {

  private mouseStateX: number = window.innerWidth / 2;
  private mouseStateY: number = window.innerHeight / 2;

  private mouseMovementX: number = window.innerWidth / 2;
  private mouseMovementY: number = window.innerHeight / 2;

  private keyState: {[key: string]: Symbol} = {};
  private justPressed: Array<string> = [];
  private justReleased: Array<string> = [];

  private mouseState: {[key: number]: Symbol} = {};
  private mouseJustPressed: Array<string> = [];
  private mouseJustReleased: Array<string> = [];

  constructor() {
    window.addEventListener('mousemove', (e) => {
      this.mouseStateX = e.clientX;
      this.mouseStateY = e.clientY;
      this.mouseMovementX = e.movementX;
      this.mouseMovementY = e.movementY;
    })
    window.addEventListener('mousedown', (e) => {
      if(!this.mouseButtonDown(e.button)) {
        this.mouseState[e.button] = PRESSED
      }
    })
    window.addEventListener('mouseup', (e) => {
      if(!this.mouseButtonUp(e.button)) {
        this.mouseState[e.button] = RELEASED
      }
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

    Object.keys(this.mouseState).forEach(button => {
      if(this.mouseState[button] === PRESSED) {
        if(this.mouseJustPressed.includes(button)) {
          this.mouseState[button] = DOWN;
          this.mouseJustPressed.splice(this.mouseJustPressed.indexOf(button), 1);
        } else {
          this.mouseJustPressed.push(button);
        }
      }
      if(this.mouseState[button] === RELEASED) {
        if(this.mouseJustReleased.includes(button)) {
          this.mouseState[button] = UP;
          this.mouseJustReleased.splice(this.mouseJustReleased.indexOf(button), 1);
        } else {
          this.mouseJustReleased.push(button);
        }
      }
    })

    this.mouseMovementX = 0;
    this.mouseMovementY = 0;
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
  public mouseY(): number {
    return this.mouseStateY;
  }
  public mouseDeltaX(): number {
    return this.mouseMovementX;
  }
  public mouseDeltaY(): number {
    return this.mouseMovementY;
  }

  public mouseButtonDown(button: number): boolean {
    return this.mouseState[button] === DOWN || this.mouseState[button] === PRESSED;
  }
  public mouseButtonUp(button: number): boolean {
    return !exists(this.mouseState[button]) || this.mouseState[button] === UP || this.mouseState[button] === RELEASED;
  }
  public mouseButtonPressed(button: number): boolean {
    return this.mouseState[button] === PRESSED;
  }
  public mouseButtonReleased(button: number): boolean {
    return this.mouseState[button] === RELEASED;
  }

}

const instance = new Input();

export default instance;
