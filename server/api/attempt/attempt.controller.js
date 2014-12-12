'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Attempt = require('./attempt.model');
var Problem = require('../problem/problem.model');

// Get list of Attempts
exports.index = function(req, res) {
  Attempt.find(function (err, Attempts) {
    if(err) { return handleError(res, err); }
    return res.json(200, Attempts);
  });
};

var getProbIdsFromObjArr = function(objArr) {
  var arr = [];
  for (var i in objArr) {
      arr.push(new mongoose.Types.ObjectId( objArr[i]._id ));  
  }
  return arr;
};

// db.attempts.aggregate( {$match : { status : "correct" } }
//  , {$group : { _id:"$probId", solvedDate: { $max: "$solved"}} }, { $sort : {solvedDate : -1 } } )
exports.getUserSolved = function(req, res) {
 var response = {};
 Attempt
  .aggregate()
  .match({'userId':req.params.userId, 'status':'correct'})
  .group({ _id:'$probId', solvedDate: { $max: '$solved'}})
  .sort({solvedDate : -1 })
  .exec(function (err, attempts) {
    if(err) { return handleError(res, err); }
    response.attempts = attempts;
    var probIds = getProbIdsFromObjArr(attempts);

    Problem.find({_id: { $in: probIds }}, function (err, problems) {
      if(err) { return handleError(res, err); }
      response.problems = problems;
      return res.json(200, response);
    });
  });
};

// Did user solve this problem?
exports.attempt = function(req, res) {
  Attempt.find({userId: req.params.userId, probId: req.params.probId }, 
    function (err, problems) {
    if(err) { return handleError(res, err); }
    return res.json(200, problems);
  });
};

// Get a single Attempt
exports.show = function(req, res) {
  Attempt.findById(req.params.id, function (err, Attempt) {
    if(err) { return handleError(res, err); }
    if(!Attempt) { return res.send(404); }
    return res.json(Attempt);
  });
};

// Creates a new Attempt in the DB.
exports.create = function(req, res) {
  //console.log(req)
  Attempt.create(req.body, function(err, Attempt) {
    if(err) { return handleError(res, err); }
    console.log("--------\n" + res)
    return res.json(201, Attempt);
  });
};

// Updates an existing Attempt in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attempt.findById(req.params.id, function (err, Attempt) {
    if (err) { return handleError(res, err); }
    if(!Attempt) { return res.send(404); }
    var updated = _.merge(Attempt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Attempt);
    });
  });
};

// Deletes a Attempt from the DB.
exports.destroy = function(req, res) {
  Attempt.findById(req.params.id, function (err, Attempt) {
    if(err) { return handleError(res, err); }
    if(!Attempt) { return res.send(404); }
    Attempt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}