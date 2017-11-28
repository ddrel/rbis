'use strict';
angular.module("RBIS",['ui.bootstrap']).controller("roadSectionCtrl",['$scope', '$http','$rootScope','utilities','$timeout', function( $scope, $http,$rootScope,utilities,$timeout) {
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


$scope.roadAttr = {};
$scope.roadAttr.location = {};
$scope.roadAttr.main = {};
$scope.roadAttr.surfacetype = {};
$scope.roadAttr.surfacecon = {};

$scope.init =  function(){
    var rid = getParameterByName("rid");   
    var map = L.map("map_canvas",{ zoomControl: false ,preferCanvas: true}).setView([12.80, 122.27], 5)
    L.tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHJlbCIsImEiOiJjajdibG4waDkwdHd3MzJxbWwzcmhzbHZnIn0.f-q8EG-3W_AEPk8P1h62pA").addTo(map);


    if(!rid){return;}
    $http.get("/api/roads/getroadshortattrinfo?rid=" +rid).success(function(data){
        $scope.roadAttr.main =  data;
        var geojson =  data.geometry || null;
        if(!geojson) {return;}

        var option =  {
                        style: function(f){
                        return {weight: 4,
                                opacity: 1,
                                color: 'transparent',
                                dashArray: '4',
                                fillOpacity: 0.7
                            }											
                        }
                }        
        var _geo = L.geoJson(geojson,option).addTo(map);        
        map.fitBounds(_geo.getBounds());  

        

            /*
            html2canvas($("#map_canvas"), {
                useCORS: true,
                onrendered: function (canvas) {
                var dataUrl = canvas.toDataURL("image/png");
                var img = document.createElement('img');
                var dimensions = map.getSize();
                img.width = dimensions.x;
                img.height = dimensions.y;
                img.src = canvas.toDataURL();
                document.getElementById('map_canvas').innerHTML = '';
                document.getElementById('map_canvas').appendChild(img);

                }
            });
            */
            
            /**/
            leafletImage(map, function(err, canvas) {               
                var img = document.createElement('img');
                var dimensions = map.getSize();
                img.width = dimensions.x;
                img.height = dimensions.y;
                img.src = canvas.toDataURL();
    
                document.getElementById('map_canvas').innerHTML = '';
                document.getElementById('map_canvas').appendChild(img);
            });
            
    });

    $http.get("/api/roads/getcarriagewayperconlength?qry=" +rid).success(function(data){
        $scope.roadAttr.surfacecon  =  data;
    });

    $http.get("/api/roads/getcarriagewaypersurfacelength?qry=" +rid).success(function(data){
        $scope.roadAttr.surfacetype = data;
    });

    $http.get("/api/location/getlocfromrid?rid=" +rid).success(function(data){
        $scope.roadAttr.location = data;
    });

    
    $http.get("/api/roads/getroadattr?rid=" + rid+ "&attr=RoadCarriageway").success(function(data){
        $scope.roadAttr.carriageway = data;        
        if(data.length>0){
            data.forEach(function(d){
                if(d.geometry){
                    var _style = utilities.roads.STStyle(d.SurfaceTyp); 
                    var _geo = L.geoJson(d.geometry,_style).addTo(map);
                }
            });
        }

        
    });
}
        
}]);
    
  