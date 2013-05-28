var fs = require('fs')
  , colors = require('colors')
  , templater = require('./templates/api')
  , path = require('path');

exports.ApiMaker = {
	make: function (modelName, lite, curdir) {
    var genString = "";
    var template = templater(modelName);

    if (lite) {
      genString = template.lite;
    } else {
      genString = template.dependencies + template.exports + template.APIInit;
      genString += template.get + template.set + template.list + template.del;
      genString += template.exportClose;
    }

    fs.writeFile(path.join(curdir, 'lib', 'apis', modelName + 'Api.js'), genString, function (err) {
      if (err) {
        console.log("Error generating " + modelName + " API:\n\n" + err);
        throw err;
      }

      console.log(modelName.green + " API successfully generated!".green);
	  });
  }
}
