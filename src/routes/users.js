const users = require("express").Router()
const { verifyUser } = require('../helpers/auth');

const { readUsers,
  searchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  profileUsers,
  register
} = require("../controllers/users")
const {getProfiles}= require("../controllers/profile")

users.get("/", readUsers)
users.get("/:userId", searchUsers)
users.post("/", createUsers)
users.post("/register", register)
users.patch("/:userId", updateUsers)
users.delete("/:userId", deleteUsers)
users.get("/profile",verifyUser, getProfiles)


module.exports = users