module.exports = function() {
return "\
var bogart = require('bogart') \n\
   , router = bogart.router() \n\
   , path   = require('path') \n\
   , mysql  = require('mysql') \n\
   , util   = require('./lib/util').Util \n\
   , settings = require('./config/settings').Settings \n\
   , fs = require('fs');\n\
\n\
var dbSettings = require('./config/settings').Settings.db; \n\
var connection = mysql.createConnection(dbSettings); \n\
 \n\
var viewEngine = bogart.viewEngine('mustache', path.join(__dirname, 'views')); \n\
 \n\
var app = bogart.app(); \n\
 \n\
app.use(function (nextApp) { \n\
  return function (req) { \n\
    req.env = Object.create(req.env); \n\
    return nextApp(req); \n\
  } \n\
}); \n\
 \n\
require('./lib/controllers'); \n\
//require('./lib/accessors')  uncomment this line if you want to use accessors \n\
 \n\
app.use(bogart.batteries); //Life is better with batteries \n\
 \n\
app.use(router); // Our router \n\
 \n\
var server = app.start({ port:1337 });"
}