const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const _file = file.originalname.split(".")
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, _file[0] + "-" + uniqueSuffix + "." + _file[1])
    }
})

const fileFilter = (req, file, cb)=>{
    const supportedMime = [
        "image/jpeg",
        "image/png",
        "image/gif"
    ]
    if(!supportedMime.includes(file.mimetype)){
        cb(new Error("Filetype mismatch!"), false)
    }else{
        cb(null, true)
    }
}

const upload = multer({ storage: storage, fileFilter})

module.exports = upload