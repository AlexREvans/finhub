var parse = require('csv-parse')
var fs = require('fs')

var parseCsvFile = (data) => new Promise(resolve =>
    parse(data, {}, (err, csv) => resolve({ err, csv })))

var csvToTransactions = csv => {
    csv.shift();
    return csv.map(row => ({
        name: row[0],
        amount: row[1]
    }))
}

var csvFile = async function (data) {
    return csvToTransactions((await parseCsvFile(data)).csv)
}

module.exports = {
    csvFile
}