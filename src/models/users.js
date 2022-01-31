const db = require("../helpers/db")

exports.readUsers = (cb) => {
    db.query("SELECT * FROM users", (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.searchUsers = (displayName, cb) => {
    db.query("SELECT * FROM users WHERE displayName=?", [displayName], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.createUsers = (data,cb) => {
    db.query("INSERT INTO users SET ?",[data], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.updateUsers = ( data, user_id, cb) => {
    db.query("UPDATE users SET ? WHERE  user_id=?", [data, user_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.deleteUsers = (user_id, cb) => {
    db.query("DELETE FROM users WHERE user_id=?", [user_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}