"use strict";
let add = angular.module('add', []);
add.controller('addUser', ["$rootScope", "$scope", "$http", addUser]);
function addUser($rootScope, $scope, $http) {
    $scope.adduser = function(item) {
		$http({
        url: '/items',
        method: "POST",
        data: JSON.stringify(item),
        header: 'application/json'
    })
    .then(function(response) {
        $scope.user = {};
        $rootScope.$broadcast('sendUserUpdate');
    },
    function(response) { 
            alert(response.data);
    });
    };
    $scope.$on('editUser', function(event, user) {
        $scope.user = user;
    })
}