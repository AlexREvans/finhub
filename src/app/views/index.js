var express = require('express')
var router = express.Router()

var sunburst = require('./d3/sunburst.js')
var bars = require('./d3/barChart.js')

var transactionApi = require('../api/transaction')
var classificationApi = require('../api/classification')


const renderTransactions = (res, transactions) =>
  res.render('index', {
    title: 'Express',
    transactions: transactions
  });


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
