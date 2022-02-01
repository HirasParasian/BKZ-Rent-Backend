const vehicles = require("express").Router()

const { readVehicles, 
    searchVehicles, 
    createVehicles,
    updateVehicles,
    deleteVehicles,
    popularVehicles
} = require("../controllers/vehicles")

vehicles.get("/", readVehicles)
vehicles.get("/search", searchVehicles)
vehicles.post("/", createVehicles)
vehicles.patch("/:vehicle_id", updateVehicles)
vehicles.delete("/:vehicle_id", deleteVehicles)
vehicles.get("/popular", popularVehicles)


module.exports = vehicles