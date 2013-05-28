module.exports = function() {
	return "\
exports.Settings = { \n \
  db : { \n \
    host     : 'localhost', \n \
    database : 'db', //replace this with the name of your database \n \
    user     : 'user', \n \
    password : 'password', \n \
    timezone : 'Z', \n \
    multipleStatements: true, \n \
    debug    : true  /* DEVELOPMENT ONLY */ \n \
  }, \n \
  fileUploadPath: 'uploads' \n \
}"
}