const mongoose = require('mongoose');
const joi = require('joi');
// const validator = require('validator');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
    lowerCase: true,
    unique: true,
    //    validate :[validator.isEmail, 'please provide a valid email']
  },
  role: {
    type: String,
    enum: ['user', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    select: false,
    // min:8,
    // required:true
  },
  passwordChangedAt: Date,
  passwordConfirm: {
    type: String,
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
});



userSchema.methods.correctPassword = async function (candidatePassword, userPaswword) {
  return await bcrypt.compare(candidatePassword, userPaswword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = perseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimeStamp;
  }
};

const userAuthSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  passwordConfirm: joi.ref('password'),
});
const loginAuthSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = null;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports.userAuthSchema = userAuthSchema;
module.exports.loginAuthSchema = loginAuthSchema;

module.exports.User = User;
