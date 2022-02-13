const db = require("../helpers/db")

exports.createRequest = (userId, code) => new Promise((resolve, reject) => {
  db.query("INSERT INTO forgot_password (userId,code) VALUES (?,?)", [userId, code], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.getRequest = (code) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM forgot_password WHERE code=?"), [code], (err, res) => {
    if (err) reject(err)
    resolve(res)
  }
})

