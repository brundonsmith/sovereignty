import { Game } from '../library';

var game;
import(process.env.PROJECT_ENTRY)
	.then(config => {
		game = new Game(config);
		game.start(document.body);
	})
