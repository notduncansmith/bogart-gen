module.exports = function(appName) {
	return '\
{ \n \
  "name": "' + appName + '", \n \
  "version": "0.0.0", \n \
  "author": "", \n \
  "email": "", \n \
  "main": "./app.js", \n \
  "dependencies": { \n \
      "jsgi": ">=v0.2.2", \n \
      "mysql": "=2.0.0-alpha7", \n \
      "bogart": ">0.0.0", \n \
      "mustache": "0.3.1-dev", \n \
      "uuid" : "=1.4.0", \n \
      "underscore": ">0.0.0", \n \
      "qs" : "=0.5.6", \n \
      "repository": ">=0.1.0", \n \
  }, \n \
\n \
  "devDependencies": { \n \
  }, \n \
  "bin":{ \n \
  } \n \
}'
}