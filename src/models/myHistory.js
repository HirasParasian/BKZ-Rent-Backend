const db = require('../helpers/db');


exports.getMyHistoryAsync = (userId,data) => new Promise((resolve, reject) => {
  const query = db.query(`SELECT h.historyId,h.idCardNumber,h.mobilePhone,h.emailAddress,h.location,h.paymentType,
  h.paymentCode,h.bookingCode,h.rating,h.rentName,v.name AS vehicle,v.image,v.price * 20/100 
  AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
  DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, 
  h.rentStartDate) AS totalPrice FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
  JOIN category c on v.category = c.categoryId WHERE h.userId = ${userId} ORDER BY h.createdAt DESC
  LIMIT ${data.limit} OFFSET ${data.offset}  `, [userId,data], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});

exports.countMyHistoryAsync = (userId) => new Promise((resolve, reject) => {
  // const query = 
  db.query(`SELECT COUNT (*) as total FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
  JOIN category c on v.category = c.categoryId WHERE h.userId = ${userId}`, (err, res) => {
    if (err) reject(err)
    resolve(res)
    // console.log(query.sql)
  })
})

exports.deleteHistory = (historyId, cb) => {
  db.query("DELETE FROM history WHERE historyId=?", [historyId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchHistory = (historyId, cb) => {
  db.query(`SELECT h.historyId,h.idCardNumber,h.mobilePhone,h.emailAddress,h.location,h.paymentType,
  h.paymentCode,h.bookingCode,h.rating,h.rentName,v.name AS vehicle,v.image,v.price * 20/100 
  AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
  DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, 
  h.rentStartDate) AS totalPrice FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
  JOIN category c on v.category = c.categoryId WHERE h.historyId = ${historyId}`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchRating = (vehicleId, cb) => {
  db.query("SELECT AVG(rating) as vehicleRating FROM `history` WHERE vehicleId=?;", [vehicleId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchHistoryAsync = (historyId) => new Promise((resolve, reject) => {
  // const query = 
  db.query(`SELECT h.historyId,h.idCardNumber,h.mobilePhone,h.emailAddress,h.location,h.paymentType,
  h.paymentCode,h.bookingCode,h.rating,h.rentName,v.name AS vehicle,v.image,v.price * 20/100 
  AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
  DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, 
  h.rentStartDate) AS totalPrice FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
  JOIN category c on v.category = c.categoryId WHERE h.historyId = ${historyId}`, (err, res) => {
    if (err) reject(err)
    resolve(res)
    // console.log(query.sql)
  })
})

exports.updateRating = ( data, historyId, cb) => {
  db.query(`UPDATE history SET rating = ${data.rating} WHERE historyId = ${historyId}`, [data, historyId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

// SELECT AVG(rating) FROM `history` WHERE vehicleId=78; For GET Rating vehicles
// SELECT historyId,rating FROM `history` WHERE historyId = 43  for GET rating history
