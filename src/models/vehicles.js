const db = require("../helpers/db")

exports.countVehicles = (data, cb) =>{
    db.query(`SELECT COUNT (*) as total FROM vehicles WHERE name LIKE "${ data.search }%"`,(err,res) => {
        if(err) throw err
        cb(res)
    })
}

exports.readVehicles = (data,cb) => {
    db.query(`SELECT vehicle_id,name,price,description,location,category,stock,image FROM vehicles WHERE name LIKE "${ data.search }%" LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
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

exports.updateVehicles = ( data, vehicle_id, cb) => {
    db.query("UPDATE vehicles SET ? WHERE  vehicle_id=?", [data, vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.deleteVehicles = (vehicle_id, cb) => {
    db.query("DELETE FROM vehicles WHERE vehicle_id=?", [vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.popularVehicles = (search = "",cb) => {
    db.query(`SELECT v.vehicle_id,v.name,v.location, count(*) as total FROM history h join vehicles v WHERE name LIKE "${ search }%" AND v.vehicle_id = h.vehicle_id group by h.vehicle_id `, (error, res) => {
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


