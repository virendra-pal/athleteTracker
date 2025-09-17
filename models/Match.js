// models/Match.js
const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  opponent: String,
  location: String,
  competition: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);