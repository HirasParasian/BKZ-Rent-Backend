const db = require("../helpers/db")

exports.readVehicles = (cb) => {
    db.query("SELECT * FROM kendaraan", (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.searchVehicles = (vehicle_id, cb) => {
    db.query("SELECT * FROM kendaraan WHERE vehicle_id=?", [vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.createVehicles = (data,cb) => {
    db.query("INSERT INTO kendaraan SET ?",[data], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.updateVehicles = ( data, vehicle_id, cb) => {
    db.query("UPDATE kendaraan SET ? WHERE  vehicle_id=?", [data, vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.deleteVehicles = (vehicle_id, cb) => {
    db.query("DELETE FROM kendaraan WHERE vehicle_id=?", [vehicle_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}