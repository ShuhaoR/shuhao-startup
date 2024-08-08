const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ShuhaoR:Bobby1024%21@shuhao-startup.nubp8.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connection successful');
}).catch(err => {
  console.error('Connection error', err);
});

