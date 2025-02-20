const ReportEmergency = require("../models/reportEmergency.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createReport = asyncHandler(async (req, res) => {
  const {
    name,
    mobileNumber,
    selectedDoctors,
    emergencyType,
    uploadedFile,
    recordedAudio,
    animalType,
    location,
    requestVideoCall,
    makeDonation,
  } = req.body;

  if (!mobileNumber || !emergencyType || !animalType || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newReport = await ReportEmergency.create({
    name,
    mobileNumber,
    selectedDoctors,
    emergencyType,
    uploadedFile,
    recordedAudio,
    animalType,
    location,
    requestVideoCall,
    makeDonation,
  });

  res.status(201).json({
    message: "Emergency report created successfully",
    report: newReport,
  });
});

exports.getAllReports = asyncHandler(async (req, res) => {
  const reports = await ReportEmergency.find().sort({ createdAt: -1 });
  res.status(200).json(reports);
});

exports.getReportById = asyncHandler(async (req, res) => {
  const report = await ReportEmergency.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }
  res.status(200).json(report);
});

exports.deleteReport = asyncHandler(async (req, res) => {
  const report = await ReportEmergency.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }
  await report.deleteOne();
  res.status(200).json({ message: "Report deleted successfully" });
});
