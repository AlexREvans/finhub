var data = require('./data')
var classify = require('../classification')
var { csvFile } = require('./upload')

const setTagAndReclassify = async function(transactionId, tag) {

    await data.setTag(transactionId, tag)
    const transactions = await data.list()
  
    const classifiedTransactions =
      classify.classifyTransactions(transactions)
        .map(classified => ({ ...classified.transaction, tag: classified.tag, 
          updated: classified.transaction.tag !== classified.tag }))
  
    const transactionsToUpdate = classifiedTransactions
      .filter(classification => classification.updated)
  
    data.setTags(classifiedTransactions)

    return classifiedTransactions;
}

module.exports = {
    list: data.list,
    upload: csvFile,
    setTagAndReclassify: setTagAndReclassify,
    add: async function (trans) {return data.insertTransactions([trans])}
}