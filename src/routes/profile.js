const profile = require('express').Router();
const { getProfile, editProfile } = require('../controllers/profile');
const { verify } = require('../helpers/auth');


profile.get('/', verify, getProfile);
profile.patch('/', editProfile);

module.exports = profile;