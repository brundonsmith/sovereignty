
import THREE from 'three';
import CANNON from 'cannon';

export default class Vector3 extends THREE.Vector3 {

  private readonly cannon: CANNON.Vec3 = new CANNON.Vec3();

  public get x() {
    return this.cannon.x;
  }
  public set x(val) {
    this.cannon.x = val;
  }
  public get y() {
    return this.cannon.y;
  }
  public set y(val) {
    this.cannon.y = val;
  }
  public get z() {
    return this.cannon.z;
  }
  public set z(val) {
    this.cannon.z = val;
  }

  public get cannonVec3(): CANNON.Vec3 {
    var copy = new CANNON.Vec3();
    copy.copy(this.cannon);
    return copy;
  }

  constructor(...params) {
    super(...params);
  }
}
