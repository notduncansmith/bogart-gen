var bogart = require('bogart')
   , _  = require('underscore')
   , fs = require('fs')
 
 exports.Util = {
   ensureAndEliminateParams: function(obj, params){
     obj = eliminateParams(obj, params);
     return ensureParams(obj, params);
   },
   ensureParams:function(obj, params){
     var deferred = bogart.q.defer();
     var missingParams = [];
     _.each(params, function(param){
       if (!obj[param]){
         missingParams.push(param);
       }
     })
     if (missingParams.length > 0){
       return deferred.reject(missingParams);
     }
     return deferred.resolve();
   },
   removeEmptyParams: function(object){
     var deferred = bogart.q.defer();
     for(var key in object) {
       if(object[key] == undefined) {
         delete object[key]
       }
     }
     return object;
   },
   eliminateParams:function(obj, params) {
     obj = _.extend({}, obj);
     for (var key in obj){
       if (!_.contains(params, key)){
         delete obj[key];
       }
     }
     return obj;
   }
   ,getDate: function(input){
     return input.getMonth() + '/' + input.getDate() + '/' + input.getFullYear();
   }
   ,getTime: function(input){
     return input.toTimeString();
   }
   ,query: function(sql, parameters, connection){
     try {
       var deferred = bogart.q.defer();
 
       connection.query(sql, parameters, function(err,result){
         if (err){ 
           return deferred.reject(err)
         }
         deferred.resolve(result);            
       });
       
       return deferred.promise;
     } catch (err) {
       return bogart.q.reject(err);
     }
   }
   ,update: function(sql, parameters, connection, id){
     try {
       console.log('update');
       var deferred = bogart.q.defer();
       console.log(parameters.map(function(param){
         return param.toString();
       }))
       connection.query(sql, parameters, function(err,result){
         if (err){ 
           return deferred.reject(err)
         }
         deferred.resolve(id);            
       });
 
       return deferred.promise;
     } catch (err) {
       console.log('util update err', err);
       return bogart.q.reject(err);
     }
   }
   ,uploadFile: function(oldPath, newPath){    
     var renamer = bogart.promisify(fs.rename);
     return renamer(oldPath, newPath);
   }
 }