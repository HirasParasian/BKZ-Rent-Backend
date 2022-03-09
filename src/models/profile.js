const db = require('../helpers/db');


exports.getProfileAsync = (userId) => new Promise((resolve, reject) => {
  const query = db.query('SELECT userId ,role, username, fullName, displayName, email, mobileNumber , gender, address, birthDate, images FROM users WHERE userId=?', [userId], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});

exports.editProfile = (userId, data) => new Promise((resolve, reject) => {
  const query = db.query(
    'UPDATE users SET ? WHERE userId = ?', [data, userId], (error, res) => {
      if (error) reject(error);
      resolve(res);
    },
  );
  console.log(query.sql)
});

exports.getUserAsyn = (userId) => new Promise((resolve, reject) => {
  db.query('SELECT userId, email, username, mobileNumber, fullName, gender, address, displayName, birthDate FROM users WHERE userId=?', [userId], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});