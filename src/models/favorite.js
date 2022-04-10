const db = require("../helpers/db")

exports.createFavoriteAsync = (data) => new Promise((resolve, reject) => {
  const query = db.query("INSERT INTO favorite SET ?", [data], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
  console.log(query.sql);
})

exports.createFavorite = (data, cb) => {
  const query = db.query("INSERT INTO favorite SET ?", [data], (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.getFavoriteAsync = (userId) => new Promise((resolve, reject) => {
  const query = db.query('SELECT id,vehicleId FROM favorite WHERE userId=?', [userId], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});

exports.deleteFavorite = (id, cb) => {
  db.query("DELETE FROM favorite WHERE id=?", [id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchFavorite = (id, cb) => {
  db.query("SELECT * FROM favorite WHERE id=?", [id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.getMyFavoriteAsync = (userId,data) => new Promise((resolve, reject) => {
  const query = db.query(`SELECT f.id ,f.userId, f.vehicleId, v.name,v.image,v.name,v.location,v.category,v.stock,v.price FROM favorite f JOIN vehicles v on f.vehicleId = v.vehicleId  WHERE f.userId=${userId} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});

exports.countMyFavoriteAsync = (userId) => new Promise((resolve, reject) => {
  // const query = 
  db.query(`SELECT COUNT (*) as total FROM favorite f JOIN vehicles v on f.vehicleId = v.vehicleId  WHERE f.userId=${userId}`, (err, res) => {
    if (err) reject(err)
    resolve(res)
    // console.log(query.sql)
  })
})