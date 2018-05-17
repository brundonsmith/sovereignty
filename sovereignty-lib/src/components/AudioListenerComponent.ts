import { AudioListener } from 'three';
import { } from 'cannon';

import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class AudioListenerComponent extends Component {

  public threeAudioListener: AudioListener;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.threeAudioListener = new AudioListener();
  }

  public initialize(scene: Scene): void {
    this.transform.threeGroup.add(this.threeAudioListener);
  }
}
