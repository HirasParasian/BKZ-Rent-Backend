const category = require("express").Router()
const cors = require('cors');

const { readCategory,
  searchCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category")

category.get("/",cors(), readCategory)
category.get("/:categoryId",cors(), searchCategory)
category.post("/create",cors(), createCategory)
category.patch("/update/:categoryId",cors(), updateCategory)
category.delete("/delete/:categoryId",cors(), deleteCategory)


module.exports = category