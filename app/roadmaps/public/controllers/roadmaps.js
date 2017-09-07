angular.module('RBIS').controller("roadmapsCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,datamodel) {


    $scope.summary = {};
    $scope.summary.surfacetype = {};    
    $scope.summary.surfacecondition = {};
    $scope.summary.road = {}

    //Advance Search
    $scope.pagination = {};
    $scope.pagination.max = 1;
    $scope.pagination.current = 1;
    $scope.searchText = "";
    $scope.searchItems = [];
    $scope.selectedmap = -1;
    $scope.currentAttr = null;


    $scope.regionprovince = [];
    $scope.attribsinarr = ['Bridges','PlaceNames','Carriageway','Shoulders','Structures',
                            'LocRefPoints','Guardrails','Culverts','Lightings','Ditches',
                            'SideWalks','SideFriction','Markings','Junctions','Hazards',
                            'SideSlopes','Signs','Spillways','Causeways','Median'];
    


    $scope.summary.roadsummarydisplay =  false;
    $scope.summary.displaytoggle =  false;

    $scope.init =  function(){
        $timeout(function(){
            $("#roadmap").leafletMaps({mutilplebasemap:true});
            
            var ih = $(".page-content").innerHeight();
            $(".road-map-left").css("height",ih - 50 + "px");
            $(".road-map-right").css("height",ih -50 + "px");
            $("#roadmap").css("height",ih -50 + "px")    
            $("#roadmap").leafletMaps("refresh");

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

                $scope.onmapselect(-1);

        });
        $http.get("/api/location/getregionprovince").success(function(data){
                $scope.regionprovince = data;
                utilities.sort($scope.regionprovince,"Code");
        });        
    }

    $scope.getprovince =  function(a){
        var idx = $scope.regionprovince.map(function(d){return d.Code}).indexOf(a.RegionCode);
        var region = $scope.regionprovince[idx]
        var pdx = region.provinces.map(function(d){return d.Code}).indexOf(a.Code);
        return region.provinces[pdx];
    }

    $scope.loadprovince = function(a){                
        if(!a.municipalities){
            $http.get("/api/location/getmunicity?code=" + a.Code).success(function(data){
                a.municipalities = [];
                a.municipalities.push.apply(a.municipalities,data);
                utilities.sort(a.municipalities,"Name");
            });
        }
        
    }

    $scope.getprovroadshortinfo =  function(a){        
        if(!a.roads){
            $http.get("/api/roads/getprovroadshortinfo?code=" + a.Code).success(function(data){
                a.roads = [];
                a.roads.push.apply(a.roads,data);
                utilities.sort(a.roads,"R_NAME");
            });
        }
        
        $scope.summary.roadsummarydisplay =  false;
        $scope.summary.displaytoggle =  false;
    }
    
    $scope.getcitymunroadshortinfo =  function(a){
        if(!a.roads){
            $http.get("/api/roads/getcitymunroadshortinfo?code=" + a.Code).success(function(data){
                a.roads = [];
                a.roads.push.apply(a.roads,data);
                utilities.sort(a.roads,"R_NAME");
            });
        }
        $scope.summary.roadsummarydisplay =  false;
        $scope.summary.displaytoggle =  false;
    }

    $scope.getroadattrs =  function(a,cb){        
        var id = a.R_ID || a._id.R_ID;        
        if(!a.attr){
                    $http.get("/api/roads/getroadattrinfo?rid=" + id).success(function(data){
                        a.attr = {}
                        a.geometry = data.geometry;
                        a.attr = utilities.road.toattr(data);     
                        if(cb)cb(a);
                    });
        }
    }
   
   $scope.getattribdisplay =  function(a,b){
       return utilities.roads.getattribdisplay(a,b);
   };
   
   var _getshapestyle = function(o,name){
        //utilities.roads.STStyle
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
                            };
                };
        };


    $scope.getroads = function(qry,cb){
        $http.get("/api/roads/getroadaggmain" + qry + "&fordisplay=true").success(function(data){
                cb(data);
        });
    }   

    $scope.toggleattributepane =  function(b){
        var wd = b?"30%":"0px",wm=b?"70%":"100%";
        var wdd = b?"block":"none";
        $("#roadmap_details").animate({width:wd});
        $("#roadmap_details").css("display",wdd);
        $("#roadmap_map").animate({width:wm});
    };



    /** Events */	


    //*** Search Functionality ****************************************************************	
    $scope.maplayers = {
             roadMutant:L.gridLayer.googleMutant({
							maxZoom: 24,
							type:'roadmap'
							})
            ,satMutant:L.gridLayer.googleMutant({
                maxZoom: 24,
                type:'satellite'
            }),
            mapbox:L.tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ"),
            terrainMutant: L.gridLayer.googleMutant({
                maxZoom: 24,
                type:'terrain'
                })
        ,hybridMutant:L.gridLayer.googleMutant({
			maxZoom: 24,
			type:'hybrid'
		}),
        namriabasemap:L.tileLayer("http://v2.geoportal.gov.ph/tiles/v2/PGP/{z}/{x}/{y}.png",
                    {maxZoom:14, bounds:[[-20037508.34,-20037508.34],[20037508.34,20037508.34]]}),
        esri_world:L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
                        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    }),
        esri_graymap: L.tileLayer(
                        "http://{s}.sm.mapstack.stamen.com/" +
                        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
                        "{z}/{x}/{y}.png",
                        {
                            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
                            'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                        }
                    )                                        
                    
    };

    $scope.maplayers.namriabasemap.getTileUrl = function (tilePoint) {
        var x2 = Math.floor(tilePoint.x / 100);

        return L.Util.template(this._url, L.extend({
            s: this._getSubdomain(tilePoint),
            z: tilePoint.z,
            x: tilePoint.x,
            y: tilePoint.y,
            x2: x2
            }, this.options));
        };

    //L.tileLayer.wms('http://192.168.254.101/arcgis/services/Basemap/PGS_Basemap/MapServer/WMSServer',
                            //{layers: 'geoportal:deped_beis'})
    //http://202.90.149.251/tiles/v2/PGP/${z}/${x}/${y}.png
    //'http://v2.geoportal.gov.ph/tiles/v2/PGP/${z}/${x}/${y}.png'
      //http://202.90.149.251

    $scope._currentlayer = {};
    $scope._currentlayer.index = 0;
    $scope._currentlayer.object = null;
    $scope.onmapselect =  function(o){
                var layer = $scope.maplayers.namriabasemap;
                if(o==-1){
                    layer = $scope.maplayers.namriabasemap;
                }else if(o==0){
                    layer = $scope.maplayers.mapbox;
                }else if(o==1){
                    layer = $scope.maplayers.roadMutant;
                }else if(o==2){
                    layer = $scope.maplayers.satMutant;
                }else if(o==3){
                    layer = $scope.maplayers.terrainMutant
                }else if(o==4){
                    layer = $scope.maplayers.hybridMutant;
                }else if(o==5){
                    layer = $scope.maplayers.esri_world;
                }else if(o==6){
                    layer = $scope.maplayers.esri_graymap;
                }

                //console.log(layer);

                $scope._currentlayer.index = o;                
                
             $("#roadmap").leafletMaps("getMap", function(map){
                    //console.log($scope._currentlayer.object);
                    if($scope._currentlayer.object){
                        map.removeLayer($scope._currentlayer.object);
                    }                    
                                        
                    layer.addTo(map)
                    $scope._currentlayer.object = layer;
             });
             $("#roadmap").leafletMaps("refresh");
    }


    $scope.clearsearchitem =  function(){
        $scope.searchText="";
        $scope.roadsCollection = [];
    };
    $scope.closesearchitem =  function(index){
        $scope.searchItems.splice(index,1);
    };

    $scope.addsearchitem =  function(r){        
        if($scope.searchItems.map(function(d){return d._id._id}).indexOf(r._id._id)==-1){
                $scope.getroadattrs(r)                
                $scope.searchItems.push(r);                
        };
        //console.log($scope.searchItems);
    };
    $scope.toggleAll = function(b){
        $scope.roadsCollection.forEach(function(d){
                d.checked = b;
        })
    };
    $scope.isroadsearchlist =  function(r){
        return $scope.searchItems.map(function(d){return d._id._id}).indexOf(r._id._id)>-1;
    }
    $scope.onSearch =  function(s){   
        $timeout(function(){
            if($scope.searchText==""){
                $scope.roadsCollection = [];
                return false;
            };
            
            $scope.getroads("?qry=" + s +"&limit=5",function(response){
                        $scope.roadsCollection = response.data;
                        $scope.pagination.max = response.pagecount;
                        $scope.onSearching=false;
            });
        },500);

    
        
        
    }

    $scope.pageChanged = function(page){
        var _qry = ($scope.searchText!="")? "?qry=" + $scope.searchText + "&page=" + page:"" + "?page=" +page;
        _qry+="&limit=5";
        $scope.getroads(_qry,function(response){
                        $scope.roadsCollection = response.data;
                        //$scope.pagination.max
                })

    }



    $scope.getroadSC_ST =  function(rid){
        $http.get("/api/roads/getcarriagewaypersurfacelength?qry=" + rid).success(function(d){                    
          for(var n in d){
            if(n.indexOf("_id")==-1 && n!="total"){
                d[n] = utilities.formatToDecimal(d[n].toFixed(3));      
            }
          }
          $scope.summary.surfacetype = d;
          //console.log($scope.summary.surfacetype);
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

    //*** Search Functionality ****************************************************************

    $scope.onclickattr =  function(o,name){
        $("#roadmap").leafletMaps("clear");

        //console.log(name);

        var draw_geo =  function(o,name){
            var data =  o.geometry;        
            if(o instanceof Array){
                o.forEach(function(g){
                    var _style = _getshapestyle(g,name);
                    var _geo = $("#roadmap").leafletMaps("setGeoJSON", g.geometry,null,_style);
                    _geo.on({
                        mouseover: function (e) {e.layer.openPopup();},
                        click: function (e) {
                            $("#roadmap").leafletMaps("zoomToFeature", e.target);
                        }
                    });
                    
                    $("#roadmap").leafletMaps("zoomToFeature", _geo);
                    var tooltiptext = utilities.roads.getattribdisplay(g,name);
                    //var tooltiptext = utilities.roads.displayattr(g) 
                    _geo.eachLayer(function (layer) {                        
                            //name + ": " +
                            layer.bindPopup(tooltiptext);
                    });
                })

            //toggle off details    
            $scope.toggleattributepane(false);
            }else{
                var _style = _getshapestyle(o,name);
                var _geo = $("#roadmap").leafletMaps("setGeoJSON", data,null,_style);
                _geo.on({
                    mouseover: function (e) {e.layer.openPopup(); },
                    click: function (e) {
                        $("#roadmap").leafletMaps("zoomToFeature", e.target);
                    }
                });
                    var tooltiptext = utilities.roads.getattribdisplay(o,name);
                    //var tooltiptext = utilities.roads.displayattr(o) 
                _geo.eachLayer(function (layer) {                        
                        //name + ": "  +
                        layer.bindPopup(tooltiptext);
                    });
                
                    if( data){$("#roadmap").leafletMaps("zoomToFeature", _geo);}
                
                $scope.currentAttr = o;
                $scope.toggleattributepane(true);


                $("#roadattrttable").html("");
                var hh = $(".page-content").innerHeight();
                //console.log(name);
                //console.log(o); 
                //$("#roadattrttable").html(utilities.roads.displayattr(o,hh - 100));                        
                $("#roadattrttable").html(datamodel.utils.displayattributestable(name,o.attr || o,hh-100));
            }
        }

        
        if(o.R_NAME && !o.attr){                
                $scope.getroadattrs(o,function(d){
                        //console.log(d);
                        draw_geo(d,d.R_NAME);
                });
        }else{
            draw_geo(o,name);
        }

        //from tree 
        if(o.R_NAME){
            $scope.getroadSC_ST(o.R_ID);
            console.log(o);
            $scope.summary.road.length = utilities.formatToDecimal(parseFloat("0" + o.Length).toFixed(3));
            $scope.summary.road.class = o.R_CLASS;
            $scope.summary.road.importance = o.R_Importan;
            
            //$scope.summary.roadsummarydisplay =  true;
            $scope.summary.displaytoggle =  true;
        };

        //from quick searchText
        if(o.roadlengths){
            $scope.getroadSC_ST(o._id.R_ID);
            $scope.summary.road.length = utilities.formatToDecimal(o.roadlengths.toFixed(3));
            $scope.summary.road.class = o._id.R_CLASS;
            $scope.summary.road.importance = o._id.R_Importan;
            //$scope.summary.roadsummarydisplay =  true;
            $scope.summary.displaytoggle =  true;
        };
                
                console.log($scope.summary.roadsummarydisplay);
        //work around reload current map
        $scope.onmapselect($scope._currentlayer.index);
        

    }
    
    
    $scope.ontoggle_loc = function(a,b,c){
        //load municipalities        
        if(a=="prov_"){$scope.loadprovince(b)}
        //load provincial roads short info
        if(a=="road_info_prov" && b.ProvinceID){$scope.getprovroadshortinfo(b)}
        //load City/Muncipality roads short info
        if(a=="road_info_mun" && b.CityMunID){$scope.getcitymunroadshortinfo(b)}
        //load roads attributes
        if(a=="road_attr" && b.R_ID){$scope.getroadattrs(b)}
        //load roads attributes Searched
        if(a=="road_attr_searched" && b.R_ID){$scope.getroadattrs(b)}

        var _key = b.Code || b.R_ID || b._id;
        var _elem = $(c.target || c.currentTarget);        

        if(_elem.hasClass("fa-plus-square")){
            _elem.removeClass("fa-plus-square");
            _elem.addClass("fa-minus-square");
            $("#"+ a + _key).slideDown();

            //load road summary
            //if(b.R_ID){$scope.getroadSC_ST(b.R_ID);}
        }else{
            _elem.removeClass("fa-minus-square");
            _elem.addClass("fa-plus-square");
            $("#"+ a + _key).slideUp();
        }


        

    }

    $scope.onclick_municipality =  function(a){
            console.log(a);
    }

})