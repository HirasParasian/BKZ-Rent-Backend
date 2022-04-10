const db = require("../helpers/db")

exports.readHistory = (data, cb) => {
  db.query(`SELECT h.historyId,u.fullName,v.name AS vehicle,v.image,v.price * 20/100 AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
              DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice 
              FROM history h JOIN users u on h.userId = u.userId JOIN vehicles v on h.vehicleId = v.vehicleId 
              JOIN category c on v.category = c.categoryId WHERE u.userId LIKE "%${data.search}%" 
              LIMIT ${data.limit} OFFSET ${data.offset}  `, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.readHistories = (data, cb) => {
  db.query(`SELECT h.historyId,h.idCardNumber,h.mobilePhone,h.emailAddress,h.location,h.paymentType,
            h.paymentCode,h.bookingCode,h.rating,h.rentName,v.name AS vehicle,v.image,v.price * 20/100 
            AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
            DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, 
            h.rentStartDate) AS totalPrice FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
            JOIN category c on v.category = c.categoryId WHERE h.userId = ${data.userId} 
            LIMIT ${data.limit} OFFSET ${data.offset}  `, (err, res) => {
    if (err) throw err
    cb(res)
  })
}


exports.getHistoriesAsync = (userId) => new Promise((resolve, reject) => {
    const query = db.query(`SELECT h.historyId,h.idCardNumber,h.mobilePhone,h.emailAddress,h.location,h.paymentType,
    h.paymentCode,h.bookingCode,h.rating,h.rentName,v.name AS vehicle,v.image,v.price * 20/100 
    AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
    DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, 
    h.rentStartDate) AS totalPrice FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
    JOIN category c on v.category = c.categoryId WHERE h.userId = ${data.userId} `, [userId], 
    (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});

exports.countHistories = (data, cb) => {
  db.query(`SELECT h.historyId,h.idCardNumber,h.mobilePhone,h.emailAddress,h.location,h.paymentType,
  h.paymentCode,h.bookingCode,h.rating,h.rentName,v.name AS vehicle,v.image,v.price * 20/100 
  AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
  DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, 
  h.rentStartDate) AS totalPrice FROM history h JOIN vehicles v on h.vehicleId = v.vehicleId 
  JOIN category c on v.category = c.categoryId WHERE h.userId = ${userId}  `, (err, res) => {
    if (err) throw err
    cb(res)
  })
}


exports.searchHistory = (data, cb) => {
  db.query(`SELECT h.historyId,u.fullName,v.name AS vehicle,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
              DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice 
              FROM history h JOIN users u on h.userId = u.userId JOIN vehicles v on h.vehicleId = v.vehicleId 
              JOIN category c on v.category = c.categoryId WHERE h.historyId=?`, [data], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.countHistory = (data, cb) => {
  db.query(`SELECT COUNT (*) as total FROM history h JOIN users u on h.userId = u.userId JOIN vehicles v on h.vehicleId = v.vehicleId 
    JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "${data.search}%"`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchHistory = (historyId, cb) => {
  db.query("SELECT * FROM history WHERE historyId=?", [historyId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.createHistory = (data, cb) => {
  const query = db.query("INSERT INTO history SET ?", [data], (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.updateHistory = (historyId, update, cb) => {

  db.query("UPDATE history SET ? WHERE  historyId=?", [update, historyId], (err, results) => {
    if (err) throw err
    cb(results)
  })
}

exports.deleteHistory = (historyId, cb) => {
  db.query("DELETE FROM history WHERE historyId=?", [historyId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.readHistoryByName = (data, cb) => {
  const query = db.query(`SELECT h.historyId,v.name AS vehicle,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
              DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice 
              FROM history h JOIN users u on h.userId = u.userId JOIN vehicles v on h.vehicleId = v.vehicleId 
              JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "%${data.search}%" ORDER by h.historyId 
              LIMIT ${data.limit} OFFSET ${data.offset}  `, (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.countHistoryByName = (data, cb) => {
  const query = db.query(`SELECT COUNT (*) as total FROM history h JOIN users u on h.userId = u.userId JOIN vehicles v on h.vehicleId = v.vehicleId 
    JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "${data.search}%"`, (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}
