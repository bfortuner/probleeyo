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
    code: 'var sayHello = function() { \n\tvar foo = {{\'hello\'}} ;\n\t{{return}} foo ;\n}',
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
    title: 'Hello String 2',
    topic: 'Strings',
    difficulty: 2,
    author: "admin",
    description: "Using the variable foo, return the String 'Hello'",
    code: '{{var}} sayHello {{=}} function() { \n\tvar {{foo}} = {{\'hello\'}} ;\n\t{{return}} foo ;\n}',
    wordBank: [
        "'hello'",
        'hello',
        'foo',
        'return',
        'do while',
        '+=',
        'var foo',
        'this.foo',
        'new Object(foo)',
        'var',
        '='
    ]
  },
  {
    title: 'Table Find Element',
    topic: 'Lists',
    difficulty: 3,
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
    link : '/problems/topic/strings'
  },
  {
    name : 'Lists',
    description : 'This is a short topic description here.',
    link : '/problems/topic/lists'
  },
    {
    name : 'Loops',
    description : 'This is a short topic description here.',
    link : '/problems/topic/loops'
  },
  {
    name : 'Functions',
    description : 'This is a short topic description here.',
    link : '/problems/topic/functions'
  },
  {
    name : 'Conditionals',
    description : 'This is a short topic description here.',
    link : '/problems/topic/conditionals'
  },
  {
    name : 'Recursion',
    description : 'This is a short topic description here.',
    link : '/problems/topic/recursion'
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