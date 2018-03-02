var data = require('./data')
var classify = require('../classification')
var { csvFile } = require('./upload')

const reclassify = async function() {
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

const upload = async function(source, fileData) {

    const transactions = (await csvFile(fileData))
        .map(trans => ({...trans, source}))

    data.insertTransactions(transactions)
    return reclassify();
} 

const setTagAndReclassify = async function(transactionId, tag) {

    await data.setTag(transactionId, tag)
  
    
    return reclassify();
}

module.exports = {
    list: data.list,
    upload,
    setTagAndReclassify: setTagAndReclassify,
    add: async function (trans) {return data.insertTransactions([trans])}
}