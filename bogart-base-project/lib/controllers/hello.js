var bogart = require('bogart');
 
 module.exports = function (router, viewEngine, connection) {
   router = router || bogart.router();
 
   router.get('/', function (req) {
     return 'Hello World'
   });
 }