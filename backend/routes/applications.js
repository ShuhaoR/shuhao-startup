// backend/routes/applications.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Application = require('../models/Application');

router.post('/', authMiddleware, async (req, res) => {
  const { name, email, resume } = req.body;
  try {
    const newApplication = new Application({ name, email, resume });
    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

module.exports = router;

