var express = require('express')
var router = express.Router()

var sunburst = require('./d3/sunburst.js')
var transactionApi = require('../api/transaction')
var report = require('../api/report')

const renderTransactions = (res, transactions) => {
  const transByTag = report.groupTransactionsByTag(transactions)

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

  renderTransactions(res, await transactionApi.setTagAndReclassify(transactionId, tag))
})

module.exports = router;
