const response = require("../helpers/response")
const myHistoryeModel = require('../models/myHistory');
const validate = require("../helpers/validate")
const jwt_decode = require("jwt-decode");
const { APP_URL } = process.env

const getMyHistorys = async (req, res) => {
  try {
    let { search, page, limit } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page - 1) * limit
    const data = { search, limit, offset }
    let { userId } = req.userData
    // console.log(userId)

    const results = await myHistoryeModel.getMyHistoryAsync(userId,data);
    // console.log(results)
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${APP_URL}/${obj.image}`
      }
      return obj
    })
    console.log(processedResult.length)
    const { total } = count[0]
    console.log(total)
    const last = Math.ceil(total / limit)
    // const pageInfo = {
    //   // prev: page > 1 ? `http://localhost:5000/vehicles?search=${search}&category=${category}&page=${page - 1}&limit=${limit}&sort=${sort}` : null,
    //   // next: page < last ? `http://localhost:5000/vehicles?search=${search}&category=${category}&page=${page + 1}&limit=${limit}&sort=${sort}` : null,
    //   // totalData: total,
    //   // currentPage: page,
    //   // lastPage: last
    // }
    // console.log(processedResult)
    if (processedResult.length>0) {
        return response(res, "List Vehicle", processedResult, 200)
    } else {
      response(res, 'data not found');
    }
  } catch (err) {
    response(res, 'unexpected error');
  }
};


const getMyHistory = async (req, res) => {
  let { search, page, limit, sort, order } = req.query
  let { userId } = req.userData
  sort = sort || "name"
  order = order || "DESC"
  search = search || ""
  page = ((page != null && page !== "") ? Number(page) : 1)
  limit = ((limit != null && limit !== "") ? Number(limit) : 4)
  let offset = (page - 1) * limit
  const data = { search, limit, offset, sort, order, page }
  if (validate.validationPageInfoAsync(data) == "") {
    const results = await myHistoryeModel.getMyHistoryAsync(userId,data)
    const count = await myHistoryeModel.countMyHistoryAsync(userId)
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        console.log(obj.image)
        if(obj.image.startsWith("https")){
          obj.image = obj.image
        }else{
          obj.image = `http://192.168.100.8:5000/${obj.image}`
        }
        obj.image = obj.image.replace('\\', '/')
      }
      return obj
    })
    const { total } = count[0]
    const last = Math.ceil(total / limit)
    const pageInfo = {
      prev: page > 1 ? `http://localhost:5000/history?page=${page - 1}&limit=${limit}&search=${search}` : null,
      next: page < last ? `http://localhost:5000/history?page=${page + 1}&limit=${limit}&search=${search}` : null,
      totalData: total,
      currentPage: page,
      lastPage: last
    }
    if (results.length > 0) {
      return response(res, "List Vehicle", processedResult, 200, pageInfo)
    }
    return response(res, "Empty History", null, 404)
  } else {
    return response(res, "List Vehicle", null, 200, null, validate.validationPageInfoAsync(data))
  }
}

const deleteHistory = (req, res) => {
  const { historyId } = req.params
  myHistoryeModel.searchHistory(historyId, (result) => {
      if (result.length > 0) {
        myHistoryeModel.deleteHistory(historyId, (results) => {
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
          message: "Data History not found."
        })
      }
    })
}

const searchHistory = (req, res) => {
  const {
    historyId
  } = req.params
  myHistoryeModel.searchHistory(historyId, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: "Detail History",
        results: results[0],

      })
    } else {
      return res.status(404).json({
        success: false,
        message: "History not found"
      })
    }
  })
}

const searchRating = (req, res) => {
  const {
    vehicleId
  } = req.params
  myHistoryeModel.searchRating(vehicleId, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: "Rating Generated",
        results: results[0],

      })
    } else {
      return res.status(404).json({
        success: false,
        message: "History not found"
      })
    }
  })
}

const updateRating = (req, res) => {
  const update = {
    ...req.body
  }
  const { historyId } = req.params
  console.log(historyId)
  myHistoryeModel.updateRating(update, historyId, results => {
    if (results.changedRows > 0) {
      return res.json({
        success: true,
        message: "Rating Created"
      })
    } else {
      return res.status(404).json({
        success: false,
        message: "Failed to Change"
      })
    }
  })
}


module.exports = { getMyHistory,deleteHistory,searchHistory,updateRating,searchRating };