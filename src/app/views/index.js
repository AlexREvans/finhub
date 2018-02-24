var express = require('express')
var router = express.Router()

var sunburst = require('./d3/sunburst.js')
var bars = require('./d3/barChart.js')

var transactionApi = require('../api/transaction')

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

  transactionApi.setTag(transactionId, tag, () => reloadList(res))

})


module.exports = router;
