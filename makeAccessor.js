var fs = require('fs')
  , colors = require('colors')
  , templater = require('./templates/accessor')
  , path = require('path')
  , s = require('scrivener');

exports.AccessorMaker = {
	make: function (modelName, lite) {
    var genString = ""
      , template = templater(modelName);


    if(lite){
      genString = template.lite;
    } else {
      genString = template.dependencies + template.extend;
      genString += template.get + template.set + template.list + template.del + template.search;
      genString += template.extendClose;
    }

    s.write(['lib', 'accessors', modelName + '.js'], genString, function () {
      var file = s.readFile(['lib', 'accessors', 'index.js']);
      file = file.substring(0, file.length - 1) + "  require('./lib/accessors/" + modelName + "').Accessor;\n}"
      s.write(['lib', 'accessors', 'index.js'], file, function () {
        console.log("Successfully generated ".green + modelName + " accessor");
      });
    });
	}
}