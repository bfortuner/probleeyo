'use strict';

describe('Service: Attempts', function () {

  // load the service's module
  beforeEach(module('probleeApp'));

  // instantiate service
  var attempt;
  beforeEach(inject(function (_attempt_) {
    attempt = _attempt_;
  }));

  it('should do something', function () {
    expect(!!attempt).toBe(true);
  });

});
