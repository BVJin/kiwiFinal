'use strict';

/**
 * @ngdoc function
 * @name yiliApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yiliApp
 */
angular.module('yiliApp')

  .controller('MainCtrl', ['$scope', '$interval', '$window', '$timeout', 'yiliSvcs', 'preloader', function ( $scope, $interval, $window, $timeout, svcs, preloader ) {

    var loading_screen = pleaseWait({
      logo: "/images/main/yili_blue.jpg",
      backgroundColor: '#f46d3b',
      loadingHtml:"<div class='spinner-text'><h2>YILI SUN</h2></div>"
      + "<div class='sk-spinner sk-spinner-double-bounce'><div class='sk-double-bounce1'></div><div class='sk-double-bounce2'></div></div>"
    });



    //loading_screen.finish();
    $scope.curIndex = 1;
    $scope.bgpics = [];
    //center dial
    var perProjPercentage = null;
    $scope.progressBarConfig = {
      offset : 180,
      thickness : 5,
      size : 200,
      curPercentage : 0
    };

    svcs.getMainImges()
    .then(function(data){
      $scope.bgpics = angular.copy(data);
      // center dial
      perProjPercentage = $scope.bgpics.length > 1 ? 100 / ($scope.bgpics.length-1) : 100 ;

      // pre load all the images
      var images = [];
      angular.forEach($scope.bgpics, function(proj){
        images.push(proj.left.imageUrl);
        images.push(proj.right.imageUrl);
      });

      preloader.preloadImages( images )
      .then(function() {
          loading_screen.finish();
          $scope.isImageLoaded = true;
      },
      function( err ) {
          console.log(err);
      }, function(event){
        $scope.percentLoaded = event.percent;
        console.log($scope.percentLoaded );
      });

    })
    .catch(function(err) { console.log(err); });

    //get each project style
    $scope.getStyle = function getStyle(proj, pos){
        return {
          'background-image' : "url(" + proj[pos].imageUrl + ")"
        }
    };

    //detect the mouse event
    $scope.flags = {
      isScrollDone : false
    };

    var testIndex = 0;

    angular.element($window).bind("wheel", function(event) {
      // cross-browser wheel delta
      var event = window.event || event; // old IE support
      var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

      var curLeftElement = angular.element( document.querySelector( '#left-' + $scope.curIndex ));
      var curRightElement = angular.element( document.querySelector( '#right-' + $scope.curIndex ));

      //scroll down
      if(delta > 0 && !$scope.flags.isScrollDone) {
        disappearDown(curLeftElement, 'left');
        disappearDown(curRightElement, 'right');

        $scope.curIndex++;
        $scope.curIndex = $scope.curIndex == $scope.bgpics.length + 1 ? 1 : $scope.curIndex;

        $scope.progressBarConfig.curPercentage = ($scope.curIndex-1) * perProjPercentage;
        // set next index proj image opacity as 1
        setImageAppear($scope.curIndex);

        $scope.flags.isScrollDone = true;
        setFlag();

        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if(event.preventDefault) {
            event.preventDefault();
        }
        //scroll up
      }else if(delta < 0 && !$scope.flags.isScrollDone) {
         $scope.flags.isScrollDone = true;
         setFlag();

      };



    });

    // Prevent event fired multiple times, set 1.5 sec as the none-event timer
    function setFlag() {
      $timeout(function() {
        $scope.flags.isScrollDone = false;
      }, 1500);
    };

    function disappearDown(ele, pos){
      if ( pos == 'left') {
        ele.addClass('left-disappear');
        ele.css('opacity', 0);
      } else if ( pos == 'right' ) {
        ele.addClass('right-disappear');
        ele.css('opacity', 0);
      };

    };

    function setImageAppear ( index ) {
      var nextLeftElement = angular.element( document.querySelector( '#left-' + index ));
      var nextRightElement = angular.element( document.querySelector( '#right-' + index ));

      nextLeftElement.css('opacity', 1);
      nextRightElement.css('opacity', 1)
    };



    // $interval(function() {
    //   curIndex = curIndex + 1 == Object.keys(bgpics).length? 0 : curIndex + 1;
    //   $scope.curLeftPic = bgpics[curIndex].left;
    //   $scope.curRightPic = bgpics[curIndex].right;
    //
    // }, 2000);

  }]);
