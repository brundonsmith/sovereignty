import * as THREE from 'three';
import * as CANNON from 'cannon';

import Game from 'Game';
import Scene from 'Scene';
import GameObject from 'GameObject';
import Input from 'Input';

import components from 'components';
var componentsObject = components.reduce((obj, comp) => {
  obj[comp.name] = comp;
  return obj;
}, {})

Object.assign(<any>window, {
  THREE,
  CANNON,
  SOVEREIGNTY: {
    Game, Input, Scene, GameObject,
    ...componentsObject
  }
})
