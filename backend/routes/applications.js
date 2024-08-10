// backend/routes/applications.js
const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Create a unique filename
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("resume"), async (req, res) => {
  const { name, email, message, school, major } = req.body;
  const resume = req.file ? req.file.filename : null; // Get the filename from multer

  try {
    const newApplication = new Application({
      name,
      email,
      resume, // Save the filename in the database
      message,
      school,
      major,
    });
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
