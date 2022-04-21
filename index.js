const express = require("express") 
require("dotenv").config()
const app = express()
const cors = require('cors');
const responseHandler = require('./src/helpers/responseHandler');

app.use(express.urlencoded({ extended: true }))

app.use(require("./src/routes"))
app.use("/uploads", express.static("uploads"))
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"] 
};

const httpMethods = ['get', 'post', 'put', 'patch', 'delete'];

httpMethods.forEach((el)=>{
	app[el]('*', (req, res) =>{
		return responseHandler(res, 404, 'Destination not found');
	});
});

const { APP_PORT } = process.env
app.options('*', cors(corsOptions));
app.listen(process.env.PORT || APP_PORT, () => {
  console.log(`App listening on port ${process.env.PORT || APP_PORT}`)
})