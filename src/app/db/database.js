var mysql = require('mysql')
var env = require('.././env')

var config = {
    host: 'db',
    user: 'root',
    password: env.db.password,
    database: env.db.database
}

module.exports = function (connectionConsumer) {
    var connection = mysql.createConnection(config);
    connection.connect()
    connectionConsumer(connection)
    connection.end()
} 
