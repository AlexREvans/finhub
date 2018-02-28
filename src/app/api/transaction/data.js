var db = require('../database')


var list = async function () {
    let { err, res } = await db.query("select * from transaction")

    return res.map(row => ({
        source: row.source,
        name: row.transaction_name,
        amount: row.amount,
        tag: row.tag,
        id: row.id
    }))
}

var setTags = async function (transactions) {
    let { err, res } = await db.queryBatch(
        "update transaction set tag = ? where id = ?",
        transactions.map(trans => [trans.tag, trans.id])
    )
}

var setTag = async function (transactionId, tag) {
    return await setTags([{ id: transactionId, tag: tag }])
}

var insertTransactions = async function (transactions) {

    const stmnt = "insert into transaction(source, transaction_name, amount) values (?, ?, ?)"

    let { err, res } = await db.queryBatch(
        stmnt,
        transactions.map(trans => [trans.source, trans.name, trans.amount])
    )
}

module.exports = {
    list,
    insertTransactions,
    setTag,
    setTags
}