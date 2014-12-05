'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProblemSchema = new Schema({
  title: String,
  topic: String,
  difficulty: Number,
  description: String,
  code: String,
  wordBank: Array,
  author: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', ProblemSchema);