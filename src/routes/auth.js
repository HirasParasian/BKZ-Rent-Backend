const users = require("express").Router()
const cors = require('cors');

const { login, verify, forgotPassword, emailVerify, emailVerify2 } = require("../controllers/auth")

users.post("/login",cors(), login)
users.post("/verify",cors(), verify)
users.post("/forgotPassword",cors(), forgotPassword)
users.post("/emailVerify",cors(), emailVerify)
users.post("/emailVerify2",cors(), emailVerify2)

module.exports = users