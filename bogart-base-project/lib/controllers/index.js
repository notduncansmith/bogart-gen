module.exports = function (router, viewEngine, connection) {
	require('../controllers/hello')(router, viewEngine, connection);
}