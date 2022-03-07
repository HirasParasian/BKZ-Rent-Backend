const db = require("../helpers/db")

exports.createRequest = (userId, code) => new Promise((resolve, reject) => {
  const query = db.query("INSERT INTO forgot_password (userId, code) VALUES (?,?)", [userId, code], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
  console.log(query.sql)
})

exports.updateRequest = (data, userId) => new Promise((resolve, reject) => {
  const query = db.query("UPDATE `forgot_password` SET ? WHERE userId=?", [data, userId], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
  console.log(query.sql)
})

exports.getRequest = (code) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM forgot_password WHERE code=?", [code], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})