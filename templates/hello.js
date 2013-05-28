module.exports = function() {
	return "\
var bogart = require('bogart');\n \
\n \
module.exports = function (router, viewEngine) {\n \
  router = router || bogart.router();\n \
\n \
  router.get('/', function (req) {\n \
    return 'Hello World'\n \
  });\n \
}"
}