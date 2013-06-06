#!/usr/bin/env node
var fs = require('fs')
  , accessor = require('./makeAccessor').AccessorMaker
  , controller = require('./makeController').ControllerMaker
  , app = require('./makeApp').AppMaker
  , program = require ('commander');

program
  .version('0.0.1')
  .option('-a, --accessor <modelName>', 'Generate a Repository for a model', String)
  .option('-c, --controller <modelName>', 'Generate an API for a model', String)
  .option('-l, --lite', 'Generate in "lite" mode (structure only, function content is not written for you)');

program
  .command('generate [options]')
  .description('Scaffold a Controller or Repository')
  .action(function(){
    if (program.accessor) {
      if (program.lite) {
        accessor.make(program.accessor, true);
      } else {
        accessor.make(program.accessor);
      }
    }

    if (program.controller) {
      if (program.lite) {
        controller.make(program.controller, true);
      } else {
        controller.make(program.controller);
      }
    }
  });

program
  .command('new')
  .description('Scaffold a new Bogart app')
  .action(function(){
    app.make(process.argv[3]);
  });

program.parse(process.argv);