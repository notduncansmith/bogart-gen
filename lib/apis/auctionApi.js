var  bogart = require('bogart'); 

module.exports = function(router, connection) { 
	var repo = require('../repositories/auctionRepo').auctionRepo(connection); 


	router.get('/api/auction/:id', function(req){ 
  
 		return repo.get(req.params.id, true).then(function(result){ 
 			if (result) { 
 				return bogart.json(result); 
 			} else { 
 				return bogart.json({}, { status: 404 }); //item not found. 
 			} 
 		}); 
 	}); 

	router.post('/api/auction', function(req){ 
 		return repo.set(req.params).then(function(result){ 
 			return bogart.json(result); 
 		}); 
 	}); 

	router.get('/api/auctions', function(req){ 
 		var options = {}; 
 		options.limit = req.params.limit ? parseInt(req.params.limit) : 10; 
 		options.skip = req.params.skip ? parseInt(req.params.skip) : 0; 
 		options.sort = req.params.sort ? req.params.sort : undefined; 
  
 		return repo.search(options).then(function(results){       
 			return bogart.json(results); 
 		}); 
 	}); 

	router.del('/api/auction', function(req){     
 		return repo.del(req.params.ids.split(',')).then(function(result){ 
 			return bogart.json({success:true, message:'auctions (' + result.names.join(',') + ') deleted successfully', names:result.names}) 
 		}, 
 		function(err){ 
 			return bogart.json({success:false, message:'An unexpected error occurred:' + err}, 500); 
 		}); 
 	}); 
}