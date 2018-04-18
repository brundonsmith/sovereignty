#!/usr/bin/env node
const build = require('./index.js');
var argv = require('minimist')(process.argv.slice(2));

console.assert(argv.projectDir);

if(argv.projectDir) {
  build(argv.projectDir, argv.outputDir);
}
