const response = require("../helpers/response")
const profileModel = require('../models/profile');
const jwt_decode = require("jwt-decode");
const { APP_URL } = process.env

const getProfile = async (req, res) => {
  try {
    let { userId } = req.userData
    console.log(userId)
    console.log(req.userData)

    const results = await profileModel.getProfileAsync(userId);
    const processedResult = results.map((obj) => {
      if (obj.images !== null) {
        obj.images = `${APP_URL}/${obj.images}`
      }
      return obj
    })
    if (results) {
      response(res, 'profile', processedResult);
    } else {
      response(res, 'data not found', null, null, 404);
    }
  } catch (err) {
    response(res, 'unexpected error', null, null, 500);
  }
};

module.exports = { getProfile };