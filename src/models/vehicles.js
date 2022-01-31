const db = require("../helpers/db")

exports.readVehicles = (cb) => {
    db.query("SELECT * FROM vehicles", (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.searchVehicles = (vehicle_id, cb) => {
    db.query("SELECT * FROM vehicles WHERE vehicle_id=?", [vehicle_id], (err, res) => {
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