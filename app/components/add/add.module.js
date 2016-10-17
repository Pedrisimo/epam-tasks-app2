"use strict";
let add = angular.module('add', []);
add.controller('addUser', ["$rootScope", "$scope", "$http", addUser]);
function addUser($rootScope, $scope, $http) {
    function fieldsValidation(item) {
        if(item !== undefined) {
            if (nameValidation(item) === true && emailValidation(item) === true && phoneValidation(item) === true) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            $scope.userNameErr = true;
            $scope.userEmailErr = true;
            $scope.userPhoneErr = true;
            return false;
        }

            }
    function nameValidation(item) {
        $scope.userNameErr = false;
        if (item.hasOwnProperty('name')) {
           (/\d/g).test(item.name) ? $scope.userNameErr = true : $scope.userNameErr = false;
            console.log("name:" + $scope.userNameErr);
        }
        else {
            $scope.userNameErr = true;
        }
        return $scope.userNameErr ? false : true;
    }

    function emailValidation(item) {
        $scope.userEmailErr = false;
        if (item.hasOwnProperty('email')) {
            (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/).test(item.email) ? $scope.userEmailErr = false : $scope.userEmailErr = true;
            console.log("email:" + $scope.userEmailErr);
        }
        else {
            $scope.userEmailErr = true;
        }
        return $scope.userEmailErr ? false : true;
    }

    function phoneValidation(item) {
        $scope.userPhoneErr = false;
        if (item.hasOwnProperty('phone')) {
            (/^\+375(25|29|33|44)\d{7}$/g).test(item.phone) ? $scope.userPhoneErr = false : $scope.userPhoneErr = true;
            console.log("phone:" + $scope.userPhoneErr);
        }
        else {
            $scope.userPhoneErr = true;
        }
        return $scope.userPhoneErr ? false : true;
    }
    $scope.$on('editUser', function(event, user) {
        $scope.user = user;
    });
    $scope.adduser = function(item) {
        if (fieldsValidation(item) === true) {
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
                    console.log(response.data);
            });
        }

    };

}