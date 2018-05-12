import { AudioListener } from 'three';
import { } from 'cannon';

import GameObject from 'GameObject';
import Component from 'components/Component';
import CameraComponent from 'components/CameraComponent';

export default class AudioListenerComponent extends Component {

  public threeAudioListener: AudioListener;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.threeAudioListener = new AudioListener();
    (<CameraComponent>this.gameObject.getComponent(CameraComponent)).threeCamera.add(this.threeAudioListener);
  }

}
