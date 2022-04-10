const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const responseHandler = require('./responseHandler');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req) => {
      let { baseUrl } = req;
      if (baseUrl === '/profile') {
        baseUrl = '/user';
      }
      return `rent/uploads/${baseUrl}`;
    },
    format: async () => 'png',
    public_id: (req) => {
      const timestamp = Date.now();
      let { baseUrl } = req;
      if (baseUrl === '/profile') {
        baseUrl = '/user';
      }
      return `${baseUrl}-${timestamp}`;
    },
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const fName = file.originalname.split('.');
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     cb(null, `${fName[0]}-${uniqueSuffix}.${fName[fName.length - 1]}`);
//   },
// });

function imageFileFilter(req, file, cb) {
  const supportedMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/tiff'];
  if (!supportedMimeType.includes(file.mimetype)) {
    cb(new Error('Filetype mismatch!'), false);
  } else {
    cb(null, true);
  }
}

const uploadImage = (key, maxSize = null) => {
  const upload = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
      fileSize: maxSize || 2097152, // max 2MB
    },
  }).single(key);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return responseHandler(res, 400, err.message);
      }
      return next();
    });
  };
};

module.exports = uploadImage;
