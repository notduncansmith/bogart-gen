module.exports = function (modelName) {
      
	return {
      dependencies: "var mysql = require('mysql') \n \
  , uuid  = require('uuid') \n \
  , bogart = require('bogart') \n \
  , util   = require('../util').Util \n \
  , Repository = require('./repo'); \n\n",

      extend: "exports.Accessor = Repository.extend({\n",

      get: "  get: function (" + modelName + "Id){ \n \
    var sql = 'select * from " + modelName + " where id = ?';\n \
    return this.query(sql, [" + modelName + "Id]);\n \
  },\n\n",

      set: "  set: function (" + modelName + ") { \n \
    insertSql = 'insert into " + modelName + " set ?, lastModifiedAt=UTC_TIMESTAMP(), createdAt=UTC_TIMESTAMP();'; \n \
    updateSql = 'update " + modelName + " set ?, lastModifiedAt=UTC_TIMESTAMP() where id=?;'; \n \
    if (" + modelName + ".id === undefined || " + modelName + ".id === null) { \n \
      " + modelName + ".id = uuid();\n \
      return this.query(insertSql, [" + modelName + "]); \n \
    } \n \
        \n \
    return this.query(updateSql, [" + modelName + ", " + modelName + ".id]); \n \
  },\n\n",

      list: "  list: function (" + modelName + ") { \n \
    sql = 'select * from " + modelName + ";';\n \
    return this.query(sql, " + modelName + ")\n \
  },\n\n",

      del: "  del: function (" + modelName + "Id) { \n \
    sql = 'delete from " + modelName + " where id = ?'; \n \
    return this.query(sql, " + modelName + "Id); \n \
  },\n\n",

      search: "  search: function (searchOptions, limit) {\n \
    var countSql = 'select count(1) as cnt from " + modelName + "';\n \
\n \
    searchOptions = searchOptions || {};\n \
    return this.query(countSql, []).then(function (cntResults) {\n \
      var pagingQuery = '';\n \
      searchOptions.sort = searchOptions.sort || 'title';\n \
      if (searchOptions.sort.indexOf('At') > 0){\n \
        searchOptions.sort += ' desc';\n \
      }\n \
      var queryParams = [];\n \
\n \
      if (searchOptions.limit){ \n \
        searchOptions.skip = searchOptions.skip || 0;\n \
        pagingQuery += ' limit ?, ?'\n \
        queryParams.push(searchOptions.skip);\n \
        queryParams.push(searchOptions.limit);          \n \
      }\n \
  \n \
      var sql = 'select * from " + modelName + " order by ' + searchOptions.sort + pagingQuery;\n \
  \n \
      return this.query(sql, queryParams).then(function (results) {\n \
        var start = (searchOptions.skip === 0 && results.length ===0) ? 0 : (searchOptions.skip === 0 ? 1 :searchOptions.skip+1) ;\n \
        var end = searchOptions.skip + results.length;\n \
        return { start: start, end: end, pageSize: searchOptions.limit, count: cntResults[0].cnt, results: results };\n \
      });\n \
    }.bind(this));\n \
  }",
    extendClose: "\n}",
    lite: "var Repository = require('./repo'); \n \
\n \
exports." + modelName + "Accessor = Repository.extend({\n \
\n \
  get: function (" + modelName + "Id){ \n \
  },\n \
\n \
  set: function (" + modelName + ") { \n \
  },\n \
\n \
  list: function (" + modelName + ") { \n \
  },\n \
\n \
  del: function (" + modelName + "Id) { \n \
  }\n\n \
}"
    }
}