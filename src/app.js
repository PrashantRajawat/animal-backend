const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/dbConfig");
const reportEmergencyRoutes = require("./routes/reportEmergency.routes");
const uploadRoutes = require("./routes/upload.routes");
const placesRoutes = require("./routes/places.routes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: [process.env.FRONTEND1, process.env.FRONTEND2] }));
app.use(express.json());

app.use("/api/report-emergency", reportEmergencyRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/places", placesRoutes);

app.use(errorHandler);

module.exports = app;
