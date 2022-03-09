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
      response(res, 'profile', processedResult[0]);
    } else {
      response(res, 'data not found', null, null, 404);
    }
  } catch (err) {
    response(res, 'unexpected error', null, null, 500);
  }
};

const editProfile = async (req, res) => {
  try {
    let { userId } = req.query;
    console.log(req.body);
    let { fullName, gender, email, address, mobileNumber, displayName, birthDate, username } = req.body;
    let data = {};
    let fillable = ['fullName', 'gender', 'email', 'address', 'mobileNumber', 'displayName', 'birthDate', 'username'];
    fillable.forEach(obj => {
      if (req.body[obj]) {
        data[obj] = req.body[obj];
      }
    });
    userId = parseInt(userId) || 0;
    const result = await usersModel.getUserById(userId);
    if (result.length > 0) {
      const resultS = await usersModel.searchUserAsyn(data);
      if (resultS[0].userId == userId) {
        const results = await usersModel.patchUserAsyn(userId, data);
        const final = await usersModel.getUserAsyn(userId);
        response(res, 'Data has been updated', final);
      } else {
        response(res, 'Bad request. Cek your id, username and email', null, null, 400);
      }
    } else {
      response(res, 'Data not found');
    }
  } catch (err) {
    response(res, 'Unexpected error', null, null, 500);
  }
};

module.exports = { getProfile, editProfile };