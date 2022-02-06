const users = require("express").Router()

const { readUsers, 
    searchUsers, 
    createUsers,
    updateUsers,
    deleteUsers
} = require("../controllers/users")

users.get("/", readUsers)
users.get("/:displayName", searchUsers)
users.post("/", createUsers)
users.patch("/:user_id", updateUsers)
users.delete("/:user_id", deleteUsers)
// users.get("/profile", profileUsers)


module.exports = users