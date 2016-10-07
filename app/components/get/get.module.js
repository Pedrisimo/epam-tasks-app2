"use strict";
let get = angular.module('get',[]);
get.controller('Users', ["$rootScope","$http", "$scope", Users]);
function Users($rootScope, $http, $scope) {
    $scope.showTable = false;
    let list = this;
    $scope.getusers = getUsers;
    $scope.$on('sendUserUpdate', function(event, msg) {
        getUsers();
    });
    $scope.$on('UserRemoved', function(event, msg) {
    getUsers();
    });
    function getUsers() {
        $http({
        url: '/items',
        method: "GET",
    })
    .then(function(response) {
           list.users = response.data;
           console.log(response.data);
           console.log(response.data.length);
           $rootScope.$broadcast('UserList', response.data);
    }, 
    function(response) { // optional
            alert(JSON.stringify(response.data));
    });
    };
 }