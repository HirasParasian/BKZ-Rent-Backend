const { query } = require("../helpers/db")
const db = require("../helpers/db")

exports.readUsers = (data, cb) => {
  const query = db.query(`SELECT userId,email, fullName, gender, address, mobileNumber, birthDate,images, displayName  
              FROM users WHERE fullName LIKE "%${data.search}%" AND userId LIKE "%${data.userId}%" 
              LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.countUsers = (data, cb) => {
  db.query(`SELECT COUNT (*) as total FROM users WHERE fullName LIKE "%${data.search}%" AND userId LIKE "%${data.userId}%" `, (err, res) => {
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

exports.getUsernameAsync = (username) => new Promise((resolve, reject) => {
  db.query("select username from users where username=?", [username], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})
exports.searchUser2 = (data, cb) => {
  db.query(`SELECT userId, username, email FROM users WHERE username = '${data.username}' AND email ='${data.email}'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.searchUsers = (userId, cb) => {
  db.query("SELECT * FROM users WHERE userId=?", [userId], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.createUsers = (data, cb) => {
  const query = db.query("INSERT INTO users SET ?", [data], (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.searchUserAsyn = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT userId, username, email FROM users WHERE username = '${data.username}' AND email ='${data.email}'`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.patchUserAsyn = (userId, data) => new Promise((resolve, reject) => {
  const query = db.query('UPDATE users SET ? WHERE userId = ?', [data, userId], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});

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
  const query = db.query("SELECT userId ,email username, password, role, emailVerify FROM users WHERE username=? OR email=?", [username, username], (err, res) => {
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

exports.getProfile = (userId) => new Promise((resolve, reject) => {
  // todo: add total order, join from transaction
  db.query(`SELECT * FROM users WHERE userId = ?`, [userId], (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.updateUsers = (userId, data) => new Promise((resolve, reject) => {
  const query = db.query(
    'UPDATE users SET ? WHERE userId = ?',
    [data, userId],
    (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
    
  );
  console.log(query.sql)
});

exports.getUserByPhoneNumber = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.userId) {
    extraQuery += ` AND userId!=${data.userId}`;
  }
  db.query(`SELECT * FROM users WHERE mobileNumber='${data.mobileNumber}' ${extraQuery}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUserByEmail = (data) => new Promise((resolve, reject) => {
  let extraQuery = '';
  if (data.userId) {
    extraQuery += ` AND userId!=${data.userId}`;
  }
  db.query(`SELECT * FROM users WHERE  email='${data.email}' ${extraQuery}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});

exports.getUser = (userId) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM users
    WHERE userId=${userId}`, (error, res) => {
    if (error) reject(error);
    resolve(res);
  });
});