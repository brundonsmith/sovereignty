import { Object3D, AnimationMixer, AnimationClip } from 'three';
import { } from 'cannon';
import * as THREE from 'three';
import 'three-plugins/LoaderSupport';
import 'three-plugins/OBJLoader2';
import 'three-plugins/GLTFLoader';

import { exists } from 'utils';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class ModelComponent extends Component {

  public static get properties() {
    return {
      model: "string",
      defaultAnimation: [ "string", null ],
    }
  }

  private modelPath: string;
  private defaultAnimation: string;

  private modelObject: Object3D;
  private animations: Array<AnimationClip> = new Array<AnimationClip>();
  private animationMixer: AnimationMixer;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.modelPath = config.model;
    this.defaultAnimation = config.defaultAnimation;
  }

  public initialize(scene: Scene): void {
    if(exists(this.modelPath)) {
      if(this.modelPath.includes('.obj')) {
        //@ts-ignore
        new THREE.OBJLoader2().load(this.modelPath, (e) => {
          this.setRootObject(e.detail.loaderRootNode);
        })
      } else if(this.modelPath.includes('.gltf')) {
        //@ts-ignore
        new THREE.GLTFLoader().load(this.modelPath, (e) => {
          console.log(e)
          this.animations = e.animations;
          this.setRootObject(e.scene);
        })
      }
    }
  }

  private setRootObject(object: Object3D): void {
    let realRootObject = object;
    if(realRootObject.children.length === 1) {
      realRootObject = realRootObject.children[0];
    }

    this.modelObject = realRootObject;
    this.transform.threeGroup.add(this.modelObject);

    this.animationMixer = new AnimationMixer(this.modelObject);

    if(exists(this.defaultAnimation)) {
      this.playAnimation(this.defaultAnimation);
    }
  }

  public playAnimation(name: string): void {
    let clip = this.animations.find(animation => animation.name === name);
    this.animationMixer.clipAction(clip).play();
  }

  public update(timeDelta: number): void {
    if(exists(this.animationMixer)) {
      this.animationMixer.update(timeDelta / 1000);
    }
  }

}
