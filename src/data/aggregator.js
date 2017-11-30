var rawData = require('./finhub.js');
var levenshtein = require('fast-levenshtein');

var examples = rawData.examples;
var threshold = 10;

var similarityPercentage = (a,b) => {
    var longest = Math.max(a.length, b.length);
    var distance = levenshtein.get(a, b);
    return Math.floor((longest - distance) * 100 / longest);
};


var results = rawData.transactions.map(transaction => {

    if(transaction.example) {
        return {
            tag: transaction.class,
            matchingExample: {example: transaction, similarity: 100},
            transaction
        };
    }

    var closestExample = examples
        .map(example => ({
            example, 
            similarity: similarityPercentage(example.name, transaction.name)
        }))
        .reduce(
            (a, b) => (a.similarity > b.similarity ? a : b), 
            {example: null, similarity: threshold});

    return {
        tag: closestExample.example.class, 
        matchingExample: closestExample,
        transaction: transaction
    };
});

module.exports = results;