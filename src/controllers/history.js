const historyModel = require("../models/history")
const validate = require("../helpers/validate")


const readHistory = (req, res) => {
    let { search, page, limit } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { search, limit, offset }

    historyModel.readHistory(data,(results)=>{
        historyModel.countHistory(data,(count)=>{
            const {total} = count[0]
            const last = Math.ceil(total /limit)
            if (results.length > 0){
                return res.status(200).json({
                    success: true,
                    message: "List History",
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
    if (validate.validateHistory(newData) == "") {
        historyModel.createHistory(newData, (result) => {
            if (result.affectedRows > 0) {
                return res.json({
                    success: true,
                    message: "Data history created successfull.",
                    results: newData
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Data history failed to create."
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Data history not valid.",
            error: validate.validateHistory(newData)
        })
    }
}

const updateHistory = (req, res) => {
    const {history_id} = req.params
    if (history_id !== " ") {
        const update = {
            ...req.body
        }
        historyModel.searchHistory(history_id, (resultDataHistory) => {
            if (resultDataHistory.length > 0) {
                if (validate.validateHistory(update) == "") {
                    historyModel.updateHistory(history_id, update, (result) => {
                        if (result.affectedRows > 0) {
                            return res.json({
                                success: true,
                                message: "Update successfull.",
                                results: update
                            })
                        } else {
                            return res.status(500).json({
                                success: false,
                                message: "failed to update.",
                            })
                        }
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "invalid Data history",
                        error: validate.validateHistory(update)
                    })

                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Data not found",
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Id Null Detected"
        })
    }
}

const deleteHistory = (req, res) => {
    const {history_id} = req.params
    if (history_id !== " ") {
        historyModel.searchHistory(history_id, (result) => {
            if (result.length > 0) {
                historyModel.deleteHistory(history_id, (results) => {
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
                    message: "Data History not found."
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

const readHistorybyName = (req, res) => {
    let { search, page, limit } = req.query
    search = search || ""
    page = Number(page) || 1
    limit = Number(limit) || 5
    let offset = (page -1) * limit 
    const data = { search, limit, offset }

    historyModel.readHistoryByName(data,(results)=>{
        historyModel.countHistoryByName(data,(count)=>{
            const {total} = count[0]
            const last = Math.ceil(total /limit)
            if (results.length > 0){
                return res.status(200).json({
                    success: true,
                    message: "List History",
                    results,
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

module.exports = {
    readHistory,
    searchHistory,
    createHistory,
    updateHistory,
    deleteHistory,
    readHistorybyName
}