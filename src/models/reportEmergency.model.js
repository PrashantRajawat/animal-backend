import mongoose from "mongoose";

const reportEmergencySchema = new mongoose.Schema({});

export const reportEmergency = mongoose.Model("report", reportEmergencySchema);
