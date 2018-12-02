const mongoose = require('mongoose');

const data = mongoose.Schema({
  index:[{}],
});

module.exports = mongoose.model('data', data);

