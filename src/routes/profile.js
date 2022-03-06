const profile = require('express').Router();
const { getProfile } = require('../controllers/profile');
const { verify } = require('../helpers/auth');


profile.get('/', verify, getProfile);

module.exports = profile;