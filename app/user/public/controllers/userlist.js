angular.module('RBIS').controller("userlistCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$mdDialog,DialogService) {


$scope.users = [];
$scope.searchText = "";
$scope.pagination = {};
$scope.pagination.max = 1;
$scope.pagination.current = 1;
var _reloadUsers =  function(){
    var page = $scope.pagination.current;
    var _qry = ($scope.searchText!="")? "?qry=" + $scope.searchText + "&page=" + page:"" + "?page=" +page;
    $scope.getusers(_qry,function(u){
            $scope.users = u;
            $scope.pagination.max = u.pages;
        });
};

$scope.init =  function(){
    $timeout(function(){
        $http.get("/ws/users/getusers").success(function(u){
                $scope.users = u;
                $scope.pagination.max = u.pages;
        });
    });
};


$scope.deleteuser =  function(u){
    var confirmDialog = DialogService.confirm('Delete Confirm','Are you sure you want to remove  "'+ u.name + "(" + u.email+ ")" + '"?');
    confirmDialog.then(function (m) {
        $http.delete("/ws/users/delete?email="+u.email).success(function(d){
            toastr.success(d.msg);
            _reloadUsers();  
        }).error(function(err){
            toastr.error("Error removing user.");
            console.log(err);
        });                
    },function(){
        
    });
}

$scope.onSearch =  function(s){
        $scope.getusers("?qry=" + s,function(u){
            $scope.users = u;
            $scope.pagination.max = u.pages;
        });
}


$scope.getusers = function(qry,cb){
        $timeout(function(){
            $http.get("/ws/users/getusers" + qry).success(function(u){           
                cb(u);
        });
        },400);        
    }


$scope.pageChanged =  function(page){
    var _qry = ($scope.searchText!="")? "?qry=" + $scope.searchText + "&page=" + page:"" + "?page=" +page;
    $scope.getusers(_qry,function(u){
            $scope.users = u;
            $scope.pagination.max = u.pages;
        });

};


$scope.update =  function(user){
    //console.log(user);
    $window.location.href = "/#/user/updateuser/" + user.email;    
}

});