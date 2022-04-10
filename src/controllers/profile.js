const response = require("../helpers/response")
const profileModel = require('../models/profile');
const userModel = require('../models/users');
const jwt_decode = require("jwt-decode");
const { APP_URL } = process.env
const responseHandler = require('../helpers/responseHandler');
const { inputValidator, comparePassword } = require('../helpers/validator');
const { deleteFile } = require('../helpers/fileHandler');
const { cloudPathToFileName } = require('../helpers/converter');

const getProfile = async (req, res) => {
  try {
    let { userId } = req.user
    console.log(userId)
    const results = await profileModel.getProfileAsync(userId);
    const processedResult = results.map((obj) => {
      if (obj.images !== null) {
        
        obj.images = `http://192.168.100.8:5000/${obj.images}`
        // console.log(obj.images)
      }else if(obj.images === null){
        obj.images = null
      }
      return obj
    })
    if (results) {
      if(processedResult[0].images){
        processedResult[0].images = processedResult[0].images.replace('\\','/')
      }
      response(res, 'profile', processedResult[0]);
    } else {
      response(res, 'data not found', null, null, 404);
    }
  } catch (err) {
    response(res, 'unexpected error');
  }
};

const editProfile = async (req, res) => {
  try {
    let { userId } = req.query;
    // console.log(req.body);
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

const getProfiles = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId)
    const getProfile = await profileModel.getProfileAsync(userId);
    if (getProfile.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }

    return responseHandler(res, 200, 'Profile data', getProfile[0]);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

const updatesProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const results = await profileModel.getProfileAsync(userId);
    if (results.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error 1');
    }

    const fillable = [
      {
        field: 'fullName', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'username', required: false, type: 'varchar', max_length: 32,
      },
      {
        field: 'mobileNumber', required: false, type: 'varchar', max_length: 16,
      },
      {
        field: 'address', required: false, type: 'text',
      },
      {
        field: 'gender', required: false, type: 'enum', options: ['male', 'female'],
      },
      {
        field: 'birthDate', required: false, type: 'date',
      },
    ];

    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      if (req.file) {
        try {
          deleteFile(req.file.path);
        } catch (err) {
          return responseHandler(res, 500, null, null, err.message);
        }
      }
      return responseHandler(res, 400, null, null, error);
    }

    data.userId = results[0].userId;
    if (req.file) {
      data.images = req.file.path;
    }

    const editProfileData = await profileModel.editProfile(data, userId);
    if (editProfileData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error 2');
    }
    const updatedData = await profileModel.getProfileAsync(userId);
    if (updatedData.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error 3');
    }
    return responseHandler(res, 200, `User with id ${userId} has been updated`, updatedData[0]);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error 4!');
  }
};


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log(userId)
    const getProfiles = await profileModel.getProfileAsync(userId);
    // console.log(getProfiles)
    if (getProfiles.length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const fillable = [
      {
        field: 'fullName', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: false, type: 'email', max_length: 100,
      },
      {
        field: 'mobileNumber', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'birthDate', required: false, type: 'varchar', max_length: 14,
      },
      {
        field: 'address', required: false, type: 'text',
      },
      {
        field: 'images', required: false,
      },
    ];
    console.log(fillable)
    const { error, data } = inputValidator(req, fillable);
    console.log(data)
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }

    if (req.file) {
      data.image = req.file.path;
    }

    if (Object.keys(data).length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'All new data cannot be empty');
    }


    if (data.images) {
      if (getProfile[0].images) {
        deleteFile(cloudPathToFileName(getProfile[0].images));
      }
    }
    
    const editUserData = await userModel.patchUserAsyn(userId, data);
    console.log(editUserData)
    if (editUserData.affectedRows === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Unexpected Error 1 ');
    }
    const updatedData = await userModel.getUser(userId);
    console.log(updatedData)
    if (updatedData.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error 2');
    }

    return responseHandler(res, 200, 'Profile updated!', updatedData[0]);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error 3');
  }
};


const patchProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.file)
    const results = await profileModel.getProfileAsync(userId);
    if (results.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }

    const fillable = [
      {
        field: 'fullName', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'email', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'username', required: false, type: 'varchar', max_length: 32,
      },
      {
        field: 'mobileNumber', required: false, type: 'varchar', max_length: 16,
      },
      {
        field: 'address', required: false, type: 'text',
      },
      {
        field: 'gender', required: false, type: 'enum', options: ['male', 'female'],
      },
      {
        field: 'birthDate', required: false, type: 'date',
      },
      {
        field: 'images', required: false, type: 'varchar',
      },
    ];

    const { error, data } = inputValidator(req, fillable);
    console.log(data)
    if (error.length > 0) {
      if (req.file) {
        try {
          deleteFile(req.file.path);
        } catch (err) {
          return responseHandler(res, 500, null, null, err.message);
        }
      }
      return responseHandler(res, 400, null, null, error);
    }

    data.userId = results[0].userId;
    // if (data.email) {
    //   const emailFound = await userModel.checkIfEmailUsedAsync(data);
    //   if (emailFound[0].rowsCount) {
    //     if (req.file) {
    //       try {
    //         deleteFile(req.file.path);
    //       } catch (err) {
    //         return responseHandler(res, 500, null, null, err.message);
    //       }
    //     }
    //     return responseHandler(res, 400, null, null, 'Email has already been used');
    //   }
    // }
    // if (data.username) {
    //   const usernameFound = await userModel.checkIfUsernameUsedAsync(data);
    //   if (usernameFound[0].rowsCount) {
    //     if (req.file) {
    //       try {
    //         deleteFile(req.file.path);
    //       } catch (err) {
    //         return responseHandler(res, 500, null, null, err.message);
    //       }
    //     }
    //     return responseHandler(res, 400, null, null, 'Username has already been used');
    //   }
    // }
    // if (data.phone_number) {
    //   const phoneNumberFound = await userModel.checkIfPhoneNumberUsedAsync(data);
    //   if (phoneNumberFound[0].rowsCount) {
    //     if (req.file) {
    //       try {
    //         deleteFile(req.file.path);
    //       } catch (err) {
    //         return responseHandler(res, 500, null, null, err.message);
    //       }
    //     }
    //     return responseHandler(res, 400, null, null, 'Phone number has already been used');
    //   }
    // }

    if (req.file) {
      // if (results[0].images) {
      //   try {
      //     deleteFile(results[0].images);
      //   } catch (err) {
      //     return responseHandler(res, 500, null, null, err.message);
      //   }
      // }
      data.images = req.file.path;
    }

    const editProfileData = await profileModel.editProfile(data,userId );
    if (editProfileData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error 1');
    }
    const updatedData = await profileModel.getProfileAsync(userId);
    if (updatedData.length === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error 2');
    }
    return responseHandler(res, 200, `User with id ${userId} has been updated`, updatedData[0]);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error 3');
  }
};

module.exports = { updateProfile,getProfile, editProfile,getProfiles,patchProfile,updatesProfile };