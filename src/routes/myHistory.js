const myHistory = require('express').Router();
const { getMyHistory,searchHistory,deleteHistory,updateRating } = require('../controllers/myHistory');
const { verify } = require('../helpers/auth');


myHistory.get('/', verify, getMyHistory);
myHistory.get("/search/:historyId", searchHistory)
myHistory.patch("/rating/:historyId", updateRating)
myHistory.delete("/:historyId", deleteHistory)

module.exports = myHistory;