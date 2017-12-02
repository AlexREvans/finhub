var parse = require('csv-parse')
var fs = require('fs')

var parseCsvFile = (fileName, dataCallback) =>
    fs.readFile(fileName, 'utf8', (err, data) => {
        parse(data, {}, (err, transactions) => {

            console.log(JSON.stringify(transactions, null, 2))

            dataCallback(transactions)
        })
    })

module.exports = function (transactionsConsumer) {
    parseCsvFile("/data/all.csv", csv => csv.shift() && transactionsConsumer(csv.map(row => ({
        source: 'C',
        name: row[3],
        amount: row[2].substring(1, row[2].length) * 1
    }))))
}