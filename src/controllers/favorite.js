const favoriteModel = require("../models/favorite")
const response = require("../helpers/response")
const validate = require("../helpers/validate")
const { APP_URL } = process.env


const getFavorite = async (req, res) => {
  try {
    let { userId } = req.userData
    console.log(userId)
    const results = await favoriteModel.getFavoriteAsync(userId);
    if (results) {
      response(res, 'favorite', results);
    } else {
      response(res, 'data not found');
    }
  } catch (err) {
    response(res, 'unexpected error');
  }
};

const getMyFavorites = async (req, res) => {
  try {
    let { userId } = req.userData
    console.log(userId)
    const results = await favoriteModel.getMyFavoriteAsync(userId);
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `http://192.168.100.8:5000/${obj.image}`
      }
      return obj
    })
    if (results) {
      response(res, 'My Favorite', processedResult);
    } else {
      response(res, 'data not found');
    }
  } catch (err) {
    response(res, 'unexpected error');
  }
};


const createFavorite = (req, res) => {
  const newData = {
    ...req.body
  }
try{
  favoriteModel.createFavorite(newData, (results) => {
    console.log(results)
    if (results.affectedRows > 0) {
      return res.json({
        success: true,
        message: "Favorite Created",
        results: newData
      })
    } else {
      return res.status(500).json({
        success: false,
        message: "Add Favorite Failed"
      })
    }
    })
  }catch(e){
    console.log(e)
  }
}

const searchFavorite = (req, res) => {
  const {
    id
  } = req.params
  favoriteModel.searchFavorite(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: "Detail Favorite",
        results: results[0],

      })
    } else {
      return res.status(404).json({
        success: false,
        message: "Favorite not found"
      })
    }
  })
}

const deleteFavorite = (req, res) => {
  const { id } = req.params
    favoriteModel.searchFavorite(id, (result) => {
      if (result.length > 0) {
        favoriteModel.deleteFavorite(id, (results) => {
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
          message: "Data Favorite not found."
        })
      }
    })
}

const getMyFavorite = async (req, res) => {
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
    const results = await favoriteModel.getMyFavoriteAsync(userId,data)
    const count = await favoriteModel.countMyFavoriteAsync(userId)
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `http://192.168.100.8:5000/${obj.image}`
        obj.image = obj.image.replace('\\', '/')
      }
      return obj
    })
    const { total } = count[0]
    const last = Math.ceil(total / limit)
    const pageInfo = {
      prev: page > 1 ? `http://localhost:5000/favorite/my-favorite?page=${page - 1}&limit=${limit}&search=${search}` : null,
      next: page < last ? `http://localhost:5000/favorite/my-favorite?page=${page + 1}&limit=${limit}&search=${search}` : null,
      totalData: total,
      currentPage: page,
      lastPage: last
    }
    if (results.length > 0) {
      return response(res, "List Vehicle", processedResult, 200, pageInfo)
    }
    return response(res, "Empty Favorite", null, 404)
  } else {
    return response(res, "List Vehicle", null, 200, null, validate.validationPageInfoAsync(data))
  }
}
module.exports = {
  getFavorite,
  createFavorite,
  searchFavorite,
  deleteFavorite,
  getMyFavorite
}