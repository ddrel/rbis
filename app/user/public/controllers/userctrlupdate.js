angular.module('RBIS').controller("userCtrlUpdate", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams) {

$scope.provinces = [];
$scope.municipalities = [];   
$scope.registerError = [];
$scope.byselect = {};
$scope.byselect.email = "";
$scope.byselect.activated = false;
$scope.byselect.accesstype = "--";
$scope.byselect.province = "--";
$scope.byselect.province_text = "--";
$scope.byselect.municity = "--";
$scope.byselect.municity_text = "--";




$scope.init =  function(){
    $timeout(function(){
        $http.get("/ws/users/getuserbyemail?email=" + $stateParams.email).success(function(user){
                $http.get("/api/location/getregionprovince").success(function(dataprov){
                        utilities.sort(dataprov,"Code");                                
                        dataprov.forEach(function(region) {
                                region.provinces.forEach(function(province){
                                        var _d = {code:province.Code,prov_name:region.Name + " > " + province.Name,name:province.Name};
                                        $scope.provinces.push(_d);                
                                });    
                        });                                


                        $scope.byselect.accesstype =  user.roles[0];
                        $scope.byselect.email = user.email;
                        $scope.byselect.activated = user.activated;
                        
                        $scope.byselect.province = user.location.province;
                        $scope.byselect.province_text = user.location.province_text;


                        

                        $http.get("/api/location/getmunicity?code=" + $scope.byselect.province).success(function(municity){                                                 
                                utilities.sort(municity,"Name");
                                $scope.municipalities = municity;
                                $timeout(function(){                                               
                                        $scope.byselect.municity = user.location.municity;                                
                                        $scope.byselect.municity_text = user.location.municity_text;                                  
                                },500);                
                                

                        });//get municity

                }); //end get provinbce
        });//get user;



       
    });//timeout
}; //end init

var _parseLocation = function(prov,municity){

        return {
                getProvinceName:function(){
                var pname = "--";        
                var pdx = $scope.provinces.map(function(d){return d.code}).indexOf(prov);
                if(pdx>-1){pname = $scope.provinces[pdx].name};    
                       return pname; 
                },
                getMunicityName:function(){
                var pname = "--";        
                var mdx = $scope.municipalities.map(function(d){return d.Code}).indexOf(municity);
                
                console.log($scope.municipalities[mdx]);
                if(mdx>-1){pname = $scope.municipalities[mdx].Name};    
                       return pname; 
                }

        }
}



$scope.onchange_provinces =  function(){
        $http.get("/api/location/getmunicity?code=" + $scope.byselect.province).success(function(data){                
                utilities.sort(data,"Name");
                $scope.municipalities = data;
        });

}


$scope.onaccesschange =  function(){
        if($scope.byselect.accesstype=="SUPER ADMINISTRATOR" || $scope.byselect.accesstype=="ROAD BOARD"){
                $scope.byselect.province = "--";
                $scope.byselect.province_text = "--";
                $scope.byselect.municity = "--";
                $scope.byselect.municity_text = "--";
        }
}

$scope.updateuser =  function(){
        var loc = _parseLocation($scope.byselect.province,$scope.byselect.municity);     
           $scope.byselect.province_text = loc.getProvinceName();                    
           $scope.byselect.municity_text = loc.getMunicityName();
        console.log($scope.byselect);

        $http.post("/ws/users/updateuseraccess", $scope.byselect)
          .success(function(data) {
            $scope.registerError = [];        
            toastr.success("Successfully update user '" + $scope.byselect.email +"'");                
          })
          .error(function(error) {
                $scope.registerError=error;
                console.log(error)
                if(error.length>0){error.forEach(function(err){toastr.error(err.msg);});};            
          });
}

});