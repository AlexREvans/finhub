var data = require('./data')
var classify = require('../classification')
var { csvFile } = require('./upload')

module.exports = {
    list: data.list,
    upload: csvFile,
    setTag: data.setTag,
    add: async function (trans) {return data.insertTransactions([trans])},
    updateTags: data.setTags
}