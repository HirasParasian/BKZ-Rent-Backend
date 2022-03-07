const db = require('../helpers/db');


exports.getMyHistoryAsync = (userId) => new Promise((resolve, reject) => {
  const query = db.query('SELECT h.historyId,u.fullName,v.name AS vehicle,v.image,v.price * 20/100 AS prepayment,c.name AS category,v.price AS price,h.rentStartDate,h.rentEndDate,DATEDIFF(h.rentEndDate, h.rentStartDate)AS days ,v.price * DATEDIFF(h.rentEndDate, h.rentStartDate) AS totalPrice FROM history h JOIN users u on h.userId = u.userId JOIN vehicles v on h.vehicleId = v.vehicleId JOIN category c on v.category = c.categoryId WHERE u.userId=?', [userId], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
  console.log(query.sql)
});