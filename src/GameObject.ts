import { Scene } from 'three';

import Game from './Game';
import Component from './Component';

export default class GameObject {

  private components: Array<Component> = [];

  constructor(config: {[key: string]: any}) {
    Object.entries(config.components).forEach(entry => {
      var componentConstructor = Game.componentTypes.find(type => type.name === entry[0] || type.name === entry[0] + 'Component')
      if(componentConstructor) {
        this.components.push(new componentConstructor(entry[1]));
      }
    })

    console.log(this.components)
  }

  public createComponent(config: {[key: string]: any}): Component {
    var newComponent = new Component(config);
    this.components.push(newComponent);
    return newComponent;
  }

  public start(scene: Scene): void {
    console.log('GameObject.start()')
    this.components.forEach(component => component.start(scene));
  }

  public update(timeDelta: number): void {
    this.components.forEach(component => component.update(timeDelta));
  }

  // https://github.com/Microsoft/TypeScript/issues/5236
  public getComponent(type: typeof Component): Component | undefined {
    return this.components.find(component => component instanceof type);
  }
}
