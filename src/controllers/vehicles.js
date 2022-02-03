const vehicleModel = require("../models/vehicles")

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
    const price = Number(req.body.price) || null
    const stock = Number(req.body.stock) || null
    if (!price && !stock){
        return  res.send({
            success : false,
            message : "invalid input price and stock"
        })
    }
    if (!price){
        return  res.send({
            success : false,
            message : "invalid input price"
        })
    }
    if (!stock){
        return  res.send({
            success : false,
            message : "invalid input stock"
        })
    }
    const newData = {
        ...req.body
    }
    vehicleModel.getName(newData, results =>{
        if (results.length < 1){
            vehicleModel.insertVehicle(newData, (results =>{
                if(results.affectedRows == 1){ 
                    vehicleModel.readVehicles(results => {
                        return res.send({
                            success : true,
                            messages : "Input data vehicle success!",
                            results : results
                        })
                    })
                }else{
                    return res.status(500).send({
                        success : false,
                        message : "Input data vehicle failed!"
                    })
                }
            }))
        }else{
            return res.status(400).send({
                success : false,
                message : "Data has already inserted!"
            })
        }
    })
}



const updateVehicles = (req, res) => {
    const price = Number(req.body.price) || null
    const stock = Number(req.body.stock) || null
    if (!price && !stock){
        return  res.send({
            success : false,
            message : "invalid input price and stock"
        })
    }
    if (!price){
        return  res.send({
            success : false,
            message : "invalid input price"
        })
    }
    if (!stock){
        return  res.send({
            success : false,
            message : "invalid input stock"
        })
    }
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

