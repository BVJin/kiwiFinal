'use strict';

/**
 * @ngdoc function
 * @name yiliApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yiliApp
 */
angular.module('yiliApp')
  .controller('MainCtrl', ['$scope', '$interval', 'yiliSvcs', function ( $scope, $interval, svcs ) {

    $scope.curLeftPic = null
    $scope.curRightPic = null;
    var curIndex = 0;
    var bgpics = [];

    svcs.getMainImges()
    .then(function(data){
      bgpics = angular.copy(data);
      $scope.curLeftPic = bgpics[curIndex].left;
      $scope.curRightPic = bgpics[curIndex].right;

    })
    .catch(function(err) { console.log(err); });


    $interval(function() {
      curIndex = curIndex + 1 == Object.keys(bgpics).length? 0 : curIndex + 1;
      $scope.curLeftPic = bgpics[curIndex].left;
      $scope.curRightPic = bgpics[curIndex].right;

    }, 1000000);

  }]);
