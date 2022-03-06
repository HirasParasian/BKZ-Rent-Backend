const route = require("express").Router() //ambil package express

route.use("/vehicles", require("./vehicles"))
route.use("/users", require("./users"))
route.use("/history", require("./history"))
route.use("/auth", require("./auth"))
route.use('/profile', require('./profile'));

module.exports = route