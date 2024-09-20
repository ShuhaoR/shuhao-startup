// backend/routes/admin.js
const express = require("express");
const Employee = require("../models/Employee");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// Fetch all work hours for review
router.get("/review-hours", adminAuth, async (req, res) => {
  try {
    const employees = await Employee.find({});
    const workHours = employees.map((emp) => ({
      employeeId: emp._id,
      username: emp.username,
      workHours: emp.workHours,
    }));

    res.status(200).json(workHours);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch work hours" });
  }
});

// Modify employee work hours
router.put("/modify-hours/:employeeId", adminAuth, async (req, res) => {
  const { date, hours } = req.body;

  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const workHour = employee.workHours.id(req.body.workHourId);
    if (workHour) {
      workHour.hours = hours;
      workHour.date = date || workHour.date;
      await employee.save();
      res.status(200).json({ message: "Work hours modified successfully" });
    } else {
      res.status(404).json({ message: "Work hour entry not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to modify work hours" });
  }
});

module.exports = router;
