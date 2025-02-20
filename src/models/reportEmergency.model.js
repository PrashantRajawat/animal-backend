const mongoose = require("mongoose");

const reportEmergencySchema = new mongoose.Schema({
  name: { type: String },
  mobileNumber: { type: String },
  selectedDoctors: [
    {
      name: String,
      phone: String,
      clinic: String,
      address: String,
      distance: String,
      donationRequired: Boolean,
    },
  ],
  emergencyType: String,
  uploadedFile: String,
  recordedAudio: String,
  animalType: {
    type: String,
    enum: [
      "Dog",
      "Cat",
      "Other Large Animal",
      "Cow",
      "Goat/Sheep",
      "Other Small Animal",
    ],
  },
  location: {
    liveLocation: String,
    currentLocation: String,
  },
  requestVideoCall: Boolean,
  makeDonation: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const ReportEmergency = mongoose.model(
  "ReportEmergency",
  reportEmergencySchema
);

module.exports = ReportEmergency;
