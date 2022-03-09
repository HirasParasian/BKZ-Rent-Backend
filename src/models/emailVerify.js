const db = require("../helpers/db")

exports.createRequest = (userId, code) => new Promise((resolve, reject) => {
  const query = db.query("INSERT INTO verify_email (userId, code) VALUES (?,?)", [userId, code], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
  console.log(query.sql)
})

exports.updateRequest = (data, id) => new Promise((resolve, reject) => {
  db.query("UPDATE `verify_email` SET ? WHERE id=?", [data, id], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.updateVerify = (userId) => new Promise((resolve, reject) => {
  db.query("UPDATE users SET emailVerify = 1 WHERE userId=?", [userId], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.getRequest = (code) => new Promise((resolve, reject) => {
  const query = db.query("SELECT * FROM verify_email WHERE code=?", [code], (err, res) => {
    if (err) reject(err)
    resolve(res)
    console.log(query.sql)
  })
})
