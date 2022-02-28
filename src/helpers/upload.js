const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const _file = file.originalname.split(".")
    cb(null, "" + _file[0] + "-" + Date.now() + "." + _file[1])
  }
})

const fileFilter = (req, file, cb) => {
  const supportedMime = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jfif"
  ]
  if (!supportedMime.includes(file.mimetype)) {
    cb(new Error("Filetype mismatch!"), false)
  } else {
    cb(null, true)
  }
}

const upload = multer({ storage: storage, fileFilter })

module.exports = upload