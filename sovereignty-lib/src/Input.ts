import { } from 'three';

import { exists } from './utils';

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

const xboxButtons = {
  'a': 0,
  'b': 1,
  'x': 2,
  'y': 3,
  'lb': 4,
  'rb': 5,
  'lt': 6,
  'rt': 7,
  'select': 8,
  'view': 8,
  'back': 8,
  'start': 9,
  'menu': 9,
  'l3': 10,
  'r3': 11,
  'up': 12,
  'down': 13,
  'left': 14,
  'right': 15
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
      this.nextKeyButtonState[mouseButtonKey(e.button)] = PRESSED
    })
    window.addEventListener('mouseup', (e) => {
      this.nextKeyButtonState[mouseButtonKey(e.button)] = RELEASED
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

  // public getters
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

  public getGamepads(): Array<Gamepad> {
    return Array.from(navigator.getGamepads());
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

  public xboxButtonDown(button: string, gamepad: number | undefined): boolean {
    if(!exists(xboxButtons[button.toLowerCase()])) {
      throw `"${button}" is not a known Xbox controller button`
    }
    return this.gamepadButtonDown(xboxButtons[button.toLowerCase()], gamepad);
  }
  public xboxButtonUp(button: string, gamepad: number | undefined): boolean {
    if(!exists(xboxButtons[button.toLowerCase()])) {
      throw `"${button}" is not a known Xbox controller button`
    }
    return this.gamepadButtonUp(xboxButtons[button.toLowerCase()], gamepad);
  }
  public xboxButtonPressed(button: string, gamepad: number | undefined): boolean {
    if(!exists(xboxButtons[button.toLowerCase()])) {
      throw `"${button}" is not a known Xbox controller button`
    }
    return this.gamepadButtonPressed(xboxButtons[button.toLowerCase()], gamepad);
  }
  public xboxButtonReleased(button: string, gamepad: number | undefined): boolean {
    if(!exists(xboxButtons[button.toLowerCase()])) {
      throw `"${button}" is not a known Xbox controller button`
    }
    return this.gamepadButtonReleased(xboxButtons[button.toLowerCase()], gamepad);
  }
  public xboxThumbstickLeft(gamepad: number | undefined): { x: number, y: number } {
    return {
      x: this.gamepadAxis(0, gamepad),
      y: this.gamepadAxis(1, gamepad)
    }
  }
  public xboxThumbstickRight(gamepad: number | undefined): { x: number, y: number } {
    return {
      x: this.gamepadAxis(2, gamepad),
      y: this.gamepadAxis(3, gamepad)
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
  public mouseWheelMovedUp() {
    return this.mouseWheelState === MOVED_UP;
  }
  public mouseWheelMovedDown() {
    return this.mouseWheelState === MOVED_DOWN;
  }
  public mouseWheelMoved() {
    return this.mouseWheelState !== UNMOVED;
  }

}

const instance = new Input();

export default instance;
