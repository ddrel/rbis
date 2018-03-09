'use strict';

var utilities = {
                parseLocation :  function(r_id){
                var municity_code = (r_id.substring(0,4) + "00000") == (r_id.substring(0,6) +"000")?"":r_id.substring(0,6) +"000";
                var region_code = r_id.substring(0,2) + "0000000";
                return {province_code:r_id.substring(0,4) + "00000",municity_code:municity_code,region_code:region_code};
                },getattribdisplay: function(attr,name){
                    var _value = name;
                    if(name=="RoadBridges" || name=="RoadPlaceNames"){
                         _value = attr.Name;
                    }else if(name=="RoadCarriageway"){           
                        _value =  attr.SurfaceTyp + "-" + attr.SegmentID; // attr.NumLanes +"/" + attr.SurfaceTyp +"/" + attr.PavementTy + "/" +
                    }else if(name=="RoadShoulders" || name=="RoadDitches" ||  name=="RoadGuardrails" ||  name=="RoadStructures" || name=="RoadSideWalks" || name=="SideSlopes"){
                             _value = attr.Position + "/" + attr.TypeID + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
                    }else if(name=="RoadLocRefPoints"){
                        _value = "KM Post: " + attr.KMPostNo;
                    }else if(name=="RoadCulverts" || name=="RoadSideFriction" || name=="RoadMarkings" || name=="RoadSpillways" || name=="RoadCauseways"){
                        _value =  attr.TypeID + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
                    }else if(name=="RoadLightings" || name=="RoadHazards" || name=="RoadSigns"){
                        _value =  attr.Position +"/" + attr.Exist  + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
                    }else if(name=="RoadJunctions" || name=="RoadMedian"){
                             _value =  attr.TypeID + "/" +  attr.LRPStartDi;
                    }else if(name=="road"){
                        _value = attr.R_NAME;
                    }
             
                    return _value;
                },getlocaccess:function(user){                    
                    if(user.roles.indexOf("SUPER ADMINISTRATOR")>-1 || user.roles.indexOf("ROAD BOARD")>-1){
                        return false;
                    }else if(user.roles.indexOf("SUPERVISOR")>-1 || user.roles.indexOf("ENCODER")>-1){
                        if(user.location.municity!="--" && user.location.municity!==""){
                             return {CityMunCod:user.location.municity,R_CLASS:"City"};
                        }else{
                            return {ProvinceCo:user.location.province,R_CLASS:"Provincial"};               
                        };
                    };              
                    return false;
             },modelgetvalue : function(model,o){                
                if(model.ctrl=="select" && model.options.length>0){
                            var idx  = model.options.map(function(d){return d.key}).indexOf((o[model.key] || ""));                            
                            return idx>-1?model.options[idx].label :"";
                }else{
                    return o[model.key] || "";
                };
              }
};


module.exports = utilities;