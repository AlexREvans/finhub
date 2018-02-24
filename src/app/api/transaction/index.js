var data = require('./data')
var { csvFile } = require('./upload')

module.exports = {
    list: data.list,
    upload: csvFile,
    setTag: data.setTag,
    add: trans => data.insertTransactions([trans])
}