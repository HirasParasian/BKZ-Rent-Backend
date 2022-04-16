const history = require("express").Router()
const cors = require('cors');

const { readHistory,
  searchHistory,
  createHistory,
  updateHistory,
  deleteHistory,
  myHistory
} = require("../controllers/history")

history.get("/",cors(), readHistory)
history.get("/byname/",cors(), searchHistory)
history.get("/my-history",cors(), myHistory)
history.post("/",cors(), createHistory)
history.patch("/:historyId",cors(), updateHistory)
history.delete("/:historyId",cors(), deleteHistory)


module.exports = history