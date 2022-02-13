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

exports.getUsername = (username, cb) => {
  db.query("select username from users where username=?", [username], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.getPhone = (mobileNumber, cb) => {
  db.query("select username from users where mobileNumber=?", [mobileNumber], (err, res) => {
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
  const query = db.query("UPDATE users SET ? WHERE  userId=?", [update, userId], (err, results) => {
    if (err) throw err
    cb(results)
  })
  console.log(query.sql)
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
  const query = db.query("SELECT UserId,email username, password, role, emailVerify FROM users WHERE username=? OR email=?", [username, username], (err, res) => {
    if (err) reject(err)
    resolve(res)
    console.log(query.sql)
  })
})

exports.getRoleByUsername = (username) => new Promise((resolve, reject) => {
  const query = db.query("SELECT role FROM users WHERE username=? OR email=?", [username, username], (err, res) => {
    if (err) reject(err)
    resolve(res)
    console.log(query.sql)
  })
})


exports.getUserById = (userId) => new Promise((resolve, reject) => {
  db.query("SELECT userId, username, email, password FROM users WHERE userId=?", [userId], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })

  exports.updateUser = (data, userId) => new Promise((resolve, reject) => {
    db.query("UPDATE `users` SET ? WHERE userId=?", [data, userId], (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
})