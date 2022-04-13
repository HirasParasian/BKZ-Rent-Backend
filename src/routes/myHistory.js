const myHistory = require('express').Router();
const { getMyHistory,searchHistory,deleteHistory,updateRating,searchRating } = require('../controllers/myHistory');
const { verify } = require('../helpers/auth');


myHistory.get('/', verify, getMyHistory);
myHistory.get("/search/:historyId", searchHistory)
myHistory.get("/search/rating/:vehicleId", searchRating)
myHistory.patch("/rating/:historyId", updateRating)
myHistory.delete("/:historyId", deleteHistory)

module.exports = myHistory;