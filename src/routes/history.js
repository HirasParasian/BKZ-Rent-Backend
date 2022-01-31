const history = require("express").Router()

const { readHistory, 
    searchHistory, 
    createHistory,
    updateHistory,
    deleteHistory
} = require("../controllers/history")

history.get("/", readHistory)
history.get("/:history_id", searchHistory)
history.post("/create", createHistory)
history.patch("/update/:history_id", updateHistory)
history.delete("/delete/:history_id", deleteHistory)


module.exports = history