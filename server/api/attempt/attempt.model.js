'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttemptSchema = new Schema({
  probId: String,
  userId: String,
  attempts: Number,
  status: String,
  started: { type:Date, default: Date.now },
  solved: { type:Date }
});

module.exports = mongoose.model('Attempt', AttemptSchema);