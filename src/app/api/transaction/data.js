var db = require('../database')

var list = (resultConsumer) => db(conn =>
    conn.query(
        "select * from transaction;", {},
        (err, rows) => {

            insertTransactions([{
                source: 'Test', name: 'Test name', amount: Math.random()
            }])

            resultConsumer(rows.map(row => ({
                source: row.source, 
                name: row.transaction_name, 
                amount: row.amount
            })))
        }))

var toggleExample = (transactionId, isExample) => transactionId

var insertTransactions = transactions =>
    db(conn => transactions
        .map(trans => `insert into transaction(source, transaction_name, amount) values ('${trans.source}', '${trans.name}', ${trans.amount});`)
        .forEach(stmnt => conn.query(stmnt, {},
            (err) => console.log(
                (!!err ? '[FAIL]' : '[ OK ]') + ' ' + stmnt + (!!err ? ' (' + err + ')' : '')
            ))))

module.exports = {
    list,
    insertTransactions,
    toggleExample
}