'use strict';

describe('Directive: leftMainpic', function () {

  // load the directive's module
  beforeEach(module('yiliApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<left-mainpic></left-mainpic>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the leftMainpic directive');
  }));
});
