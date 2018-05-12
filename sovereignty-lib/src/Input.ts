import { Renderer, WebGLRenderer } from 'three';

import { exists } from './utils';
import GameScene from 'GameScene';
import GameObject from 'GameObject';

const DOWN = Symbol('down');
const UP = Symbol('up');
const PRESSED = Symbol('pressed');
const RELEASED = Symbol('released');

const MOVED_DOWN = Symbol('moved_down');
const MOVED_UP = Symbol('moved_up');
const UNMOVED = Symbol('static');

function mouseButtonKey(button: number) {
  return `Mouse${button}`;
}
function gamepadButtonKey(button: number, gamepad: number) {
  return `Gamepad${gamepad}Button${button}`;
}
function gamepadAxisKey(axis: number, gamepad: number) {
  return `Gamepad${gamepad}Axis${axis}`;
}

class Input {

  private keyButtonState: {[key: string]: Symbol} = {};
  private nextKeyButtonState: {[key: string]: Symbol} = {};

  private mouseStateX: number = window.innerWidth / 2;
  private mouseStateY: number = window.innerHeight / 2;

  private mouseMovementX: number = window.innerWidth / 2;
  private mouseMovementY: number = window.innerHeight / 2;
  private nextMouseMovementX: number = window.innerWidth / 2;
  private nextMouseMovementY: number = window.innerHeight / 2;

  private mouseWheelState: Symbol = UNMOVED;
  private nextMouseWheelState: Symbol = UNMOVED;

  constructor() {
    window.addEventListener('mousemove', (e) => {
      this.mouseStateX = e.clientX;
      this.mouseStateY = e.clientY;
      this.nextMouseMovementX = e.movementX;
      this.nextMouseMovementY = e.movementY;
    })
    window.addEventListener('mousedown', (e) => {
      this.nextKeyButtonState['Mouse'+e.button] = PRESSED
    })
    window.addEventListener('mouseup', (e) => {
      this.nextKeyButtonState['Mouse'+e.button] = RELEASED
    })
    window.addEventListener('keydown', (e) => {
      if(!e.repeat) {
        this.nextKeyButtonState[e.code] = PRESSED
      }
    })
    window.addEventListener('keyup', (e) => {
      this.nextKeyButtonState[e.code] = RELEASED
    })
    window.addEventListener('wheel', (e) => {
      if(e.deltaY < 0) {
        this.nextMouseWheelState = MOVED_UP
      }
      if(e.deltaY > 0) {
        this.nextMouseWheelState = MOVED_DOWN
      }
    })
  }

  public update(): void {

    // move to "current" state
    Object.assign(this.keyButtonState, this.nextKeyButtonState);
    this.mouseMovementX = this.nextMouseMovementX;
    this.mouseMovementY = this.nextMouseMovementY;
    this.mouseWheelState = this.nextMouseWheelState;

    // clear next state
    this.nextKeyButtonState = {};
    this.nextMouseMovementX = 0;
    this.nextMouseMovementY = 0;
    this.nextMouseWheelState = UNMOVED;

    this.tick();
  }

  private tick(): void {

    // progress transient key/button states
    Object.keys(this.keyButtonState).forEach(key => {
      if(this.keyButtonState[key] === PRESSED) {
        this.nextKeyButtonState[key] = DOWN;
      }
      if(this.keyButtonState[key] === RELEASED) {
        this.nextKeyButtonState[key] = UP;
      }
    })

    Array.from(navigator.getGamepads()).forEach((gamepad, gamepadIndex) => {
      if(exists(gamepad)) {
        gamepad.buttons.forEach((button, buttonIndex) => {
          let buttonKey = gamepadButtonKey(buttonIndex, gamepadIndex);
          if(button.pressed && this.keyButtonState[buttonKey] !== DOWN) {
            this.nextKeyButtonState[buttonKey] = PRESSED;
          }
          if(!button.pressed && this.keyButtonState[buttonKey] !== UP) {
            this.nextKeyButtonState[buttonKey] = RELEASED;
          }
        })
      }
    })
  }

  public getGamepads(): Array<Gamepad> {
    return Array.from(navigator.getGamepads());
  }

  public keyDown(key: string): boolean {
    return this.keyButtonState[key] === DOWN || this.keyButtonState[key] === PRESSED;
  }
  public keyUp(key: string): boolean {
    return !exists(this.keyButtonState[key]) || this.keyButtonState[key] === UP || this.keyButtonState[key] === RELEASED;
  }
  public keyPressed(key: string): boolean {
    return this.keyButtonState[key] === PRESSED;
  }
  public keyReleased(key: string): boolean {
    return this.keyButtonState[key] === RELEASED;
  }

  public mouseButtonDown(button: number): boolean {
    return this.keyButtonState['Mouse'+button] === DOWN || this.keyButtonState['Mouse'+button] === PRESSED;
  }
  public mouseButtonUp(button: number): boolean {
    return !exists(this.keyButtonState['Mouse'+button]) || this.keyButtonState['Mouse'+button] === UP || this.keyButtonState['Mouse'+button] === RELEASED;
  }
  public mouseButtonPressed(button: number): boolean {
    return this.keyButtonState['Mouse'+button] === PRESSED;
  }
  public mouseButtonReleased(button: number): boolean {
    return this.keyButtonState['Mouse'+button] === RELEASED;
  }

  public gamepadButtonDown(button: number, gamepad: number | undefined): boolean {
    let gamepadObject = this.retrieveGamepad(gamepad);
    return gamepadObject.buttons[button].pressed;
  }
  public gamepadButtonUp(button: number, gamepad: number | undefined): boolean {
    let gamepadObject = this.retrieveGamepad(gamepad);
    return !gamepadObject.buttons[button].pressed;
  }
  public gamepadButtonPressed(button: number, gamepad: number | undefined): boolean {
    let gamepadObject = this.retrieveGamepad(gamepad);
    return this.keyButtonState[gamepadButtonKey(button, gamepadObject.index)] === PRESSED;
  }
  public gamepadButtonReleased(button: number, gamepad: number | undefined): boolean {
    let gamepadObject = this.retrieveGamepad(gamepad);
    return this.keyButtonState[gamepadButtonKey(button, gamepadObject.index)] === RELEASED;
  }
  public gamepadAxis(axis: number, gamepad: number | undefined): number {
    let gamepadObject = this.retrieveGamepad(gamepad);
    return gamepadObject.axes[axis];
  }

  private retrieveGamepad(gamepad: number | undefined): Gamepad {
    if(exists(gamepad)) {
      if(!exists(navigator.getGamepads()[gamepad])) {
        throw `Gamepad ${gamepad} isn't connected`
      } else {
        return navigator.getGamepads()[gamepad];
      }
    } else {
      if(!Array.from(navigator.getGamepads()).some(pad => exists(pad))) {
        throw `There are no gamepads connected`
      } else {
        return Array.from(navigator.getGamepads()).find(pad => exists(pad));
      }
    }
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

}

const inputInstance = new Input();

export default inputInstance;
