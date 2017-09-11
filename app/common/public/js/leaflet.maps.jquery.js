/*Version:1
 * drel_v@yahoo.com
 *
 * Jquery leaflet
 * dependency: leaflet, jQuery
 * */
(function( $ ){
	var geojson=null;
	var markers = [];
	var currentLegend =  null;
	var util = {
				guid:function(){
					var  G = function() {
						return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
					}
					return  (G() + G() + "_" + G() + "_" + G() + "_" + G() + "_" + G() + G() + G()).toUpperCase();
				}
			}

	//L.Icon.Default.imagePath = '/bower_components/leaflet/dist/images';
	var LeafIcon =	L.Icon.Default.extend({
			options: {
				iconUrl: '',
		        iconSize:     [32, 32],
		        iconAnchor: [16, 16]
			}
		});

	var legend = {
        position: 'bottomright',
        severity:{"sev1":"#FFFF99","sev2":"#FFFF00","sev3":"#FFCC00","sev4":"#FF9900","sev5":"#FF6600","sev6":"#FF0000"},
        colors: [ '#FFFF99', '#FFFF00', '#FFCC00', '#FF9900', '#FF6600', '#FF0000'],
        labels: [ '1 - 70,000', '70,001 - 350,000', '350,000 - 700,000', '700,000 - 1,050,000', '1,050,000 - 1,400,000', '> 1,400,000' ]
      }


var sevdetails = {"sev1":{"text":"Severity level 1","from":0,"to":0},
						"sev2":{"text":"Severity level 2","from":0,"to":0},
						"sev3":{"text":"Severity level 3","from":0,"to":0},
						"sev4":{"text":"Severity level 4","from":0,"to":0},
						"sev5":{"text":"Severity level 5","from":0,"to":0},
						"sev6":{"text":"Severity level 6","from":0,"to":0}}

	 var methods = {
		    init : function(options){
				return this.each(function(){
					var Mapsmain = jQuery(this);
					var _default = {
							title:"Maps",
							changed:function(sender,e){},
							PAR:true,
							onMarkerClick:function(e){},
							onMarkerDragEnd:function(e){},
							clusterGroup: false,														
							changed:function(sender,e){},
							ZoomCtrlPosition:'topright',
							onMapdclicked:null,
							mutilplebasemap:false
						};

					if(Mapsmain.data("initialized")) return;
					if(options){ _default = jQuery.extend(_default,options)}
					

						
					

					if(_default.mutilplebasemap){
						//Mapsmain.attr("id")
						//mapbox.satellite
						var map = L.map(this,{ zoomControl: false }).setView([12.80, 122.27], 5)//pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ
						var mapbox = L.tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHJlbCIsImEiOiJjajdibG4waDkwdHd3MzJxbWwzcmhzbHZnIn0.f-q8EG-3W_AEPk8P1h62pA");
							/**/
						
							/*
							L.control.layers({
								"Mapbox": mapbox,
								"Google RoadMap": roadMutant,
								"Google Sattelite": satMutant								
							}, {}, {
								collapsed: true
							}).addTo(map);
							*/

					}else{
						var osm = L.tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHJlbCIsImEiOiJjajdibG4waDkwdHd3MzJxbWwzcmhzbHZnIn0.f-q8EG-3W_AEPk8P1h62pA");
						var map = L.map(Mapsmain.attr("id"),{ zoomControl: false }).setView([12.80, 122.27], 5).addLayer(osm);

					}


					if(_default["clusterGroup"]){					
						Mapsmain.data("MarkerClusterGroup",_default["clusterGroup"]);
						map.addLayer(_default["clusterGroup"]);

					};				

					
					Mapsmain.data("initialized",true);	
					Mapsmain.data("onMarkerClick",_default["onMarkerClick"]);
					Mapsmain.data("onMarkerDragEnd",_default["onMarkerDragEnd"]);	
					Mapsmain.data("onMapdblclicked",_default["onMapdblclicked"]);				
					Mapsmain.data("isInit",true);
					Mapsmain.data("MarkerClusterGroupCollection",[]);




					Mapsmain.data("map",map);

				 	if(_default.geo){
				 		methods.setGeoJSON(options.geo,map);
				 	}

				 	if(_default.tracks){
				 		methods.setTracks(
							{
								tracks : options.tracks,
								runSettings : options.runSettings,
								typhoonBands : options.typhoonBands
							}, map);
				 	}

				 	if(_default.PAR){
				 		methods.drawPAR(map);
				 	}

				 	methods.ZoomCtrlPosition(_default.ZoomCtrlPosition,map);
					 if(_default["onMapdblclicked"]){
				 		map.on("dblclick",_default["onMapdblclicked"]);				 		
				 	}

				});
				},
				addClusterGroup:function(key,object){
					var cg = jQuery(this).data("MarkerClusterGroupCollection");
					var map = jQuery(this).data("map");
						if (!cg[key]){
							cg[key] = object;
							console.log(key);
							map.addLayer(cg[key]);
						}
							
				},
				getClusterGroup:function(key,main){				
					var self  = main  || jQuery(this)
						var cg = self.data("MarkerClusterGroupCollection");
					    return cg[key];

				},
				addmarkerToCluster : function (key,licon,coord,data){
					 var  self =  jQuery(this);
					 var map = self.data("map");
					 var MarkerClusterGroup  = self.data("MarkerClusterGroup");				
					 var latlng =  new L.LatLng(coord[0], coord[1]);
					//Create Marker
					var marker;
					console.log(licon);
					if(licon){
						//var leafIcon = L.icon(licon);			
						 marker = L.marker(latlng, {icon:licon,
								"markerData":data}).on("click",self.data("onMarkerClick"));	
					}else{
							marker = L.marker(latlng, {"markerData":data}).on("click",self.data("onMarkerClick"));
					}
																	
					MarkerClusterGroup = methods.getClusterGroup(key,self);					
					MarkerClusterGroup.addLayer ( marker );
				},
				clearClusterGroup : function (key){
					 var  self =  jQuery(this);
					 var map = self.data("map");
					 var MarkerClusterGroup  = self.data("MarkerClusterGroup");				
					 
																	
					MarkerClusterGroup = methods.getClusterGroup(key,self);					
					MarkerClusterGroup.clearLayers();
				},
				 ZoomCtrlPosition:function(k,m){
					//'topright'
					var map = m || jQuery(this).data("map");
					L.control.zoom({
					     position:k
					}).addTo(map);
				},
				clear:function(){
					var map = jQuery(this).data("map");
					for(i in map._layers) {							
					        if(map._layers[i]._path != undefined || map._layers[i]._crs != undefined  || map._layers[i]._url==undefined) {
					            try {									
					                map.removeLayer(map._layers[i]);
					            }
					            catch(e) {
					            }
					        };
					    };
				},
				initialized:function(){
					return  jQuery(this).data("initialized");
				},
				setLegend:function(quant,m){
					var map = m || jQuery(this).data("map");
					if(currentLegend) map.removeControl(currentLegend);
					var legend = L.control({position: 'bottomright'});
						currentLegend = legend;

					legend.onAdd = function (map) {
						var div = L.DomUtil.create('div', 'info legend'),
							labels = [],
							from, to;

						//if(quant[0].value!==1){quant.unshift(1);}
						for (var i = 0; i < quant.length; i++) {													
							from = (i > 0) ? (quant[i].value + 1) : quant[i].value;
							to = ((i+1) > quant.length-1) ? "" : quant[i + 1].value;

							from = from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							to = to.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

							var _color = quant[i].color;
							labels.push(
								'<i style="background:' + _color  + '"></i> ' +
								from + (to ? ' &ndash; ' + to : '+'));
						}

						div.innerHTML = labels.join('<br>');
						return div;
					};

					legend.addTo(map);
				},
				refresh:function(m){					
					var map = m || jQuery(this).data("map");
					setTimeout(function(){ map.invalidateSize()}, 500);
				},
				setGeoJSON:function(geo,m,option){
					var _option = option || {
											style: function(f){
											return {weight: 4,
													opacity: 1,
													color: '#ff6666',
													dashArray: '4',
													fillOpacity: 0.7
												}											
											}
									}
					var map = m || jQuery(this).data("map");
					 geojson = L.geoJson(geo,_option).addTo(map);

                    //fillColor: legend.severity[f.severity]}
                    return geojson;
				},
				addGeoJSON:function(geo,_style,m){
					var map = m || jQuery(this).data("map");
					var geojson = L.geoJson(geo, {
									style:_style
					}).addTo(map);

					return geojson;
				},
				getMap : function(cb){
		 				var  self =  jQuery(this);
						if(cb){
							cb(self.data("map"))	
						}else{
							return self.data("map");	
						}					
				},
				/**
				 * Function that will draw the markers, line and zones
				 * if the mode for computing affected Population is set
				 * to 'Typhoon Bands'
				 *
				 * @param trackDetails
				 * Object parameter that must have 'tracks' and 'runSettings'
				 * Ex. { tracks : Object, runSettings : Object }
				 */
				setTracks:function( trackDetails, m ){
				var pt = trackDetails.tracks;
				var runDetails = trackDetails.runSettings;
				var geojsonBands = trackDetails.typhoonBands;
				var pointList= [];
				var shapes = [];
				var shapesColor = '#990000';

				var map = m || jQuery(this).data("map");
				pt.sort(function(a, b){
				    var keyA = new Date(a.forecast_date),
				    keyB = new Date(b.forecast_date);
				    // Compare the 2 dates
				    if(keyA < keyB) return -1;
				    if(keyA > keyB) return 1;
				    return 0;
				});


				for(var i=0;i<pt.length;i++){
					var licon = new LeafIcon();
					var coord = pt[i].coordinates;
					 var latlng =  new L.LatLng(coord[1], coord[0]);
					//Create Marker

					if(pt[i].current){
							licon = L.icon({
                        					iconUrl: '/scenario/assets/img/ty_logo_current.png',
                        					iconSize: [32, 32]
                   							 })
					}

					var marker = L.marker(latlng, {icon: licon,"markerData":pt[i]});
					markers.push(marker);
					marker.addTo(map);
					pointList.push(latlng);
				} // End of for loop

				if ( runDetails && runDetails.mode === 'Typhoon Bands'
						&& ( geojsonBands[0] || geojsonBands[1] || geojsonBands[2] ) ){
						shapes.push( L.geoJson( geojsonBands, {
								style: function(feature) {
										switch (feature.properties.listo) {
												case 'charlie': return {
														color: 'white',
														fillColor: '#FF0000',
														weight: 1,
														fillOpacity: 0.4
												};
												case 'bravo': return {
														color: 'white',
														fillColor: '#ffa500',
														weight: 1,
														fillOpacity: 0.4
												};
												case 'alpha': return {
														color: 'white',
														fillColor: '#FFFF00',
														weight: 1,
														fillOpacity: 0.4
												};
										}
								}
						}) );
				} // enf of if

				shapes.push(
						L.polyline(pointList, {
		            color: shapesColor,
		            weight: 4,
		            opacity: 1,
		            smoothFactor: 1
		        })
				);

				var shapesGroup = L.featureGroup( shapes );
				shapesGroup.addTo( map );
				shapesGroup.bringToBack();
			},
			drawPAR:function(m){
				var map = m || jQuery(this).data("map");
				var shapes = [];
				var PARpoints =[]
				PARpoints.push(new L.LatLng(25, 135));
				PARpoints.push(new L.LatLng(5, 135));
				PARpoints.push(new L.LatLng(5, 115));
				PARpoints.push(new L.LatLng(15, 115));
				PARpoints.push(new L.LatLng(21, 120));
				PARpoints.push(new L.LatLng(25, 120));
				PARpoints.push(new L.LatLng(25, 135));
				shapes.push(
						L.polyline(PARpoints, {
		           		color: "#333333",
		            	weight: 1,
		            	opacity: 0.5,
		            	smoothFactor: 1
		        	})
				);

				var shapesGroup = L.featureGroup( shapes );
				shapesGroup.addTo( map );
				shapesGroup.bringToBack();


			},
			removeLayers:function(layer,m){
				var map  = m || $(this).data("map");
				if(layer) {map.removeLayer(layer); return;}
				var layers = geojson.getLayers();
				for(var i=0;i<layers.length;i++){
					map.removeLayer(layers[i]);
				}
			},
			clearMarkers:function(m){
				var map  = m || $(this).data("map");
				for(var i=0;i<markers.length;i++){
					map.removeLayer(markers[i]);
				}
			},
			getColor:function(sev){
				return legend.severity[sev];
			},
			setLegendRelief:function(quant){
				var map = jQuery(this).data("map");
				var legend = L.control({position: 'bottomright'});
				legend.onAdd = function (map) {
					return methods.generateLegendUI(quant)
				};

				legend.addTo(map);
			},
			generateLegendUI:function(quant){
				var div = L.DomUtil.create('div', 'info legend map-quant-details'),
						labels = [],
						from, to;

					if(quant[0]!==1){quant.unshift(1);}
					for (var i = 0; i < quant.length; i++) {
						from = (i > 0) ? (quant[i] + 1) : quant[i];
						to = quant[i + 1];

						//set severity
						sevdetails["sev" + (i + 1)].from = from;
						sevdetails["sev" + (i + 1)].to = to;

						labels.push(
							'<i style="background:' + methods.getColor("sev" + (i + 1)) + '"></i> ' +
							from + (to ? '&ndash;' + to : '+'));
					}

					div.innerHTML = labels.join('<br>');
					return div;
			},
			addmarker:function(licon,coord,data,options){
					 var  self =  $(this);
					 var map = self.data("map") || options.map;
					 var MarkerClusterGroup  = self.data("MarkerClusterGroup");				
					 var latlng =  new L.LatLng(coord[0], coord[1]);
					 var options = options || {};
					//Create Marker
					var draggable = options.draggable ||  false;
					var marker;
					if(licon){
							 marker = L.marker(latlng, {icon:licon,
								"markerData":data, draggable: draggable}).on("click",self.data("onMarkerClick"))
													.on("dragend",self.data("onMarkerDragEnd"))
													//.on("mouseover",self.data("onMarkermouseover"))
													//.on("mouseout",self.data("onMarkermouseout"));	
					}else{
							marker = L.marker(latlng, {"markerData":data, draggable: false})
																		.on("click",self.data("onMarkerClick"))
																		.on("dragend",self.data("onMarkerDragEnd"));
					}

															
				if(MarkerClusterGroup){
					MarkerClusterGroup.addLayer ( marker );

				}else{
					marker.addTo(map);
					return marker; 
				}		

																														
			},
			setView:function(coord, zoom,option){
				var map = jQuery(this).data("map");
 				map.invalidateSize();
 				map.setView(new L.LatLng(coord.lat, coord.lng), zoom,option);

 				
			},
			zoomToFeature:function (layer) {
				var map  = jQuery(this).data("map");
				map.fitBounds(layer.getBounds());				
			}
	};


	$.fn.leafletMaps = function(method) {
				if ( methods[method] ) {
		      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) {
		      return methods.init.apply( this, arguments );
		    } else {
		      $.error( 'Method ' +  method + ' does not exist on reliefMaps' );
		    }
	}
})( jQuery );
