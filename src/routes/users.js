const users = require("express").Router()
const { verifyUser } = require('../helpers/auth');
const cors = require('cors');

const { readUsers,
  searchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  profileUsers,
  register
} = require("../controllers/users")
const {getProfiles}= require("../controllers/profile")

users.get("/",cors(), readUsers)
users.get("/:userId",cors(), searchUsers)
users.post("/",cors(), createUsers)
users.post("/register",cors(), register)
users.patch("/:userId",cors(), updateUsers)
users.delete("/:userId",cors(), deleteUsers)
users.get("/profile",cors(),verifyUser, getProfiles)


module.exports = users