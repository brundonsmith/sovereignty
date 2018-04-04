import { ipcRenderer } from 'electron';

import Game from './Game';
import Component from './Component';

var game;
ipcRenderer.once('configuration', (event, configuration) => {
	console.log(configuration);
	game = new Game(configuration);
	game.start();
});


export { Game, Component };
