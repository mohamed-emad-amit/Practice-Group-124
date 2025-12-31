// Upload File -> multer
const multer = require("multer");

// Configuration Uploader - File
const storage = multer.diskStorage({
  destination: (request, file, cb) => cb(null, "uploads/"),
  filename: (request, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

// Filter - File - cb(error, flag)
const fileFilter = (request, file, cb) => {
  if (file.fieldname === "avatar") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      const error = new Error("Avatar Should Be an Image");
      cb(error, false);
    }
  } else {
    cb(null, true);
  }
};

// Uploader Receive Files
const uploader = multer({ storage, fileFilter });
module.exports = { uploader };
