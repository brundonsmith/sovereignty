//@ts-ignore
import { Shape, World } from 'cannon';

import Component from '../Component';

export default class ColliderComponent extends Component {

  public cannonShape: Shape;

}
