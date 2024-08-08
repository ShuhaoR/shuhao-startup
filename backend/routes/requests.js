// backend/routes/requests.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Request = require('../models/Request');

router.post('/', authMiddleware, async (req, res) => {
  const { username, message } = req.body;
  try {
    const newRequest = new Request({ username, message });
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

module.exports = router;

