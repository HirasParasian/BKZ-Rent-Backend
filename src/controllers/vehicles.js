const vehicleModel = require('../models/vehicles')


const readVehicles = (req, res) => {
  vehicleModel.readVehicles(results => {
    return res.status(200).json({
      success: true,
      message: 'List Vehicles',
      results: results
    })
  })
}

const searchVehicles = (req, res) => {
  const {
    vehicle_id
  } = req.params
  vehicleModel.searchVehicles(vehicle_id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Detail Vehicle',
        results: results[0]
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
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
      return res.json({
        success: true,
        message: 'Success Insert Vehicle',
        data: newData
      })
    } else {
      return res.status(201).json({
        success: false,
        message: 'Failed Insert Vehicle'
      })
    }
  })
};

const updateVehicles = (req, res) => {
  const update = {
    ...req.body
  }
  const {vehicle_id} = req.params
  vehicleModel.updateVehicles(update, vehicle_id, results => {
    if(results.changedRows>0) {
      return res.json({
        success: true,
        message: 'Edited Succesfully'
      })
    } else {
      return res.status(404).json({
        success: false,
        message: `Edited Failed`
      })
    } 
  })
}

const deleteVehicles = (req, res) => {
  const {vehicle_id} = req.params
  vehicleModel.deleteVehicles(vehicle_id, results => { 
    if(results.affectedRows > 0) {
      return res.json({
        success: true,
        message: 'Deleted Successfully'
      })
    } else {
      return res.status(404).json({
        success: false,
        message: `Data not found`
      })
    }
  })
}

module.exports = {
  readVehicles,
  searchVehicles,
  createVehicles,
  updateVehicles,
  deleteVehicles
}