const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  type: {
    type: String,
    enum: ['exam', 'assignment', 'project', 'other'],
    default: 'other',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Deadline', deadlineSchema);
