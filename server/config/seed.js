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
    author: "admin",
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
    title: 'Table Find Element',
    topic: 'Strings',
    difficulty: 1,
    author: "admin",
    description: 'Find index of "value" in "table." Drag in the missing part.  \ninput: [4,5,6,7], 6\noutput: 2',
    code: 'function search(table, value) {\n\tvar i = 0;\n\twhile (i < {{table.length}}) {\n\t\tif (table[i] === value) {\n\t\treturn i;\n\t}\n\ti++;\n\t}\n}',
    wordBank: [
        'value2',
        'table',
        'table.length',
        'i',
        '10',
        'this'
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