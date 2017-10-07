angular.module('RBIS').controller("myprofileCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities) {


$scope.init =  function(){

}

$scope.useraccess={};
$scope.errors = {};
$scope.errors.changepassword = [];

$scope.useraccesscancel =  function(){
    $scope.useraccess.password = "";
    $scope.useraccess.confirmPassword = "";
    $scope.useraccess.newPassword = ""; 
};

$scope.changepassword =  function(){
    console.log($scope.useraccess);
    $http.post("/ws/users/changepassowrd",$scope.useraccess).success(function(data){
        console.log(data);
        toastr.success("Successfully Changes Your Password!");     
    }).error(function(errs){                        
        $scope.errors.changepassword = errs;
        console.log($scope.errors.changepassword);
    })
}

});