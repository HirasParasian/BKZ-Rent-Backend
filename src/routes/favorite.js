const favorite = require("express").Router()
const { verify } = require('../helpers/auth');
const { verifyUser } = require('../helpers/auth');

const {
  createFavorite,
  getFavorite,
  searchFavorite,
  deleteFavorite,
  getMyFavorite
} = require("../controllers/favorite")

favorite.post("/", createFavorite)
favorite.get("/search/:id", searchFavorite)
favorite.get("/",verify, getFavorite)
favorite.get("/my-favorite",verify, getMyFavorite)
favorite.delete("/:id", deleteFavorite)



module.exports = favorite