const db = require("../helpers/db")

exports.readUsers = (data,cb) => {
    db.query(`SELECT user_id, fullName, gender, address, mobileNumber, birthDate, displayName  
              FROM users WHERE fullName LIKE "%${ data.search }%" 
              LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
        if (err) throw err
        cb(res)
    })
  
}

exports.getEmail = (email,  cb) => {
    db.query("select email from users where email=?" , [email], (err, res) => {
        if (err) throw err
        cb(res)
    })
}
exports.countUsers = (data, cb) =>{
    db.query(`SELECT COUNT (*) as total FROM users WHERE fullName LIKE "%${ data.search }%"`,(err,res) => {
        if(err) throw err
        cb(res)
    })
}

exports.searchUsers = (user_id, cb) => {
    db.query("SELECT * FROM users WHERE user_id=?", [user_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.createUsers = (data,cb) => {
    db.query("INSERT INTO users SET ?",[data], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.updateUsers = (user_id, update, cb) => {
    db.query("UPDATE users SET ? WHERE  user_id=?", [update, user_id], (err, results) => {
        if (err) throw err
        cb(results)
    })
}

exports.deleteUsers = (user_id, cb) => {
    db.query("DELETE FROM users WHERE user_id=?", [user_id], (err, res) => {
        if (err) throw err
        cb(res)
    })
}

exports.profileUsers = (user_id, cb) => {
    const query = db.query("SELECT fullName,displayName,gender,images,address,birthDate FROM users WHERE user_id=?", [user_id], (error, result) => {
        if (error) throw error
        cb(result)
    })
    console.log(query.sql)
}


// console.log(query.sql)