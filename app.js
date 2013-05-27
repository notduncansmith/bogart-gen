var fs = require('fs')
  , repo = require('./makeRepo').RepoMaker
  , api = require('./makeApi').ApiMaker
  , program = require ('commander');

  program
  .version('0.0.1')
  .option('-r, --repo <modelName>', 'Generate a Repository for a model', String)
  .option('-a, --api <modelName>', 'Generate an API for a model', String)
  .option('-L, --lite', 'Generate in "Lite" mode (structure only, functions are not written for you)');

  program
    .command('generate [options]')
    .description('Scaffold an API or Repository (or both)')
    .action(function(){
      if (program.repo) {
        if (program.lite) {
          repo.make(program.repo, true);
        } else {
          repo.make(program.repo);
        }
      }

      if (program.api) {
        if (program.lite) {
          api.make(program.api, true);
        } else {
          api.make(program.api);
        }
      }
    });

  program.parse(process.argv);
