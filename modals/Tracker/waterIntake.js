const mongoose = require('mongoose');

const waterIntakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  date: { type: Date },
  score:{type:Number,default:0},
  progress: { type: Number, default: 0 },  // Amount of water consumed
  goals: { type: Number, required: true }   // Daily goal
});


const WaterIntake = mongoose.model('WaterIntake', waterIntakeSchema);

module.exports = WaterIntake;
