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

mongoose.connect('your_mongo_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log('Server running on port 5000'));

