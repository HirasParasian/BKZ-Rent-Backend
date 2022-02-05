exports.validateVehicles = (data) => {
    var result = ""
    const { name, category, price, location, stock, image, isAvailable } = data
    if (name == null || name == "") {
        result = { name: "Invalid Input Name" }
    }
    if (price == null || price == "" || (isNaN(Number(price)))) {
        result = {...result, price: "Invalid Input price" }
    }
    if (location == null || location == "") {
        result = {...result, location: "Invalid Input Location" }
    }
    if (category == null || category == "" || category < 1 || category > 3) {
        result = {...result, category_id: "Invalid Input Category ID" }
    }
    if (isAvailable == null || isAvailable == "" || isAvailable >1 || isAvailable < 0) {
        result = {...result, isAvailable: "Invalid Input isAvailable" }
    }
    if (stock == null || stock == "" || (isNaN(Number(stock)))) {
        result = {...result, stock: "Invalid Input stock" }
    }
    if (image == null || image == "" ) {
        result = {...result, image: "Invalid Input image" }
    }

    return result
}
