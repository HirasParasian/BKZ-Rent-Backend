const db = require("../helpers/db")

exports.countVehicles = (data, cb) => {
  db.query(`SELECT COUNT (*) as total FROM vehicles v JOIN category c on v.category = c.categoryId WHERE v.name LIKE "${data.search}%" 
    OR c.name LIKE '%${data.search}%'`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}
exports.countVehiclesAsync = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT (*) as total FROM vehicles v JOIN category c on v.category = c.categoryId WHERE v.name LIKE "${data.search}%" 
    OR c.name LIKE '%${data.search}%'`, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.countPopularVehiclesInTown = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM history h JOIN vehicles v WHERE v.name LIKE "${data.search}%" 
            AND v.location LIKE "${data.location}%" AND v.vehicleId = h.vehicleId`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.countPopularVehiclesInTownAsync = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) as total FROM history h JOIN vehicles v WHERE v.name LIKE "${data.search}%" 
            AND v.location LIKE "${data.location}%" AND v.vehicleId = h.vehicleId`, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.readVehicles = (data, cb) => {
  db.query(`SELECT v.vehicleId, v.name, v.price, v.description, v.location, c.name as category, v.stock, v.image 
              FROM vehicles v JOIN category c on v.category = c.categoryId WHERE v.name LIKE "${data.search}%" 
              OR c.name LIKE '%${data.search}%' ORDER BY ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.readVehiclesAsync = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT v.vehicleId, v.name, v.price, v.description, v.location, c.name as category, v.stock, v.image 
            FROM vehicles v JOIN category c on v.category = c.categoryId WHERE v.name LIKE "${data.search}%" 
            OR c.name LIKE '%${data.search}%' ORDER BY ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.searchVehicles = (vehicleId, cb) => {
  db.query("SELECT * FROM vehicles WHERE vehicleId=?", [vehicleId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchVehiclesAsync = (vehicleId) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM vehicles WHERE vehicleId=?", [vehicleId], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.createVehicles = (data, cb) => {
  db.query("INSERT INTO vehicles SET ?", [data], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.createVehiclesAsync = (data) => new Promise((resolve, reject) => {
  db.query("INSERT INTO vehicles SET ?", [data], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.updateVehicles = (vehicleId, update, cb) => {
  db.query("UPDATE vehicles SET ? WHERE  vehicleId=?", [update, vehicleId], (err, results) => {
    if (err) throw err
    cb(results)
  })
}

exports.updateVehiclesAsync = (data, vehicleId) => new Promise((resolve, reject) => {
  db.query("UPDATE vehicles SET ? WHERE  vehicleId=?", [data, vehicleId], (err, res) => {
    if (err) reject(err)
    resolve(res) // Object => affectedRows
  })
})

exports.deleteVehicles = (vehicleId, cb) => {
  db.query("DELETE FROM vehicles WHERE vehicleId=?", [vehicleId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.deleteVehiclesAsync = (vehicleId) => new Promise((resolve, reject) => {
  db.query("DELETE FROM vehicles WHERE vehicleId=?", [vehicleId], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.popularVehicles = (search = "", cb) => {
  db.query(`SELECT v.vehicleId,v.name,v.location, COUNT(*) as total 
            FROM history h JOIN vehicles v WHERE v.name LIKE "${search}%" 
            AND v.vehicleId = h.vehicleId GROUP BY h.vehicleId ORDER BY total DESC `, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.popularVehiclesAsync = (search = "") => new Promise((resolve, reject) => {
  db.query(`SELECT v.vehicleId,v.name,v.location, COUNT(*) as total 
            FROM history h JOIN vehicles v WHERE v.name LIKE "${search}%" 
            AND v.vehicleId = h.vehicleId GROUP BY h.vehicleId ORDER BY total DESC `, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.getName = (name, cb) => {
  db.query("select name,location from vehicles where name=?", [name], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.getNameAsync = (name) => new Promise((resolve, reject) => {
  db.query("select name,location from vehicles where name=?", [name], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.popularInTownVehicles = (data, cb) => {
  db.query(`SELECT v.vehicleId,v.name,v.location, COUNT(*) as total 
              FROM history h JOIN vehicles v WHERE name LIKE "${data.search}%" AND location LIKE "${data.location}%" 
              AND v.vehicleId = h.vehicleId GROUP BY h.vehicleId ORDER BY total DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
    if (error) throw error
    cb(res)
  })
}

exports.popularInTownVehiclesAsync = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT v.vehicleId,v.name,v.location, COUNT(*) as total 
            FROM history h JOIN vehicles v WHERE name LIKE "${data.search}%" AND location LIKE "${data.location}%" 
            AND v.vehicleId = h.vehicleId GROUP BY h.vehicleId ORDER BY total DESC LIMIT ${data.limit} 
            OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.newVehiclesinWeek = (data, cb) => {
  db.query(`SELECT vehicleId,name,location,createdAt FROM vehicles WHERE createdAt >= curdate() - 
              INTERVAL DAYOFWEEK(curdate())+5 DAY AND createdAt < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY 
              ORDER BY createdAt DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
    if (error) throw error
    cb(res)
  })
}

exports.newVehiclesinWeekAsync = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT vehicleId,name,location,createdAt FROM vehicles WHERE createdAt >= curdate() - 
            INTERVAL DAYOFWEEK(curdate())+5 DAY AND createdAt < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY 
            ORDER BY createdAt DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.countVehiclesInWeek = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE createdAt >= curdate() - 
    INTERVAL DAYOFWEEK(curdate())+5 DAY AND createdAt < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY `, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.countVehiclesInWeekAsync = () => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE createdAt >= curdate() - 
    INTERVAL DAYOFWEEK(curdate())+5 DAY AND createdAt < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY `, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

// select h.historyId,u.fullName,v.name as vehicle,c.name as category,v.price as price,h.rentStartDate,h.rentEndDate,DATEDIFF(h.rentEndDate, h.rentStartDate)as days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) as totalPrice from history h join users u on h.userId = u.userId join vehicles v on h.vehicleId = v.vehicleId join category c on v.category = c.categoryId;