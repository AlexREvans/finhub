var aggregatedData = require('./aggregator.js');

module.exports = function (rootName) {

    var transactionsByTag = aggregatedData.reduce((tbt, classifiedTransaction) => {
        tbt[classifiedTransaction.tag] = (tbt[classifiedTransaction.tag] || [])
            .concat(classifiedTransaction.transaction);
        return tbt;
    }
        , {})


    var sunburst = {
        name: rootName,
        children: Object.keys(transactionsByTag).map(tag => ({
            name: tag,
            children: transactionsByTag[tag].map(transaction => ({
                name: transaction.name,
                value: transaction.amount
            }))
        }))
    }
    return sunburst;
};