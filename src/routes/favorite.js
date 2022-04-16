const favorite = require("express").Router()
const { verify } = require('../helpers/auth');
const { verifyUser } = require('../helpers/auth');
const cors = require('cors');

const {
  createFavorite,
  getFavorite,
  searchFavorite,
  deleteFavorite,
  getMyFavorite
} = require("../controllers/favorite")

favorite.post("/",cors(), createFavorite)
favorite.get("/search/:id",cors(), searchFavorite)
favorite.get("/",verify,cors(), getFavorite)
favorite.get("/my-favorite",cors(),verify, getMyFavorite)
favorite.delete("/:id",cors(), deleteFavorite)



module.exports = favorite