import { PositionalAudio } from 'three';
import { } from 'cannon';

import { } from '../utils';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class AudioSourceComponent extends Component {

  public threePositionalAudio: PositionalAudio;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

  }

  public update(timeDelta: number) {
    /* TODO
    if(exists(Game.activeScene.activeCamera)) {
      this.threePositionalAudio = new PositionalAudio(Game.activeScene.activeCamera);
      this.transform.threeGroup.add(this.threePositionalAudio);
    }*/
  }

}
