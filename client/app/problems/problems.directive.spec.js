'use strict';

describe('Directive: problems', function () {

  // load the directive's module
  beforeEach(module('probleeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<problems></problems>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the problems directive');
  }));
});