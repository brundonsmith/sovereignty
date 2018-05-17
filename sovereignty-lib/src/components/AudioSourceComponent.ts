import { PositionalAudio, AudioLoader } from 'three';
import { } from 'cannon';

import { exists } from 'utils';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Component from 'components/Component';

export default class AudioSourceComponent extends Component {

  public static get properties() {
    return {
      audioPath: "string",
      autoplay: [ "boolean", null ],
      loop: [ "boolean", null ],
      refDistance: [ "number", null ],
      rolloffFactor: [ "number", null ],
      distanceModel: [ "string", null ],
      maxDistance: [ "number", null ]
    }
  }

  public threePositionalAudio: PositionalAudio;

  private audioPath: string;
  private playing: boolean = true;
  private looping: boolean = false;
  private refDistance: number;
  private rolloffFactor: number;
  private distanceModel: string;
  private maxDistance: number;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    this.audioPath = config.audioPath;
    this.playing = config.autoplay;
    this.looping = config.loop;
    this.refDistance = config.refDistance;
    this.rolloffFactor = config.rolloffFactor;
    this.distanceModel = config.distanceModel;
    this.maxDistance = config.maxDistance;
  }

  public initialize(scene: Scene): void {
    let listener = this.gameObject.scene.activeListener;
    this.threePositionalAudio = new PositionalAudio(listener);
    this.transform.threeGroup.add(this.threePositionalAudio);
    
    this.threePositionalAudio.setLoop(this.looping);
    if(exists(this.refDistance)) {
      this.threePositionalAudio.setRefDistance(this.refDistance);
    }
    if(exists(this.rolloffFactor)) {
      this.threePositionalAudio.setRolloffFactor(this.rolloffFactor);
    }
    if(exists(this.distanceModel)) {
      //@ts-ignore
      this.threePositionalAudio.setDistanceModel(this.distanceModel);
    }
    if(exists(this.maxDistance)) {
      this.threePositionalAudio.setMaxDistance(this.maxDistance);
    }

    new AudioLoader().load(this.audioPath, (buffer) => {
      this.threePositionalAudio.setBuffer(buffer);

      if(this.playing) {
        this.threePositionalAudio.play();
      }
    }, () => {}, () => {});
  }
}
