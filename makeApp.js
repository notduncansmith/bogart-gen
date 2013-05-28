var fs = require('fs')
  , colors = require('colors')
  , templater = require('./templates/app')
  , path = require('path');

function touch (filePath) {
  fs.writeFile(filePath, "");
}

exports.AppMaker = {
  make: function (appName, lite, curdir) {
    var template = templater(appName);

    fs.mkdir(path.join(curdir, appName), function (err) {
      if (err) {
        console.log("Problem generating app directory".yellow);
        throw err;
      }

      //Generate app files
      fs.writeFile(path.join(curdir, appName, 'app.js'), template.app)
      touch(path.join(curdir, appName, 'package.json'));

      if (!lite){
        touch(path.join(curdir, appName, 'Readme.md'));
        fs.writeFile(path.join(curdir, appName, 'package.json'), template.pack);
      }

      //Generate lib directory
      fs.mkdir(path.join(curdir, appName, 'lib'), function (err) {
        if (err) {
          console.log("Problem generating lib directory".yellow);
          throw err;
        }
        fs.mkdir(path.join(curdir, appName, 'lib', 'apis'));
        fs.mkdir(path.join(curdir, appName, 'lib', 'repositories'));
        fs.mkdir(path.join(curdir, appName, 'lib', 'routers'));
        fs.mkdir(path.join(curdir, appName, 'lib', 'views'));
        fs.writeFile(path.join(curdir, appName, 'lib', 'util.js'), template.util);
        fs.writeFile(path.join(curdir, appName, 'lib', 'routers', 'middleware.js'), template.middleware);
        touch(path.join(curdir, appName, 'lib', 'views', 'layout.html'));

        if (!lite) {
          fs.writeFile(path.join(curdir, appName, 'lib', 'views', 'layout.html'), template.layout);
          fs.writeFile(path.join(curdir, appName, 'lib', 'routers', 'hello.js'), template.hello);
          fs.writeFile(path.join(curdir, appName, 'lib', 'routers', 'static-content.js'), template.staticContent);
        }
      });

      if (!lite){
        //Generate db folder
        fs.mkdir(path.join(curdir, appName, 'db'), function (err){
          if (err) {
            console.log("Problem generating db directory".yellow);
            throw err;
          }
          fs.mkdir(path.join(curdir, appName, 'db', 'migrations'));

          if(!lite){
            touch(path.join(curdir, appName, 'db', 'schema.sql'));
          }
        });
      }

      //Generate config folder
      fs.mkdir(path.join(curdir, appName, 'config'), function (err){
        if (err) {
          console.log("Problem generating config directory".yellow);
          throw err;
        }

        touch(path.join(curdir, appName, 'config', 'settings.js'));
        
        if (!lite) {
          fs.writeFile(path.join(curdir, appName, 'config', 'settings.js'), template.settings);
        }
      });

      //Generate public folder
      fs.mkdir(path.join(curdir, appName, 'public'), function (err){
        if (err) {
          console.log("Problem generating public directory".yellow);
          throw err;
        }

        fs.mkdir(path.join(curdir, appName, 'public', 'javascripts'));
        fs.mkdir(path.join(curdir, appName, 'public', 'stylesheets'));
        fs.mkdir(path.join(curdir, appName, 'public', 'images'));
      });
    });
  }
}
