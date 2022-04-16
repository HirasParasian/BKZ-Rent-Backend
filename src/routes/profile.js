const profile = require('express').Router();
const { getProfile, updateProfile,patchProfile,updatesProfile } = require('../controllers/profile');
const { verify } = require('../helpers/auth');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/uploader');
const cors = require('cors');



profile.get('/', verifyUser,cors(), getProfile);
profile.patch('/',cors(),verifyUser, updateProfile);
profile.patch('/update',cors(),verifyUser, uploadImage('images'), updatesProfile);
// vehicles.patch("/edit/:vehicleId", verifyUser, uploadImage('image'), editProduct)

module.exports = profile;