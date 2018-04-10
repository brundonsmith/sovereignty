const ncp = require('ncp').ncp;
const path = require('path');

import { exists } from '../library/utils';
import { Game } from '../library';

var game;
import(process.env.PROJECT_ENTRY)
	.then(config => {
		if(exists(config.game.assetsDir)) {
			var assetsDir = path.resolve(process.env.PROJECT_ENTRY, config.game.assetsDir)
			ncp(assetsDir, path.resolve(process.env.BUILD_DIR, config.game.assetsDir), function (err) {
				if (err) {
				  return console.error(err);
				} else {
					console.log('Assets copied');
					game = new Game(config);
					game.start(document.body);
				}
			});
		} else {
			game = new Game(config);
			game.start(document.body);
		}
	})
