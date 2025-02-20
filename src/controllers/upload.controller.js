const asyncHandler = require("../utils/asyncHandler");

exports.uploadFile = asyncHandler((req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File upload failed" });
  }
  res.json({
    message: "File uploaded successfully",
    url: req.file.path,
  });
});
