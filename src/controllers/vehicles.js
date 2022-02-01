const vehicleModel = require("../models/vehicles")


const readVehicles = (req, res) => {
    let { search, page, limit } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { search, limit, offset }
    vehicleModel.readVehicles(data,(results) => {
        return res.status(200).json({
            success: true,
            message: "List Vehicles",
            results: results
            // prev:null,
            // next: ""
        })
    })
}

const searchVehicles = (req, res) => {
    const { search } = req.query
    vehicleModel.searchVehicles(search, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: "Detail Vehicle",
                results: results,
                
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        }
    })
}

const createVehicles = (req, res) => {
    const newData = {
        ...req.body
    }
    vehicleModel.createVehicles(newData, results => {
        if (results) {
            return res.status(201).json({
                success: true,
                message: "Success Insert Vehicle",
                data: newData
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed Insert Vehicle"
            })
        }
    })
}

const updateVehicles = (req, res) => {
    const update = {
        ...req.body
    }
    const {vehicle_id} = req.params
    vehicleModel.updateVehicles(update, vehicle_id, results => {
        if(results.changedRows>0) {
            return res.status(200).json({
                success: true,
                message: "Edited Succesfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Data Not Found"
            })
        } 
    })
}

const deleteVehicles = (req, res) => {
    const {vehicle_id} = req.params
    vehicleModel.deleteVehicles(vehicle_id, results => { 
        if(results.affectedRows == 1) {
            return res.status(200).json({
                success: true,
                message: "Deleted Successfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
    })
}

const popularVehicles = (req, res) => {
    const { search } = req.query
    vehicleModel.popularVehicles(search, results => {
        return res.status(200).json({
            success: true,
            message: "List Popular",
            results: results
        })
    })
}

module.exports = {
    readVehicles,
    searchVehicles,
    createVehicles,
    updateVehicles,
    deleteVehicles,
    popularVehicles
}