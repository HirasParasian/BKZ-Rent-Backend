const vehicleModel = require("../models/vehicles")
const validate = require("../helpers/validate")
const { APP_URL } = process.env
const upload = require("../helpers/upload").single("image")
const fs = require("fs")
const response = require("../helpers/response")


// READ VEHICLES
const readVehicles = async (req, res) => {
  let { search, page, limit, sort, order } = req.query
  sort = sort || "name"
  order = order || "DESC"
  search = search || ""
  page = ((page != null && page !== "") ? Number(page) : 1)
  limit = ((limit != null && limit !== "") ? Number(limit) : 5)
  let offset = (page - 1) * limit
  const data = { search, limit, offset, sort, order, page }
  if (validate.validationPageInfoAsync(data) == "") {
    const results = await vehicleModel.readVehiclesAsync(data)
    const count = await vehicleModel.countVehiclesAsync(data)
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${APP_URL}/${obj.image}`
      }
      return obj
    })
    const { total } = count[0]
    const last = Math.ceil(total / limit)
    const pageInfo = {
      prev: page > 1 ? `http://localhost:5000/vehicles?page=${page - 1}` : null,
      next: page < last ? `http://localhost:5000/vehicles?page=${page + 1}` : null,
      totalData: total,
      currentPage: page,
      lastPage: last
    }
    if (results.length > 0) {
      return response(res, "List Vehicle", processedResult, 200, pageInfo)
    }
    return response(res, "List Vehicle Not Found", null, 404)
  } else {
    return response(res, "List Vehicle", null, 200, null, validate.validationPageInfoAsync(data))
  }

}

//SEARCH VEHICLES 

const searchVehicles = async (req, res) => {
  const { vehicleId } = req.params
  const results = await vehicleModel.searchVehiclesAsync(vehicleId)
  if (results.length > 0) {
    fs.rm(results[0].image, {}, function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "File not found"
        })
      }
      const data = results[0]
      return response(res, "List Vehicle", data, 200)
    })
  } else {
    return response(res, "List Not Found", null, 404)
  }
}

//CREATE VEHICLES
const createVehicles = async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "supervisor") {
    upload(req, res, function (err) {
      if (err) {
        return response(res, err.message, null, 400)
      }
      const newData = {
        ...req.body
      }
      if (req.file) {
        newData.image = req.file.path
      }
      if (validate.validateVehicles(newData) == "") {
        vehicleModel.getName(newData.name, (result) => {
          if (result.length == 0) {
            vehicleModel.createVehicles(newData, (results) => {
              vehicleModel.searchVehicles(results.insertId, (fin) => {
                const mapResults = fin.map(o => {
                  if (o.image !== null) {
                    o.image = `${APP_URL}/${o.image}`
                  }
                  return o
                })
                return res.send({
                  success: true,
                  message: "Vehicle data created!",
                  results: mapResults[0]
                })
              })
            })
          } else {
            return response(res, "Name has Already Used", null, 400)
          }
        })
      } else {
        return response(res, "Data Vehicle was not valid", null, 200, null, validate.validateVehicles(newData))
      }
    })
  } else {
    return response(res, "You Are Not Admin or Supervisor", null, 403, null)
  }
}



const updateVehicles = async (req, res) => {

  const { vehicleId } = req.params
  const result = await vehicleModel.searchVehiclesAsync(vehicleId)
  if (result.length >= 1) {
    const data = {}
    // console.log(data)
    const fillable = ["name", "price", "description", "location", "category", "isAvailable", "stock", "image"]
    fillable.forEach(field => {
      if (req.body[field]) {
        data[field] = req.body[field]
      }
    })

    try {
      const resultUpdate = await vehicleModel.updateVehiclesAsync(data, vehicleId)
      console.log(resultUpdate)
      if (resultUpdate.affectedRows) {
        const fetchNew = await vehicleModel.searchVehiclesAsync(vehicleId)
        console.log(fetchNew)
        return response(res, "Update Success", fetchNew[0])
      }
    } catch (err) {
      return response(res, "Invalid Input ", null, 400)
    }

  } else {
    return res.status(400).json({
      success: false,
      message: "Unexpected data",
      result
    })
  }
}


const deleteVehicles = (req, res) => {
  const { vehicleId } = req.params
  if (vehicleId !== " ") {
    vehicleModel.searchVehicles(vehicleId, (result) => {
      if (result.length > 0) {
        vehicleModel.deleteVehicles(vehicleId, (results) => {
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
    } else {
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
  let offset = (page - 1) * limit
  const data = { location, search, limit, offset }

  vehicleModel.popularInTownVehicles(data, (results) => {
    vehicleModel.countPopularVehiclesInTown(data, (count) => {
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List Vehicles",
          results: results,
          pageInfo: {
            prev: page > 1 ? `http://localhost:5000/vehicles?page=${page - 1}` : null,
            next: page < last ? `http://localhost:5000/vehicles?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
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
  let { page, limit } = req.query
  page = Number(page) || 1
  limit = Number(limit) || 5
  let offset = (page - 1) * limit
  const data = { limit, offset }

  vehicleModel.newVehiclesinWeek(data, (results) => {
    vehicleModel.countVehiclesInWeek(data, (count) => {
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List Vehicles",
          results: results,
          pageInfo: {
            prev: page > 1 ? `http://localhost:5000/vehicles?page=${page - 1}` : null,
            next: page < last ? `http://localhost:5000/vehicles?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
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

