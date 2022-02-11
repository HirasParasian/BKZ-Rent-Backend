const vehicles = require("express").Router()
const { verifyUser } = require("../helpers/auth")
// const multer = require("multer")
// const upload = multer({ dest: "uploads/vehicles/" })

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
vehicles.post("/", verifyUser, createVehicles)
vehicles.patch("/:vehicleId", verifyUser, updateVehicles)
vehicles.delete("/:vehicleId", verifyUser, deleteVehicles)
vehicles.get("/popular", popularVehicles)
vehicles.get("/popularintown", popularInTownVehicles)
vehicles.get("/lastweekvehicles", newVehiclesinWeek)


module.exports = vehicles