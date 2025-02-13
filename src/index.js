const express = require("express");
const ReportEmergency = require("./models/reportEmergency.model");

const app = express();
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();
connectDB();

app.use(
  cors({
    origin: [process.env.FRONTEND1, process.env.FRONTEND2],
  })
);
app.use(express.json());
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
