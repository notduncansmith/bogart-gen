module.exports = function (modelName) {
      
	return {
      dependencies: "var  bogart = require('bogart'); \n\n",
      exports: "module.exports = function(router, connection) { \n",
      APIInit: "\tvar API = require('../apis/" + modelName + "API')." + modelName + "APIsitory(connection); \n\n\n",
      list: "\trouter.get('/api/" + modelName + "s', function(req){ \n \
\t\tvar options = {}; \n \
\t\toptions.limit = req.params.limit ? parseInt(req.params.limit) : 10; \n \
\t\toptions.skip = req.params.skip ? parseInt(req.params.skip) : 0; \n \
\t\toptions.sort = req.params.sort ? req.params.sort : undefined; \n \
 \n \
\t\treturn API.search(options).then(function(results){       \n \
\t\t\treturn bogart.json(results); \n \
\t\t}); \n \
\t}); \n\n",
      get: "\trouter.get('/api/" + modelName + "/:id', function(req){ \n \
 \n \
\t\treturn API.get(req.params.id, true).then(function(result){ \n \
\t\t\tif (result) { \n \
\t\t\t\treturn bogart.json(result); \n \
\t\t\t} else { \n \
\t\t\t\treturn bogart.json({}, { status: 404 }); //item not found. \n \
\t\t\t} \n \
\t\t}); \n \
\t}); \n\n",
      set: "\trouter.post('/api/" + modelName + "', function(req){ \n \
\t\treturn API.set(req.params).then(function(result){ \n \
\t\t\treturn bogart.json(result); \n \
\t\t}); \n \
\t}); \n\n",
      del: "\trouter.del('/api/" + modelName + "', function(req){     \n \
\t\treturn API.del(req.params.ids.split(',')).then(function(result){ \n \
\t\t\treturn bogart.json({success:true, message:'" + modelName + "s (' + result.names.join(',') + ') deleted successfully', names:result.names}) \n \
\t\t}, \n \
\t\tfunction(err){ \n \
\t\t\treturn bogart.json({success:false, message:'An unexpected error occurred:' + err}, 500); \n \
\t\t}); \n \
\t}); \n",
      exportClose: "}",
      lite: "var  bogart = require('bogart'); \n \
 \n \
module.exports = function(router, connection) { \n \
\trouter.get('/api/" + modelName + "s', function(req){ \n \
\t}); \n \
 \n \
\trouter.get('/api/" + modelName + "/:id', function(req){ \n \
\t}); \n \
 \n \
\trouter.post('/api/" + modelName + "', function(req){ \n \
\t}); \n \
 \n \
\trouter.del('/api/" + modelName + "', function(req){ \n \
\t}); \n \
}"
    }
}