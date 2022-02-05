const vehicleModel = require("../models/vehicles")
const validate = require("../helpers/validate")

const readVehicles = (req, res) => {
    let { search, page, limit } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { search, limit, offset }

    vehicleModel.readVehicles(data,(results)=>{
        vehicleModel.countVehicles(data,(count)=>{
            const {total} = count[0]
            const last = Math.ceil(total /limit)
            if (results.length > 0){
                return res.status(200).json({
                    success: true,
                    message: "List Vehicles",
                    results: results,
                    pageInfo:{
                        prev: page > 1 ? `http://localhost:5000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:5000/vehicles?page=${page+1}`: null ,
                        totalData : total,
                        currentPage : page,
                        lastPage : last
                    }
                })
            }
            return res.status(404).json({
                success: false,
                message: "List not found"
            })
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
    if (validate.validateVehicles(newData) == "") {
        vehicleModel.getName(newData.name, (result) => {
            if (result.length == 0) {
                vehicleModel.createVehicles(newData, (results) => {
                    if (results.affectedRows > 0) {
                        return res.json({
                            success: true,
                            message: "Data Vehicle created successfully.",
                            results: newData
                        })
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: "Data Vehicle failed to create."
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Name has already used."
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Data Vehicle was not valid.",
            error: validate.validateVehicles(newData)
        })
    }
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
                message: "Edited Succesfully",
                results
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
                results
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
    vehicleModel.popularVehicles(search, result => {
        if (result.length > 0) {
            return res.json({
                success: true,
                message: "List Popular Vehicle",
                results: result
            })
        }
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

