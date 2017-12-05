var groupTransactionsByTag = transactions => transactions
    .reduce((tbt, transaction) => {
        tbt[transaction.tag] = (tbt[transaction.tag] || [])
            .concat(transaction);
        return tbt;
    }, {})

module.exports = {
    groupTransactionsByTag
}