const response = require("../helpers/response")
const myHistoryeModel = require('../models/myHistory');
const jwt_decode = require("jwt-decode");
const { APP_URL } = process.env

const getMyHistory = async (req, res) => {
  try {
    let { userId } = req.userData
    console.log(userId)
    console.log(req.userData)

    const results = await myHistoryeModel.getMyHistoryAsync(userId);
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${APP_URL}/${obj.image}`
      }
      return obj
    })
    if (results) {
      response(res, 'My History', processedResult);
    } else {
      response(res, 'data not found', null, null, 404);
    }
  } catch (err) {
    response(res, 'unexpected error', null, null, 500);
  }
};

module.exports = { getMyHistory };