var fs = require('fs')
  , colors = require('colors')
  , templater = require('./templates/app')
  , path = require('path');

function touch (filePath) {
  fs.writeFile(filePath, "");
}

exports.ApiMaker = {
  make: function (modelName, lite) {
    var template = templater(appName);

    fs.mkdir(path.join(__dirname, appName), function (err) {
      if (err) {
        console.log("Problem generating app directory".yellow);
        throw err;
      }

      //Generate app files
      fs.writeFile(path.join(__dirname, appName, 'app.js'), template.app.appjs)
      touch(path.join(__dirname, appName, 'package.json'));

      if (!lite){
        touch(path.join(__dirname, appName, 'Readme.md'));
        fs.writeFile(path.join(__dirname, appName, 'package.json'), template.app.pack);
      }

      //Generate lib directory
      fs.mkdir(path.join(__dirname, appName, 'lib'), function (err) {
        if (err) {
          console.log("Problem generating lib directory".yellow);
          throw err;
        }
        fs.mkdir(path.join(__dirname, appName, 'lib', 'apis'));
        fs.mkdir(path.join(__dirname, appName, 'lib', 'repositories'));
        fs.mkdir(path.join(__dirname, appName, 'lib', 'routers'));
        fs.mkdir(path.join(__dirname, appName, 'lib', 'views'));
        fs.writeFile(path.join(__dirname, appName, 'lib', 'util.js'), template.app.util);
        fs.writeFile(path.join(__dirname, appName, 'lib', 'routers', 'middleware.js'), template.app.middleware);
        touch(path.join(__dirname, appName, 'lib', 'views', 'layout.html'));

        if (!lite) {
          fs.writeFile(path.join(__dirname, appName, 'lib', 'views', 'layout.html'), template.app.layout);
          fs.writeFile(path.join(__dirname, appName, 'lib', 'routers', 'hello.js'), template.app.hello);
          fs.writeFile(path.join(__dirname, appName, 'lib', 'routers', 'static-content.js'), template.app.staticContent);
        }
      });

      if (!lite){
        //Generate db folder
        fs.mkdir(path.join(__dirname, appName, 'db'), function (err){
          if (err) {
            console.log("Problem generating db directory".yellow);
            throw err;
          }
          fs.mkdir(path.join(__dirname, appName, 'db', 'migrations'));

          if(!lite){
            touch(path.join(__dirname, appName, 'db', 'schema.sql'));
          }
        });
      }

      //Generate config folder
      fs.mkdir(path.join(__dirname, appName, 'config'), function (err){
        if (err) {
          console.log("Problem generating config directory".yellow);
          throw err;
        }

        touch(path.join(__dirname, appName, 'config', 'settings.js'));
        
        if (!lite) {
          fs.writeFile(path.join(__dirname, appName, 'config', 'settings.js'), template.app.settings);
        }
      });

      //Generate public folder
      fs.mkdir(path.join(__dirname, appName, 'public'), function (err){
        if (err) {
          console.log("Problem generating public directory".yellow);
          throw err;
        }

        fs.mkdir(path.join(__dirname, appName, 'public', 'javascripts'));
        fs.mkdir(path.join(__dirname, appName, 'public', 'stylesheets'));
        fs.mkdir(path.join(__dirname, appName, 'public', 'images'));
      });
    });
  }
}
