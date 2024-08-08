const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const applicationRoutes = require('./routes/applications');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/applications', applicationRoutes);

const mongoURI = 'mongodb+srv://ShuhaoR:Bobby1024%21@shuhao-startup.nubp8.mongodb.net/?retryWrites=true&w=majority&appName=Shuhao-Startup';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));

