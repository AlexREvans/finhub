var levenshtein = require('fast-levenshtein');

var similarityPercentage = (a, b) => {
    var longest = Math.max(a.length, b.length);
    var distance = levenshtein.get(a, b);
    return Math.floor((longest - distance) * 100 / longest);
};

var findClosestExample = (transaction, examples, threshold = 40) => examples
    .map(example => ({
        example,
        similarity: similarityPercentage(example.name, transaction.name)
    }))
    .reduce(
    (a, b) => (a.similarity > b.similarity ? a : b),
    { example: { tag: 'UNCLASSIFIED' }, similarity: threshold });


module.exports = {
    findClosestExample
}