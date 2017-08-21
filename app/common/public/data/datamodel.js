'use strict';

angular.module('RBIS').factory('datamodel', ['$window','$rootScope','utilities',function ($window, $rootScope,utilities) {

var datamodel = {};

/*  Options */
datamodel.options = {};
datamodel.options.class = [{"key":"City","label":"City"},{"key":"Provincial","label":"Provincial"}];
datamodel.options.importance = [{"key":"Core","label":"CORE"},{"key":"Non-Core","label":"NON-CORE"}];
datamodel.options.environment = [{"key":"U","label":"URBAN (METROPOLITAN)"},{"key":"N","label":"URBAN (NON-METROPOLITAN)"},{"key":"R","label":"RURAL"}];
datamodel.options.directionflow = [{"key":"One-Way","label":"ONE-WAY"},{"key":"Two-Way","label":"TWO-WAY"}];
datamodel.options.terrain = [{"key":"F","label":"FLAT"},{"key":"R","label":"ROLLING"},{"key":"M","label":"MOUNTAINOUS"}];
datamodel.options.roadaquired = [{"key":"1","label":"YES"},{"key":"0","label":"NO"}];
datamodel.options.surfacetype = [{key:"C",label:"CONCRETE"},{key:"A",label:"ASPHALT"},{key:"G",label:"GRAVEL"},{key:"E",label:"EARTH"},{key:"M",label:"MIXED"}];
datamodel.options.pavementtype = [{key:"AMGB", label:"Asphalt Mix on Granular Base"},
                                    {key:"AMAB", label:" Asphalt Mix on Asphalt Base"},
                                    {key:"AMAP", label:" Asphalt Mix on Asphalt Pavement"},
                                    {key:"AMCP", label:" Asphalt Mix on Concrete Pavement"},
                                    {key:"JPCD", label:" Joint Plain Concrete Pavement+ Dowel"},
                                    {key:"JPCO", label:" Joint Plain Concrete Pavement w/o Dowel"},
                                    {key:"CRCP", label:" Continous Reinforced Concrete Pavement"},
                                    {key:"AMCRCP", label:" Asphalt Mix Continous Reinforced Concrete Pavement"},
                                    {key:"SBST", label:" Single Bituminous Surface Treatment"},
                                    {key:"DBST", label:" Double Bituminous Surface Treatment"},
                                    {key:"SS", label:" Slurry Seal"},
                                    {key:"G", label:" Gravel"},
                                    {key:"E", label:" Earth"},
                                    {key:"NONE", label:" NONE"},
                                    {key:"UNKNOWN", label:" UNKNOWN"}];

datamodel.options.roadcondition = [{key:"N",label:"NEW"},{key:"G",label:"GOOD"},{key:"F",label:"FAIR"},{key:"P",label:"POOR"},{key:"B",label:"BAD"}]

//bridges options
datamodel.options.superstructuretype = [{key:"BAILEY", label:"BAILEY"},{key:"TIMBER", label:"TIMBER"},{key:"STEEL TRUSS", label:"STEEL TRUSS"},{key:"RC SLAB", label:"RC SLAB"},{key:"RC GIRDER", label:"RC GIRDER"},{key:"PC GIRDER", label:"PC GIRDER"},{key:"OTHERS", label:"OTHERS"}]
datamodel.options.expansionjoint = [{key:"STEEL PLATE", label:"STEEL PLATE"},{key:"FINGER JOINT", label:"FINGER JOINT"},{key:"RUBBER TYPE", label:"RUBBER TYPE"},{key:"OTHERS", label:"OTHERS"},{key:"NONE", label:"NONE"}]    
datamodel.options.bridgesurfacing = [{key:"Concrete", label:"CONCRETE"},{key:"Asphalt", label:"ASPHALT"}]
datamodel.options.railingtype = [{key:"RC", label:"REINFORCED CONCRETE"},{key:"S", label:"STEEL"}]
datamodel.options.piertype = [{key:"PILE BENT", label:"PILE BENT"},{key:"WALL TYPE", label:"WALL TYPE"},{key:"1-COLUMN", label:"1-COLUMN"},{key:"RIGID FRAME", label:"RIGID FRAME"},{key:"OTHERS", label:"OTHERS"},{key:"UNKNOWN", label:"UNKNOWN"}];
datamodel.options.pierfoundation = [{key:"SPREAD FOOTING", label:"SPREAD FOOTING"},{key:"PC/RC CONCRETE PILE", label:"PC/RC CONCRETE PILE"},{key:"CIP CONC/PILE", label:"CIP CONC/PILE"},{key:"OTHERS", label:"OTHERS"},{key:"UNKNOWN", label:"UNKNOWN"}];
datamodel.options.pierfoundation = [{key:"GABION", label:"GABION"},{key:"RIPRAP", label:"RIPRAP"},{key:"NONE", label:"NONE"},{key:"OTHERS", label:"OTHERS"},{key:"UNKNOWN", label:"UNKNOWN"},]
datamodel.options.abutmenttype = [{key:"PILE BENT", label:"PILE BENT"},{key:"CANTILEVER", label:"CANTILEVER"},{key:"GRAVITY", label:"GRAVITY"},{key:"OTHERS", label:"OTHERS"},{key:"UNKNOWN", label:"UNKNOWN"}]
datamodel.options.abutmentfoundation = [{key:"SPREAD FOOTING", label:"SPREAD FOOTING"},{key:"PC/RC CONCRETE PILE", label:"PC/RC CONCRETE PILE"},{key:"CIP CONC/PILE", label:"CIP CONC/PILE"},{key:"OTHERS", label:"OTHERS"},{key:"UNKNOWN", label:"UNKNOWN"}]
datamodel.options.maximumfloodlevel = [{key:"OVERFLOWED", label:"OVERFLOWED"},{key:"AT THE GIRDER LEVEL", label:"AT THE GIRDER LEVEL"},{key:"UNDER THE GIRDER LEVEL", label:"UNDER THE GIRDER LEVEL"}]
datamodel.options.navigationclearance = [{key:"NOT REQUIRED", label:"NOT REQUIRED"},{key:"INSUFFICIENT", label:"INSUFFICIENT"},{key:"SUFFICIENT", label:"SUFFICIENT"}]    
datamodel.options.abutmentprotect = [{key:"GABION", label:"GABION"},{key:"GROUTED RIPRAP", label:"GROUTED RIPRAP"},{key:"NONE", label:"NONE"},{key:"OTHERS", label:"OTHERS"},{key:"UNKNOWN", label:"UNKNOWN"}]
//added options
datamodel.options.bearingtype = [{"key":"Elastomeric Pad","label":"Elastomeric Pad"},{"key":"Steel Plate","label":"Steel Plate"},{"key":"Others","label":"Others"}];
datamodel.options.alternativeroute = [{"key":"Y","label":"YES"},{"key":"N","label":"NO"}];
datamodel.options.structurerow = [{"key":"Y","label":"YES"},{"key":"N","label":"NO"}];
datamodel.options.landuse = [{"key":"RESIDENTIAL/COMMERCIAL","label":"RESIDENTIAL/COMMERCIAL"},{"key":"AGRICULTURAL USE","label":"AGRICULTURAL USE"},{"key":"FOREST","label":"FOREST"},{"key":"WASTE LAND","label":"WASTE LAND"}];
datamodel.options.debrisflow = [{"key":"MANY","label":"MANY"},{"key":"FEW","label":"FEW"},{"key":"NONE","label":"NONE"}];
datamodel.options.riveralignment = [{"key":"STRAIGHT","label":"STRAIGHT"},{"key":"CURVE","label":"CURVE"}];
datamodel.options.bridgeutilities = [{"key":"WATER","label":"WATER"},{"key":"SEWERAGE","label":"SEWERAGE"},{"key":"ELECTRICITY","label":"ELECTRICITY"},{"key":"TELEPHONE","label":"TELEPHONE"},{"key":"NONE","label":"NONE"}];
//bridge condition
datamodel.options.deck = [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];
datamodel.options.leftsidewalk = [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];
datamodel.options.rightsidewalk = [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];
datamodel.options.leftrailing = [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];
datamodel.options.rightrailing = [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];
datamodel.options.firstappslab =  [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];
datamodel.options.secondappslab = [{"key":"G","label":"Good"},{"key":"F","label":"Fair"},{"key":"B","label":"Bad"}];

//Other features
datamodel.options.ofeaturetype = [
	{key:"N", label:"NONE"},
	{key:"L", label:"LIGHT"},
	{key:"M", label:"MEDIUM"},
	{key:"H", label:"HEAVY"}
];
//Junction
datamodel.options.junctiontype = [
	{key:"L", label:"LEFT"},
	{key:"R", label:"RIGHT"},
	{key:"C", label:"CROSSING"},
];
//Median
datamodel.options.mediantype = [
	{key:"D", label:"DEPRESSED"},
	{key:"R", label:"RAISED"},
	{key:"F", label:"FLUSHED"},
    {key:"O", label:"OTHERS"},
	{key:"N", label:"NONE"},

];

//Safety Appliance
datamodel.options.position = [
	{key:"L", label:"LEFT"},
	{key:"R", label:"RIGHT"},
	{key:"C", label:"CENTER"}
];    
datamodel.options.safetyfeaturetype = [
    {key:"S", label:"STEEL"},
	{key:"W", label:"WALL"},
	{key:"T", label:"TEMPORARY"},
	{key:"N", label:"NONE"}
];
datamodel.options.hazardseverity = [
    {key:"L", label:"LOW"},
	{key:"M", label:"MEDIUM"},
	{key:"H", label:"HIGH"}
];
//Signages
datamodel.options.signagetype = [
    {key:"R", label:"REGULATORY"},
	{key:"I", label:"INFORMATIVE"},
	{key:"G", label:"GUIDE"},
    {key:"W", label:"WARNING"}
];
datamodel.options.signagesize = [
    {key:"S", label:"SMALL"},
	{key:"M", label:"MEDIUM"},
	{key:"L", label:"LARGE"}
];
//Markings
datamodel.options.markingtype = [
    {key:"P", label:"PAINTED"},
	{key:"S", label:"STUDS"},
	{key:"N", label:"NONE"}
];
//Hazards
datamodel.options.hazardtype = [
    {key:"L", label:"LANDSLIP"},
	{key:"F", label:"FLOOD"},
	{key:"E", label:"EROSION"},
    {key:"N", label:"NONE"}
];

//Side features
//Shoulder
datamodel.options.shouldertype = [
    {key:"C", label:"CONCRETE"},
	{key:"A", label:"ASPHALT"},
    {key:"G", label:"GRAVEL"},
	{key:"E", label:"EARTH"},
	{key:"N", label:"NONE"}
];
datamodel.options.angle = [
    {key:"SH", label:"SHALLOW"},
	{key:"MD", label:"MEDIUM"},
	{key:"ST", label:"STEEP"}
];
datamodel.options.sideslopetype = [
    {key:"E", label:"EMBANKMENT"},
	{key:"C", label:"CUT"}
];
datamodel.options.protection = [
    {key:"COCONET BIOENGINEERING", label:"COCONET BIOENGINEERING"},
	{key:"RUBBLE CONCRETE", label:"RUBBLE CONCRETE"},
	{key:"CONCRETE SLOPE PROTECTION", label:"CONCRETE SLOPE PROTECTION"},
	{key:"GROUTED RIPRAP", label:"GROUTED RIPRAP"},
	{key:"STONE MASONRY", label:"STONE MASONRY"},
	{key:"GABIONS", label:"GABIONS"},
	{key:"SHEET PILES", label:"SHEET PILES"},
	{key:"EROSION CONTROL MATS", label:"EROSION CONTROL MATS"},
	{key:"PERMANENT GROUND ANCHORS", label:"PERMANENT GROUND ANCHORS"},
	{key:"SHOTCRETE", label:"SHOTCRETE"},
	{key:"MECHANICALLY STABILIZED EARTH RETAINING WALLS", label:"MECHANICALLY STABILIZED EARTH RETAINING WALLS"},
	{key:"WET STONE MASONRY", label:"WET STONE MASONRY"}
];
datamodel.options.structuretype = [
	{key:"R", label:"RETAINING WALL"},
	{key:"O", label:"OBSTRUCTION"},
	{key:"P", label:"PARKING"},
	{key:"OT", label:"OTHERS"},
	{key:"N", label:"NONE"}]

 // Road Drainage
 datamodel.options.ditchestype = [
	{key:"UN", label:"UNLINED DITCH"},
	{key:"LO", label:"LINED OPEN DITCH"},
	{key:"LC", label:"LINE CLOSED DITCH"},
	{key:"SD", label:"STORM DRAIN"}
 ]
datamodel.options.ditchessize = [
    {key:"S", label:"SHALLOW"},
	{key:"M", label:"MEDIUM"},
	{key:"D", label:"DEEP"}
];

datamodel.options.culverttype = [
	{key:"P", label:"PIPE"},
	{key:"B", label:"BOX"},
	{key:"A", label:"ARCH"},
	{key:"O", label:"OTHERS"}
];
datamodel.options.culvertcondition = [
    {key:"G", label:"GOOD (&lt;25% SILTATION)"},
	{key:"F", label:"FAIR (25%-50% SITATION)"},
	{key:"P", label:"POOR (&gt;50% SILTATION)"}
];
datamodel.options.culvertmaterialtype = [
    {key:"C", label:"CONCRETE"},
	{key:"S", label:"STEEL"},
	{key:"M", label:"MASONRY"},
	{key:"T", label:"TIMBER"},
	{key:"O", label:"OTHERS"}
];
datamodel.options.culvertaprontype = [
	{key:"C", label:"CONCRETE"},
	{key:"S", label:"STEEL"},
	{key:"M", label:"MASONRY"},
	{key:"T", label:"TIMBER"},
	{key:"O", label:"OTHERS"}
];
datamodel.options.culvertslope = [
	{key:"P", label:"PILED WALLS"},
	{key:"S", label:"STONE PITCHING"},
	{key:"R", label:"RIPRAP"},
	{key:"M", label:"MASONRY"},
	{key:"T", label:"TIMBER"},
	{key:"O", label:"OTHERS"}
];

//Traffic vehicle type

datamodel.options.culvertslope = [
	{key:"P", label:"MOTOR-TRICYCLE"},
	{key:"S", label:"PASSENGER CAR"},
	{key:"R", label:"PASSENGER UTILITY"},
	{key:"M", label:"GOODS UTILITY"},
	{key:"T", label:"SMALL BUS"},
	{key:"O", label:"LARGE BUS"},
    {key:"P", label:"RIGID TRUCK 2 AXLES"},
	{key:"S", label:"RIGID TRUCK 3+ AXLES"},
	{key:"R", label:"TRUCK SEMI-TRAILER 3 AND 4 AXLES"},
	{key:"M", label:"TRUCK SEMI-TRAILER 5+ AXELS"},
	{key:"T", label:"TRUCK TRAILER 4 AXLES"},
	{key:"O", label:"TRUCK TRAILER 5+ AXLES"}
];

	
//road
datamodel.road = {
    "RegionCode"        : {"label":"Region Code","key":"RegionCode","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "ProvinceCo"        : {"label":"Province Code","key":"ProvinceCo","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "CityMunCod"        : {"label":"City Code","key":"CityMunCod","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "R_ID"              : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "R_NAME"            : {"label":"Name","key":"R_NAME","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "R_CLASS"           : {"label":"Class","key":"R_CLASS","type":"string","options":datamodel.options.class,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "R_Importan"        : {"label":"Importance","key":"R_Importan","type":"string","options":datamodel.options.importance,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "Environmen"        : {"label":"Environment","key":"Environmen","type":"string","options":datamodel.options.environment,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "RROW"              : {"label":"RROW","key":"RROW","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "RROWAcquir"        : {"label":"RROW Aquired","key":"RROWAcquir","type":"String","options":datamodel.options.roadaquired,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "DirFlow"           : {"label":"Direction Flow","key":"DirFlow","type":"String","options":datamodel.options.directionflow,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "Terrain"           : {"label":"Terrain","key":"Terrain","type":"String","options":datamodel.options.terrain,"style":"","ctrl":"select","class":"form-control"}, 
    "Length"            : {"label":"Length","key":"Length","type":"float","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "RROW_acq_date"     : {"label":"RROW Acquisition Date","key":"RROW_acq_date","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "RROW_acq_cost"     : {"label":"RROW Acquisition Cost","key":"RROW_acq_cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "RROW_usefullife"   : {"label":"RROW Useful Life","key":"RROW_usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "remarks"           : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"","ctrl":"textarea","class":"form-control"}
};

//carriageway"Constructi" : {}, "Construc_1" : {}, 
datamodel.RoadCarriageway = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "SegmentID"  : {"label":"Segment ID","key":"SegmentID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start","key":"LRPStartKm","type":"String","options":[],"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "LRPEndKmPo" : {"label":"End","key":"LRPEndKmPo","type":"String","options":[],"style":"","ctrl":"select","class":"form-control"}, 
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},   
    "NumLanes"   : {"label":"No. of Lanes","key":"NumLanes","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "LaneWidthL" : {"label":"Lane Width Left","key":"LaneWidthL","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "LaneWidthR" : {"label":"Lane Width Right","key":"LaneWidthR","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "SegmentLen" : {"label":"Segment Length","key":"SegmentLen","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "SurfaceTyp" : {"label":"Surface Type","key":"SurfaceTyp","type":"String","options":datamodel.options.surfacetype,"style":"","ctrl":"select","class":"form-control"},  
    "PavementTy" : {"label":"Pavement Type","key":"PavementTy","type":"String","options":datamodel.options.pavementtype,"style":"","ctrl":"select","class":"form-control"},  
    "DateOfLast" : {"label":"Date of Last Resurfacing","key":"DateOfLast","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},      
    "YearOfReco" : {"label":"Year of Reconstruction","key":"YearOfReco","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "SegmentCon" : {"label":"Condition","key":"SegmentCon","type":"String","options":datamodel.options.roadcondition,"style":"","ctrl":"select","class":"form-control"},  
    "PavementThickness"  : {"label":"Pavement Thickness","key":"PavementThickness","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "PavementStrength"  : {"label":"Pavement Strength","key":"PavementStrength","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},  
    "Lifeyears"  : {"label":"Useful Life Year(s)","key":"Lifeyears","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "carriagewayWidth":{"label":"Carriageway Width","key":"carriagewayWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "remarks"    : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"","ctrl":"textarea","class":"form-control"},
    //added options
     "ConstructionValue":{"label":"Construction Value (PHP)","key":"ConstructionValue","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 

}

//Road Bridgesdata
datamodel.RoadBridges = {
            "R_ID"          :{"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
            "R_NAME"        : {"label":"Road Name","key":"R_NAME","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "Name"          :{"label":"Name","key":"Name","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "Length"        :{"label":"Length(m)","key":"Length","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
            "TypeID"        :{"label":"Type Id","key":"TypeID","type":"String","options":datamodel.options.superstructuretype,"style":"","ctrl":"select","class":"form-control"}, 
            "LRPStartKm"    :{"label":"Km Post Start","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "LRPStartDi"    :{"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
            "LRPEndKmPo"    :{"label":"Km Post End","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
            "LRPEndDisp"    :{"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
            "YearBuilt"     :{"label":"Year Built","key":"YearBuilt","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
            "LoadLimit"     :{"label":"Load Limit","key":"LoadLimit","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},   
            "SuperStruc"    :{"label":"Super Structure Type","key":"SuperStruc","type":"String","options":datamodel.options.superstructuretype,"style":"","ctrl":"select","class":"form-control"},  
            "NumGirders"    :{"label":"No. Of Girders","key":"NumGirders","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,}, 
            "DeckDimens"    :{"label":"Deck Dimens","key":"DeckDimens","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,}, 
            "DeckDime_1"    :{"label":"Deck Dime 1","key":"DeckDime_1","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,}, 
            "DeckDime_2"    :{"label":"Deck Dime 2","key":"DeckDime_2","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},  
            "DeckDime_3"    :{"label":"Deck Dime 3","key":"DeckDime_3","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},   
            "ExpansionJ"    :{"label":"Expansion Joint","key":"ExpansionJ","type":"String","options":datamodel.options.expansionjoint,"style":"","ctrl":"select","class":"form-control","visible":true,},   
            "Surfacing"     :{"label":"Surfacing","key":"ExpansionJ","type":"String","options":datamodel.options.bridgesurfacing,"style":"","ctrl":"select","class":"form-control","visible":true,},   
            "RailingTyp"    :{"label":"Railing Type","key":"RailingTyp","type":"String","options":datamodel.options.railingtype,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "PierType"      :{"label":"Pier Type","key":"PierType","type":"String","options":datamodel.options.piertype,"style":"","ctrl":"select","class":"form-control","visible":true,},  
            "PierFounda"    :{"label":"Pier Foundation","key":"PierFounda","type":"String","options":datamodel.options.pierfoundation,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "PierProtec"    :{"label":"Pier Protection","key":"PierProtec","type":"String","options":datamodel.options.pierfoundation,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "AbutmentTy"    :{"label":"Abutment Type","key":"AbutmentTy","type":"String","options":datamodel.options.abutmenttype,"style":"","ctrl":"select","class":"form-control","visible":true,},  
            "AbutmentFo"    :{"label":"Abutment Foundation","key":"AbutmentFo","type":"String","options":datamodel.options.abutmentfoundation,"style":"","ctrl":"select","class":"form-control","visible":true,},   
            "RiverName"     :{"label":"River Name","key":"RiverName","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},      
            "MaximumFlo"    :{"label":"Maximum Flood Level","key":"MaximumFlo","type":"String","options":datamodel.options.maximumfloodlevel,"style":"","ctrl":"select","class":"form-control","visible":true,},
            "Navigation"    :{"label":"Navigation Clearance","key":"Navigation","type":"String","options":datamodel.options.navigationclearance,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "Constructi"    :{"label":"Construction Cost","key":"Constructi","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},       
            "AbtProtect"    :{"label":"Abutment Protection","key":"MaximumFlo","type":"String","options":datamodel.options.abutmentprotect,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "NoOfPier"      :{"label":"No. Of Pier","key":"NoOfPier","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},       
            "NoOfSpan"      :{"label":"No. Of Span","key":"NoOfSpan","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},       
            "SpanLength"    :{"label":"Span Length","key":"SpanLength","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true}, 
            "From_"         :{"label":"From_","key":"From_","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},  
            "To_"           :{"label":"To_","key":"To_","type":"String","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},
            "remarks"       : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"border:solid 1px red;","ctrl":"textarea","class":"form-control"},
 //added options
            "Terrain"            : {"label":"Terrain","key":"Terrain","type":"String","options":datamodel.options.terrain,"style":"","ctrl":"select","class":"form-control"},
            "AlternativeRoute"   : {"label":"Alternative Route","key":"AlternativeRoute","type":"String","options":datamodel.options.alternativeroute,"style":"","ctrl":"select","class":"form-control"},
            "StructuresROW"      : {"label":"Structures/Houses on ROW?","key":"StructuresROW","type":"String","options":datamodel.options.structurerow,"style":"","ctrl":"select","class":"form-control"},
            "LandUse"            : {"label":"Land Use","key":"LandUse","type":"String","options":datamodel.options.landuse,"style":"","ctrl":"select","class":"form-control"},
            "BridgeUtil"         : {"label":"Bridge Utilities","key":"BridgeUtil","type":"String","options":datamodel.options.bridgeutilities,"style":"","ctrl":"select","class":"form-control"},
            "NoOfLanes"          : {"label":"No. Of Lanes","key":"NoOfLanes","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "TotalWidth"         : {"label":"Total Width (m)","key":"TotalWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "SideWalkWidth"      : {"label":"SideWalk Width (m)","key":"SideWalkWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "CarriageWidth"      : {"label":"Carriage Width (m)","key":"CarriageWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "SkewDeg"            : {"label":"Skew Angle (degrees)","key":"TotalWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "BearingType"        : {"label":"Bearing Type","key":"BearingType","type":"String","options":datamodel.options.bearingtype,"style":"","ctrl":"select","class":"form-control"},
            "RiverWidth"         : {"label":"River Width","key":"RiverWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "RiverAlignment"     : {"label":"River Alignment","key":"RiverAlignment","type":"String","options":datamodel.options.riveralignment,"style":"","ctrl":"select","class":"form-control"},
            "DebrisFlow"         : {"label":"Debris Flow","key":"DebrisFlow","type":"String","options":datamodel.options.debrisflow,"style":"","ctrl":"select","class":"form-control"},
            "Deck"               : {"label":"Deck","key":"Deck","type":"String","options":datamodel.options.deck,"style":"","ctrl":"select","class":"form-control"},
            "LeftSideWalk"       : {"label":"Left Sidewalk","key":"LeftSideWalk","type":"String","options":datamodel.options.leftsidewalk,"style":"","ctrl":"select","class":"form-control"},
            "RightSideWalk"      : {"label":"Right Sidewalk","key":"RightSideWalk","type":"String","options":datamodel.options.rightsidewalk,"style":"","ctrl":"select","class":"form-control"},
            "LeftRailing"        : {"label":"Left Railing","key":"Left Railing","type":"String","options":datamodel.options.leftrailing,"style":"","ctrl":"select","class":"form-control"},
            "RightRailing"       : {"label":"Right Railing","key":"RightRailing","type":"String","options":datamodel.options.rightrailing,"style":"","ctrl":"select","class":"form-control"},
            "FirstAppSlab"       : {"label":"First Approach Slab","key":"FirstAppSlab","type":"String","options":datamodel.options.firstappslab,"style":"","ctrl":"select","class":"form-control"},
            "SecondAppSlab"      : {"label":"Second Approach Slab","key":"SecondAppSlab","type":"String","options":datamodel.options.secondappslab,"style":"","ctrl":"select","class":"form-control"},

}
//Road KM Post
datamodel.RoadLocRefPoints = {
        "R_ID"      : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
        "KMPostNo"  : {"label":"KM Post No.","key":"KMPostNo","type":"String","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
        "LAT"       : {"label":"Latitude","key":"Lat","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
        "LONG"      : {"label":"Longitude","key":"LONG","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
}

//Road Other Features
datamodel.RoadSideFriction={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "TypeID"     : {"label":"Type","key":"TypeID","type":"String","options":datamodel.options.ofeaturetype,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "From_"      : {"label":"From_","key":"From_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "To_"        : {"label":"To_","key":"To_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
}
datamodel.RoadPlaceNames={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},    
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Name"       : {"label":"Name","key":"Name","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
};
datamodel.RoadJunctions={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "TypeID"     : {"label":"Type","key":"TypeID","type":"String","options":datamodel.options.junctiontype,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
}
datamodel.RoadMedian={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "TypeID"     : {"label":"Type","key":"TypeID","type":"String","options":datamodel.options.mediantype,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Width"      : {"label":"Width(m)","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
}

//Road Safety Features
datamodel.RoadGuardrails = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.safetyfeaturetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "From_"      : {"label":"From_","key":"From_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "To_"        : {"label":"To_","key":"To_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}
};
datamodel.RoadHazards = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.hazardtype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Severity"     : {"label":"Type","key":"Severity","type":"string","options":datamodel.options.hazardseverity,"visible":true,"style":"","ctrl":"select","class":"form-control"}          
};

datamodel.RoadLightings = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "NoOfLightings" : {"label":"No. of Lightings","key":"NoOfLightings","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}
};
datamodel.RoadMarkings = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "MarkingType"  : {"label":"Type","key":"MarkingType","type":"string","options":datamodel.options.markingtype,"visible":true,"style":"","ctrl":"select","class":"form-control"}
};
datamodel.RoadSigns = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "SignageType"   : {"label":"Type","key":"SignageType","type":"string","options":datamodel.options.signagetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "SignageSize"   : {"label":"Size","key":"SignageSize","type":"string","options":datamodel.options.signagesize,"visible":true,"style":"","ctrl":"select","class":"form-control"}
};

//Road Side Features
datamodel.RoadShoulders = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.shouldertype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}    
};
datamodel.RoadSideSlopes = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.sideslopetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Angle"      : {"label":"Angle","key":"Angle","type":"string","options":datamodel.options.angle,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Protection"   : {"label":"Protection","key":"Protection","type":"string","options":datamodel.options.protection,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}    
};
datamodel.RoadStructures = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.structuretype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}
};
datamodel.RoadSideWalks = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.surfacetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}    
};

// Road Drainage
datamodel.RoadCauseways = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Length" : {"label":"Length(m)","key":"length","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}        
};

datamodel.RoadCulverts = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.culverttype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Width" :    {"label":"Width","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "NumBarrels" : {"label":"No. Of Barrels","key":"NumBarrels","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Length"     : {"label":"Length(m)","key":"length","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},            
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.culvertcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},      
    "BarrelMaterialType"  : {"label":"Barrel Material Type","key":"BarrelMaterialType","type":"string","options":datamodel.options.culvertmaterialtype,"visible":true,"style":"","ctrl":"select","class":"form-control"},              
    "HeadwayMaterial"  : {"label":"Headway Material Type","key":"HeadwayMaterial","type":"string","options":datamodel.options.culvertmaterialtype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "ApronType"  : {"label":"Apron Type","key":"ApronType","type":"string","options":datamodel.options.culvertaprontype,"visible":true,"style":"","ctrl":"select","class":"form-control"},                        
    "InvertType"  : {"label":"Invert Type","key":"InvertType","type":"string","options":datamodel.options.culvertaprontype,"visible":true,"style":"","ctrl":"select","class":"form-control"},                        
    "Slope"  : {"label":"Slope","key":"Slope","type":"string","options":datamodel.options.culvertslope,"visible":true,"style":"","ctrl":"select","class":"form-control"},                        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}        
};
datamodel.RoadDitches = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.ditchestype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Size"   :   {"label":"Size","key":"Size","type":"string","options":datamodel.options.ditchessize,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}    
};
datamodel.RoadSpillways = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Length" : {"label":"Length(m)","key":"length","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}        
};

 //Traffic
datamodel.RoadTraffic = {
    "R_ID"         : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm"   : {"label":"Start(Km)","key":"LRPStartKm","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi"   : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo"   : {"label":"End(Km)","key":"LRPEndKmPo","type":"string","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp"   : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},        
    "Cost"         : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife"   : {"label":"Useful Life","key":"Usefullife","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "VehicleType"  : {"label":"Vehicle Type","key":"VehicleType","type":"string","options":datamodel.options.vehicletype,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Date"         : {"label":"Date","key":"Date","type":"string","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "From"         : {"label":"From","key":"From","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "To"           : {"label":"To","key":"To","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "FromDi"       : {"label":"","key":"FromDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "ToDi"         : {"label":"","key":"ToDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}        
};



datamodel.structure = {
                        "road":datamodel.road,
                        "RoadCarriageway":datamodel.RoadCarriageway, 
                        "RoadBridges":datamodel.RoadBridges,
                        "RoadCauseways":datamodel.RoadCauseways,
                        "RoadCulverts":datamodel.RoadCulverts,
                        "RoadDitches":datamodel.RoadDitches,
                        "RoadGuardrails":datamodel.RoadGuardrails,
                        "RoadHazards":datamodel.RoadHazards,
                        "RoadJunctions":datamodel.RoadJunctions,
                        "RoadLightings":datamodel.RoadLightings,
                        "RoadLocRefPoints":datamodel.RoadLocRefPoints,
                        "RoadMarkings":datamodel.RoadMarkings,
                        "RoadMedian":datamodel.RoadMedian,
                        "RoadPlaceNames":datamodel.RoadPlaceNames,
                        "RoadShoulders":datamodel.RoadShoulders,
                        "RoadSideFriction":datamodel.RoadSideFriction,
                        "RoadSideSlopes":datamodel.RoadSideSlopes,
                        "RoadSideWalks":datamodel.RoadSideWalks,
                        "RoadSigns":datamodel.RoadSigns,
                        "RoadSpillways":datamodel.RoadSpillways,
                        "RoadStructures":datamodel.RoadStructures,
                        "RoadTraffic":datamodel.RoadTraffic
                        }                                






datamodel.utils = {};

datamodel.utils.displayattributestable=  function(n,o,maxheight){    
            n="Road" + n;
            var table = "<div style='max-height:" +  (maxheight || 400) +"px;overflow-y:auto;overflow-x:hidden;'><table style='color:#555;font-size:12px;' class='table'>";
            var _model =!datamodel.structure[n]?datamodel.structure["road"]:datamodel.structure[n];
            var _getvalue = function(model,o){
                if(model.ctrl="select" && model.options.length>0 && model.visible){
                            var idx  = model.options.map(function(d){return d.key.toUpperCase}).indexOf((o[model.key] || "") .toUpperCase);
                            return idx>-1?model.options[idx].label :"";
                }else{
                    return o[model.key] || "";
                };
            };

            var m = _model;
                for(var n in _model){
                   var objdata = _model[n];
                    if(objdata.key=="LRPStartDi" || objdata.key=="LRPEndDisp"){         
                    }else if(objdata.key=="LRPStartKm"){
                            var _tbl = "<table style='width:100%'><tr><td width='30%'>" + objdata.label +":</td><td width='40px'>" +  _getvalue(objdata,o) +"</td><td>" +  _getvalue(_model["LRPStartDi"],o) +" Meters</td></tr></table>"
                            table+="<tr><td colspan=2>" + _tbl + "</td>"    
                    }else if(objdata.key=="LRPEndKmPo"){
                            var _tbl = "<table style='width:100%'><tr><td width='30%'>" + objdata.label +":</td><td width='40px'>" +  _getvalue(objdata,o) +"</td><td>" +  _getvalue(_model["LRPEndDisp"],o) +" Meters</td></tr></table>"
                            table+="<tr><td colspan=2>" + _tbl + "</td>"

                    }else{
                        table+="<tr><td>"  + objdata.label + ":</td><td>" + _getvalue(objdata,o) + "</td>"
                    }   
                }
             
            table+="</table></div>"
            return table;
    }; 





return datamodel;
}]);    