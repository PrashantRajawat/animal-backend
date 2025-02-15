const express = require("express");
const ReportEmergency = require("./models/reportEmergency.model");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();
connectDB();

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND1, process.env.FRONTEND2],
  })
);
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File upload failed" });
  }
  res.json({ message: "File uploaded successfully", url: req.file.path });
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.post("/report-emergency", async (req, res) => {
  try {
    const newReport = new ReportEmergency(req.body);
    await newReport.save();
    res
      .status(201)
      .json({ message: "Emergency report saved!", report: newReport });
  } catch (error) {
    res.status(500).json({ message: "Error saving report", error });
  }
});
