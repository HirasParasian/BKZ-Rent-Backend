const usersModel = require("../models/users")


const readUsers = (req, res) => {
    usersModel.readUsers(results => {
        return res.status(200).json({
            success: true,
            message: "List Users",
            results: results
        })
    })
}

const searchUsers = (req, res) => {
    const {
        users_id
    } = req.params
    usersModel.searchUsers(users_id, results => {
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

const createUsers = (req, res) => {
    const newData = {
        ...req.body
    }
    usersModel.createUsers(newData, results => {
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

const updateUsers = (req, res) => {
    const update = {
        ...req.body
    }
    const {user_id} = req.params
    usersModel.updateUsers(update, user_id, results => {
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

const deleteUsers = (req, res) => {
    const {user_id} = req.params
    usersModel.deleteUsers(user_id, results => { 
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
    readUsers,
    searchUsers,
    createUsers,
    updateUsers,
    deleteUsers
}