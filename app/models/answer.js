/**
 * @Author: Abass
 * @Date: 05|05|2020
 * @Objective: building to scale
 */

const mongoose = require('mongoose');
const config = require('../lib/config');

const mongoCollection = config.mongo.collections.answer;

const answerSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: config.mongo.collections.user,
  },
  question: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: config.mongo.collections.question,
  },
  answer: {
    required: true,
    type: String,
  },
},
{
  timestamps: true,
});

answerSchema.index({ '$**': 'text' });

module.exports = mongoose.model(mongoCollection, answerSchema);
