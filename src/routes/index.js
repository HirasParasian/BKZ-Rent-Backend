const route = require("express").Router()

route.use("/vehicles", require("./vehicles"))
route.use("/users", require("./users"))

module.exports = route