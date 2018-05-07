import * as THREE from 'three';
import * as CANNON from 'cannon';

export function deepMerge(obj1, obj2) {
  if(Array.isArray(obj1) && Array.isArray(obj2)) {
    return obj1.concat(obj2);
  } else if(typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 && obj2) {
    var newObj = {};
    Object.keys(obj1).concat(Object.keys(obj2))
      .filter((key, index, arr) => arr.indexOf(key) === index)
      .forEach(key => {
        newObj[key] = deepMerge(obj1[key], obj2[key])
      })
    return newObj;
  } else {
    if(typeof obj2 !== 'undefined') {
      return obj2;
    } else {
      return obj1;
    }
  }
}

export function exists(val) {
  return typeof val !== 'undefined' && val !== null;
}

export function toCannonVector(vector: THREE.Vector3): CANNON.Vec3 {
  if(exists(vector)) {
    return new CANNON.Vec3(vector.x, vector.y, vector.z);
  } else {
    return vector;
  }
}

export function toThreeVector(vector: CANNON.Vec3): THREE.Vector3 {
  if(exists(vector)) {
    return new THREE.Vector3(vector.x, vector.y, vector.z);
  } else {
    return vector;
  }
}

export function toCannonQuaternion(quaternion: THREE.Quaternion): CANNON.Quaternion {
  if(exists(quaternion)) {
    return new CANNON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  } else {
    return quaternion;
  }
}

export function toThreeQuaternion(quaternion: CANNON.Quaternion): THREE.Quaternion {
  if(exists(quaternion)) {
    return new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  } else {
    return quaternion;
  }
}

(<any>window).toCannonVector = toCannonVector;
