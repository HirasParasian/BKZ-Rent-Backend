const vehicles = require("express").Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/vehicles/" })

const { 
    readVehicles, 
    searchVehicles, 
    createVehicles,
    updateVehicles,
    deleteVehicles,
    popularVehicles,
    popularInTownVehicles,
    newVehiclesinWeek
} = require("../controllers/vehicles")

vehicles.get("/", readVehicles)
vehicles.get("/search", searchVehicles)
vehicles.post("/", createVehicles)
vehicles.patch("/:vehicle_id",upload.single("vehicles"), updateVehicles)
vehicles.delete("/:vehicle_id", deleteVehicles)
vehicles.get("/popular", popularVehicles)
vehicles.get("/popularintown", popularInTownVehicles)
vehicles.get("/lastweekvehicles", newVehiclesinWeek)


module.exports = vehicles