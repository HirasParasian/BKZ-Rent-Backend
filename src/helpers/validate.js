exports.validateVehicles = (data) => {
  var result = ""
  const { name, category, price, location, stock, image, isAvailable } = data
  if (name == null || name == "") {
    result = { name: "Invalid Input Name" }
  }
  if (price == null || price == "" || (isNaN(Number(price)))) {
    result = { ...result, price: "Invalid Input price" }
  }
  if (location == null || location == "") {
    result = { ...result, location: "Invalid Input Location" }
  }
  if (category == null || category == "" || category < 1 || category > 3) {
    result = { ...result, categoryId: "Invalid Input Category ID" }
  }
  // if (isAvailable == null || isAvailable == "" || isAvailable > 1 || isAvailable < 0) {
  //   result = { ...result, isAvailable: "Invalid Input isAvailable" }
  // }
  if (stock == null || stock == "") {
    result = { ...result, stock: "Invalid Input stock" }
  }
  // if (image == null || image == "") {
  //   result = { ...result, image: "Invalid Input image" }
  // }

  return result
}

exports.validateUsers = (data) => {
  var result = ""
  const { fullName, email, password, gender, address, mobileNumber, birthDate, displayName } = data
  if (fullName == null || fullName == "") {
    result = { ...result, fullName: "Invalid Input Full Name" }
  }
  // if (email == null || email == "") {
  //   result = { ...result, email: "Invalid Input email" }
  // }
  if (password == null || password == "") {
    result = { ...result, password: "Invalid Input password" }
  }
  if (gender !== "Male") {
    if (gender !== "male") {
      if (gender !== "Female") {
        if (gender !== "female") {
          result = { ...result, gender: "Invalid Input gender" }
        } else {
          result = { ...result, gender: "Invalid Input gender" }
        }
      } else {
        result = { ...result, gender: "Invalid Input gender" }
      }
    } else {
      result = { ...result, gender: "Invalid Input gender" }
    }
    result = { ...result, gender: "Invalid Input gender" }
  }
  if (address == null || address == "") {
    result = { ...result, address: "Invalid Input address" }
  }
  if (birthDate == null || birthDate == "") {
    result = { ...result, birthDate: "Invalid Input Birth Date" }
  }
  if (displayName == null || displayName == "") {
    result = { ...result, displayName: "Invalid Input Display Name" }
  }
  return result
}

exports.validateRegister = (data) => {
  var result = ""
  const { fullName, email, password, mobileNumber } = data
  if (fullName == null || fullName == "") {
    result = { ...result, fullName: "Invalid Input Full Name" }
  }
  // if (email == null || email == "") {
  //   result = { ...result, email: "Invalid Input email" }
  // }
  if (password == null || password == "") {
    result = { ...result, password: "Invalid Input password" }
  }
  
  if (mobileNumber == null || mobileNumber == "") {
    result = { ...result, mobileNumber: "Invalid Input Mobile Number" }
  }

  return result
}
exports.validateHistory = (data) => {
  var result = ""
  const { userId, vehicleId, rentStartDate, rentEndDate, prepayment } = data
  if (userId == null || userId == "") {
    result = { ...result, userId: "Invalid Input  Id user" }
  } else if (isNaN(Number(userId))) {
    result = { ...result, idUser: "Invalid Input  Id user" }
  }

  if (vehicleId == null || vehicleId == "") {
    result = { ...result, vehicleId: "Invalid Input Id vehicle" }
  } else if (isNaN(Number(vehicleId))) {
    result = { ...result, vehicleId: "Invalid Input  Id vehicle" }
  }

  if (rentStartDate == null || rentStartDate == "") {
    result = { ...result, rentStartDate: "Invalid Input Rent Start date" }
  }
  if (rentEndDate == null || rentEndDate == "") {
    result = { ...result, rentEndDate: "  Start Rent End date" }
  }


  return result
}

exports.validationPageInfoAsync = (pageInfo) => {
  var result = ""
  const { page, limit } = pageInfo

  if (isNaN(Number(page))) {
    result = { ...result, page: "Invalid Input Page" }
  } else if (page <= 0) {
    result = { ...result, page: "Page must > 0." }
  }

  if (isNaN(Number(limit))) {
    result = { ...result, limit: "Invalid Input Limit" }
  } else if (limit <= 0) {
    result = { ...result, limit: "Limit must > 0." }
  }
  return result
}

// exports.validationPageInfoAsync = (pageInfo) => new Promise ((resolve)=>{
//   var result = ""
//   const { page, limit } = pageInfo

//   if (Number(parseInt(page))) {
//     resolve (result = { ...result, page: "Invalid Input Page" })
//   } else if (page == 0) {
//     resolve (result = { ...result, page: "Page must be grather then 0." })
//   }

//   if (Number(parseInt(limit))) {
//     resolve (result = { ...result, limit: "Invalid Input Limit" })
//   } else if (limit == 0) {
//     resolve (result = { ...result, limit: "Limit must be grather than 0." })
//   }
  
// }) 