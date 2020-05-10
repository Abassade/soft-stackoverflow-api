/**
 * @Author: Abass
 * @Objective: building to scale
 */

const mongoose = require('mongoose');
const config = require('../lib/config');

const mongoCollection = config.mongo.collections.user;

const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 6,
  },
  cPassword: {
    required: true,
    type: String,
    minlength: 6,
  },

},
{
  timestamps: true,
});

userSchema.index({ '$**': 'text' });

module.exports = mongoose.model(mongoCollection, userSchema);
