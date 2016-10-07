"use strict";
let table = angular.module('table',[]);
table.controller('createList', ["$rootScope", "$http", "$scope", createList]);
function createList($rootScope, $http, $scope) {
    let list = this;
    $scope.showTable = false;
    $scope.$on('UserList', function (event, response) {
    console.log("Data in table controller: "+ response);
    list.users = response;
    if(response.length >0 ) {
        $scope.showTable = true;
    }
    else {
        $scope.showTable = false;
    }

    });
   $scope.rmuser = rmUser;
    function rmUser(id) {
        console.log("RM ID:" + id);
        let rmRec = {"id": id};
        $http({
            url: '/items',
            method: "DELETE",
            data: {'id' : id},
            headers: {"Content-Type": "application/json;charset=utf-8"}
    })
    .then(function(response) {
           $rootScope.$broadcast('UserRemoved');
           },
        function(response) { // optional
                alert(response.data);
            });
    };
}
