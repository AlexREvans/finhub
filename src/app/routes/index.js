var express = require('express');
var router = express.Router();

var sunburst = require('../views/d3/sunburst.js')
var bars = require('../views/d3/barChart.js')
var sunburstData = require('../data/sunburst.js')

/* GET home page. */
router.get('/', function(req, res, next) {

  sunburstData("Transactions", sunburstData => res.render('index', { title: 'Express', svgstuff: sunburst(sunburstData) }))

  
});

module.exports = router;
