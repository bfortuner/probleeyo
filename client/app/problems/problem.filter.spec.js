'use strict';

describe('Filter: problem', function () {

  // load the filter's module
  beforeEach(module('probleeApp'));

  // initialize a new instance of the filter before each test
  var problem;
  beforeEach(inject(function ($filter) {
    problem = $filter('problem');
  }));

  it('should return the input prefixed with "problem filter:"', function () {
    var text = 'angularjs';
    expect(problem(text)).toBe('problem filter: ' + text);
  });

});
