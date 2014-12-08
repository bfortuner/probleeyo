'use strict';

describe('Service: create', function () {

  // load the service's module
  beforeEach(module('probleeApp'));

  // instantiate service
  var create;
  beforeEach(inject(function (_create_) {
    create = _create_;
  }));

  it('should do something', function () {
    expect(!!create).toBe(true);
  });

});
