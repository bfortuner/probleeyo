'use strict';

describe('Service: Topics', function () {

  // load the service's module
  beforeEach(module('probleeApp'));

  // instantiate service
  var topics;
  beforeEach(inject(function (_topics_) {
    topics = _topics_;
  }));

  it('should do something', function () {
    expect(!!topics).toBe(true);
  });

});
