// models/weightTracker.js
const mongoose = require('mongoose');

const weightTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  date: { type: Date, default: Date.now },
  weight: Number
});

const WeightTracker = mongoose.model('WeightTracker', weightTrackerSchema);

module.exports = WeightTracker;
