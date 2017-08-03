angular.module('RBIS').controller("newuserCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities) {

$scope.provinces = [];
$scope.municipalities = [];   
$scope.registerError = [];
$scope.byselect = {};
$scope.byselect.accesstype = "--";
$scope.byselect.province = "--";
$scope.byselect.municity = "--";
$scope.byselect.password = "";
$scope.byselect.confirmPassword = "";



$scope.init =  function(){
    $timeout(function(){
        $http.get("/api/location/getregionprovince").success(function(data){
                 utilities.sort(data,"Code");                                
                data.forEach(function(region) {
                        region.provinces.forEach(function(province){
                                var _d = {code:province.Code,prov_name:region.Name + " > " + province.Name};
                                $scope.provinces.push(_d);                
                        });    
                });
                

        });        

    });
}; //end init

$scope.createuser =  function(){
           $scope.byselect.confirmPassword = $scope.byselect.password;        
           $http.post("/ws/register", $scope.byselect)
          .success(function(data) {
            $scope.registerError = [];        
            toastr.success("Successfully created user '" + data.name +"'");                
            $scope.byselect.password = "";
            $scope.byselect.name = "";
            $scope.byselect.email = "";
          })
          .error(function(error) {
                $scope.registerError=error;
                console.log(error)
                if(error.length>0){error.forEach(function(err){toastr.error(err.msg);});};            
          });
};


$scope.generatepassword = function(){
        $http.get("/ws/users/generatepw").success(function(data){                
                $scope.byselect.password = data.password;
        });
};

$scope.onchange_provinces =  function(){
        $http.get("/api/location/getmunicity?code=" + $scope.byselect.province).success(function(data){                
                utilities.sort(data,"Name");
                $scope.municipalities = data;
        });

}

});