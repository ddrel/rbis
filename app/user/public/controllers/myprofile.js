angular.module('RBIS').controller("myprofileCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities) {

$scope.user = {};
$scope.init =  function(){
    $http.get("/ws/users/me").success(function(user){
        console.log(user);
        $scope.user = user;
    });
}

$scope.useraccess={};
$scope.errors = {};
$scope.errors.changepassword = [];
$scope.errors.user = [];
$scope.useraccesscancel =  function(){
    $scope.useraccess.password = "";
    $scope.useraccess.confirmPassword = "";
    $scope.useraccess.newPassword = ""; 
};

$scope.changepassword =  function(){
    console.log($scope.useraccess);
    $http.post("/ws/users/changepassowrd",$scope.useraccess).success(function(data){        
        toastr.success("Successfully Changes Your Password!");     
    }).error(function(errs){                        
        $scope.errors.changepassword = errs;
        console.log($scope.errors.changepassword);
    })
}


$scope.updateprofile =  function(){
 $http.post("/ws/users/updateprofile",$scope.user).success(function(d){
    toastr.success("Successfully update your profile!");     
 }).error(function(err){
    $scope.errors.user =  err;
 })
}

});