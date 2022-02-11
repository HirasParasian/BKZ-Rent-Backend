const db = require("../helpers/db")

exports.readUsers = (data, cb) => {
  db.query(`SELECT userId, fullName, gender, address, mobileNumber, birthDate, displayName  
              FROM users WHERE fullName LIKE "%${data.search}%" 
              LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err
    cb(res)
  })

}

exports.getEmail = (email, cb) => {
  db.query("select email from users where email=?", [email], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.getEmailAsync = (email) => new Promise((resolve, reject) => {
  db.query("select email from users where email=?", [email], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.countUsers = (data, cb) => {
  db.query(`SELECT COUNT (*) as total FROM users WHERE fullName LIKE "%${data.search}%"`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.searchUsers = (userId, cb) => {
  db.query("SELECT * FROM users WHERE userId=?", [userId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.createUsers = (data, cb) => {
  db.query("INSERT INTO users SET ?", [data], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.createUsersAsync = (data) => new Promise((resolve, reject) => {
  db.query("INSERT INTO users SET ?", [data], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.updateUsers = (userId, update, cb) => {
  db.query("UPDATE users SET ? WHERE  userId=?", [update, userId], (err, results) => {
    if (err) throw err
    cb(results)
  })
}

exports.deleteUsers = (userId, cb) => {
  db.query("DELETE FROM users WHERE userId=?", [userId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.profileUsers = (userId, cb) => {
  const query = db.query("SELECT fullName,displayName,gender,images,address,birthDate FROM users WHERE userId=?", [userId], (error, result) => {
    if (error) throw error
    cb(result)
  })
  console.log(query.sql)
}

exports.getUserByUsername = (username) => new Promise((resolve, reject) => {
  db.query("SELECT UserId, username, password FROM users WHERE username=?", [username], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})
// console.log(query.sql)