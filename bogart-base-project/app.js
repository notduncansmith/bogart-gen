var bogart = require('bogart') 
   , router = bogart.router() 
   , path   = require('path') 
   , mysql  = require('mysql') 
   , util   = require('./lib/util').Util 
   , settings = require('./config/settings').Settings 
   , fs = require('fs');

var dbSettings = require('./config/settings').Settings.db; 
var connection = mysql.createConnection(dbSettings); 
 
var viewEngine = bogart.viewEngine('mustache', path.join(__dirname, 'views')); 
 
var app = bogart.app(); 
 
app.use(function (nextApp) { 
  return function (req) { 
    req.env = Object.create(req.env); 
    return nextApp(req); 
  } 
}); 
 
require('./lib/controllers')(router, viewEngine, connection); 
//require('./lib/accessors')  uncomment this line if you want to use accessors 
 
app.use(bogart.batteries); //Life is better with batteries 
 
app.use(router); // Our router 
 
var server = app.start({ port:1337 });