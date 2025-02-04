const express = require("express");
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

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});
