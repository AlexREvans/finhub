var list = () => [
    { source: 'A', name: 'B', amount: 3},
    { source: 'A', name: 'B', amount: 3},
    { source: 'A', name: 'B', amount: 3},
    { source: 'A', name: 'B', amount: 3}
]

var toggleExample = (transactionId, isExample) => transactionId

var insertTransactions = transactions =>
    db(conn => transactions
        .map(trans => `insert into transaction(id) values (${trans.amount});`)
        .forEach(stmnt => conn.query(stmnt, {},
            (err) => console.log(
                (!!err ? '[FAIL]' : '[ OK ]') + ' ' + stmnt + (!!err ? ' (' + err + ')' : '')
            ))))

module.exports = {
    list,
    insertTransactions,
    toggleExample
}