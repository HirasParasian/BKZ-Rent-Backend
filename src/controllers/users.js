const usersModel = require("../models/users")
const { APP_URL } = process.env
const validate = require("../helpers/validate")
const bcrypt = require("bcrypt")
const response = require("../helpers/response")
const upload = require("../helpers/upload").single("images")

const readUsers = (req, res) => {
  let { search, page, limit, userId } = req.query
  search = search || ""
  page = Number(page) || 1
  limit = Number(limit) || 5
  let offset = (page - 1) * limit
  const data = { search, limit, offset, userId }

  usersModel.readUsers(data, (results) => {
    usersModel.countUsers(data, (count) => {
      const processedResult = results.map((obj) => {
        if (obj.images !== null) {
          obj.images = `${APP_URL}/${obj.images}`
        }
        return obj
      })
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List User",
          results: processedResult,
          pageInfo: {
            prev: page > 1 ? `http://localhost:5000/users?page=${page - 1}&limit=${limit}` : null,
            next: page < last ? `http://localhost:5000/users?page=${page + 1}&limit=${limit}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        })
      }
      return res.status(404).json({
        success: false,
        message: "List not found"
      })
    })
  })
}



const searchUsers = (req, res) => {
  const {
    userId
  } = req.params
  usersModel.searchUsers(userId, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: "Detail User",
        results: results[0],

      })
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
  })
}


const createUsers = (req, res) => {
  upload(req, res, async function () {
    const {
      fullName, role, username, email, password: plainPassword, gender, address, mobileNumber, birthDate, displayName, images: images
    } = req.body
    if (req.file) {
      req.body.images = req.file.path
    }
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(plainPassword, salt)

    if (req.file) {
      req.body.images = req.file.path
    }
    const result = await usersModel.getEmailAsync(email)
    if (result.length == 0) {
      const result = await usersModel.getUsernameAsync(username)
      if (result.length == 0) {
        const results = await usersModel.createUsersAsync({ fullName, role, username, email, password, gender, address, mobileNumber, birthDate, displayName, images })
        if (results.affectedRows > 0) {
          usersModel.searchUsers(results.insertId, (fin) => {
            // eslint-disable-next-line no-unused-vars
            const mapResults = fin.map(o => {
              if (o.images !== null) {
                o.images = `${APP_URL}/${o.images}`
              }
              return o
            })
            return response(res, "Register Successfully", null, 200)
          })
        } else {
          return res.status(500).json({
            success: false,
            message: "Data Users failed to create"
          })
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Username has already used"
        })
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email has already used"
      })
    }
  })
}

const register = async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return response(res, "error", null, 400)
    }
    const newData = {
      ...req.body
    }
    newData.password = bcrypt.hashSync(newData.password, 10)
    if (req.file) {
      newData.images = req.file.path
    }
    usersModel.getEmail(newData.email, (result) => {
      if (result.length == 0) {
        usersModel.getUsername(newData.username, (result) => {
          if (result.length == 0) {
            usersModel.getPhone(newData.mobileNumber, (result) => {
              if (result.length == 0) {
                usersModel.createUsers(newData, (results) => {
                  usersModel.searchUsers(results.insertId, (fin) => {
                    // eslint-disable-next-line no-unused-vars
                    const mapResults = fin.map(o => {
                      if (o.images !== null) {
                        o.images = `${APP_URL}/${o.images}`
                      }
                      return o
                    })
                    return response(res, "Register Successfully", null, 200)
                  })
                })
              } else {
                return response(res, "Mobile Number has Already Used", null, 400)
              }
            })
          } else {
            return response(res, "Username has Already Used", null, 400)
          }
        })

      } else {
        return response(res, "Email has Already Used", null, 400)
      }
    })
  })
}

const updateUsers = (req, res) => {
  const { userId } = req.params
  if (userId !== " ") {
    const update = {
      ...req.body
    }

    usersModel.searchUsers(userId, (result) => {
      if (result.length > 0) {
        if (validate.validateUsers(update) == "") {
          usersModel.getEmail(update.email, (result) => {
            if (result.length == 0) {
              usersModel.updateUsers(userId, update, (results) => {
                if (results.affectedRows > 0) {
                  return res.status(400).json({
                    success: false,
                    message: "Update Successfully"
                  })
                } else {
                  return res.status(400).json({
                    success: false,
                    message: "Update Failed"
                  })
                }
              })
            } else {
              return res.status(400).json({
                success: false,
                message: "Email has already used"
              })
            }
          })
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid Data Vehicle"
          })
        }

      } else {
        return res.status(400).json({
          success: false,
          message: "User Not Found"
        })
      }
    })

  } else {
    return res.status(400).json({
      success: false,
      message: "Null ID Detected"
    })
  }
}

const deleteUsers = (req, res) => {
  const { userId } = req.params
  if (userId !== " ") {
    usersModel.searchUsers(userId, (result) => {
      if (result.length > 0) {
        usersModel.deleteUsers(userId, (results) => {
          if (results.affectedRows > 0) {
            return res.json({
              success: true,
              message: "Deleted successfully",
              results: result
            })
          } else {
            return res.status(500).json({
              success: true,
              message: "Delete failed "
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: "Data User not found."
        })
      }
    })
  } else {
    return res.status(400).json({
      success: false,
      message: "Null Id Detected"
    })
  }
}
const profileUsers = (request, response) => {
  const { userId } = request.params
  usersModel.profileUsers(userId, (result) => {
    if (result.length > 0) {
      return response.json({
        success: true,
        results: result,
      })
    } else {
      return response.status(404).json({
        success: false,
        message: "Data not found.",
      })
    }
  })
}


module.exports = {
  readUsers,
  searchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  profileUsers,
  register
}