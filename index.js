const express = require("express") //ambil package express
require("dotenv").config()
const app = express()

app.use(express.urlencoded({extended: true}))

app.use(require("./src/routes"))

app.listen(5000, ()=>{
    console.log("App listening on port 5000")
})