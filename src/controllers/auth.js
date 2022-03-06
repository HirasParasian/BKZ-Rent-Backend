const response = require("../helpers/response")
const userModel = require("../models/users")
const forgotModel = require("../models/forgotRequest")
const emailModel = require("../models/emailVerify")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mail = require("../helpers/mail")
const { APP_SECRET, APP_EMAIL } = process.env

exports.login = async (req, res) => {
  const { username, password } = req.body

  const result = await userModel.getUserByUsername(username)
  console.log(result)
  if (result.length > 0) {
    if (result[0].emailVerify == 1) {
      const { password: hash } = result[0]
      const fin = await bcrypt.compare(password, hash)
      if (fin) {
        const data = { userId: result[0].userId }
        const token = jwt.sign(data, APP_SECRET)
        console.log(token)
        return response(res, "Login success!", [token])
      } else {
        return response(res, "Wrong username or password1!", null, 403)
      }
    } else {
      return response(res, "Please Verify Email", null, 403)
    }
  } else {
    return response(res, "Wrong username or password2!", null, 403)
  }
}

exports.verify = (req, res) => {
  const auth = req.headers.authorization
  if (auth.startsWith("Bearer")) {
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET)
        req.user = payload
        console.log(token)
        if (payload) {
          return response(res, "User verified!")
        } else {
          return response(res, "User not verified!", null, null, null, 403)
        }
      } catch (err) {
        return response(res, "User not verified!", null, null, null, 403)
      }
    }
  }
}

exports.forgotPassword = async (req, res) => {
  const { email, code, password, confirmPassword } = req.body
  if (!code) {
    const user = await userModel.getUserByUsername(email)

    if (user.length === 1) {
      const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000)
      const reset = await forgotModel.createRequest(user[0].UserId, randomCode)
      if (reset.affectedRows >= 1) {
        const info = await mail.sendMail({
          from: APP_EMAIL,
          to: email,
          subject: "Reset Your Password | Backend Beginner",
          text: String(randomCode),
          html: `<b>${randomCode}</b>`
        })
        console.log(info.messageId)
        return response(res, "Forgot Password request has been sent to your email!")
      } else {
        return response(res, "Unexpected Error", null, 500)
      }
    } else {
      return response(res, "If you registered, reset password code will sended to your email!")
    }
  } else {
    if (email) {
      const result = await forgotModel.getRequest(code)
      console.log(result)
      if (result.length === 1) {
        if (result[0].isExpired) {
          return response(res, "Expired code", null, 400)
        }
        const user = await userModel.getUserById(result[0].userId)
        if (user[0].email === email) {
          if (password) {
            if (password === confirmPassword) {
              const salt = await bcrypt.genSalt(10)
              const hash = await bcrypt.hash(password, salt)
              const update = await userModel.updateUser({ password: hash }, user[0].userId)
              if (update.affectedRows === 1) {
                await forgotModel.updateRequest({ isExpired: 1 }, result[0].id)
                return response(res, "Password Has Been Reset!")
              } else {
                return response(res, "Reset Password Failed", null, 500)
              }
            } else {
              return response(res, "Confirm Password Not Same as Password", null, 400)
            }
          } else {
            return response(res, "Null Password Detected", null, 400)
          }
        } else {
          return response(res, "Invalid Email", null, 400)
        }
      } else {
        return response(res, "Invalid code", null, 400)
      }
    } else {
      return response(res, "You have to provide Confirmation Code", null, 400)
    }
  }
}



exports.emailVerify = async (req, res) => {
  const { email, code } = req.body
  if (!code) {
    const user = await userModel.getUserByUsername(email)

    if (user.length === 1) {
      const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000)
      const reset = await emailModel.createRequest(user[0].UserId, randomCode)
      if (reset.affectedRows >= 1) {
        const info = await mail.sendMail({
          from: APP_EMAIL,
          to: email,
          subject: "Verify code | Backend Beginner",
          text: String(randomCode),
          html: `<b>${randomCode}</b>`
        })
        console.log(info.messageId)
        return response(res, "Verify code has been sent to your email!")
      } else {
        return response(res, "Unexpected Error", null, 500)
      }
    } else {
      return response(res, "If you registered, Verify code will sended to your email!")
    }
  } else {
    if (email) {
      const result = await emailModel.getRequest(code)
      console.log(result)
      if (result.length === 1) {
        if (result[0].isExpired) {
          return response(res, "Expired code", null, 400)
        }
        const user = await userModel.getUserById(result[0].userId)
        if (user[0].email === email) {
          await emailModel.updateRequest({ isExpired: 1 }, result[0].id)
          await emailModel.updateVerify(result[0].userId)
          return response(res, "Email Verify Success")
        } else {
          return response(res, "Invalid Email", null, 400)
        }
      } else {
        return response(res, "Invalid Verify code", null, 400)
      }
    } else {
      return response(res, "You have to provide Verify Code", null, 400)
    }
  }
}
