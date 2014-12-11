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
    topic: 'Arrays',
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
  },
  {
    title: 'Testing String Operators',
    topic: 'Strings',
    difficulty: 1,
    author: "admin",
    description: 'Add the operator to make the string \'yaba\'',
    code: '\'ya\' {{+}} \'ba\'',
    wordBank: [
        'concat',
        '+=',
        '+',
        '+'
    ]
  },
  {
    title: 'Testing Math Operators 2',
    topic: 'Numbers',
    difficulty: 1,
    author: "admin",
    description: 'Complete the expression to compute the value 12.0',
    code: '{{5.0}} {{+}} 7.0',
    wordBank: [
        '5.0',
        '+',
        '-',
        '*',
        '12',
        '12.0',
    ]
  },
  {
    title: 'Testing For Loops',
    topic: 'Loops',
    difficulty: 1,
    author: "admin",
    description: 'Compute the sum of the numbers from 1 to 5.',
    code: 'var sum = 0;\nfor (var i = {{1}}; i < {{5}}; i++) {\n\tsum += {{i}};\n}',
    wordBank: [
        '1',
        '5',
        'sum',
        '0',
        'i'
    ]
  },
  {
    title: 'Testing Strings inside wildcards',
    topic: 'Strings',
    difficulty: 1,
    author: "admin",
    description: 'Complete the expression for the string \'yaba\'',
    code: '{{\'ya\'}} + {{\'ba\'}}',
    wordBank: [
        'ya',
        'ba',
        '\'ya\'',
        '\'ba\'',
        'yaba',
        '\'yaba\''
    ]
  });
});

Topic.find({}).remove(function() {
  Topic.create({
    name : 'Strings',
    description : 'Problems for parsing and manipulating Strings',
    link : '/problems/topic/strings'
  },
  {
    name : 'Numbers',
    description : 'Problems involving math',
    link : '/problems/topic/numbers'
  },
  {
    name : 'Arrays',
    description : 'Looping through, chopping up, and manipulating Arrays',
    link : '/problems/topic/arrays'
  },
  {
    name : 'Loops',
    description : 'While loops, For loops, loops through Arrays and Strings',
    link : '/problems/topic/loops'
  },
  {
    name : 'Conditionals',
    description : 'Problems that test your mastery of If, Else If, and Else clauses',
    link : '/problems/topic/conditionals'
  },
  {
    name : 'Recursion',
    description : 'Problems requiring at least a basic understanding of Recursive functions.',
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