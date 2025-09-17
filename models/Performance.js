// models/Performance.js
const mongoose = require('mongoose');
const performanceSchema = new mongoose.Schema({
  athlete: { type: mongoose.Schema.Types.ObjectId, ref: 'Athlete', required: true },
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  metrics: {
    speedMax: Number,
    speedAvg: Number,
    distanceKm: Number,
    goals: Number,
    assists: Number,
    passes: Number,
    passAccuracy: Number,
    rating: Number
  },
  notes: String,
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

performanceSchema.index({ athlete: 1, createdAt: 1 });

module.exports = mongoose.model('Performance', performanceSchema);