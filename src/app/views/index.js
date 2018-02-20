var express = require('express')
var router = express.Router()

var sunburst = require('./d3/sunburst.js')
var bars = require('./d3/barChart.js')

var transactionApi = require('../api/transaction')

/* GET home page. */
router.get('/', function (req, res, next) {

  transactionApi.list(transactions => 
    res.render('index', {
      title: 'Express',
      transactions: transactions
    }))

})

router.get('/create', function (req, res, next) {

  var {name, amount, source} = req.query

    transactionApi.add({
      name, amount, source
    })
    
    transactionApi.list(transactions => 
      res.render('index', {
        title: 'Express',
        transactions: transactions
      }))

  })
  

module.exports = router;
