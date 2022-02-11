const db = require("../helpers/db")

exports.readCategory = (cb) => {
  db.query("SELECT * FROM category", (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchCategory = (category_id, cb) => {
  db.query("SELECT * FROM Category WHERE category_id=?", [category_id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.createCategory = (data,cb) => {
  db.query("INSERT INTO category SET ?",[data], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.updateCategory = ( data, category_id, cb) => {
  db.query("UPDATE category SET ? WHERE  category_id=?", [data, category_id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.deleteCategory = (category_id, cb) => {
  db.query("DELETE FROM category WHERE category_id=?", [category_id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}