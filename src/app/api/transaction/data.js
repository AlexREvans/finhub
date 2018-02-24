var db = require('../database')

var query = async function (str, args) {
    return new Promise(resolve =>
        db(connection => connection.query(str, args, (err, res) => resolve({ err, res })))
    )
}

var list = async function () {
    let { err, res } = await query("select * from transaction;")

    return res.map(row => ({
        source: row.source,
        name: row.transaction_name,
        amount: row.amount,
        tag: row.tag,
        id: row.id
    }))
}

var setTags = (transactions, afterTagged) => {

    const batchUpdate = transactions.map(trans => db.format(
        "update transaction set tag = ? where id = ?",
        [trans.tag, trans.id])
    ).join(";")

    db(conn => conn.query(
        batchUpdate,
        (err, rows) => afterTagged()
    ))

}

var setTag = (transactionId, tag, afterTagged) =>
    setTags([{ id: transactionId, tag: tag }], afterTagged)

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
    setTag,
    setTags
}