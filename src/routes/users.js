const users = require("express").Router()

const { readUsers, 
    searchUsers, 
    createUsers,
    updateUsers,
    deleteUsers,
    profileUsers
} = require("../controllers/users")

users.get("/", readUsers)
users.get("/:displayName", searchUsers)
users.post("/", createUsers)
users.patch("/:userId", updateUsers)
users.delete("/:userId", deleteUsers)
users.get("/profile/:userId", profileUsers)


module.exports = users