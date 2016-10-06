"use strict";
let app = angular.module('add', []);
app.controller('addUser', ["$http", "$scope",addUser]);
function addUser($http, $scope) {
    $scope.adduser = function(item) {
		$http({
        url: '/items',
        method: "POST",
        data: JSON.stringify(item),
        header: 'application/json'
    })
    .then(function(response) {

    },
    function(response) { // optional
            alert(response.data);
    });
    };
}
app.controller('Users', ["$http", "$scope", Users]);
function Users($http, $scope) {
    $scope.showTable = false;
	let list = this;
	$scope.getusers = getUsers;
  //  $scope.$broadcast('SendUserUpdate', getUsers);
    function getUsers() {
		$http({
        url: '/items',
        method: "GET",
    })
    .then(function(response) {
           list.users = response.data;
           console.log(list.users);
            $scope.showTable = true;
    }, 
    function(response) { // optional
            alert(JSON.stringify(response.data));
    });
    };
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
           getUsers();
           },
        function(response) { // optional
                alert(response.data);
            });
    };
}
