const history = require("express").Router()

const { readHistory,
  searchHistory,
  createHistory,
  updateHistory,
  deleteHistory
} = require("../controllers/history")

history.get("/", readHistory)
history.get("/byname/", searchHistory)
history.post("/", createHistory)
history.patch("/:historyId", updateHistory)
history.delete("/:historyId", deleteHistory)


module.exports = history