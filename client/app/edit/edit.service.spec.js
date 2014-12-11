'use strict';

describe('Service: Edit', function () {

  // load the service's module
  beforeEach(module('probleeApp'));

  // instantiate service
  var edit;
  beforeEach(inject(function (_edit_) {
    edit = _edit_;
  }));

  it('should do something', function () {
    expect(!!edit).toBe(true);
  });

});
