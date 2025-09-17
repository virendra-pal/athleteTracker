// models/Athlete.js
const mongoose = require('mongoose');
const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: String,
  position: String,
  dob: Date,
  meta: Object
}, { timestamps: true });

module.exports = mongoose.model('Athlete', athleteSchema);
