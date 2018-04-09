import { Scene } from 'three';
//@ts-ignore
import { World } from 'cannon';

import { deepMerge } from './utils';

import Game from './Game';
import Component from './components/Component';
import TransformComponent from './components/TransformComponent';
import RigidbodyComponent from './components/RigidbodyComponent';
import ColliderComponent from './components/colliders/ColliderComponent';

export default class GameObject {

  public name: string;
  public components: Array<Component> = [];

  get transform(): TransformComponent {
    return <TransformComponent> this.getComponent(TransformComponent);
  }

  get rigidbody(): RigidbodyComponent {
    return <RigidbodyComponent> this.getComponent(RigidbodyComponent);
  }

  get collider(): ColliderComponent {
    return <ColliderComponent> this.getComponent(ColliderComponent);
  }

  constructor(config: {[key: string]: any}) {
    if(config.extends) {
      var prefab = Game.prefabs.find(prefab => prefab.name === config.extends);
      config = deepMerge(prefab, config);
    }

    this.name = config.name || 'Object';
    Object.entries(config.components || {}).forEach(entry => {
      var componentConstructor = Game.componentTypes.find(type => type.name === entry[0] || type.name === entry[0] + 'Component')

      if(componentConstructor) {
        this.components.push(new componentConstructor(entry[1], this));
      } else {
        console.warn(`Unknown component type "${entry[0]}"`)
      }
    })

    if(!this.components.some(component => component instanceof TransformComponent)) {
      this.components.push(new TransformComponent({}, this));
    }
  }

  public initialize(scene: Scene, world: World): void {
    this.components.forEach(component => component.initialize(scene, world));
  }

  public update(timeDelta: number): void {
    this.components.forEach(component => component.update(timeDelta));
  }

  public hasComponent(type: (typeof Component) | string): boolean {
    if(typeof type === 'string') {
      return this.components.some(component => component.constructor.name === type);
    } else {
      return this.components.some(component => component instanceof type);
    }
  }

  public getComponent(type: (typeof Component) | string): Component {
    var component;

    if(typeof type === 'string') {
      component = this.components.find(component => component.constructor.name === type);
      if(!component) {
        throw `Component on object "${this.name}" requires missing component "${type}"`;
      }
    } else {
      component = this.components.find(component => component instanceof type);
      if(!component) {
        throw `Component on object "${this.name}" requires missing component "${type.name}"`;
      }
    }

    return component;
  }
}
