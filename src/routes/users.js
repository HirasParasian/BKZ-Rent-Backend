const users = require("express").Router()

const { readUsers, 
    searchUsers, 
    createUsers,
    updateUsers,
    deleteUsers
} = require("../controllers/users")

users.get("/", readUsers)
users.get("/:displayName", searchUsers)
users.post("/create", createUsers)
users.patch("/update/:user_id", updateUsers)
users.delete("/delete/:user_id", deleteUsers)


module.exports = users