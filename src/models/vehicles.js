const db = require("../helpers/db")

exports.countVehicles = (data, cb) =>{
    db.query(`SELECT COUNT (*) as total FROM vehicles WHERE name LIKE "${ data.search }%"`,(err,res) => {
        if(err) throw err
        cb(res)
    })
}

exports.countPopularVehiclesInTown = (data, cb) =>{
    db.query(`SELECT COUNT(*) as total 
    FROM history h JOIN vehicles v WHERE v.name LIKE "${ data.search }%" AND v.location LIKE "${ data.location }%" AND v.vehicle_id = h.vehicle_id`,(err,res) => {
        if(err) throw err
        cb(res)
    })
}

exports.readVehicles = (data,cb) => {
    db.query(`SELECT v.vehicle_id, v.name, v.price, v.description, v.location, c.name as category, v.stock, v.image 
              FROM vehicles v JOIN category c on v.category = c.category_id WHERE v.name LIKE "${ data.search }%" 
              OR c.name LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
        if (err) throw err
        cb(res)
    })
    
}

exports.searchVehicles = (vehicle_id, cb) => {
    db.query("select * FROM vehicles WHERE vehicle_id=?", [vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}


exports.createVehicles = (data,cb) => {
    db.query("INSERT INTO vehicles SET ?",[data], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.updateVehicles = (vehicle_id, update, cb) => {
  
    db.query("UPDATE vehicles SET ? WHERE  vehicle_id=?", [update, vehicle_id], (err, results) => {
        if (err) throw err
        cb(results)
    })
}

exports.deleteVehicles = (vehicle_id, cb) => {
    db.query("DELETE FROM vehicles WHERE vehicle_id=?", [vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.popularVehicles = (search = "",cb) => {
    db.query(`SELECT v.vehicle_id,v.name,v.location, COUNT(*) as total 
              FROM history h JOIN vehicles v WHERE v.name LIKE "${ search }%" 
              AND v.vehicle_id = h.vehicle_id GROUP BY h.vehicle_id ORDER BY total DESC `, (error, res) => {
        if (error) throw error
        cb(res)
    })
}

exports.getName = (name,  cb) => {
    db.query("select name,location from vehicles where name=?" , [name], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.popularInTownVehicles = (data ,cb) => {
    db.query(`SELECT v.vehicle_id,v.name,v.location, COUNT(*) as total 
              FROM history h JOIN vehicles v WHERE name LIKE "${ data.search }%" AND location LIKE "${ data.location }%" 
              AND v.vehicle_id = h.vehicle_id GROUP BY h.vehicle_id ORDER BY total DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
        if (error) throw error
        cb(res)
    })
    
}

exports.newVehiclesinWeek = (data ,cb) => {
    const query = db.query(`SELECT vehicle_id,name,location,createdAt FROM vehicles WHERE createdAt >= curdate() - 
              INTERVAL DAYOFWEEK(curdate())+6 DAY AND createdAt < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY 
              ORDER BY createdAt DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (error, res) => {
        if (error) throw error
        cb(res)
    })
    console.log(query.sql)
}
exports.countVehiclesInWeek = (data, cb) =>{
    db.query(`SELECT COUNT(*) as total FROM vehicles WHERE createdAt >= curdate() - 
    INTERVAL DAYOFWEEK(curdate())+6 DAY AND createdAt < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY `,(err,res) => {
        if(err) throw err
        cb(res)
    })
}


