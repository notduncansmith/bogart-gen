module.exports = function() {
	return "var bogart = require('bogart')\n \
  , _  = require('underscore')\n \
  , fs = require('fs')\n \
\n \
exports.Util = {\n \
  ensureAndEliminateParams: function(obj, params){\n \
    obj = eliminateParams(obj, params);\n \
    return ensureParams(obj, params);\n \
  },\n \
  ensureParams:function(obj, params){\n \
    var deferred = bogart.q.defer();\n \
    var missingParams = [];\n \
    _.each(params, function(param){\n \
      if (!obj[param]){\n \
        missingParams.push(param);\n \
      }\n \
    })\n \
    if (missingParams.length > 0){\n \
      return deferred.reject(missingParams);\n \
    }\n \
    return deferred.resolve();\n \
  },\n \
  removeEmptyParams: function(object){\n \
    var deferred = bogart.q.defer();\n \
    for(var key in object) {\n \
      if(object[key] == undefined) {\n \
        delete object[key]\n \
      }\n \
    }\n \
    return object;\n \
  },\n \
  eliminateParams:function(obj, params) {\n \
    obj = _.extend({}, obj);\n \
    for (var key in obj){\n \
      if (!_.contains(params, key)){\n \
        delete obj[key];\n \
      }\n \
    }\n \
    return obj;\n \
  }\n \
  ,getDate: function(input){\n \
    return input.getMonth() + '/' + input.getDate() + '/' + input.getFullYear();\n \
  }\n \
  ,getTime: function(input){\n \
    return input.toTimeString();\n \
  }\n \
  ,query: function(sql, parameters, connection){\n \
    try {\n \
      var deferred = bogart.q.defer();\n \
\n \
      connection.query(sql, parameters, function(err,result){\n \
        if (err){ \n \
          return deferred.reject(err)\n \
        }\n \
        deferred.resolve(result);            \n \
      });\n \
      \n \
      return deferred.promise;\n \
    } catch (err) {\n \
      return bogart.q.reject(err);\n \
    }\n \
  }\n \
  ,update: function(sql, parameters, connection, id){\n \
    try {\n \
      console.log('update');\n \
      var deferred = bogart.q.defer();\n \
      console.log(parameters.map(function(param){\n \
        return param.toString();\n \
      }))\n \
      connection.query(sql, parameters, function(err,result){\n \
        if (err){ \n \
          return deferred.reject(err)\n \
        }\n \
        deferred.resolve(id);            \n \
      });\n \
\n \
      return deferred.promise;\n \
    } catch (err) {\n \
      console.log('util update err', err);\n \
      return bogart.q.reject(err);\n \
    }\n \
  }\n \
  ,uploadFile: function(oldPath, newPath){    \n \
    var renamer = bogart.promisify(fs.rename);\n \
    return renamer(oldPath, newPath);\n \
  }\n \
}"
}