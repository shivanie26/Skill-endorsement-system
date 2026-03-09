const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  socialLinks: {
    github: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    linkedin: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    portfolio: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    }
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'Other'
    },
    subcategory: {
      type: String,
      default: ''
    },
    proficiencyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for unique skill per user (name + proficiency combination)
userSchema.index({ 'skills.name': 1, 'skills.proficiencyLevel': 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
