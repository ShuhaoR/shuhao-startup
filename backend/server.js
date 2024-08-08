// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const applicationRoutes = require('./routes/applications');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/applications', applicationRoutes);

// Database connection
mongoose.connect('mongodb+srv://ShuhaoR:Bobby1024!@shuhao-startup.nubp8.mongodb.net/test?retryWrites=true&w=majority&appName=Shuhao-Startup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Server setup
app.listen(5000, () => console.log('Server running on port 5000'));

