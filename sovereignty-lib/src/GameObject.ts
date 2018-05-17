import { } from 'three';
import { } from 'cannon';
import check from 'simple-typechecker';

import { exists, deepMerge } from './utils';
import Game from 'Game';
import Scene from 'Scene';
import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';
import RigidbodyComponent from 'components/RigidbodyComponent';
import ColliderComponent from 'components/colliders/ColliderComponent';

export default class GameObject {

  public static get properties() {
    return {
      name: "string",
      extends: [ "string", null ],
      components: [ {}, null ],
      children: [ [{}], null ]
    }
  }

  public scene: Scene;

  public name: string;
  public components: Array<Component> = [];
  public children: Array<GameObject> = [];


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

    // name
    this.name = config.name || 'Object';

    // components
    if(!Object.keys(config.components || {}).includes('Transform') && !Object.keys(config.components || {}).includes('TransformComponent')) {
      this.components.push(new TransformComponent({}, this));
    }
    Object.entries(config.components || {}).forEach(entry => {
      var componentConstructor = Game.componentTypes.find(type => type.name === entry[0] || type.name === entry[0] + 'Component')

      if(componentConstructor) {
        check(entry[1], componentConstructor.properties || {});
        this.components.push(new componentConstructor(entry[1], this));
      } else {
        console.warn(`Unknown component type "${entry[0]}"`);
      }
    });

    // children
    (config.children || []).forEach(childConfig => {
      var newGameObject = new GameObject(childConfig);
      this.transform.threeGroup.add(newGameObject.transform.threeGroup);
      this.children.push(newGameObject);
    });
  }

  public initialize(scene: Scene): void {
    this.scene = scene;
    this.components.forEach(component => component.initialize(scene));
    this.children.forEach(child => child.initialize(scene));
    scene.allGameObjects.push(this);
  }

  public update(timeDelta: number): void {
    this.components.forEach(component => component.update(timeDelta));
    this.children.forEach(child => child.update(timeDelta));
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

  public findComponentInChildren(type: (typeof Component)): Component | null {
    let component: Component | null = null;

    component = this.components.find(function(comp) {
      return comp instanceof type;
    });
    if(!exists(component)) {
      component = this.children.map(obj => obj.findComponentInChildren(type)).find(comp => exists(comp));
    }
    return component;
  }
}
