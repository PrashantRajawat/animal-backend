import mongoose from "mongoose";

const reportEmergencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
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
    liveLocation: Boolean,
    currentLocation: Boolean,
  },
  requestVideoCall: Boolean,
  makeDonation: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export const ReportEmergency = mongoose.model(
  "ReportEmergency",
  reportEmergencySchema
);
