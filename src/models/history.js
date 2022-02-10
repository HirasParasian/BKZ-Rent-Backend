const db = require("../helpers/db")

exports.readHistory = (data,cb) => {
    db.query(`SELECT h.history_id,u.fullName,v.name AS vehicle,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
              DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice 
              FROM history h JOIN users u on h.user_id = u.user_id JOIN vehicles v on h.vehicleId = v.vehicleId 
              JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "%${ data.search }%" ORDER by h.history_id 
              LIMIT ${data.limit} OFFSET ${data.offset}  `, (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.searchHistory = (data,cb) => {
    db.query(`SELECT h.history_id,u.fullName,v.name AS vehicle,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
              DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice 
              FROM history h JOIN users u on h.user_id = u.user_id JOIN vehicles v on h.vehicleId = v.vehicleId 
              JOIN category c on v.category = c.categoryId WHERE h.history_id=?`,[data], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.countHistory = (data, cb) =>{
    db.query(`SELECT COUNT (*) as total FROM history h JOIN users u on h.user_id = u.user_id JOIN vehicles v on h.vehicleId = v.vehicleId 
    JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "${ data.search }%"`,(err,res) => {
        if(err) throw err
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

exports.updateHistory = (history_id, update, cb) => {
  
    db.query("UPDATE history SET ? WHERE  history_id=?", [update, history_id], (err, results) => {
        if (err) throw err
        cb(results)
    })
}

exports.deleteHistory = (history_id, cb) => {
    db.query("DELETE FROM history WHERE history_id=?", [history_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.readHistoryByName = (data,cb) => {
    const query = db.query(`SELECT h.history_id,v.name AS vehicle,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,
              DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice 
              FROM history h JOIN users u on h.user_id = u.user_id JOIN vehicles v on h.vehicleId = v.vehicleId 
              JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "%${ data.search }%" ORDER by h.history_id 
              LIMIT ${data.limit} OFFSET ${data.offset}  `, (err, res) => {
        if (err) throw err
        cb(res)
    })
    console.log(query.sql)
}

exports.countHistoryByName = (data, cb) =>{
    const query = db.query(`SELECT COUNT (*) as total FROM history h JOIN users u on h.user_id = u.user_id JOIN vehicles v on h.vehicleId = v.vehicleId 
    JOIN category c on v.category = c.categoryId WHERE u.fullName LIKE "${ data.search }%"`,(err,res) => {
        if(err) throw err
        cb(res)
    })
    console.log(query.sql)
}
