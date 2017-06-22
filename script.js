/**
 * Created by thisura on 6/22/17.
 */
var app = angular.module("myApp",[]);

app.controller("myCtrl",function ($scope,$http){
    $scope.departments = [];

    $http.get("http://localhost:8080/departments").then(function (response) {
        $scope.departments = response.data;
    });

    function refreshDepartments() {
        $http.get("http://localhost:8080/departments").then(function (response) {
            $scope.departments = response.data;
        });
    }
    $scope.addDepartment = function () {
        var newDepartment = {
            id:$scope.deptId,
            name: $scope.deptName
        };

        if (newDepartment.id != null && newDepartment.name != null) {
            $http.post("http://localhost:8080/departments", newDepartment).then(function (response) {
                alert("New Dept Added !");
                refreshDepartments();
            }, function (response) {
                alert("New Dept Adding Failed !")
            });
        } else {
            alert("Inputs are not valid !");
        }
    };

    $scope.deleteDepartment = function () {
        var delDepartment = $scope.deptId1;

        if(delDepartment!=null){
            $http.delete("http://localhost:8080/departments/" + delDepartment).then(function (response) {
                alert("Dept Deleted!");
                refreshDepartments();
                //document.getElementById("deptId1").value="";
            }, function (response) {
                alert("New Dept Adding Failed !")
            });
        } else {
            alert("Inputs are not valid !");
        }
    };

    $scope.searchDepartment = function () {
        var searchDepartment = $scope.searchId;

        if(searchDepartment!=null){
            $http.get("http://localhost:8080/departments/"+searchDepartment).then(function (response) {
                alert("Found!");
                alert("response.data");
            },function (response) {
                alert("Failed !");
            });
        }else{
            alert("Input is invalid !");
        }
    }
});