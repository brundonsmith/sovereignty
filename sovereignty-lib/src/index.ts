import * as THREE from 'three';
import * as CANNON from 'cannon';

import Game from 'Game';
import Component from 'components/Component';
import Input from 'Input';

Object.assign(<any>window, { Game, Component, Input, THREE, CANNON })
export { Game, Component, Input };
