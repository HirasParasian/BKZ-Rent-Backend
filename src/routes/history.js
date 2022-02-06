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
history.patch("/:history_id", updateHistory)
history.delete("/:history_id", deleteHistory)


module.exports = history