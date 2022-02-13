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
  if (isAvailable == null || isAvailable == "" || isAvailable > 1 || isAvailable < 0) {
    result = { ...result, isAvailable: "Invalid Input isAvailable" }
  }
  if (stock == null || stock == "" || (isNaN(Number(stock)))) {
    result = { ...result, stock: "Invalid Input stock" }
  }
  if (image == null || image == "") {
    result = { ...result, image: "Invalid Input image" }
  }

  return result
}

exports.validateUsers = (data) => {
  var result = ""
  const { fullName, email, password, gender, address, mobileNumber, birthDate, displayName } = data
  if (fullName == null || fullName == "") {
    result = { ...result, fullName: "Invalid Input Full Name" }
  }
  if (email == null || email == "") {
    result = { ...result, email: "Invalid Input email" }
  }
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
  if (mobileNumber == null || mobileNumber == "") {
    result = { ...result, mobileNumber: "Invalid Input Mobile Number" }
  }
  if (birthDate == null || birthDate == "") {
    result = { ...result, birthDate: "Invalid Input Birth Date" }
  }
  if (displayName == null || displayName == "") {
    result = { ...result, displayName: "Invalid Input Display Name" }
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
  if (prepayment == null || prepayment == "") {
    result = { ...result, prepayment: "Invalid Input Prepayment" }
  } else if (isNaN(Number(prepayment))) {
    result = { ...result, prepayment: "Invalid Input Prepayment" }
  }

  return result
}