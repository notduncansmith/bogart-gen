var fs = require('fs')
  , colors = require('colors')
  , templater = require('./templates/controller')
  , s = require('scrivener');

exports.ControllerMaker = {
	make: function (modelName, lite) {
    var genString = "";
    var template = templater(modelName);

    if (lite) {
      genString = template.lite;
    } else {
      genString = template.dependencies + template.exports + template.controllerInit;
      genString += template.get + template.set + template.list + template.del;
      genString += template.exportClose;
    }

    s.write(['lib', 'controllers', modelName + '.js'], genString, function () {
      var file = s.readFile(['lib', 'controllers', 'index.js']);
      console.log(file);
      file = file.substring(0, file.length - 1) + "  require('../controllers/" + modelName + "')(router, viewEngine, connection);\n}"
	    s.write(['lib', 'controllers', 'index.js'], file, function () {
        console.log("Successfully generated ".green + modelName + " controller");
      });
    });
  }
}
