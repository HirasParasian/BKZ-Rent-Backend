const myHistory = require('express').Router();
const { getMyHistory,searchHistory,deleteHistory } = require('../controllers/myHistory');
const { verify } = require('../helpers/auth');


myHistory.get('/', verify, getMyHistory);
myHistory.get("/search/:historyId", searchHistory)
myHistory.delete("/:historyId", deleteHistory)

module.exports = myHistory;