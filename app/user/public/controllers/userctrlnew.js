angular.module('RBIS').controller("userCtrlNew", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams) {

$scope.regions = [];
$scope.provinces = [];
$scope.municipalities = [];   
$scope.registerError = [];
$scope.byselect = {};
$scope.byselect.accesstype = "--";
$scope.byselect.region = "--";
$scope.byselect.province = "--";
$scope.byselect.province_text = "--";
$scope.byselect.municity = "--";
$scope.byselect.municity_text = "--";
$scope.byselect.password = "";
$scope.byselect.confirmPassword = "";



$scope.init =  function(){
    $timeout(function(){
        $http.get("/api/location/getregionprovince").success(function(data){
                 utilities.sort(data,"Code");                                
                data.forEach(function(region) {
                        region.provinces.forEach(function(province){
                                var _d = {code:province.Code,prov_name:region.Name + " > " + province.Name,name:province.Name};
                                $scope.provinces.push(_d);                
                        });    
                });
                

        });     
        
        $http.get("/api/location/getregion").success(function(data){
                $scope.regions = data;
        });
    });
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



$scope.createuser =  function(){
           $scope.byselect.confirmPassword = $scope.byselect.password;
           if($scope.byselect.accesstype=="VIEWER REGION"){
                var r =  $scope.byselect.region=="--"?{Code:"--",Name:"--"}: JSON.parse($scope.byselect.region);
                $scope.byselect.region = r.Code;
                $scope.byselect.region_text = r.Name;
           }else{
                var loc = _parseLocation($scope.byselect.province,$scope.byselect.municity);     
                $scope.byselect.province_text = loc.getProvinceName();                    
                $scope.byselect.municity_text = loc.getMunicityName();
           }
           

           //console.log($scope.byselect);

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