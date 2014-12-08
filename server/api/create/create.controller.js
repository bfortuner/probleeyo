'use strict';

var _ = require('lodash');
var Create = require('./create.model');
var Problem = require('../problem/problem.model');

// Get list of creates
exports.index = function(req, res) {
  Create.find(function (err, creates) {
    if(err) { return handleError(res, err); }
    return res.json(200, creates);
  });
};

// Get a single create
exports.show = function(req, res) {
  Create.findById(req.params.id, function (err, create) {
    if(err) { return handleError(res, err); }
    if(!create) { return res.send(404); }
    return res.json(create);
  });
};

// Creates a new create in the DB.
exports.create = function(req, res) {
  Problem.create(req.body, function(err, create) {
    if(err) { return handleError(res, err); }
    return res.json(201, create);
  });
};

// Updates an existing create in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Create.findById(req.params.id, function (err, create) {
    if (err) { return handleError(res, err); }
    if(!create) { return res.send(404); }
    var updated = _.merge(create, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, create);
    });
  });
};

// Deletes a create from the DB.
exports.destroy = function(req, res) {
  Create.findById(req.params.id, function (err, create) {
    if(err) { return handleError(res, err); }
    if(!create) { return res.send(404); }
    create.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}