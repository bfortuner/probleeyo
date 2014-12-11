'use strict';

var _ = require('lodash');
var Solved = require('./solved.model');

// Get list of solveds
exports.index = function(req, res) {
  Solved.find(function (err, solveds) {
    if(err) { return handleError(res, err); }
    return res.json(200, solveds);
  });
};

// Get a single solved
exports.show = function(req, res) {
  Solved.findById(req.params.id, function (err, solved) {
    if(err) { return handleError(res, err); }
    if(!solved) { return res.send(404); }
    return res.json(solved);
  });
};

// Creates a new solved in the DB.
exports.create = function(req, res) {
  Solved.create(req.body, function(err, solved) {
    if(err) { return handleError(res, err); }
    return res.json(201, solved);
  });
};

// Updates an existing solved in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Solved.findById(req.params.id, function (err, solved) {
    if (err) { return handleError(res, err); }
    if(!solved) { return res.send(404); }
    var updated = _.merge(solved, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, solved);
    });
  });
};

// Deletes a solved from the DB.
exports.destroy = function(req, res) {
  Solved.findById(req.params.id, function (err, solved) {
    if(err) { return handleError(res, err); }
    if(!solved) { return res.send(404); }
    solved.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}