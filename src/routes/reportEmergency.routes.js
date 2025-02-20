const express = require("express");
const {
  createReport,
  getAllReports,
  getReportById,
  deleteReport,
} = require("../controllers/reportEmergency.controller");

const router = express.Router();

router.post("/", createReport);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.delete("/:id", deleteReport);

module.exports = router;
