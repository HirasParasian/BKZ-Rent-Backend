const vehicles = require("express").Router()
const { verifyUser } = require("../helpers/auth")
const uploadImage = require('../helpers/uploads');
const multer = require("multer")
const upload = multer({ dest: "uploads/vehicles/" })

const {
  readVehicles,
  searchVehicles,
  addVehicles,
  createVehicles,
  updateVehicles,
  deleteVehicles,
  popularVehicles,
  popularInTownVehicles,
  newVehiclesinWeek,
  getProductId,
  editProduct
} = require("../controllers/vehicles")

vehicles.get("/", readVehicles)
vehicles.get("/", searchVehicles)
vehicles.get('/search/:vehicleId', getProductId);
vehicles.post("/create", verifyUser, uploadImage('image'), addVehicles)
vehicles.post("/", verifyUser, uploadImage('image'), createVehicles)
vehicles.patch("/edit/:vehicleId", verifyUser, uploadImage('image'), editProduct)
vehicles.delete("/:vehicleId", verifyUser, deleteVehicles)
vehicles.get("/popular", popularVehicles)
vehicles.get("/popularintown", popularInTownVehicles)
vehicles.get("/lastweekvehicles", newVehiclesinWeek)


module.exports = vehicles