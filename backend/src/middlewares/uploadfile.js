const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads')
  },

  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    return callback(null, true);
  } else {
    return callback({ message: 'Unsupported File Format' }, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

const uploadMultiple = upload.array("imgProduct", 4)

module.exports = {
  uploadMultiple,
};