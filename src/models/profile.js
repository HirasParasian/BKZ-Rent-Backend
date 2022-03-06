const db = require('../helpers/db');


exports.getProfileAsync = (userId) => new Promise((resolve, reject) => {
  const query = db.query('SELECT userId ,role, username, fullName, displayName, email, mobileNumber , gender, address, birthDate, images FROM users WHERE userId=?', [userId], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});