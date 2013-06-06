var dir = process.cwd()
  , path = require('path')
  , ncp = require('ncp')
  , fs = require('fs');

exports.AppMaker = {
  make: function (appName) {
    ncp.limit = 16

    ncp(path.join(__dirname, './bogart-base-project'), path.join(dir, appName), function (err) {
      if (err) {
        console.log("Unable to generate app " + appName);
        console.log(err);
        throw err;
      }
      console.log("Successfully generated " + appName)
    })
  }
}