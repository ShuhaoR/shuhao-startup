// backend/routes/employee.js
const express = require("express");
const Employee = require("../models/Employee");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// Log work hours
router.post("/log-hours", async (req, res) => {
  const { employeeId, date, hours } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.workHours.push({ date, hours });
    await employee.save();

    res.status(200).json({ message: "Work hours logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log work hours" });
  }
});

// Fetch work hours for the week
router.get("/hours/:employeeId", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const workHoursThisWeek = employee.workHours.filter(
      (wh) => new Date(wh.date) >= startOfWeek
    );

    res.status(200).json(workHoursThisWeek);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch work hours" });
  }
});

module.exports = router;
