var settings = require('../templates/settings')()
  , util = require('../templates/util')()
  , middleware = require('../templates/middleware')()
  , hello = require('../templates/hello')()
  , appjs = require('../templates/appjs')()
  , pack = require('../templates/pack')
  , staticContent = require('../templates/static-content')()
  , controller = require('../templates/controllerIndex')()
  , accessor = require('../templates/accessorIndex')();

module.exports = function (appName) {
	return {
    util: util,
    middleware: middleware,
    settings: settings,
    app: appjs,
    pack: pack(appName),
    staticContent: staticContent,
    hello: hello,
    controller: controller,
    accessor: accessor
  }
}
