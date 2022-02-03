
exports.vehiclesValid = (data) => {
    const error = ""

    if (data.name === undefined || data.name.length === 0) {
        error.push("Wrong Name")
    }
    if (data.name.length > 80) {
        error.push("Name is to long")
    }

    if (data.description === undefined || data.description.length === 0) {
        error.push("Wrong Description")
    } else if (data.description.length > 30) {
        error.push("Description is to long")
    }

    if (data.location === undefined || data.location.length === 0) {
        error.push("Wrong Location")
    } else if (data.location.length > 100) {
        error.push("Location is to long")
    }

    if (data.stock === undefined|| data.stock !== "number") {
        error.push("Wrong Stock Input")
    }
    if (data.price === undefined|| data.price !== "number") {
        error.push("Wrong Stock price")
    }
    return error
}

function validVehicles (req,res){
    const price = Number(req.body.price) || null
    const stock = Number(req.body.price) || null
    if (!price){
        return  res.send({
            success : false,
            message : "invalid input price"
        })
    }
    if (!stock){
        return  res.send({
            success : false,
            message : "invalid input stock"
        })
    }
}


module.exports = {validVehicles}