// models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  level: { type: String, required: true },
});

module.exports = mongoose.model('Record', recordSchema);
