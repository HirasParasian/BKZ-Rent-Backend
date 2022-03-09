const users = require("express").Router()

const { login, verify, forgotPassword, emailVerify, emailVerify2 } = require("../controllers/auth")

users.post("/login", login)
users.post("/verify", verify)
users.post("/forgotPassword", forgotPassword)
users.post("/emailVerify", emailVerify)
users.post("/emailVerify2", emailVerify2)

module.exports = users