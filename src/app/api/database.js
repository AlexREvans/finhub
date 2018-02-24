var mysql = require('mysql')
var env = require('../env')

var config = {
    host: 'db',
    user: 'root',
    password: env.db.password,
    database: env.db.database,
    multipleStatements: true
}

var connConsumer = function (connectionConsumer) {
    var connection = mysql.createConnection(config);
    connection.connect()
    connectionConsumer(connection)
    connection.end()
} 
connConsumer.format = mysql.format

module.exports = connConsumer
