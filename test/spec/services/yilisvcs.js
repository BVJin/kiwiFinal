'use strict';

describe('Service: yiliSvcs', function () {

  // load the service's module
  beforeEach(module('yiliApp'));

  // instantiate service
  var yiliSvcs;
  beforeEach(inject(function (_yiliSvcs_) {
    yiliSvcs = _yiliSvcs_;
  }));

  it('should do something', function () {
    expect(!!yiliSvcs).toBe(true);
  });

});
