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

var queryBatch = (str, args) => {

    if(args.length === 0) {
        return new Promise (resolve => resolve({}))
    }

    const query = args.map(arg => mysql.format(str, arg)).join(";")

    console.log('[DB] ' + query)

    return new Promise(resolve =>
        connConsumer(connection => connection.query(query, (err, res) => {
            const status = !!err ? '[FAIL]' : '[ OK ]'
            console.log('[DB] ' + status + ' ' + err)
            resolve({ err, res })
        }))
    )
}

var query = (str, args) => queryBatch(str, [args])

module.exports = {
    query, queryBatch
}
