module.exports = function (modelName) {
      
	return {
      dependencies: "var  bogart = require('bogart'); \n\n",
      exports: "module.exports = function(router, viewEngine, connection) { \n",
      controllerInit: "  var a = require('../accessors/" + modelName + "').Accessor(connection); \n\n\n",
      list: "  router.get('/" + modelName + "/all', function(req){ \n \
    return a.list().then(function(results){ \n \
      return bogart.json(results); \n \
    }); \n \
  }); \n\n",
      get: "  router.get('/" + modelName + "/:id', function(req){ \n \
 \n \
    return a.get(req.params.id, true).then(function(result){ \n \
      if (result) { \n \
        return bogart.json(result); \n \
      } else { \n \
        return bogart.json({}, { status: 404 }); //item not found. \n \
      } \n \
    }); \n \
  }); \n\n",
      set: "  router.post('/" + modelName + "', function(req){ \n \
    return a.set(req.params).then(function(result){ \n \
      return bogart.json(result); \n \
    }); \n \
  }); \n\n",
      del: "  router.del('/" + modelName + "', function(req){     \n \
    return a.del(req.params.ids.split(',')).then(function(result){ \n \
      return bogart.json({success:true, message:'" + modelName + "s (' + result.names.join(',') + ') deleted successfully', names:result.names}) \n \
    }, \n \
    function(err){ \n \
      return bogart.json({success:false, message:'An unexpected error occurred:' + err}, 500); \n \
    }); \n \
  }); \n",
      exportClose: "}",
      lite: "var bogart = require('bogart'); \n \
 \n \
module.exports = function(router, connection) { \n \
  router.get('/" + modelName + "', function(req){ \n \
    return 'Hello from the " + modelName + " controller!' \n \
  }); \n \
}"
    }
}