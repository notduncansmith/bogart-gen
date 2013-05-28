module.exports = function() {
return "\
var bogart = require('bogart') \n \
  , router = bogart.router() \n \
  , path   = require('path') \n
  , mysql  = require('mysql') \n \
  , util   = require('./lib/util').Util \n \
  , settings = require('./config/settings').Settings \n \
  , fs = require('fs') \n \
  , routes = require('./lib/routers'); \n \
 \n \
var dbSettings = require('./config/settings').Settings.db; \n \
var connection = mysql.createConnection(dbSettings); \n \
 \n \
var viewEngine = bogart.viewEngine('mustache', path.join(__dirname, 'views')); \n \
 \n \
var app = bogart.app(); \n \
 \n \
app.use(function (nextApp) { \n \
  return function (req) { \n \
    req.env = Object.create(req.env); \n \
    return nextApp(req); \n \
  } \n \
}); \n \
 \n \
//Bring in the routes \n \
fs.readdirSync('./lib/routers').forEach(function(file) { \n \
  require('./lib/routers/' + file); \n \
}); \n \
 \n \
fs.readdirSync('./lib/apis').forEach(function(file) { \n \
  require('./lib/apis/' + file); \n \
}); \n \
 \n \
app.use(bogart.batteries); //Life is better with batteries \n \
 \n \
app.use(router); // Our router \n \
 \n \
var server = app.start({ port:8077 });"
}