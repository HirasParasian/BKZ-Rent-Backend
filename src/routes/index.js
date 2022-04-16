const route = require("express").Router() //ambil package express
const cors = require('cors');

route.use("/vehicles",cors(), require("./vehicles"))
route.use("/users",cors(), require("./users"))
route.use("/history",cors(), require("./history"))
route.use("/auth",cors(), require("./auth"))
route.use('/profile',cors(), require('./profile'));
route.use('/myHistory',cors(), require('./myHistory'));
route.use('/favorite',cors(), require('./favorite'));

module.exports = route