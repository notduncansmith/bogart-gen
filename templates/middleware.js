module.exports = function() {
	return "\
	var bogart = require('bogart') \n \
  , q = bogart.q \n \
  , path = require('path'); \n \
\n \
function intercept(pathPattern, nextApp) { \n \
	return function(req){ \n \
		if(!pathPattern.test(req.pathInfo)) { //Make sure you intercept the correct request(s) \n \
			return nextApp(req); \n \
		} \n \
\n \
		//Do middleware-y stuff here \n \
\n \
		return nextApp(req); \n \
	}		 \n \
} \n \
\n \
module.exports = intercept;";
}