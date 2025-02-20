const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.startsWith("video/") &&
      !file.mimetype.startsWith("audio/")
    ) {
      return cb(new Error("Only video and audio files are allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
