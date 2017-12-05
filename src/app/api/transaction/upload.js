var parse = require('csv-parse')
var fs = require('fs')
var { insertTransactions } = require('./data')

var parseCsvFile = (fileName, dataCallback) =>
    fs.readFile(fileName, 'utf8', (err, data) =>
        parse(data, {}, (err, transactions) =>
            dataCallback(!!err ? [] : transactions)))

var csvToTransactions = csv => {
    csv.shift();
    return csv.map(row => ({
        source: 'C',
        name: row[3],
        amount: row[2].substring(1, row[2].length) * 1
    }))
}

// var transactions = [
//     { source: 'A', name: 'B', amount: 10, class: 'C', example: true},
//     { source: 'A', name: 'B', amount: 3}
// ]

var csvFile = (fileName, transactionsConsumer) =>
    parseCsvFile(fileName, data => {
        var transactions = csvToTransactions(data)
        transactionsConsumer(insertTransactions(transactions))
    })

module.exports = {
    csvFile
}