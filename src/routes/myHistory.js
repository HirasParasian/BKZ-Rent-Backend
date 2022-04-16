const myHistory = require('express').Router();
const { getMyHistory,searchHistory,deleteHistory,updateRating,searchRating } = require('../controllers/myHistory');
const { verify } = require('../helpers/auth');
const cors = require('cors');


myHistory.get('/',cors(), verify, getMyHistory);
myHistory.get("/search/:historyId",cors(), searchHistory)
myHistory.get("/search/rating/:vehicleId",cors(), searchRating)
myHistory.patch("/rating/:historyId",cors(), updateRating)
myHistory.delete("/:historyId",cors(), deleteHistory)

module.exports = myHistory;