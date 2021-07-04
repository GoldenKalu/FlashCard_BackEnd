const mongoose = require('mongoose');
const config = require('config');

function connectDB() {
    mongoose.connect(config.get('mongoURI'),
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err))
  
};


module.exports = connectDB