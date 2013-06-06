module.exports = {
  return "var Repository = require('repository')\n\
  , mysql = require('mysql')\n\
  , defaultSettings = require('../../settings').Settings.db;\n\
\n\
function extend(ctorProto) {\n\
  var ctor = Repository.extend(ctorProto);\n\
\n\
  return function (connection) {\n\
    if (!connection) {\n\
      connection = mysql.createConnection(defaultSettings);\n\
    }\n\
\n\
    return ctor(connection);\n\
  };\n\
}\n\

exports.extend = extend;";
}