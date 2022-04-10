const profile = require('express').Router();
const { getProfile, updateProfile,patchProfile,updatesProfile } = require('../controllers/profile');
const { verify } = require('../helpers/auth');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/uploader');



profile.get('/', verifyUser, getProfile);
profile.patch('/',verifyUser, updateProfile);
profile.patch('/update',verifyUser, uploadImage('images'), updatesProfile);
// vehicles.patch("/edit/:vehicleId", verifyUser, uploadImage('image'), editProduct)

module.exports = profile;