var express = require('express');
var router = express.Router();

var aggregatedData = require('../data/aggregator.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(aggregatedData));
});

module.exports = router;
