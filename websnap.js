#!/usr/bin/env node

var os = require('os')
  , fs = require('fs')
  , path = require('path')
  , webshot = require('webshot')
  , program = require('commander')
  , errors = []
  , width = 1024
  , height = 768

program
.version(require(path.resolve('package.json')).version)
.usage('[options] <output>')
.option('-u, --url <url>', 'url')
.option('-o, --output <path>', 'image output path')
.option('--width <width>', 'width')
.option('--height <height>', 'height')

.parse(process.argv);

if (!program.url)
  errors.push(process.argv[0] + ': option -u, --url required');
if (!program.output && !program.binary)
  errors.push(process.argv[0] + ': option -o, --output required');
if (program.width)
  width = program.width
if (program.height)
  height = program.height

if (0 < errors.length) {
  console.log(errors.join('\n'));
  process.exit(1);
}

webshot(program.url, program.output, {
  phantomPath: path.join(__dirname, 'bin', 'phantomjs-' + os.platform()),
  phantomConfig: {'ssl-protocol': 'any'},
  screenSize: {
    width: width,
    height: height
  }
}, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});

