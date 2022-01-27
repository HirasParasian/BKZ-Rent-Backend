const mysql = require("mysql")

var connection = mysql.createConnection(
    { host: "localhost", 
        user: "root", 
        password: "", 
        database: "vehicles_rental"}
)

connection.connect(function (err) {
    if (err) 
        throw err
    console.log("Connected!")
})

module.exports = connection