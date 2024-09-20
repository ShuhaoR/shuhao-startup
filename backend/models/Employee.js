// backend/models/Employee.js
const mongoose = require("mongoose");

const workHourSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
});

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: { type: String, required: true },
  approved: { type: Boolean, default: false },
  workHours: [workHourSchema], // Added work hours field
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
