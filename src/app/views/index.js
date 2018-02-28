var express = require('express')
var router = express.Router()

var sunburst = require('./d3/sunburst.js')

var transactionApi = require('../api/transaction')
var classificationApi = require('../api/classification')

var report = require('../api/report')

const renderTransactions = (res, transactions) => {
  const transByTag = report.groupTransactionsByTag(transactions)

  console.log("Group transactions")
  console.log(JSON.stringify(transByTag, null, 2))

  res.render('index', {
    title: 'Express',
    transactions: transactions,
    sunburstTransByTag: sunburst(transByTag)
  })
}


router.get('/', async function (req, res, next) {
  renderTransactions(res, await transactionApi.list())
})

router.get('/create', async function (req, res, next) {

  var { name, amount, source } = req.query

  await transactionApi.add({
    name, amount, source
  })

  renderTransactions(res, await transactionApi.list())
})

router.get('/tag', async function (req, res, next) {

  var { transactionId, tag } = req.query

  await transactionApi.setTag(transactionId, tag)
  const transactions = await transactionApi.list()

  const classifiedTransactions =
    classificationApi.classifyTransactions(transactions)
      .map(classified => ({ ...classified.transaction, tag: classified.tag }))

  renderTransactions(res, classifiedTransactions)

  const transactionsToUpdate = classifiedTransactions
    .filter(classification => classification.tag !== classification.transaction.tag)

  transactionApi.updateTags(classifiedTransactions)
})

module.exports = router;
