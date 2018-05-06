#!/usr/bin/env node
const build = require('./index.js');
var argv = require('minimist')(process.argv.slice(2));

console.assert(argv.projectDir);

var targets = [];
var possibleTargets = [ 'linux', 'win32', 'darwin', 'mas', 'all' ]
Object.keys(argv).forEach(key => {
  if(argv[key] === true) {
    if(possibleTargets.includes(key)) {
      targets.push(key);
    }

    switch(key) {
      case 'windows':
        targets.push('win32')
        break;
      case 'osx':
      case 'mac':
      case 'macos':
        targets.push('mas')
        break;
    }
  }
})

if(argv.projectDir) {
  build(argv.projectDir, argv.outputDir, targets);
}
