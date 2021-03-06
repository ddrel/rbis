angular.module('RBIS').controller("roadsupdateCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams,datamodel,adapter,uploadroadSvcs,uploadroadSvcsData,DialogService) {
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
        });
        $http.get("/api/roads/getcarriagewayperconlength?qry=" + rid).success(function(d){
            for(var n in d){
                if(n.indexOf("_id")==-1 && n!="total"){
                    d[n] = utilities.formatToDecimal(d[n].toFixed(3));      
                }
            }
            $scope.summary.surfacecondition = d;      
        });


    };


$scope.getattribdisplay =  function(attr,key){
    key = key.replace("Road","");
    return utilities.roads.getattribdisplay(attr,key);
}

$scope.loadattrsFeaturesdata =  function(key,data){
    $scope.initModelData(key,data,null);
    //console.log($scope.currentModel.currentItem);                   
};


$scope.init =  function(){
    utilities.hidenavigation();
    adapter.user(function(user){
        $scope.user=user;
        console.log(adapter.readonlyModel);
        $scope.currentModel.readonly = adapter.readonlyModel;
    });

    $timeout(function(){
        var ih = $(".page-content").innerHeight();
        $(".panel-body").css("margin-bottom","0px");
        $(".panel-default").css("margin-bottom","0px");
        $(".roads-tree-attr-main").css({"height":ih - 162 + "px","margin-bottom":"0px"});
        $("#roadmap").css({"height":ih -158 + "px","margin-bottom":"0px"});
        $(".content-data-attr").css({"height":ih - 189 + "px","margin-bottom":"0px"}); 
        $("#contaier_layout_uilayout").css({"height":ih - 142 + "px","margin-bottom":"0px"});


        

            $http.get("/api/roads/getroadshortattrinfo?rid=" + $stateParams.id).success(function(data){
                    $scope.road = data;                             
                    $scope.summary.road.length = utilities.formatToDecimal((data.Length || 0) .toFixed(3));
                    $scope.summary.road.class = data.R_CLASS;
                    $scope.summary.road.importance = data.R_Importan;
                    
                    $scope.currentModel.roadID = data.R_ID;
                    //$scope.currentModel.readonly = true;
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
    $scope.initModelData("road",$scope.road,null);
    $scope.loadattrdata($scope.road,"road")
    //console.log($scope.road)

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
    $scope.currentModel.list = list || [];
    $scope.currentModel.isfeaturesParent = list?true:false;
    $scope.currentModel.currentItem = currentItem;
    if( currentItem){
        $scope.currentModel.currentItemReadonly = (datamodel.optionReadOnly.indexOf(currentItem.status || "inprogress") >-1);
    };
    
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

$scope.computeAADT = function(a){
    return  ((parseInt("0" + a.currentItem["motor_cycle_dec"]) + parseInt("0" + a.currentItem["motor_cycle_inc"]) + 
               parseInt("0" + a.currentItem["passenger_car_dec"]) + parseInt("0" + a.currentItem["passenger_car_inc"]) + 
               parseInt("0" + a.currentItem["passenger_utility_dec"]) + parseInt("0" + a.currentItem["passenger_utility_inc"]) +
               parseInt("0" + a.currentItem["goods_utility_dec"]) + parseInt("0" + a.currentItem["goods_utility_inc"]) +
               parseInt("0" + a.currentItem["small_bus_dec"]) + parseInt("0" + a.currentItem["small_bus_inc"]) +
               parseInt("0" + a.currentItem["large_bus_dec"]) + parseInt("0" + a.currentItem["large_bus_inc"]) +
               parseInt("0" + a.currentItem["rigid_truck_2_axles_dec"]) + parseInt("0" + a.currentItem["rigid_truck_2_axles_inc"]) +
               parseInt("0" + a.currentItem["rigid_truck_3_axles_dec"]) + parseInt("0" + a.currentItem["rigid_truck_3_axles_inc"]) +
               parseInt("0" + a.currentItem["trucksemi_trailer_3_4_axles_dec"]) + parseInt("0" + a.currentItem["trucksemi_trailer_3_4_axles_inc"]) +
               parseInt("0" + a.currentItem["trucksemi_trailer_5_axles_dec"]) + parseInt("0" + a.currentItem["trucksemi_trailer_5_axles_inc"]) +
               parseInt("0" + a.currentItem["truck_trailer_4_axles_dec"]) + parseInt("0" + a.currentItem["truck_trailer_4_axles_inc"]) +
               parseInt("0" + a.currentItem["truck_trailer_5_axles_dec"]) + parseInt("0" + a.currentItem["truck_trailer_5_axles_inc"])) / 365).toFixed(2);

}

$scope.ondatadirty =  function(a,b,c){
    if(a.name =="RoadTraffic"){
        a.currentItem.AADT = $scope.computeAADT(a)
        console.log(a.currentItem.AADT);
        adapter.processdata(a,"AADT",a.currentItem.AADT);
    }
    
    console.log(a)
    console.log(b)
    console.log(c)
    console.log("------------------------------");
    adapter.processdata(a,b,c);
};


$scope.isnewRow =  function(){
    if(!$scope.currentModel.currentItem) return false;
    var mdx = adapter.newFeatureObj.map(function(d){return d._id}).indexOf($scope.currentModel.currentItem._id);    
    return (mdx >-1);
}

$scope.reloadAttrFeature =  function(){
    $http.get("/api/roads/getroadattr?rid=" + $scope.road.R_ID + "&attr=" +$scope.currentModel.name).success(function(data){
        adapter.removenewfeature($scope.currentModel.currentItem._id);
        $scope.road[$scope.currentModel.name] = data || [];                                     
        $scope.initModelData($scope.currentModel.name,null,$scope.road[$scope.currentModel.name]);
        $scope.road[$scope.currentModel.name+"_length"] = $scope.road[$scope.currentModel.name].length;                        
    });
}

//Tool bar Action
var _oncomplete_save =  function(d,errors){
    if(d){
        d.forEach(function(a){
            toastr.success("Saved " + a.table + " | Field Count:" + a.count);
            adapter.clear(a.table);                                      
        });
    }
     
    if(errors){
        for(var erk in errors.errors){
            var message  = errors.errors[erk].message; 
            toastr.error(message);
        };
    };


    if($scope.currentModel.name=="RoadLocRefPoints"){$scope.loadAttrAsOptions("RoadLocRefPoints");};

    //adapter.addNewtate = false;
};
$scope.toolbarAction = function(a,e){
    var _onnewFeatureAdded = function(data){  
        //console.log(data);      
        $scope.currentModel.list = [];
        $scope.currentModel.currentItem = data;
        $scope.currentModel.currentItemReadonly =false;
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
                    var _dd = uploadroadSvcsData.get();
                        _dd.filetype = "image";
                        _dd.headertitle = "Upload Road Images";
                        uploadroadSvcsData.set(_dd);
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

                    });
                },importshapes:function(){
                    var roaduploadshapes = uploadroadSvcs.shapes();
                    var _dd = uploadroadSvcsData.get();
                        _dd.filetype = "shapes";
                        _dd.headertitle = "Upload Shape";
                        uploadroadSvcsData.set(_dd);
                        roaduploadshapes.then(function(data){                            
                            if(data!=="cancel"){
                               
                            }
                    },function(data){

                    })
                },addroadfile:function(){
                    var roaduploadfiles = uploadroadSvcs.files();
                    var _dd = uploadroadSvcsData.get();
                        _dd.filetype = "file";
                        _dd.headertitle = "Upload Road Documents";
                        uploadroadSvcsData.set(_dd);                        
                        roaduploadfiles.then(function(data){
                            $http.get("/api/roads/getRoadFile?r_id=" + $scope.currentModel.roadID + 
                            "&key_name=" + $scope.currentModel.name +
                            "&attr_id="  + $scope.currentModel.currentItem._id)
                            .success(function(data){ 
                                $timeout(function(){
                                       $scope.currentModel.currentItem.file_attachment = data;                                   
                                }) ;                                                                                      
                           }).error(function(){
                               toastr.error("Error loading Images");
                           });
                        });
                },exportgeojson:function(){
                    var url = "/api/shapes/download/geojson?r_id=" + $scope.currentModel.roadID + 
                              "&key_name=" + $scope.currentModel.name +
                              "&attr_id="  + $scope.currentModel.currentItem._id; 
                    utilities.download(url)
                },exportkml:function(){
                    var url = "/api/shapes/download/kml?r_id=" + $scope.currentModel.roadID + 
                    "&key_name=" + $scope.currentModel.name +
                    "&attr_id="  + $scope.currentModel.currentItem._id;
                    utilities.download(url)
                },cancel:function(){                    
                    $scope.reloadAttrFeature();
                },cancelAll:function(){
                    $window.location.reload();
                },refreshwindow:function(){
                    $window.location.reload();
                },delete(){
                    // Delete COmponent;
                var confirmDialog = DialogService.confirm('Delete Confirm','Are you sure you want to remove current component?');
                    confirmDialog.then(function (m) {
                        var opt = "?r_id=" + $scope.currentModel.roadID +
                                   "&attr_id=" +  $scope.currentModel.currentItem._id + 
                                   "&key_name=" + $scope.currentModel.name;
                        
                        $http.delete("/api/roads/deleteroadcomponent" + opt).success(function(){
                            console.log($scope.currentModel.list);    
                            var idx  = $scope.currentModel.list.map(function(d){return d._id}).indexOf($scope.currentModel.currentItem._id);
                                if(idx>-1){
                                    currentModel.list.splice(idx,1);
                                    
                                }

                                toastr.success("Successfully delete road component");
                                $timeout(function(){
                                    $window.location.reload();
                                },100)
                               
                        }).error(function(err){
                                toastr.error("Error deleting road component");
                        });

                    },function(){
                        
                    });


                }
        };


    action[a]();
};


$scope.tabselected = "details";
$scope.ismediatabactive =  function(){
    return ['images','attachment'].indexOf($scope.tabselected)>-1;
};
$scope.ontabselected = function(a){
    $scope.tabselected = a;
};
$scope.ondeleteFile =  function(b){    
    $scope.deleteMedia(b._id,"file_attachment").success(function(){
        var idx = $scope.currentModel.currentItem.file_attachment.map(function(d){return d._id}).indexOf(b._id);  
        if(idx>-1){$scope.currentModel.currentItem.file_attachment.splice(idx,1);}
            toastr.success("File successfully removed ...");
    }).error(function(){
            toastr.error("Error removing File ...");
    }); 
};

$scope.ondeleteRoadImage = function(a){              
    $scope.deleteMedia(a,"file_roadimages").success(function(){
        var idx = $scope.currentModel.roadImageList.map(function(d){return d.data}).indexOf(a);  
        if(idx>-1){$scope.currentModel.roadImageList.splice(idx,1);}
            toastr.success("Image successfully removed ...");
    }).error(function(){
            toastr.error("Error removing Image ...");
    });    

};

$scope.deleteMedia =  function(f_id,field_file){
    var opt = {};    
    opt.r_id = $scope.currentModel.roadID;
    opt.attr_id = $scope.currentModel.currentItem._id
    opt.f_id = f_id;
    opt.key_name = $scope.currentModel.name;

    var qry = "r_id=" + opt.r_id +
              "&attr_id=" + opt.attr_id +
              "&f_id=" + opt.f_id +
              "&key_name=" + opt.key_name;

    console.log("/media/road/delete?" + qry + "&field_file=" + field_file);              
    return $http.delete("/media/road/delete?" + qry + "&field_file=" + field_file)
}


$scope.onRemarksSubmit =  function(a,b){
    var opt = {};
    opt.r_id = $scope.currentModel.roadID;
    opt.r_name = $scope.road.R_NAME;
    opt.r_class = $scope.road.R_CLASS; 
    opt.attr_id = $scope.currentModel.currentItem._id
    opt.key_name = $scope.currentModel.name;
    opt.message = a;
    opt.status = b;
    opt.identifier = $scope.getattribdisplay($scope.currentModel.currentItem,$scope.currentModel.name);

    //console.log(opt);
var _postRemarks =  function(){
    $http.post("/api/roads/addRoadRemarks",opt).success(function(){
        toastr.success("Successfully add remark ...");
        $scope.currentModel.currentItemReadonly = (datamodel.optionReadOnly.indexOf(opt.status) >-1);
        $scope.currentModel.currentItem.status = opt.status;        
            $http.get("/api/roads/getRoadRemarks?r_id=" + $scope.currentModel.roadID + 
            "&key_name=" + $scope.currentModel.name +
            "&attr_id="  + $scope.currentModel.currentItem._id)
            .success(function(data){ 
                $timeout(function(){
                    $scope.currentModel.currentItem.remarks_trail = [];
                    $scope.currentModel.currentItem.remarks_trail = data;                                                       
                }) ;                                                                                      
            }).error(function(){
                toastr.error("Error loading remarks");
            });

        }).error(function(err){
                console.log(err);
                toastr.error("Error saving remarks");
        });
    }


    if(adapter.getdata().length>0){
        var confirmDialog = DialogService.confirm('Saving Confirm','You still have an unsaved data. Do you want to save and continue saving remarks and status?');
            confirmDialog.then(function (m) {
                adapter.save(null,_oncomplete_save);      
                _postRemarks();              
            },function(){
            });        
    }else{
        _postRemarks();
    }

    
}

$scope.getCurrentImageList =  function(roadItem){
    return utilities.file.getCurrentImageList(roadItem);
};

});