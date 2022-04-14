const vehicleModel = require("../models/vehicles")
const validate = require("../helpers/validate")
const { APP_URL } = process.env
const { inputValidator, checkIntegerFormat } = require('../helpers/validator');
const upload = require("../helpers/upload").single("image")
const response = require("../helpers/response")
const responseHandler = require('../helpers/responseHandler');
const { deleteFile } = require('../helpers/fileHandler');


// READ VEHICLES
const readVehicles = async (req, res) => {
  let { search, page, limit, sort, order, category, vehicleId,minPrice,maxPrice,location } = req.query
  sort = sort || "name"
  order = order || "ASC"
  search = search || ""
  category = category || ""
  minPrice = minPrice || 0
  maxPrice = maxPrice || 9999999
  location = location || ""
  page = ((page != null && page !== "") ? Number(page) : 1)
  limit = ((limit != null && limit !== "") ? Number(limit) : 4)
  let offset = (page - 1) * limit
  const data = { search, limit, offset, sort, order, page, category, vehicleId, minPrice, maxPrice,location }
  if (validate.validationPageInfoAsync(data) == "") {
    const results = await vehicleModel.readVehiclesAsync(data)
    const count = await vehicleModel.countVehiclesAsync(data)
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        // console.log(obj.image)
        if(obj.image.startsWith("https")){
          obj.image = obj.image
        }else{
          obj.image = `http://192.168.100.8:5000/${obj.image}`
        }
        obj.image = obj.image.replace('\\', '/')
      }
      return obj
    })
    const { total } = count[0]
    const last = Math.ceil(total / limit)
    const pageInfo = {
      prev: page > 1 ? `${APP_URL}/vehicles?search=${search}&category=${category}&page=${page - 1}&limit=${limit}&sort=${sort}` : null,
      next: page < last ? `${APP_URL}/vehicles?search=${search}&category=${category}&page=${page + 1}&limit=${limit}&sort=${sort}` : null,
      totalData: total,
      currentPage: page,
      lastPage: last
    }
    if (results.length > 0) {
      return response(res, "List Vehicle", processedResult, 200, pageInfo)
    }
    return response(res, "List Vehicle Not Found", null, 404)
  } else {
    return response(res, "List Vehicle", null, 200, null, validate.validationPageInfoAsync(data))
  }

}

//SEARCH VEHICLES 

const getProductId = async (req, res) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || Number.isNaN(Number(vehicleId))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  const checkProduct = await vehicleModel.getProductById(vehicleId);
  if (checkProduct.length < 1) {
    return responseHandler(res, 404, null, null, 'Data not found', null);
  }
  const processedResult = checkProduct.map((obj) => {
    if (obj.image !== null) {
      // console.log(obj.image)
      if(obj.image.startsWith("https")){
        obj.image = obj.image
      }else{
        obj.image = `http://192.168.100.8:5000/${obj.image}`
      }
      obj.image = obj.image.replace('\\', '/')
    }
    return obj
  })
  return responseHandler(res, 200, 'Vehicle', processedResult[0], null, null);
};

const searchVehicles = async (req, res) => {
  const { vehicleId } = req.query
  const results = await vehicleModel.searchVehiclesAsync(vehicleId)
  // console.log(results)
  if (results.length > 0) {
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `http://192.168.100.8:5000/${obj.image}`
        obj.image = obj.image.replace('\\', '/')
      }
      return obj
    })
    return response(res, "List Vehicle", processedResult[0], 200)
  } else {
    return response(res, "List Not Found", null, 404)
  }
}

//CREATE VEHICLES
const createVehicles = async (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return response(res, err.message, null, 400)
      }
      const newData = {
        ...req.body
      }
      if (req.file) {
        newData.image = req.file.path
      }
      if (validate.validateVehicles(newData) == "") {
        vehicleModel.getName(newData.name, (result) => {
          if (result.length == 0) {
            vehicleModel.createVehicles(newData, (results) => {
              vehicleModel.searchVehicles(results.insertId, (fin) => {
                const mapResults = fin.map(o => {
                  if (o.image !== null) {
                    o.image = `/uploads/${req.file.filename}`
                  }
                  return o
                })
                return res.send({
                  success: true,
                  message: "Vehicle data created!",
                  results: mapResults[0]
                })
              })
            })
          } else {
            return response(res, "Name has Already Used", null, 400)
          }
        })
      } else {
        return response(res, "Data Vehicle was not valid", null, 200, null, validate.validateVehicles(newData))
      }
    })
}



const updateVehicles = async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "supervisor") {
    upload(req, res, async function (err) {
      if (err) {
        return response(res, err.message, null, 400)
      }
      const { vehicleId } = req.params
      const result = await vehicleModel.searchVehiclesAsync(vehicleId)
      if (result.length >= 1) {

        const data = {}
        // console.log(data)
        const fillable = ["name", "price", "description", "location", "category", "isAvailable", "stock"]
        fillable.forEach(field => {
          if (req.body[field]) {
            if (req.file) {
              data["image"] = req.file.path
            }
            data[field] = req.body[field]
          }
        })

        try {
          const resultUpdate = await vehicleModel.updateVehiclesAsync(data, vehicleId)
          // console.log(resultUpdate)
          if (resultUpdate.affectedRows) {
            const result = await vehicleModel.searchVehiclesAsync(vehicleId)
            // console.log(result)
            if (result.length > 0) {
              result.map((field) => {
                if (field.image !== null) {
                  field.image = `${APP_URL}/${field.image}`
                }
                return field
              })
            }
            return response(res, "Update Success", result[0])
          }
        } catch (err) {
          return response(res, "Invalid Input ", null, 400)
        }

      } else {
        return res.status(400).json({
          success: false,
          message: "Unexpected data",
          result
        })
      }
    })
  }
}

