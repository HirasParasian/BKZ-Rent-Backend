const users = require("express").Router()

const { login, verify, forgotPassword } = require("../controllers/auth")

users.post("/login", login)
users.post("/verify", verify)
users.post("/forgotPassword", forgotPassword)

module.exports = users