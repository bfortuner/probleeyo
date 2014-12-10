'use strict';

describe('Service: Utils', function () {

  // load the service's module
  beforeEach(module('probleeApp'));

  // instantiate service
  var utils;
  beforeEach(inject(function (_utils_) {
    utils = _utils_;
  }));

  it('should do something', function () {
    expect(!!utils).toBe(true);
  });

});
