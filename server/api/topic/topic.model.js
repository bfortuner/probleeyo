'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: String,
  description: String,
  link: String
});

module.exports = mongoose.model('Topic', TopicSchema);