var ncp = require('ncp').ncp;
const path = require('path');

import { exists } from '../library/utils';
import { Game } from '../library';

var game;
import(process.env.PROJECT_ENTRY)
	.then(config => {
		game = new Game(config);

		if(exists(config.game.assetsDir)) {
			var assetsDir = path.resolve(__dirname, process.env.PROJECT_ENTRY, config.game.assetsDir)
			ncp(assetsDir, path.resolve(__dirname, config.game.assetsDir), function (err) {
				if (err) {
				  return console.error(err);
				} else {
					console.log('Assets copied');
					game.start(document.body);
				}
			});
		} else {
			game.start(document.body);
		}
	})
