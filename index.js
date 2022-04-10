const express = require("express") //ambil package express
require("dotenv").config()
const app = express()
const cors = require('cors');

app.use(express.urlencoded({ extended: true }))

app.use(require("./src/routes"))
app.use("/uploads", express.static("uploads"))
const corsOptions = {
  origin: 'http://localhost:8081',
};
const { PORT, APP_PORT } = process.env
app.options('*', cors(corsOptions));
app.listen(PORT || APP_PORT, () => {
  console.log(`App listening on port ${PORT || APP_PORT}`)
})