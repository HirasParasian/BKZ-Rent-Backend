const users = require("express").Router()

const { login, verify, forgotPassword, emailVerify } = require("../controllers/auth")

users.post("/login", login)
users.post("/verify", verify)
users.post("/forgotPassword", forgotPassword)
users.post("/emailVerify", emailVerify)

module.exports = users