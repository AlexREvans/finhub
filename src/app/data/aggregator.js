var rawData = require('./finhub.js');
var levenshtein = require('fast-levenshtein');

var examples = rawData.examples;

var similarityPercentage = (a,b) => {
    var longest = Math.max(a.length, b.length);
    var distance = levenshtein.get(a, b);
    return Math.floor((longest - distance) * 100 / longest);
};

var constructResult = (example, similarity, transaction) => ({
    tag: example.class,
    matchingExample: {example, similarity},
    transaction
});

var findClosestExample = (examples, transaction, threshold = 10) => examples
    .map(example => ({
        example, 
        similarity: similarityPercentage(example.name, transaction.name)
    }))
    .reduce(
        (a, b) => (a.similarity > b.similarity ? a : b), 
        {example: null, similarity: threshold});


var results = rawData.transactions.map(transaction => {

    if(transaction.example) {
        return constructResult(
            transaction, 
            100, 
            transaction);
    }

    var closestExample = findClosestExample(examples, transaction);
    
    return constructResult(
        closestExample.example, 
        closestExample.similarity, 
        transaction);
});

module.exports = results;