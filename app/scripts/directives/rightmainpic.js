'use strict';

/**
 * @ngdoc directive
 * @name yiliApp.directive:leftMainpic
 * @description
 * # leftMainpic
 */
angular.module('yiliApp')
  .directive('rightMainpic', function ($window) {
    return {
      template: '<div></div>',
      scope : {
        "picSrc" : "="
      },
      link: function postLink(scope, element, attrs) {

        //when user scorll down or top, this event will be fired a lot of times
        //use the two var to control, and set interval update refresh the value
        //since this is the full page, so using the detection of whole window
        var ifScrollDown = false;

        angular.element($window).bind("wheel", function(event) {
          // cross-browser wheel delta
          var event = window.event || event; // old IE support
          var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

          //scroll down
          if(delta > 0 && !ifScrollDown) {
            console.log('down');
            disappear(element);
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
          ele.addClass('right-disappear');
        }
      }
    };
  });
