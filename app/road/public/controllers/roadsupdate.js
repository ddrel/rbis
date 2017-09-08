angular.module('RBIS').controller("roadsupdateCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams,datamodel,adapter,uploadroadSvcs,uploadroadSvcsData) {
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
        var ih = $(".page-content").innerHeight();
        $(".panel-body").css("margin-bottom","0px");
        $(".panel-default").css("margin-bottom","0px");
        $(".roads-tree-attr-main").css({"height":ih - 162 + "px","margin-bottom":"0px"});
        $("#roadmap").css({"height":ih -158 + "px","margin-bottom":"0px"});
        $(".content-data-attr").css({"height":ih - 189 + "px","margin-bottom":"0px"}); 



            $http.get("/api/roads/getroadshortattrinfo?rid=" + $stateParams.id).success(function(data){
                    $scope.road = data;                             
                    $scope.summary.road.length = utilities.formatToDecimal(data.Length.toFixed(3));
                    $scope.summary.road.class = data.R_CLASS;
                    $scope.summary.road.importance = data.R_Importan;
                    
                    $scope.currentModel.roadID = data.R_ID;
                    adapter.init(data.R_ID);              
                    $scope.loadAttrAsOptions("RoadLocRefPoints");              
                    $scope.loadRoadMainData();
            }).error(function(){
                $window.location.href = "/#/road/list";
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
    uploadroadSvcsData.set($scope.currentModel);
    $scope.currentModel.roadImageList = [];
    if(currentItem){
        $scope.currentModel.roadImageList = $scope.getCurrentImageList(currentItem);
    };
    
    
    
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




$scope.getFeaturesLabel =  function(key){
    if(utilities.roads.attrlabel[key]){
        return utilities.roads.attrlabel[key].label;
    }    
}

$scope.loadattrdata =  function(data,name){
    $("#roadmap").leafletMaps("clear");
    var geojson =  data.geometry || null;
    if(!geojson) {return;}

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
    var _oncomplete_save =  function(d,errors){
        if(d){
            d.forEach(function(a){
                toastr.success("Saved " + a.table + " | Field Count:" + a.count);
                adapter.clear(a.table);
                $scope.currentModel.isnew =  false;                      
            });
        }
         

        if(errors){
            for(var erk in errors.errors){
                var message  = errors.errors[erk].message; 
                toastr.error(message);
            };
        };

        //adapter.addNewtate = false;
    };



    var _onnewFeatureAdded = function(data){        
        $scope.currentModel.list = [];
        $scope.currentModel.currentItem = data;
        $scope.currentModel.isnew = true;
        adapter.addNewtate = true;

        
        uploadroadSvcsData.set($scope.currentModel);
        if($scope.road[$scope.currentModel.name]){
            $scope.road[$scope.currentModel.name].push($scope.currentModel.currentItem);
            $scope.road[$scope.currentModel.name+"_length"] = $scope.road[$scope.currentModel.name].length;
        }
    }

    var action = {new:function(){
                    adapter.newfeature(datamodel.structure[$scope.currentModel.name],
                                        $scope.currentModel.roadID,
                                        _onnewFeatureAdded);
                },save:function(){
                    adapter.save($scope.currentModel,_oncomplete_save);
                },saveall:function(){
                    adapter.save(null,_oncomplete_save);
                },cancel:function(){
                    adapter.addNewtate = false;
                },addroadimage:function(){
                    var roaduploadimages = uploadroadSvcs.images();
                    roaduploadimages.then(function(data){                            
                            if(data!=="cancel"){
                                //Load images
                                $http.get("/api/roads/getRoadImages?r_id=" + $scope.currentModel.roadID + 
                                         "&key_name=" + $scope.currentModel.name +
                                         "&attr_id="  + $scope.currentModel.currentItem._id)
                                         .success(function(data){ 
                                             $timeout(function(){

                                                if($scope.currentModel.currentItem.file_roadimages){
                                                    $scope.currentModel.currentItem.file_roadimages = data;
                                                }
                                                $scope.currentModel.roadImageList = [];
                                                $scope.currentModel.roadImageList = $scope.getCurrentImageList({file_roadimages:data});                                 
                                             }) ;                                                                                      
                                        }).error(function(){
                                            toastr.error("Error loading Images");
                                        });

                            }
                    },function(data){

                    })
                }
        };


    action[a]();
};
$scope.ondeleteRoad = function(a){
    var opt = {};    
    opt.r_id = $scope.currentModel.roadID;
    opt.attr_id = $scope.currentModel.currentItem._id
    opt.f_id = a;
    opt.key_name = $scope.currentModel.name;

    var qry = "r_id=" + opt.r_id +
              "&attr_id=" + opt.attr_id +
              "&f_id=" + opt.f_id +
              "&key_name=" + opt.key_name;
              
    $http.delete("/images/road/delete?" + qry).success(function(){
        var idx = $scope.currentModel.roadImageList.map(function(d){return d.data}).indexOf(opt.f_id);  
        if(idx>-1){$scope.currentModel.roadImageList.splice(idx,1);}
            toastr.success("Image successfully removed ...");
    }).error(function(){
            toastr.error("Error removing Image ...");
    });

};

$scope.getCurrentImageList =  function(roadItem){
    return utilities.file.getCurrentImageList(roadItem);
};

});