const myHistory = require('express').Router();
const { getMyHistory } = require('../controllers/myHistory');
const { verify } = require('../helpers/auth');


myHistory.get('/', verify, getMyHistory);

module.exports = myHistory;