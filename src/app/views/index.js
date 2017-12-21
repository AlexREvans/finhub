var express = require('express');
var router = express.Router();

var sunburst = require('./d3/sunburst.js')
var bars = require('./d3/barChart.js')

var transactionApi = require('../api/transaction')

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Express',
    transactions: transactionApi.list()
  })

});

module.exports = router;
