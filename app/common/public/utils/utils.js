'use strict';

angular.module('RBIS').factory('utilities', ['$window','$rootScope',function ($window, $rootScope) {
    var utilities = {};
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dayColors = [
	"#81AEF1",	// noon
	"#164F9C",	// day
	"#02356A",	// twilight
	"black"		// night
    ];

    var hourState = {
                    sunrise:5,
                    sunset:20
    };


    utilities.hourcolor = function(h){
        var _getColorIndex = function(hour){
            if (hour == hourState.sunrise) return 2;
            if (hour == hourState.sunrise) return 2;
            if (hour > hourState.sunrise && hour < hourState.sunset) return 1;
            return 3;
        }

        return dayColors[_getColorIndex(h)];
    }
    

    utilities.formatDate= function(d){
        var date = new Date(d);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      };

    utilities.formatDate2= function(d){
        var date = new Date(d);
        return (date.getMonth() + 1) + '/' + date.getDate();
      };

      utilities.formatDate3 =  function(d){        
            if(d){
                var date = new Date(d);
                return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + " " + date.toLocaleTimeString();
            };
            return "";
      }

      utilities.formatBoolToString = function(b){
          return b?'Yes':'No';
      }

      utilities.uuid = function(){
           var G = function () {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
          }
          return (G() + G()  + G()  + G()  + G()  + G() + G() + G()).toLocaleLowerCase();
      }

      utilities.getPercent = function(a,total){
          if(total ==0 && a ==0) return "0%";                    
          return  ((a / total) * 100).toFixed(2)  + "%"
      }


      utilities.convert = {};
      
      utilities.convert.CtoF=  function(d){ return Math.round(((d * 9) / 5 + 32) * 10) / 10};
      utilities.convert.FtoC =  function(d){ return Math.round(((d -32) * 5 / 9) * 10) / 10};
      
      utilities.convert.MilestoKm =  function(d){ return Math.round((d * 1.60934) *10) / 10};
      utilities.convert.KmtoMiles =  function(d){ return Math.round((d * 0.621371) * 10) / 10};
      
      utilities.convert.CmtoInch = function(d){return Math.round((d / 2.54) *10) /10};
      utilities.convert.InchtoCm = function(d){return Math.round((d * 2.54) *10) /10};


      utilities.ObjSize = function(obj){
        var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;          
      }



      utilities.hidenavigation =  function(){
        var sidebarMenu = $('.page-sidebar-menu');
        var body = $('body');
            body.addClass("page-sidebar-closed");
            sidebarMenu.addClass("page-sidebar-menu-closed");
            if (body.hasClass("page-sidebar-fixed")) {
                sidebarMenu.trigger("mouseleave");
            }
            if ($.cookie) {
                $.cookie('sidebar_closed', '1');
            }            
      }

      utilities.download =  function(url){
        var link = $window.document.createElement("a");    
        link.href = url;
        link.style = "visibility:hidden";
        $window.document.body.appendChild(link);
        link.click();
        $window.document.body.removeChild(link);
      }

      utilities.road = {};
      utilities.road.attrkeys = ["RoadBridges", 
                                "RoadCarriageway", 
                                "RoadCauseways", 
                                "RoadCulverts", 
                                "RoadDitches", 
                                "RoadGuardrails", 
                                "RoadHazards",
                                "RoadJunctions", 
                                "RoadLightings", 
                                "RoadLocRefPoints", 
                                "RoadMarkings",
                                "RoadMedian", 
                                "RoadPlaceNames", 
                                "RoadShoulders", 
                                "RoadSideFriction", 
                                "RoadSideSlopes", 
                                "RoadSideWalks",
                                "RoadSigns", 
                                "RoadSpillways", 
                                "RoadStructures"] 
      utilities.road.toattr =  function(attr){
          var _ndata = {};
             _ndata.attrs = [];
             Object.keys(attr).forEach(function(k){
                 if(utilities.road.attrkeys.indexOf(k)==-1){
                    _ndata[k] = attr[k];
                }else if(attr[k].length>0){
                    var _k = k.replace("Road","");
                    var _d = {_id:utilities.uuid(),name:_k,value:attr[k],count:attr[k].length,keyname:k};
                    _ndata.attrs.push(_d);
                }

             })
          
          utilities.sort(_ndata.attrs,"name");
          return _ndata;
      }

      utilities.sort=function(obj,field){          
          obj.sort(function(a,b){
                    var nameA = a[field];
                    var nameB = b[field];
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                });
      }

            
      utilities.sortDate =  (function (a, b) {
    	    var key1 = new Date(a.date.replace(/-/g, "/").replace(".0",""));
    	    var key2 = new Date(b.date.replace(/-/g, "/").replace(".0",""));

    	    if (key1 < key2) {
    	        return -1;
    	    } else if (key1 == key2) {
    	        return 0;
    	    } else {
    	        return 1;
    	    }
    	});

    utilities.formatToDecimal =  function(s){
 		if(!s) return 0;
 		return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 	}

     utilities.formatDateAMPM =  function(dt){
		  var h =  dt.getHours();
		  var _time = (h >= 12) ? (((h==12)?12:h-12) +"PM") : (((h==0)?12:h) + "AM");		  
		  return _time;
	  }
      utilities.addhours =  function(date,h) {    
		  date.setTime(date.getTime() + (h*60*60*1000)); 
		  	return date ;   
		}
	  
      utilities.rand = function(min,max){
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
      
      
      utilities.getMonthDate =  function(date){
    	  return months[date.getMonth()] + " " + date.getDate();
      }

      utilities.forecast = {};
      utilities.forecast.chart = {};
      utilities.forecast.chart.forecastchartdata =  function(hours){
            var _temp = hours.map(function(d){return d.temp});
            var _rh = hours.map(function(d){return d.rh});

            var _x = []
                _x.push(_temp);
                _x.push(_rh);
            return _x;
        }

        utilities.forecast.chart.forecastchartlabels =  function(hours){
            var _labels = [];
            hours.map(function(d){return d.fcst_valid_local}).forEach(function(d){
                var _ampm = utilities.formatDateAMPM(new Date(d));
                _labels.push(_ampm);
            });

            return _labels;
        }


    utilities.text = {};
    utilities.text.truncate =  function(txt,len){
        return txt.length>=len?txt.substring(0,len) + " ...":txt;
    }

      utilities.geo = {}
      utilities.geo.tocoord = function(latng,angle,radius){
          var coord = {};
          var _angle = angle * Math.PI /180;           
           coord.lat = latng.lat + radius * Math.cos((2 * Math.PI * _angle));
           coord.lng = latng.lng + radius * Math.sin((2 * Math.PI * _angle));
    
          return coord;
      }

    utilities.geo.destinationPoint = function(latng,brng, dist) {
         dist = dist / 6371;  
         brng = brng.toRad();  

         var lat1 = latng.lat.toRad(), lon1 = latng.lng.toRad();

         var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                              Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

         var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                      Math.cos(lat1), 
                                      Math.cos(dist) - Math.sin(lat1) *
                                      Math.sin(lat2));

         if (isNaN(lat2) || isNaN(lon2)) return null;

         return {lat:lat2.toDeg(), lng:lon2.toDeg()};
      }

    

    utilities.roads={}
    utilities.roads.roadattrkeys = ["RoadBridges",
                                    "RoadCarriageway",
                                    "RoadCauseways",
                                    "RoadCulverts",
                                    "RoadDitches",
                                    "RoadGuardrails",
                                    "RoadHazards",
                                    "RoadJunctions",
                                    "RoadLightings",
                                    "RoadLocRefPoints",
                                    "RoadMarkings",
                                    "RoadMedian",
                                    "RoadPlaceNames",
                                    "RoadShoulders",
                                    "RoadSideFriction",
                                    "RoadSideSlopes",
                                    "RoadSideWalks",
                                    "RoadSigns",
                                    "RoadSpillways",
                                    "RoadStructures"];

/*
Road Side Features:
Shoulders
Structures
SideSlopes
SideWalks

Safety Features Appliance:
Guardrails
Markings
Lightings
Hazards
Signs

Drainage:
Causeways
Culverts
Ditches
Spillways

Other Features:
SideFriction
Junctions
Median
PlaceNames
*/

    utilities.roads.groups={"RSF":{key:"RSF","label":"Side Features",groupkeys:["RoadShoulders","RoadSideSlopes","RoadStructures","RoadSideWalks"]}, 
                            "SFA":{key:"SFA","label":"Safety Features",groupkeys:["RoadGuardrails","RoadHazards","RoadLightings","RoadMarkings","RoadSigns"]},
                            "D":{key:"D","label":"Drainage",groupkeys:["RoadCauseways","RoadCulverts","RoadDitches","RoadSpillways"]},
                            "OF":{key:"OF","label":"Other Features",groupkeys:["RoadSideFriction","RoadPlaceNames","RoadJunctions","RoadMedian"]}
                            };

    utilities.roads.attrlabel = {"RoadBridges":{label:"Bridges",group:""},
                                "RoadCarriageway":{label:"Carriageway",group:""},
                                "RoadCauseways":{label:"Causeways",group:utilities.roads.groups.D.key},
                                "RoadCulverts":{label:"Culverts",group:utilities.roads.groups.D.key},
                                "RoadDitches":{label:"Ditches",group:utilities.roads.groups.D.key},
                                "RoadGuardrails":{label:"Guardrails",group:utilities.roads.groups.SFA.key},
                                "RoadHazards":{label:"Hazards",group:utilities.roads.groups.SFA.key},
                                "RoadJunctions":{label:"Junctions",group:utilities.roads.groups.OF.key},
                                "RoadLightings":{label:"Lightings",group:utilities.roads.groups.SFA.key},
                                "RoadLocRefPoints":{label:"KM Post",group:""},
                                "RoadMarkings":{label:"Markings",group:utilities.roads.groups.SFA.key},
                                "RoadMedian":{label:"Median",group:utilities.roads.groups.OF.key},
                                "RoadPlaceNames":{label:"Place Names",group:utilities.roads.groups.OF.key},
                                "RoadShoulders":{label:"Shoulders",group:utilities.roads.groups.RSF.key},
                                "RoadSideFriction":{label:"Side Friction",group:utilities.roads.groups.OF.key},
                                "RoadSideSlopes":{label:"Side Slopes",group:utilities.roads.groups.RSF.key},
                                "RoadSideWalks":{label:"Sidewalks",group:utilities.roads.groups.RSF.key},
                                "RoadSigns":{label:"Signs",group:utilities.roads.groups.SFA.key},
                                "RoadSpillways":{label:"Spillways",group:utilities.roads.groups.D.key},
                                "RoadStructures":{label:"Structures"},group:utilities.roads.groups.RSF.key,
                                "RoadTraffic":{label:"Traffic"},group:""};
                                

    utilities.roads.pavement={"AMGB" :{code:"AMGB", text:"Asphalt Mix on Granular Base",color:""},
                              "AMAB" :{code:"AMAB", text:" Asphalt Mix on Asphalt Base",color:""},
                              "AMAP" :{code:"AMAP", text:" Asphalt Mix on Asphalt Pavement",color:""},
                              "AMCP" :{code:"AMCP", text:" Asphalt Mix on Concrete Pavement",color:""},
                              "JPCD" :{code:"JPCD", text:" Joint Plain Concrete Pavement+ Dowel",color:""},
                              "JPCO" :{code:"JPCO", text:" Joint Plain Concrete Pavement w/o Dowel",color:""},
                              "CRCP" :{code:"CRCP", text:" Continous Reinforced Concrete Pavement",color:""},
                              "AMCRCP" :{code:"AMCRCP", text:" Asphalt Mix Continous Reinforced Concrete Pavement",color:""},
                              "SBST" :{code:"SBST", text:" Single Bituminous Surface Treatment",color:""},
                              "DBST" :{code:"DBST", text:" Double Bituminous Surface Treatment",color:""},
                              "SS"   :{code:"SS", text:" Slurry Seal",color:""},
                              "G"    :{code:"G", text:" Gravel",color:""},
                              "E"    :{code:"E", text:" Earth",color:""},
                              "NONE" :{code:"NONE", text:" NONE",color:""},
                              "UNKNOWN"   :{code:"UNKNOWN", text:" UNKNOWN",color:""}
                            };


    utilities.roads.ST={                        
                        "C": {text:"CONCRETE",color:"#f29626"},
                        "A": {text:"ASPHALT",color:"#5a6068"},
                        "G": {text:"GRAVEL",color:"#26bff1"},
                        "E": {text:"EARTH",color:"#876f1b"},
                        "M": {text:"MIXED",color:"#357c31"}
                    };

    utilities.roads.SC={                        
                        "N": {text:"NEW",color:"#e809c2"},
                        "G": {text:"GOOD",color:"#10e809"},
                        "F": {text:"FAIR",color:"#5492f7"},
                        "B": {text:"BAD",color:"#f2811f"},
                        "P": {text:"POOR",color:"#b70303"}
                    };                  
    
    utilities.roads.STStyle = function(k){
        return {style: function(f){
                    return {weight: 6,
                            opacity: 1,
                            color: utilities.roads.ST[k].color,
                            dashArray: '4',
                            fillOpacity: 0.7
                        }											
                    }
            }
    }

   utilities.roads.displayattr =  function(attr,maxheight){
    var table = "<div style='max-height:" +  (maxheight || 400) +"px;overflow-y:auto;overflow-x:hidden;'><table style='font-size:12px;color:#555;' class='table'>";
       for(var k in attr){             
        if(k=="_id" || k=="geometry" || k=="$$hashKey" || k=="attr"){}else{
                table+="<tr><td>" + k + "</td>" + "<td>" + attr[k] + "</td></tr>";
            }        
       }
       table+="</table></div>"
       return table;
   } 

    utilities.roads.getattribdisplay = function(attr,name){
       var _value = name;
       if(name=="Bridges" || name=="PlaceNames"){
            _value = attr.Name;
       }else if(name=="Carriageway"){           
           _value =  attr.SurfaceTyp + "-" + attr.SegmentID; // attr.NumLanes +"/" + attr.SurfaceTyp +"/" + attr.PavementTy + "/" +
       }else if(name=="Shoulders" || name=="Ditches" ||  name=="Guardrails" ||  name=="Structures" || name=="SideWalks" || name=="SideSlopes"){
                _value = attr.Position + "/" + attr.TypeID + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
       }else if(name=="LocRefPoints"){
           _value = "KM Post: " + attr.KMPostNo;
       }else if(name=="Culverts" || name=="SideFriction" || name=="Markings" || name=="Spillways" || name=="Causeways"){
           _value =  attr.TypeID + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
       }else if(name=="Lightings" || name=="Hazards" || name=="Signs"){
           _value =  attr.Position +"/" + attr.Exist  + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
       }else if(name=="Junctions" || name=="Median"){
                _value =  attr.TypeID + "/" +  attr.LRPStartDi;
       }

       return _value;
   }




   utilities.file = {};
   utilities.file.getCurrentImageList =  function(roadItem){
    var imageList = [];
    if(roadItem.file_roadimages && roadItem.file_roadimages.length>0){
        roadItem.file_roadimages.forEach(function(img){
            var dataImage = {
                href: "/images/road?id=" + img.sizes.lowres +"&type=lowres&rnd=" + utilities.uuid(),
                thumb: "/images/road?id=" + img.sizes.thumb +"&type=thumb&rnd="+ utilities.uuid(),
                download: "/images/road?id=" + img.sizes.orig + "&rnd="+ utilities.uuid(),
                title: img.name,
                data:img._id
              };
              imageList.push(dataImage);
        });
        return imageList;
    };
};

   utilities.file.upload = function(url,data,onsucess,onprogress){
    var formData = new FormData();
    formData.append('files[]', data.file);
    formData.append('roadattr', data.roadattr);
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            //console.log('upload successful!\n' + data);
            onsucess(data);
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();
  
          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {
  
            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              data.pv = percentComplete;  
              // update the Bootstrap progress bar with the new percentage
              console.log(percentComplete);
              onprogress(percentComplete,data);               
            }
  
          }, false);
  
          return xhr;
        }
      });

   }

      return utilities;
}]);
    