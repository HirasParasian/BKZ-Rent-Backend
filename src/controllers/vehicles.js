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
    console.log(req.file)
    const newData = {
        ...req.body
    }   
    
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
}
    


const updateVehicles = (req, res) => {
    const { vehicle_id } = req.params
    if (vehicle_id !== " ") {
        const update = {
            ...req.body
        }

        vehicleModel.searchVehicles(vehicle_id, (result) => {
            if (result.length > 0) {
                if (validate.validateVehicles(update) == "") {
                    vehicleModel.getName(update.name, (result) => {
                        if (result.length == 0) {
                            vehicleModel.updateVehicles(vehicle_id, update, (results) => {
                                if (results.affectedRows > 0) {
                                    return res.status(200).json({
                                        success: false,
                                        message: "Update Successfully",
                                        update : {...update, price : parseInt(update.price),category : parseInt(update.category),stock : parseInt(update.stock),isAvailable : parseInt(update.isAvailable)}
                                    })
                                } else {
                                    return res.status(400).json({
                                        success: false,
                                        message: "Update Failed"
                                    })
                                }
                            })
                        } else {
                            return res.status(400).json({
                                success: false,
                                message: "Name has already used"
                            })
                        }
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid Data Vehicle"
                    })
                }

            } else {
                return res.status(400).json({
                    success: false,
                    message: "Vehicle Not Found"
                })
            }
        })

    } else {
        return res.status(400).json({
            success: false,
            message: "Null ID Detected"
        })
    }
}

const deleteVehicles = (req, res) => {
    const {vehicle_id} = req.params
    if (vehicle_id !== " ") {
        vehicleModel.searchVehicles(vehicle_id, (result) => {
            if (result.length > 0) {
                vehicleModel.deleteVehicles(vehicle_id, (results) => {
                    if (results.affectedRows > 0) {
                        return res.json({
                            success: true,
                            message: "Deleted successfully",
                            results: result
                        })
                    } else {
                        return res.status(500).json({
                            success: true,
                            message: "Delete failed "
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Data Vehicle not found."
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Null Id Detected"
        })
    }
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
        }else{
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            })
        }
    })
}

const popularInTownVehicles = (req, res) => {
    let { search, page, limit, location } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { location, search, limit, offset }

    vehicleModel.popularInTownVehicles(data,(results)=>{
        vehicleModel.countPopularVehiclesInTown(data,(count)=>{
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

const newVehiclesinWeek = (req, res) => {
    let { page, limit} = req.query
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { limit, offset }

    vehicleModel.newVehiclesinWeek(data,(results)=>{
        vehicleModel.countVehiclesInWeek(data,(count)=>{
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

module.exports = {
    readVehicles,
    searchVehicles,
    createVehicles,
    updateVehicles,
    deleteVehicles,
    popularVehicles,
    popularInTownVehicles,
    newVehiclesinWeek
}

