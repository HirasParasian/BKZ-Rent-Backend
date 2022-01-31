const db = require("../helpers/db")

exports.readHistory = (cb) => {
    db.query("SELECT * FROM history", (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.searchHistory = (history_id, cb) => {
    db.query("SELECT * FROM history WHERE history_id=?", [history_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.createHistory = (data,cb) => {
    db.query("INSERT INTO history SET ?",[data], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.updateHistory = ( data, history_id, cb) => {
    db.query("UPDATE history SET ? WHERE  history_id=?", [data, history_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.deleteHistory = (history_id, cb) => {
    db.query("DELETE FROM history WHERE history_id=?", [history_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}