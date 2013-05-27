var mysql = require('mysql') 
 	, uuid  = require('uuid') 
 	, bogart = require('bogart') 
 	, util   = require('../util').Util 
 	, Q      = bogart.q 
 	, q      = bogart.q 
 	, Repository = require('./repo'); 

exports.auctionRepository = Repository.extend({
	get: function(auctionId){ 
 		var getauctionSql = 'select * from auction where id = ?';
 		return query(this, [auctionId]);
 	},

	set: function (auction) { 
 		insertSql = 'insert into ' + auction + 'set ?, lastModifiedAt=UTC_TIMESTAMP(), createdAt=UTC_TIMESTAMP();'; 
 		updateSql = 'update ' + auction + ' set ?, lastModifiedAt=UTC_TIMESTAMP() where id=?;'; 
 		if (auction.id === undefined || auction.id === null) { 
 			auction.id = uuid();
 			return this.query(insertSql, [auction]); 
 		} 
         
 		return this.query(updateSql, [auction, auction.id]); 
 	},

	list: function (auction) { 
 		sql = 'select * from auction;';
 		return this.query(sql, auction)
 	},

	del: function (auctionId) { 
 		sql = 'delete from auction where id = ?'; 
 		return this.query(sql, auctionId); 
 	},

	search: function (searchOptions, limit) {
 		var countSql = 'select count(1) as cnt from auction';
 
 		searchOptions = searchOptions || {};
 		return this.query(countSql, []).then(function (cntResults) {
 			var pagingQuery = '';
 			searchOptions.sort = searchOptions.sort || 'title';
 			if (searchOptions.sort.indexOf('At') > 0){
 				searchOptions.sort += ' desc';
 			}
 			var queryParams = [];
 
 			if (searchOptions.limit){ 
 				searchOptions.skip = searchOptions.skip || 0;
 				pagingQuery += ' limit ?, ?'
 				queryParams.push(searchOptions.skip);
 				queryParams.push(searchOptions.limit);          
 			}
 	
 			var sql = 'select * from auction order by ' + searchOptions.sort + pagingQuery;
 	
 			return this.query(sql, queryParams).then(function (results) {
 				var start = (searchOptions.skip === 0 && results.length ===0) ? 0 : (searchOptions.skip === 0 ? 1 :searchOptions.skip+1) ;
 				var end = searchOptions.skip + results.length;
 				return { start: start, end: end, pageSize: searchOptions.limit, count: cntResults[0].cnt, results: results };
 			});
 		}.bind(this));
 	}
}