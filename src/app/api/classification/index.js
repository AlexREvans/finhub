var { findClosestExample } = require('./similarity')

var Classification = (transaction, example, similarity) => ({
    tag: example.tag,
    matchingExample: { example, similarity },
    transaction
});

var classify = (transaction, examples) => {
    if (transaction.tag) {
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

var classifyTransactions = (transactions) => {

    const examples = transactions.filter(trans => trans.tag)
    const classifications = transactions.map(trans => classify(trans, examples))

    return classifications
}

module.exports = {
    classifyTransactions
}