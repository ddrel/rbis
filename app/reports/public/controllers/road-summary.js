'use strict';
angular.module("RBIS",['ui.bootstrap']).controller("roadSummaryCtrl",['$scope', '$http','$rootScope','utilities','$timeout', function( $scope, $http,$rootScope,utilities,$timeout) {
var  getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

$scope.formatToDecimal =  function(d){
    return utilities.formatToDecimal(parseFloat("0" + d).toFixed(3));
}

$scope.getDateNow = function(){
        var date = new Date();
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + " " + date.toLocaleTimeString();        
}

$scope.getTerrain =  function(f){
    var dd = [{"key":"F","label":"FLAT"},{"key":"R","label":"ROLLING"},{"key":"M","label":"MOUNTAINOUS"}];
    var idx = dd.map(function(d){return d.key}).indexOf(f);
        if(idx>-1){
            return dd[idx].label;
        }else{
            return "";
        }

}

$scope.summarydata = [];
$scope.location = {};

$scope.init =  function(){
    $http.get("/ws/users/me").success(function(user){
        var opt = {};
        var field =  getParameterByName("CityMunCod")? "CityMunCod" : "location";
        opt[field] =  getParameterByName(field) || "";
        opt.class= getParameterByName("class");
        $http.get("/api/roads/summaryroadreport?" + field + "=" + opt[field] + "&class=" + opt.class).success(function(d){
            $scope.summarydata =  d;
            if(d.length>0){
                var rid = d[0].R_ID
                $http.get("/api/location/getlocfromrid?rid=" +rid).success(function(data){               
                    $scope.location =data;
                    if(user.role!="SUPER ADMINISTRATOR" && (user.role=="SUPERVISOR" || user.role=="ENCODER")){
                        
                    }else if(user.role=="SUPER ADMINISTRATOR"){
                        $scope.location.CityMun = getParameterByName("CityMunCod")? $scope.location.CityMun: " -- ";        
                    }

                    
                });
            }
            
        });

});
    

}
        
}]);
    
  