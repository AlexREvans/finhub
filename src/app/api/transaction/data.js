var db = require('../database')

var list = (resultConsumer) => db(conn =>
    conn.query(
        "select * from transaction;", {},
        (err, rows) => {

            resultConsumer(rows.map(row => ({
                source: row.source,
                name: row.transaction_name,
                amount: row.amount,
                tag: row.tag,
                id: row.id
            })))
        }))

var setTag = (transactionId, tag, afterTagged) => db(conn => conn.query(
    "update transaction set tag = ? where id = ?;", [tag, transactionId],
    () => afterTagged()
))


var insertTransactions = transactions =>
    db(conn => transactions
        .forEach(trans => {
            var stmnt = "insert into transaction(source, transaction_name, amount) values (?, ?, ?);"
            conn.query(stmnt, [trans.source, trans.name, trans.amount],
                (err) => console.log(
                    (!!err ? '[FAIL]' : '[ OK ]') + ' ' + stmnt + (!!err ? ' (' + err + ')' : '')
                )
            )
        }))

module.exports = {
    list,
    insertTransactions,
    setTag
}