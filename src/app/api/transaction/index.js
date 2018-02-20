var data = require('./data')
var { csvFile } = require('./upload')

var setExample = transactionId => data.toggleExample(transactionId, true)
var removeExample = transactionId => data.toggleExample(transactionId, false)

module.exports = {
    list: data.list,
    upload: csvFile,
    setExample,
    removeExample,
    add: trans => data.insertTransactions([trans])
}