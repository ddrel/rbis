'use strict';
angular.module("RBIS",['ui.bootstrap'])
.controller("roadReportMainCtrl",['$scope', '$http','$rootScope','utilities','$timeout','$mdDialog', function( $scope, $http,$rootScope,utilities,$timeout,$mdDialog){

$scope.init =  function(){
    
};










/*---------------------------------------- Road Section Report dialog --------------------------------------------------*/
$scope.loadroadprofiledialog = function(ev) {
    $mdDialog.show({
      controller: RoadProfileDialogController,
      templateUrl: '/reports/views/dialog/road-section-profile.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(data) {
               
    }, function(error) {
        
    });
  };

  function RoadProfileDialogController($scope, $mdDialog,datamodel,$http,adapter) {
    
    $scope.roadList = [];
    $scope.roadObjData = {};
    $scope.byselect = {};
    $scope.provinces = []
    $scope.municipalities = [];
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel(); 
    };

    $scope.action = function(data) {
        if(data.R_ID){
            utilities.printab("/print/road-section-profile?rid=" + data.R_ID);
            //$mdDialog.hide(data);
        }else{

        }
        
        
    };

   $scope.onchange_roadlist = function(rid){
    $scope.roadObjData.R_ID = rid;
   }; 

   $scope.loadroads =  function(a,_class){
        var r_class = $scope.userObject.location.municity=="--"?"Provincial":"City";    
        $http.get("/api/roads/getRoadByLocation?location=" + a +"&r_class=" + _class).success(function(data){
            $scope.roadList = data;
        });
   } 

    $scope.onchange_provinces =  function(){
        $http.get("/api/location/getmunicity?code=" + $scope.byselect.province).success(function(data){                
                utilities.sort(data,"Name");
                $scope.municipalities = data;
        });

        $scope.loadroads($scope.byselect.province,"Provincial");

    };

    $scope.onchange_municity =  function(a){          
        var r_class = (a=="")?"Provincial":"City";
            a = (a=="")? $scope.byselect.province:a;
        $scope.loadroads(a,r_class);                        
    };
    
    $scope.userObject = {};
    $scope.init =  function(){            
        $timeout(function(){
            $http.get("/ws/users/me").success(function(user){
                $scope.userObject = user;                    
                //console.log($scope.userObject);
                if(user.role=="SUPER ADMINISTRATOR"){
                    $http.get("/api/location/getregionprovince").success(function(data){
                        utilities.sort(data,"Code");                                
                        data.forEach(function(region) {
                               region.provinces.forEach(function(province){
                                       var _d = {regionCode:province.RegionCode,code:province.Code,prov_name:region.Name + " > " + province.Name,name:province.Name};
                                       $scope.provinces.push(_d);                
                               });    
                       });                       
       
                    });
                }
                                
                if(user.role!="SUPER ADMINISTRATOR" && (user.role=="SUPERVISOR" || user.role=="ENCODER")){
                    var r_class = user.location.municity=="--"?"Provincial":"City"
                    var location = user.location.municity=="--"? user.location.province:user.location.municity;
                    $scope.loadroads(location,r_class);
                }
            });        
        });
        
    }
  }

}]);