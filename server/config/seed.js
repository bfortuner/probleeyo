/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Problem = require('../api/problem/problem.model');
var User = require('../api/user/user.model');
var Topic = require('../api/topic/topic.model');

Problem.find({}).remove(function() {
  Problem.create({
    title: 'Hello String',
    topic: 'Strings',
    difficulty: 1,
    description: "Using the variable foo, return the String 'Hello'",
    code: 'var sayHello = function(var1) { \n\tvar foo = {{\'hello\'}} ;\n\t{{return}} foo ;\n}',
    wordBank: [
        "'hello'",
        'hello',
        'foo',
        'return',
        'do while',
        '+=',
        'var foo',
        'this.foo'
    ]
  },
  {
    title: 'My Problem Title',
    topic: 'Strings',
    difficulty: 3,
    description: "Return the string 'hello'",
    code: 'var myfunc = function(var1) { \n\tvar foo = {{ANSWER1}} ; \n\treturn {{ANSWER2}} ;\n}',
    wordBank: [
        "'hello'",
        'hello',
        'foo',
        'for'
    ]
  },
  {
    title: 'My Problem Title',
    topic: 'Strings',
    difficulty: 3,
    description: "Return the string 'hello'",
    code: 'var myfunc = function(var1) { \n\tvar foo = {{ANSWER1}} ; \n\treturn {{ANSWER2}} ;\n}',
    wordBank: [
        "'hello'",
        'hello',
        'foo',
        'for'
    ]
  });
});

Topic.find({}).remove(function() {
  Topic.create({
    name : 'Strings',
    description : 'This is a short topic description here.',
    link : '/problems/strings'
  },
  {
    name : 'Lists',
    description : 'This is a short topic description here.',
    link : '/problems/lists'
  },
    {
    name : 'Loops',
    description : 'This is a short topic description here.',
    link : '/problems/loops'
  },
  {
    name : 'Functions',
    description : 'This is a short topic description here.',
    link : '/problems/functions'
  },
  {
    name : 'Conditionals',
    description : 'This is a short topic description here.',
    link : '/problems/conditionals'
  },
  {
    name : 'Recursion',
    description : 'This is a short topic description here.',
    link : '/problems/recursion'
  }
 );
});


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});