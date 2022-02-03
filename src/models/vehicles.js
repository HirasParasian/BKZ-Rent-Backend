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

exports.searchVehicles = (data, cb) => {
    db.query(`SELECT vehicle_id,name,price,description,location,category,stock,image FROM vehicles WHERE name LIKE "${ data.search }%"`, (err, res) => {
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
    db.query(`SELECT * FROM vehicles WHERE name LIKE "${ search }%" ORDER by rent_count  DESC `, (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.getName = (data,  cb) => {
    db.query("select name,location from vehicles where name=?" , [data.name,data.location], (err, res) => {
        if (err) throw err
        cb(res)
    })
    return(db)
}
