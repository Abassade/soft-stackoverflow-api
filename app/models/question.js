/**
 * @Author: Abass
 * @Date: 05|05|2020
 * @Objective: building to scale
 */

const mongoose = require('mongoose');
const config = require('../lib/config');

const mongoCollection = config.mongo.collections.question;

const questionSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: config.mongo.collections.user,
  },
  question: {
    required: true,
    type: String,
  },
  votes: {
    default: 0,
    type: Number,
  },

},
{
  timestamps: true,
});

questionSchema.index({ '$**': 'text' });

module.exports = mongoose.model(mongoCollection, questionSchema);
