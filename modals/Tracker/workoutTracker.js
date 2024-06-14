const mongoose = require('mongoose');

const workoutTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true },

    running: {
      score: { type: Number, default: 0 },
      caloriesBurned: { type: Number, default: 0 }
    },
    walking: {
      score: { type: Number, default: 0 },
      caloriesBurned: { type: Number, default: 0 }
    },
    bicycling: {
      score: { type: Number, default: 0 },
      caloriesBurned: { type: Number, default: 0 }
    },
    swimming: {
      score: { type: Number, default: 0 },
      caloriesBurned: { type: Number, default: 0 }
    },

});


const WorkoutTracker = mongoose.model('WorkoutTracker', workoutTrackerSchema);

module.exports = WorkoutTracker;
