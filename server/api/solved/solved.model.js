'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SolvedSchema = new Schema({
  probId: String,
  userId: String,
  solved: { type:Date, default: Date.now }
});

module.exports = mongoose.model('Solved', SolvedSchema);