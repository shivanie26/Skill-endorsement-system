const mongoose = require('mongoose');

const endorsementSchema = new mongoose.Schema({
  endorser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endorsedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate endorsements for the same skill
endorsementSchema.index({ endorser: 1, endorsedUser: 1, skillName: 1 }, { unique: true });

module.exports = mongoose.model('Endorsement', endorsementSchema);