const deleteVehicles = (req, res) => {
  const { vehicleId } = req.params
  if (vehicleId !== " ") {
    vehicleModel.searchVehicles(vehicleId, (result) => {
      if (result.length > 0) {
        vehicleModel.deleteVehicles(vehicleId, (results) => {
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
          message: "Data Vehicle not found."
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



const popularVehicles = (req, res) => {
  const { search } = req.query
  vehicleModel.popularVehicles(search, result => {
    if (result.length > 0) {
      return res.json({
        success: true,
        message: "List Popular Vehicle",
        results: result
      })
    } else {
      return res.status(404).json({
        success: false,
        message: "Vehicle Not Found"
      })
    }
  })
}

const popularInTownVehicles = (req, res) => {
  let { search, page, limit, location } = req.query
  search = search || ""
  page = Number(page) || 1
  limit = Number(limit) || 4
  let offset = (page - 1) * limit
  const data = { location, search, limit, offset }

  vehicleModel.popularInTownVehicles(data, (results) => {
    vehicleModel.countPopularVehiclesInTown(data, (count) => {
      const processedResult = results.map((obj) => {
        if (obj.image !== null) {
          obj.image = `${APP_URL}/${obj.image}`
          obj.image = obj.image.replace('\\', '/')
        }
        return obj
      })
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List Vehicles",
          results: processedResult,
          pageInfo: {
            prev: page > 1 ? `${APP_URL}/vehicles/popularintown?search=&location=&page=${page - 1}` : null,
            next: page < last ? `${APP_URL}/vehicles/popularintown?search=&location=&page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
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

const newVehiclesinWeek = (req, res) => {
  let { page, limit } = req.query
  page = Number(page) || 1
  limit = Number(limit) || 5
  let offset = (page - 1) * limit
  const data = { limit, offset }

  vehicleModel.newVehiclesinWeek(data, (results) => {
    vehicleModel.countVehiclesInWeek(data, (count) => {
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List Vehicles",
          results: results,
          pageInfo: {
            prev: page > 1 ? `${APP_URL}/vehicles?page=${page - 1}` : null,
            next: page < last ? `${APP_URL}/vehicles?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
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

const addVehicles = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'name', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'category', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'price', required: true, type: 'price',
      },
      {
        field: 'description', required: true, type: 'text',
      },
      {
        field: 'stock', required: true, type: 'integer',
      },
      {
        field: 'location', required: true, type: 'varchar', max_length: 100,
      },
    ];
    
    const { data, error } = inputValidator(req, fillable);

    if (req.file) {
      data.image = req.file.path;
    }
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }
    const postNewProduct = await vehicleModel.addProduct(data);
// Post new product
// console.log(postNewProduct.insertId)
    if (postNewProduct.affectedRows < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    const getNewProduct = await vehicleModel.getProductById(postNewProduct.insertId);
    // console.log(getNewProduct)
    if (getNewProduct.length < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    return responseHandler(res, 200, 'Successfully add new product', getNewProduct, null, null);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error X');
  }
};

const editProduct = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // console.log(vehicleId)
    if (!vehicleId) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Undefined ID', null);
    }

    const getData = await vehicleModel.getProductById(vehicleId);
    // console.log(getData)
    if (getData.length < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 404, null, null, 'Data product not found', null);
    }
    const fillable = [
      {
        field: 'name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'category', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'price', required: false, type: 'price',
      },
      {
        field: 'description', required: false, type: 'texy',
      },
      {
        field: 'stock', required: false, type: 'integer',
      },
      {
        field: 'location', required: false, type: 'varchar', max_length: 100,
      },
    ];
    const { data, error } = inputValidator(req, fillable);
    // console.log(data)
   
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }
    if (Object.keys(data).length < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'New data is empty', null);
    }
    // if (data.name) {
    //   const getDataByName = await productModel.getProductByName(data);
    //   if (getDataByName.length > 0 && getDataByName[0].id !== parseInt(id, 10)) {
    //     if (req.file) {
    //       deleteFile(req.file.filename);
    //     }
    //     return responseHandler(res, 400, null, null, 'Product already on the list', null);
    //   }
    // }
    // console.log("--------------------"+getData[0].image)
    if (req.file) {
      data.image = req.file.path;
    }
    const editData = await vehicleModel.editProduct(data, vehicleId);
    // console.log(editData)
    if (editData.affectedRows < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    const getEditedData = await vehicleModel.getProductById(vehicleId);
    if (getEditedData.length < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    return responseHandler(res, 200, 'Successfully edited data', getEditedData[0], null, null);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error 2');
  }
};

module.exports = {
  readVehicles,
  searchVehicles,
  createVehicles,
  updateVehicles,
  deleteVehicles,
  popularVehicles,
  popularInTownVehicles,
  newVehiclesinWeek,
  addVehicles,
  getProductId,
  editProduct
}

