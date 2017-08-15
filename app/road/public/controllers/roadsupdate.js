angular.module('RBIS').controller("roadsupdateCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams,datamodel,adapter) {
    $scope.param = $stateParams;    
    $scope.road = {}
    $scope.roadsummarydisplay = 0;    
    $scope.currentloadatafields = [];
    $scope.currentloadata = {};

    $scope.roadsAttr = utilities.roads.attrlabel;
    $scope.roadsAttrKeys = utilities.roads.roadattrkeys;
    $scope.roadattrgroup = utilities.roads.groups;


    $scope.currentModel= {};
    $scope.currentModel.roadID = "";
    $scope.currentModel.name = "";
    $scope.currentModel.list = [];
    $scope.currentModel.currentItem = null;
    $scope.currentModel.page_attr_select = [];


    $scope.summary = {};
    $scope.summary.surfacetype = {};    
    $scope.summary.surfacecondition = {};
    $scope.summary.road = {}

var _getshapestyle = function(o,name){    
    if(name=="Carriageway"){
        return utilities.roads.STStyle(o.SurfaceTyp); 
    }else{
                return {
                                        style: function(f){
                                        return {weight: 4,
                                                opacity: 1,
                                                color: '#ff6666',
                                                dashArray: '4',
                                                fillOpacity: 0.7
                                            }											
                                        }
                        }
            };
    };

$scope.getroadSC_ST =  function(rid){
        $http.get("/api/roads/getcarriagewaypersurfacelength?qry=" + rid).success(function(d){                    
          for(var n in d){
            if(n.indexOf("_id")==-1 && n!="total"){
                d[n] = utilities.formatToDecimal(d[n].toFixed(3));      
            }
          }
          $scope.summary.surfacetype = d;
          console.log($scope.summary.surfacetype);          
        });
        $http.get("/api/roads/getcarriagewayperconlength?qry=" + rid).success(function(d){
            for(var n in d){
                if(n.indexOf("_id")==-1 && n!="total"){
                    d[n] = utilities.formatToDecimal(d[n].toFixed(3));      
                }
            }
            $scope.summary.surfacecondition = d;  
            console.log($scope.summary.surfacecondition);          
        });


    };


$scope.getattribdisplay =  function(attr,key){
    key = key.replace("Road","");
    return utilities.roads.getattribdisplay(attr,key);
}

$scope.loadattrsFeaturesdata =  function(key,data){
    $scope.initModelData(key,data,[]);
    //console.log($scope.currentModel.currentItem);                   
};


$scope.init =  function(){
    $timeout(function(){

            $http.get("/api/roads/getroadshortattrinfo?rid=" + $stateParams.id).success(function(data){
                    $scope.road = data;             
                    
                    $scope.summary.road.length = utilities.formatToDecimal(data.Length.toFixed(3));
                    $scope.summary.road.class = data.R_CLASS;
                    $scope.summary.road.importance = data.R_Importan;
                    
                    $scope.currentModel.roadID = data.R_ID;
                    adapter.init(data.R_ID);              
                    $scope.loadAttrAsOptions("RoadLocRefPoints");              
                    $scope.loadRoadMainData();
            });

            $scope.getroadSC_ST($stateParams.id);
            $("#roadmap").leafletMaps();
    });
};
$scope.loadRoadMainData =  function(){
    $scope.initModelData("road",$scope.road,[]);
};

$scope.loadAttrAsOptions =  function(attr,toattr,cb){
        $http.get("/api/roads/getroadattr?rid=" + $scope.road.R_ID + "&attr=" + attr).success(function(data){
           // if(toattr=="RoadCarriageway"){
                for(var n in datamodel.structure){
                    if(n!="road" && n!="RoadLocRefPoints"){
                        datamodel.structure[n]["LRPStartKm"].options = [];                                            
                        datamodel.structure[n]["LRPEndKmPo"].options = [];
                        data.forEach(function(d){                            
                                datamodel.structure[n]["LRPStartKm"].options.push({key:d.KMPostNo,label:d.KMPostNo});
                                datamodel.structure[n]["LRPEndKmPo"].options.push({key:d.KMPostNo,label:d.KMPostNo});                            
                        });      
                    }
                }
                                                                                                   
            //}
            
            if(cb) cb(data);                                                 
        }); 


}



$scope.getattrdata = function(key,cb){        
    $scope.currentModel.currentItem = null;
    if(!$scope.road.hasOwnProperty(key)){
        $http.get("/api/roads/getroadattr?rid=" + $scope.road.R_ID + "&attr=" + key).success(function(data){
                    $scope.road[key] = data;                                        
                    $scope.initModelData(key,null,$scope.road[key]);
                    if(cb) cb(response.data);                             
        });                        
    }else{        
        $scope.initModelData(key,null,$scope.road[key]); 

    };         
};


$scope.initModelData =  function(key,currentItem,list){
    $scope.currentloadatafields = Object.keys(datamodel.structure[key])
    $scope.currentModel.name = key;
    $scope.currentModel.struct =  datamodel.structure[key];
    $scope.currentModel.list = list;
    $scope.currentModel.currentItem = currentItem;
    
    
    // breadcrums for the road/attr/features
    $scope.currentModel.page_attr_select = [];
    if(key!="road"){
        $scope.currentModel.page_attr_select = [];
        $scope.currentModel.page_attr_select.push(utilities.roads.attrlabel[key].label);
        if(currentItem){
            $scope.currentModel.page_attr_select.push($scope.getattribdisplay(currentItem,key));
        }
    }
};


$scope.loadattrdata =  function(data,name){
    $("#roadmap").leafletMaps("clear");
    var geojson =  data.geometry;
    name =  name.replace("Road","");
    var _style = _getshapestyle(data,name);
    var _geo = $("#roadmap").leafletMaps("setGeoJSON", geojson,null,_style);
    _geo.on({
        mouseover: function (e) {_geo.openPopup(); },
        click: function (e) {
            $("#roadmap").leafletMaps("zoomToFeature", e.target);
        }
    });
    
    var tooltiptext = utilities.roads.getattribdisplay(data,name);
    _geo.eachLayer(function (layer) {                        
            layer.bindPopup(name + ": "  + tooltiptext);
        });
    $("#roadmap").leafletMaps("zoomToFeature", _geo);
        
    //console.log(data);
}

$scope.ondatadirty =  function(a,b,c){
    adapter.processdata(a,b,c);
};


//Tool bar Action
$scope.toolbarAction = function(a,e){
    var _oncomplete =  function(d){
        d.forEach(function(a){
            toastr.success("Saved " + a.table + " | Field Count:" + a.count);
            adapter.clear(a.table);                      
        }); 
    };

    var action = {save:function(){
                    adapter.save($scope.currentModel,_oncomplete);
                },saveall:function(){
                    adapter.save(null,_oncomplete);
                }
        };


    action[a]();
};
});