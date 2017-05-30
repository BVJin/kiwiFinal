'use strict';

/**
 * @ngdoc service
 * @name yiliApp.yiliSvcs
 * @description
 * # yiliSvcs
 * Service in the yiliApp.
 */
angular.module('yiliApp')
  .service('yiliSvcs', ['$resource', '$q', '$filter', function( $resource, $q, $filter ) {
    var self = this;

    //Group by the project ID
    self.getMainImges = function () {
      var deferred = $q.defer();
      var url = "server/main/main_pics.json";

      var groupedData = {};
      $resource(url).query().$promise.then(function(data){

        angular.forEach(data, function(item){
          if(!groupedData[item.projectId])
            groupedData[item.projectId] = {};
          // left/right
          if(!groupedData[item.projectId][item.position])
            groupedData[item.projectId][item.position] = {};

          groupedData[item.projectId][item.position] = item;
        });

        var res = [];
        angular.forEach(groupedData, function(gd, key){
          res.push(gd);
        });

        deferred.resolve(res);

      }, function(err){

        deferred.reject(err);

      });

      return deferred.promise;

    };

  }]);
