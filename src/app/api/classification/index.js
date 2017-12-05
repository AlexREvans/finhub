var { findClosestExample } = require('./similarity')
var { updateTransactions } = require('./data')

var Classification = (transaction, example, similarity) => ({
    tag: example.class,
    matchingExample: { example, similarity },
    transaction
});

var classify = transaction => {
    if (transaction.example) {
        return Classification(
            transaction,
            transaction,
            100);
    }

    var closestExample = findClosestExample(transaction, examples);

    return Classification(
        transaction,
        closestExample.example,
        closestExample.similarity);
};

var classifyTransactions = (transactions, examples) => transactions
    .map(classify)
    .map(updateTransactions)

module.exports = {
    classifyTransactions
}