// backend/routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const adminAuth = require("../middleware/adminAuth"); // Import adminAuth middleware
const router = express.Router();

// Create an Admin user (Run this only once to create an admin user)
router.post("/create-admin", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let admin = await User.findOne({ email, role: "admin" });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin", // Set role as 'admin'
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin" });
  }
});

// Register new user
router.post("/register-user", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log("Received registration request for user:", { username, email });

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("User saved successfully");

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    console.log("JWT token created successfully");
    res.status(201).json({ message: "Registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Register new employee
router.post("/register-employee", async (req, res) => {
  const { username, email, password, confirmPassword, position } = req.body;
  console.log("Received registration request for employee:", {
    username,
    email,
  });

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      console.log("Employee already exists:", email);
      return res.status(400).json({ message: "Employee already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    employee = new Employee({
      username,
      email,
      password: hashedPassword,
      position,
      approved: false, // Employee needs admin approval to log in
    });

    await employee.save();
    console.log("Employee registration request submitted successfully");
    res.status(201).json({
      message:
        "Employee registration request submitted successfully. Awaiting admin approval.",
    });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Admin approval of employee registration
router.post("/approve-employee/:id", adminAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.approved = true;
    await employee.save();

    res.status(200).json({ message: "Employee approved successfully" });
  } catch (error) {
    console.error("Error approving employee:", error);
    res.status(500).json({ error: "Approval failed" });
  }
});

// Login admin
router.post("/login-admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Login user
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request for user:", { email });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    console.log("User logged in successfully:", email);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Login employee
router.post("/login-employee", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request for employee:", { email });

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      console.log("Employee not found:", email);
      return res.status(400).json({ message: "Employee not found" });
    }

    if (!employee.approved) {
      return res
        .status(403)
        .json({ message: "Employee not yet approved by admin" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      console.log("Invalid credentials for employee:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: employee._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    console.log("Employee logged in successfully:", email);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in employee:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get pending employee registrations
router.get("/employees/pending", adminAuth, async (req, res) => {
  try {
    const pendingEmployees = await Employee.find({ approved: false });
    res.status(200).json(pendingEmployees);
  } catch (error) {
    console.error("Error fetching pending employees:", error);
    res.status(500).json({ error: "Could not fetch pending employees" });
  }
});

module.exports = router;
