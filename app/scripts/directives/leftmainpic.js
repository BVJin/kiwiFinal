'use strict';

/**
 * @ngdoc directive
 * @name yiliApp.directive:leftMainpic
 * @description
 * # leftMainpic
 */
angular.module('yiliApp')
  .directive('leftMainpic', function ($window) {
    return {
      template: '<div></div>',
      scope : {
        "projData" : "="
      },
      link: function postLink(scope, element, attrs) {

        //when user scorll down or top, this event will be fired a lot of times
        //use the two var to control, and set interval update refresh the value
        //since this is the full page, so using the detection of whole window
        var ifScrollDown = false;



        
      }
    };
  });
