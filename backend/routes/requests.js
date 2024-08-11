// backend/routes/requests.js
const express = require("express");
const Request = require("../models/Request"); // Ensure Request model is correct
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newRequest = new Request({ name, email, message });
    await newRequest.save();
    res.status(201).json({ message: "Success/提交成功" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
