var express = require('express')
var router = express.Router()

var sunburst = require('./d3/sunburst.js')
var bars = require('./d3/barChart.js')

var transactionApi = require('../api/transaction')
var classificationApi = require('../api/classification')

var reloadList = res =>
  transactionApi.list(transactions =>
    res.render('index', {
      title: 'Express',
      transactions: transactions
    }))

router.get('/', function (req, res, next) {
  reloadList(res)
})

router.get('/create', function (req, res, next) {

  var { name, amount, source } = req.query

  transactionApi.add({
    name, amount, source
  })

  reloadList(res)
})

router.get('/tag', function (req, res, next) {

  var { transactionId, tag } = req.query

  // TODO: Loading happens twice. Refactor.
  transactionApi.setTag(transactionId, tag, () =>
    transactionApi.list(transactions => {


      const classifiedTransactions =
        classificationApi.classifyTransactions(transactions)
        .map(classified => ({...classified.transaction, tag: classified.tag}))
    

      transactionApi.updateTags(classifiedTransactions, () => reloadList(res))

     } )
    )}

)


module.exports = router;
