// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register new user
router.post("/register-user", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log("Received registration request for user:", { username, email });

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email, role: "user" });
    if (user) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      role: "user", // Set role as 'user'
    });

    await user.save();
    console.log("User saved successfully");

    // Create JWT token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    console.log("JWT token created successfully");
    res.status(201).json({ message: "Registered success", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Register new employee
router.post("/register-employee", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log("Received registration request for employee:", {
    username,
    email,
  });

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if employee already exists
    let employee = await User.findOne({ email, role: "employee" });
    if (employee) {
      console.log("Employee already exists:", email);
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // Create new employee
    employee = new User({
      username,
      email,
      password: hashedPassword,
      role: "employee", // Set role as 'employee'
    });

    await employee.save();
    console.log("Employee saved successfully");

    // Create JWT token
    const token = jwt.sign({ id: employee._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    console.log("JWT token created successfully");
    res
      .status(201)
      .json({ message: "Employee registered successfully", token });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login user
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request for user:", { email });

  try {
    const user = await User.findOne({ email, role: "user" });
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
    const employee = await User.findOne({ email, role: "employee" });
    if (!employee) {
      console.log("Employee not found:", email);
      return res.status(400).json({ message: "Employee not found" });
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

module.exports = router;
