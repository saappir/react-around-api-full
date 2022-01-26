const mongoose = require('mongoose');

function mongoConfig() {
  mongoose.connect('mongodb://localhost:27017/aroundb');
}

module.exports = mongoConfig;
