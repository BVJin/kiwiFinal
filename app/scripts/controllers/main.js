'use strict';

/**
 * @ngdoc function
 * @name yiliApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yiliApp
 */
angular.module('yiliApp')
  .controller('MainCtrl', ['$scope', '$interval', '$window', 'yiliSvcs', function ( $scope, $interval, $window, svcs ) {

    // $scope.curLeftPic = null
    // $scope.curRightPic = null;
    $scope.curIndex = 1;
    $scope.bgpics = [];

    svcs.getMainImges()
    .then(function(data){
      $scope.bgpics = angular.copy(data);
      // $scope.curLeftPic = bgpics[$scope.curIndex].left;
      // $scope.curRightPic = bgpics[$scope.curIndex].right;

    })
    .catch(function(err) { console.log(err); });

    //get each project style
    $scope.getStyle = function getStyle(proj, pos){
        return {
          'z-index' : proj[pos].projectId,
          'background-image' : "url(" + proj[pos].imageUrl + ")"
        }
    };


    //detect the mouse event
    var ifScrollDown = false;
    angular.element($window).bind("wheel", function(event) {
      // cross-browser wheel delta
      var event = window.event || event; // old IE support
      var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

      //scroll down
      if(delta > 0 && !ifScrollDown) {
        var myElement = angular.element( document.querySelector( '#some-id' ) )
        disappear(element, 'left');
        disappear(element, 'right');
        //prevent multiple triggered
        ifScrollDown = true;
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if(event.preventDefault) {
            event.preventDefault();
        }
        //scroll up
      }else if(delta < 0){

      }
    });

    function disappear(ele){
      ele.addClass('left-disappear');
    };

    // $interval(function() {
    //   curIndex = curIndex + 1 == Object.keys(bgpics).length? 0 : curIndex + 1;
    //   $scope.curLeftPic = bgpics[curIndex].left;
    //   $scope.curRightPic = bgpics[curIndex].right;
    //
    // }, 2000);

  }]);
