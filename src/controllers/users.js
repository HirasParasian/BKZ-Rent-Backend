const usersModel = require("../models/users")
const validate = require("../helpers/validate")

const readUsers = (req, res) => {
    let { search, page, limit, user_id } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { search, limit, offset, user_id }

    usersModel.readUsers(data,(results)=>{
        usersModel.countUsers(data,(count)=>{
            const {total} = count[0]
            const last = Math.ceil(total /limit)
            if (results.length > 0){
                return res.status(200).json({
                    success: true,
                    message: "List User",
                    results: results,
                    pageInfo:{
                        prev: page > 1 ? `http://localhost:5000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:5000/vehicles?page=${page+1}`: null ,
                        totalData : total,
                        currentPage : page,
                        lastPage : last
                    }
                })
            }
            return res.status(404).json({
                success: false,
                message: "List not found"
            })
        })
    })
}


const searchUsers = (req, res) => {
    const {
        displayName
    } = req.params
    usersModel.searchUsers(displayName, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: "Detail User",
                results: results[0],
                
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    })
}

const createUsers = (req, res) => {
    const newData = {
        ...req.body
    }
    if (validate.validateUsers(newData) == "") {
        usersModel.getEmail(newData.email, (result) => {
            if (result.length == 0) {
                usersModel.createUsers(newData, (results) => {
                    if (results.affectedRows > 0) {
                        return res.json({
                            success: true,
                            message: "Data Users created successfully",
                            results: newData
                        })
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: "Data Users failed to create"
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Email has already used"
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Data User was not valid",
            error: validate.validateUsers(newData)
        })
    }
}

const updateUsers = (req, res) => {
    const { user_id } = req.params
    if (user_id !== " ") {
        const update = {
            ...req.body
        }

        usersModel.searchUsers(user_id, (result) => {
            if (result.length > 0) {
                if (validate.validateUsers(update) == "") {
                    usersModel.getEmail(update.email, (result) => {
                        if (result.length == 0) {
                            usersModel.updateUsers(user_id, update, (results) => {
                                if (results.affectedRows > 0) {
                                    return res.status(400).json({
                                        success: false,
                                        message: "Update Successfully"
                                    })
                                } else {
                                    return res.status(400).json({
                                        success: false,
                                        message: "Update Failed"
                                    })
                                }
                            })
                        } else {
                            return res.status(400).json({
                                success: false,
                                message: "Email has already used"
                            })
                        }
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid Data Vehicle"
                    })
                }

            } else {
                return res.status(400).json({
                    success: false,
                    message: "User Not Found"
                })
            }
        })

    } else {
        return res.status(400).json({
            success: false,
            message: "Null ID Detected"
        })
    }
}

const deleteUsers = (req, res) => {
    const {user_id} = req.params
    if (user_id !== " ") {
        usersModel.searchUsers(user_id, (result) => {
            if (result.length > 0) {
                usersModel.deleteUsers(user_id, (results) => {
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
                    message: "Data User not found."
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Null Id Detected"
        })
    }
}

module.exports = {
    readUsers,
    searchUsers,
    createUsers,
    updateUsers,
    deleteUsers
}