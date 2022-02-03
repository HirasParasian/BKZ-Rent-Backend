const categoryModel = require("../models/category")


const readCategory = (req, res) => {
    categoryModel.readCategory(results => {
        return res.status(200).json({
            success: true,
            message: "List Users",
            results: results
        })
    })
}

const searchCategory = (req, res) => {
    const {
        category_id
    } = req.params
    categoryModel.searchCategory(category_id, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: "Detail Vehicle",
                results: results[0],
                
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        }
    })
}

const createCategory = (req, res) => {
    const newData = {
        ...req.body
    }
    categoryModel.createCategory(newData, results => {
        if (results) {
            return res.json({
                success: true,
                message: "Success Insert Vehicle",
                data: newData
            })
        } else {
            return res.status(201).json({
                success: false,
                message: "Failed Insert Vehicle"
            })
        }
    })
}

const updateCategory = (req, res) => {
    const update = {
        ...req.body
    }
    const {category_id} = req.params
    categoryModel.updateCategory(update, category_id, results => {
        if(results.changedRows>0) {
            return res.json({
                success: true,
                message: "Edited Succesfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Edited Failed"
            })
        } 
    })
}

const deleteCategory = (req, res) => {
    const {category_id} = req.params
    categoryModel.deleteCategory(category_id, results => { 
        if(results.affectedRows == 1) {
            return res.json({
                success: true,
                message: "Deleted Successfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    })
}

module.exports = {
    readCategory,
    searchCategory,
    createCategory,
    updateCategory,
    deleteCategory
}