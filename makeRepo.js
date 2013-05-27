var fs = require('fs')
  , colors = require('colors');

exports.RepoMaker = {
	make: function (modelName, lite) {
    var genString = "";

    var template = {
      dependencies: "var mysql = require('mysql') \n \
\t, uuid  = require('uuid') \n \
\t, bogart = require('bogart') \n \
\t, util   = require('../util').Util \n \
\t, Repository = require('./repo'); \n\n",

      extend: "exports." + modelName + "Repository = Repository.extend({\n",

      get: "\tget: function(" + modelName + "Id){ \n \
\t\tvar get" + modelName + "Sql = 'select * from " + modelName + " where id = ?';\n \
\t\treturn query(this, [" + modelName + "Id]);\n \
\t},\n\n",

      set: "\tset: function (" + modelName + ") { \n \
\t\tinsertSql = 'insert into ' + " + modelName + " + 'set ?, lastModifiedAt=UTC_TIMESTAMP(), createdAt=UTC_TIMESTAMP();'; \n \
\t\tupdateSql = 'update ' + " + modelName + " + ' set ?, lastModifiedAt=UTC_TIMESTAMP() where id=?;'; \n \
\t\tif (" + modelName + ".id === undefined || " + modelName + ".id === null) { \n \
\t\t\t" + modelName + ".id = uuid();\n \
\t\t\treturn this.query(insertSql, [" + modelName + "]); \n \
\t\t} \n \
        \n \
\t\treturn this.query(updateSql, [" + modelName + ", " + modelName + ".id]); \n \
\t},\n\n",

      list: "\tlist: function (" + modelName + ") { \n \
\t\tsql = 'select * from " + modelName + ";';\n \
\t\treturn this.query(sql, " + modelName + ")\n \
\t},\n\n",

      del: "\tdel: function (" + modelName + "Id) { \n \
\t\tsql = 'delete from " + modelName + " where id = ?'; \n \
\t\treturn this.query(sql, " + modelName + "Id); \n \
\t},\n\n",

      search: "\tsearch: function (searchOptions, limit) {\n \
\t\tvar countSql = 'select count(1) as cnt from " + modelName + "';\n \
\n \
\t\tsearchOptions = searchOptions || {};\n \
\t\treturn this.query(countSql, []).then(function (cntResults) {\n \
\t\t\tvar pagingQuery = '';\n \
\t\t\tsearchOptions.sort = searchOptions.sort || 'title';\n \
\t\t\tif (searchOptions.sort.indexOf('At') > 0){\n \
\t\t\t\tsearchOptions.sort += ' desc';\n \
\t\t\t}\n \
\t\t\tvar queryParams = [];\n \
\n \
\t\t\tif (searchOptions.limit){ \n \
\t\t\t\tsearchOptions.skip = searchOptions.skip || 0;\n \
\t\t\t\tpagingQuery += ' limit ?, ?'\n \
\t\t\t\tqueryParams.push(searchOptions.skip);\n \
\t\t\t\tqueryParams.push(searchOptions.limit);          \n \
\t\t\t}\n \
\t\n \
\t\t\tvar sql = 'select * from " + modelName + " order by ' + searchOptions.sort + pagingQuery;\n \
\t\n \
\t\t\treturn this.query(sql, queryParams).then(function (results) {\n \
\t\t\t\tvar start = (searchOptions.skip === 0 && results.length ===0) ? 0 : (searchOptions.skip === 0 ? 1 :searchOptions.skip+1) ;\n \
\t\t\t\tvar end = searchOptions.skip + results.length;\n \
\t\t\t\treturn { start: start, end: end, pageSize: searchOptions.limit, count: cntResults[0].cnt, results: results };\n \
\t\t\t});\n \
\t\t}.bind(this));\n \
\t}",
    extendClose: "\n}",
    lite: "var Repository = require('./repo'); \n \
\n \
exports." + modelName + "Repository = Repository.extend({\n \
\n \
\tget: function(" + modelName + "Id){ \n \
\t},\n \
\n \
\tset: function (" + modelName + ") { \n \
\t},\n \
\n \
\tlist: function (" + modelName + ") { \n \
\t},\n \
\n \
\tdel: function (" + modelName + "Id) { \n \
\t}\n \
\n}"
    }


    if(lite){
      genString = template.lite;
    } else {
      genString = template.dependencies + template.extend;
      genString += template.get + template.set + template.list + template.del + template.search;
      genString += template.extendClose;
    }
    
    if (!fs.stat(__dirname + '/lib'))
    {
      console.log('lib directory not found, creating...'.yellow)
      fs.mkdir('lib', function (er) {
        if (!fs.stat('lib/repositories')){
          console.log('lib/repositories directory not found, creating...'.yellow)
          fs.mkdir('lib/repositories', function (error){
            fs.writeFile('lib/repositories/' + modelName + 'Repo.js', genString, function (err) {
              if (err) {
                console.log("Error".red + " generating " + modelName + " Repo:\n\n" + err)
                throw err;
              }
              
              console.log(modelName.green + " Repo successfully generated!".green)
            })
          })
        } else {
          fs.writeFile('lib/repositories/' + modelName + 'Repo.js', genString, function (err) {
            if (err) {
              console.log("Error".red + " generating " + modelName + " Repo:\n\n" + err)
              throw err;
            }
            
            console.log(modelName.green + " Repo successfully generated!".green)
          })
        }
      })
    } else {
        if (!fs.stat('lib/repositories')){
          console.log('lib/repositories directory not found, creating...'.yellow)
          fs.mkdir('lib/repositories', function (error){
            fs.writeFile('lib/repositories/' + modelName + 'Repo.js', genString, function (err) {
              if (err) {
                console.log("Error".red + " generating " + modelName + " Repo:\n\n" + err)
                throw err;
              }
              
              console.log(modelName.green + " Repo successfully generated!".green)
            })
          })
        } else {
          fs.writeFile('lib/repositories/' + modelName + 'Repo.js', genString, function (err) {
            if (err) {
              console.log("Error".red + " generating " + modelName + " Repo:\n\n" + err)
              throw err;
            }
            
            console.log(modelName.green + " Repo successfully generated!".green)
          })
        }
    }
	}
}