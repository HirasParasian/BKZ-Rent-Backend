const vehicles = require("express").Router()
const { verifyUser } = require("../helpers/auth")
const uploadImage = require('../helpers/uploads');
const multer = require("multer")
const upload = multer({ dest: "uploads/vehicles/" })
const cors = require('cors');

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

vehicles.get("/", cors(), readVehicles)
vehicles.get("/", cors(), searchVehicles)
vehicles.get('/search/:vehicleId', cors(), getProductId);
vehicles.post("/create", cors(), verifyUser, uploadImage('image'), addVehicles)
vehicles.post("/", verifyUser, cors(), uploadImage('image'), createVehicles)
vehicles.patch("/edit/:vehicleId", cors(), verifyUser, uploadImage('image'), editProduct)
vehicles.delete("/:vehicleId", cors(), verifyUser, deleteVehicles)
vehicles.get("/popular", cors(), popularVehicles)
vehicles.get("/popularintown", cors(), popularInTownVehicles)
vehicles.get("/lastweekvehicles", cors(), newVehiclesinWeek)


module.exports = vehicles