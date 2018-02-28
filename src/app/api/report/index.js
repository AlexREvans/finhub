var groupTransactionsByTag = transactions => transactions
    .reduce((tbt, transaction) => {

        var tag = transaction.tag || "UNCLASSIFIED"

        tbt[tag] = (tbt[tag] || [])
            .concat(transaction);
        return tbt;
    }, {})

module.exports = {
    groupTransactionsByTag
}