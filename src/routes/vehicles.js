const vehicles = require('express').Router()

const { readVehicles, 
        searchVehicles, 
        createVehicles,
        updateVehicles,
        deleteVehicles
      } = require('../controllers/vehicles')

vehicles.get('/', readVehicles)
vehicles.get('/:vehicle_id', searchVehicles)
vehicles.post('/create', createVehicles)
vehicles.patch('/update/:vehicle_id', updateVehicles)
vehicles.delete('/delete/:vehicle_id', deleteVehicles)


module.exports = vehicles