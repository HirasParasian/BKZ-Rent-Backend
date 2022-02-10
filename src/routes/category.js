const category = require("express").Router()

const { readCategory, 
    searchCategory, 
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category")

category.get("/", readCategory)
category.get("/:categoryId", searchCategory)
category.post("/create", createCategory)
category.patch("/update/:categoryId", updateCategory)
category.delete("/delete/:categoryId", deleteCategory)


module.exports = category