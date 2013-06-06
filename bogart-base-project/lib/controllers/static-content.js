var bogart = require('bogart')
    , path = require('path')
    , settings = require('../../config/settings');
 
 module.exports = function (router, viewEngine) {
   router = router || bogart.router();
   
   router.get('^/' + 'public' + '/(.*?)$', function(req){
     var absPath = path.join(__dirname, 'public', req.params.splat[0]);
     return bogart.file(absPath);
   });
 
   router.get(new RegExp('^/' + settings.fileUploadPath + '/(.*?)$'), function(req) {
     var absPath = path.join(__dirname, settings.fileUploadPath, req.params.splat[0]);
     return bogart.file(absPath);
   });
 }