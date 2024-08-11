const express = require("express");
const Application = require("../models/Application");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, resume, school, major } = req.body;

  if (!name || !email || !resume) {
    return res
      .status(400)
      .json({ error: "Name, email, and resume are required." });
  }

  try {
    const newApplication = new Application({
      name,
      email,
      resume, // Store resume as text or URL
      school,
      major,
    });
    await newApplication.save();
    res.status(201).json({ message: "Success/提交成功" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
