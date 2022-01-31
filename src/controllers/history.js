const historyModel = require("../models/history")


const readHistory = (req, res) => {
    historyModel.readHistory(results => {
        return res.status(200).json({
            success: true,
            message: "List Users",
            results: results
        })
    })
}

const searchHistory = (req, res) => {
    const {
        history_id
    } = req.params
    historyModel.searchHistory(history_id, results => {
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

const createHistory = (req, res) => {
    const newData = {
        ...req.body
    }
    historyModel.createHistory(newData, results => {
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

const updateHistory = (req, res) => {
    const update = {
        ...req.body
    }
    const {history_id} = req.params
    historyModel.updateHistory(update, history_id, results => {
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

const deleteHistory = (req, res) => {
    const {history_id} = req.params
    historyModel.deleteHistory(history_id, results => { 
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
    readHistory,
    searchHistory,
    createHistory,
    updateHistory,
    deleteHistory
}