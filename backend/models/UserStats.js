const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastStudyDate: {
    type: Date,
  },
  productivityScore: {
    type: Number,
    default: 50,
  },
  dailyGoal: {
    type: Number,
    default: 2, // hours
  },
  dailyProgress: {
    type: Number,
    default: 0, // hours
  },
  // Simple heatmap data: array of dates studied
  studyDates: [{
    date: String, // YYYY-MM-DD
    count: Number, // hours
  }],
  subjectProgress: [{
    subject: String,
    progress: Number,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserStats', userStatsSchema);
