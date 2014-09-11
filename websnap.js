#!/usr/bin/env node

var os = require('os')
  , fs = require('fs')
  , util = require('util')
  , path = require('path')
  , mktemp = require('mktemp')
  , webshot = require('webshot')
  , program = require('commander')
  , errors = []

program
.version(require(path.resolve('package.json')).version)
.usage('[options] <output>')
.option('-u, --url <url>', 'url')
.option('-o, --output <path>', 'image output path')
.parse(process.argv);

if (!program.url)
  errors.push(process.argv[0] + ': option -u, --url required');
if (!program.output && !program.binary)
  errors.push(process.argv[0] + ': option -o, --output required');

if (0 < errors.length) {
  console.log(errors.join('\n'));
  process.exit(1);
}

webshot(program.url, program.output, {
  phantomPath: path.join(__dirname, 'bin', 'phantomjs-' + os.platform()),
  phantomConfig: {'ssl-protocol': 'any'}
}, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});

