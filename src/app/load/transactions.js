var parse = require('csv-parse')
var fs = require('fs')
var db = require('../db/database')


var parseCsvFile = (fileName, dataCallback) =>
    fs.readFile(fileName, 'utf8', (err, data) => {
        parse(data, {}, (err, transactions) => {

            console.log(JSON.stringify(transactions, null, 2))

            dataCallback(transactions)
        })
    })

var csvToTransactions = csv => {
    csv.shift();
    return csv.map(row => ({
        source: 'C',
        name: row[3],
        amount: row[2].substring(1, row[2].length) * 1
    }))
}


var transactionInsertStatement

var insertTransactions = transactions =>
    db(conn => transactions
        .map(trans => `insert into transaction(id) values (${trans.amount});`)
        .forEach(stmnt => conn.query(stmnt, {}, 
            (err) => console.log(
                (!!err ? '[FAIL]' : '[ OK ]') + ' ' + stmnt + (!!err ? ' (' + err +')': '')
            ))))


module.exports = function (transactionsConsumer) {
    parseCsvFile("/data/all.csv", data => {
        var transactions = csvToTransactions(data)
        insertTransactions(transactions)
        transactionsConsumer(transactions)
    })
}