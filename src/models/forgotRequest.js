const db = require("../helpers/db")

exports.createRequest = (userId, code) => new Promise((resolve, reject) => {
  db.query("INSERT INTO forgot_password (userId,code) VALUES (?,?)", [userId, code], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})
