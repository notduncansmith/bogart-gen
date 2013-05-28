module.exports = function() {
	return "\
var bogart = require('bogart')\n \
   , path = require('path')\n \
   , settings = require('../../config/settings');\n \
\n \
module.exports = function (router, viewEngine) {\n \
  router = router || bogart.router();\n \
  \n \
  router.get('^/' + 'public' + '/(.*?)$', function(req){\n \
    var absPath = path.join(__dirname, 'public', req.params.splat[0]);\n \
    return bogart.file(absPath);\n \
  });\n \
\n \
  router.get(new RegExp('^/' + settings.fileUploadPath + '/(.*?)$'), function(req) {\n \
    var absPath = path.join(__dirname, settings.fileUploadPath, req.params.splat[0]);\n \
    return bogart.file(absPath);\n \
  });\n \
}"
}