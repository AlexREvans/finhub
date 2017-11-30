var express = require('express');
var router = express.Router();

var barChart = require('../views/d3/barChart.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', svgstuff: barChart(50) });
});

module.exports = router;
