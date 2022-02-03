const category = require("express").Router()

const { readCategory, 
    searchCategory, 
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category")

category.get("/", readCategory)
category.get("/:category_id", searchCategory)
category.post("/create", createCategory)
category.patch("/update/:category_id", updateCategory)
category.delete("/delete/:category_id", deleteCategory)


module.exports = category