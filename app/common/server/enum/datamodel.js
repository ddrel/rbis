var datamodel = {};

datamodel.ROAD_FEATURE_STATUS = {"forreview":"For Review","inprogress":"In Progress","pending":"Pending","validated":"Validated","rejected":"Rejected","returned":"Returned","forupdate":"For Update"};
datamodel.optionReadOnly = ["forreview","validated","ROAD BOARD","SUPERVISOR","COA"];

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
    "Length"            : {"label":"Length","key":"Length","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "RROW_acq_date"     : {"label":"RROW Acquisition Date","key":"RROW_acq_date","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "RROW_acq_cost"     : {"label":"RROW Acquisition Cost","key":"RROW_acq_cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "RROW_usefullife"   : {"label":"RROW Useful Life","key":"RROW_usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "remarks"           : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"","ctrl":"textarea","class":"form-control"}
};

//carriageway"Constructi" : {}, "Construc_1" : {}, 
datamodel.RoadCarriageway = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "SegmentID"  : {"label":"Segment ID","key":"SegmentID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start","key":"LRPStartKm","type":"integer","options":[],"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "LRPEndKmPo" : {"label":"End","key":"LRPEndKmPo","type":"integer","options":[],"style":"","ctrl":"select","class":"form-control"}, 
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},   
    "NumLanes"   : {"label":"No. of Lanes","key":"NumLanes","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "LaneWidthL" : {"label":"Lane Width Left","key":"LaneWidthL","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "LaneWidthR" : {"label":"Lane Width Right","key":"LaneWidthR","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "SegmentLen" : {"label":"Segment Length","key":"SegmentLen","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "SurfaceTyp" : {"label":"Surface Type","key":"SurfaceTyp","type":"string","options":datamodel.options.surfacetype,"style":"","ctrl":"select","class":"form-control"},  
    "PavementTy" : {"label":"Pavement Type","key":"PavementTy","type":"string","options":datamodel.options.pavementtype,"style":"","ctrl":"select","class":"form-control"},  
    "DateOfLast" : {"label":"Date of Last Resurfacing","key":"DateOfLast","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},      
    "RROW_usefullife"   : {"label":"RROW Useful Life","key":"RROW_usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "YearOfReco" : {"label":"Year of Reconstruction","key":"YearOfReco","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "SegmentCon" : {"label":"Condition","key":"SegmentCon","type":"string","options":datamodel.options.roadcondition,"style":"","ctrl":"select","class":"form-control"},  
    "PavementThickness"  : {"label":"Pavement Thickness","key":"PavementThickness","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "PavementStrength"  : {"label":"Pavement Strength","key":"PavementStrength","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},  
    "Lifeyears"  : {"label":"Useful Life Year(s)","key":"Lifeyears","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "carriagewayWidth":{"label":"Carriageway Width","key":"carriagewayWidth","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "remarks"    : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"","ctrl":"textarea","class":"form-control"},
    //added options
     "ConstructionValue":{"label":"Construction Value (PHP)","key":"ConstructionValue","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 

}

//Road Bridgesdata
datamodel.RoadBridges = {
            "R_ID"          :{"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},             
            "Name"          :{"label":"Name","key":"Name","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "Length"        :{"label":"Length(m)","key":"Length","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
            "TypeID"        :{"label":"Type Id","key":"TypeID","type":"string","options":datamodel.options.superstructuretype,"style":"","ctrl":"select","class":"form-control"}, 
            "LRPStartKm"    :{"label":"Km Post Start","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
            "LRPStartDi"    :{"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
            "LRPEndKmPo"    :{"label":"Km Post End","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
            "LRPEndDisp"    :{"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
            "YearBuilt"     :{"label":"Year Built","key":"YearBuilt","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
            "LoadLimit"     :{"label":"Load Limit","key":"LoadLimit","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},   
            "SuperStruc"    :{"label":"Super Structure Type","key":"SuperStruc","type":"string","options":datamodel.options.superstructuretype,"style":"","ctrl":"select","class":"form-control"},  
            "NumGirders"    :{"label":"No. Of Girders","key":"NumGirders","type":"integer","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,}, 
            "DeckDimens"    :{"label":"Deck Dimens","key":"DeckDimens","type":"float","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,}, 
            "DeckDime_1"    :{"label":"Deck Dime 1","key":"DeckDime_1","type":"float","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,}, 
            "DeckDime_2"    :{"label":"Deck Dime 2","key":"DeckDime_2","type":"float","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},  
            "DeckDime_3"    :{"label":"Deck Dime 3","key":"DeckDime_3","type":"float","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},   
            "ExpansionJ"    :{"label":"Expansion Joint","key":"ExpansionJ","type":"string","options":datamodel.options.expansionjoint,"style":"","ctrl":"select","class":"form-control","visible":true,},   
            "Surfacing"     :{"label":"Surfacing","key":"ExpansionJ","type":"string","options":datamodel.options.bridgesurfacing,"style":"","ctrl":"select","class":"form-control","visible":true,},   
            "RailingTyp"    :{"label":"Railing Type","key":"RailingTyp","type":"string","options":datamodel.options.railingtype,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "PierType"      :{"label":"Pier Type","key":"PierType","type":"string","options":datamodel.options.piertype,"style":"","ctrl":"select","class":"form-control","visible":true,},  
            "PierFounda"    :{"label":"Pier Foundation","key":"PierFounda","type":"string","options":datamodel.options.pierfoundation,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "PierProtec"    :{"label":"Pier Protection","key":"PierProtec","type":"string","options":datamodel.options.pierfoundation,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "AbutmentTy"    :{"label":"Abutment Type","key":"AbutmentTy","type":"string","options":datamodel.options.abutmenttype,"style":"","ctrl":"select","class":"form-control","visible":true,},  
            "AbutmentFo"    :{"label":"Abutment Foundation","key":"AbutmentFo","type":"string","options":datamodel.options.abutmentfoundation,"style":"","ctrl":"select","class":"form-control","visible":true,},   
            "RiverName"     :{"label":"River Name","key":"RiverName","type":"string","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},      
            "MaximumFlo"    :{"label":"Maximum Flood Level","key":"MaximumFlo","type":"string","options":datamodel.options.maximumfloodlevel,"style":"","ctrl":"select","class":"form-control","visible":true,},
            "Navigation"    :{"label":"Navigation Clearance","key":"Navigation","type":"string","options":datamodel.options.navigationclearance,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "Constructi"    :{"label":"Construction Cost","key":"Constructi","type":"float","options":[],"style":"","ctrl":"text","class":"form-control","visible":true,},       
            "AbtProtect"    :{"label":"Abutment Protection","key":"MaximumFlo","type":"string","options":datamodel.options.abutmentprotect,"style":"","ctrl":"select","class":"form-control","visible":true,}, 
            "NoOfPier"      :{"label":"No. Of Pier","key":"NoOfPier","type":"integer","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},       
            "NoOfSpan"      :{"label":"No. Of Span","key":"NoOfSpan","type":"integer","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},       
            "SpanLength"    :{"label":"Span Length","key":"SpanLength","type":"string","options":[],"style":"","ctrl":"text","class":"form-control","visible":false}, 
            "From_"         :{"label":"From_","key":"From_","type":"string","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},  
            "To_"           :{"label":"To_","key":"To_","type":"string","options":[],"style":"","ctrl":"text","class":"form-control","visible":true},
            "remarks"       : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"border:solid 1px red;","ctrl":"textarea","class":"form-control"},
 //added options
            "Terrain"            : {"label":"Terrain","key":"Terrain","type":"string","options":datamodel.options.terrain,"style":"","ctrl":"select","class":"form-control"},
            "AlternativeRoute"   : {"label":"Alternative Route","key":"AlternativeRoute","type":"string","options":datamodel.options.alternativeroute,"style":"","ctrl":"select","class":"form-control"},
            "StructuresROW"      : {"label":"Structures/Houses on ROW?","key":"StructuresROW","type":"string","options":datamodel.options.structurerow,"style":"","ctrl":"select","class":"form-control"},
            "LandUse"            : {"label":"Land Use","key":"LandUse","type":"string","options":datamodel.options.landuse,"style":"","ctrl":"select","class":"form-control"},
            "BridgeUtil"         : {"label":"Bridge Utilities","key":"BridgeUtil","type":"string","options":datamodel.options.bridgeutilities,"style":"","ctrl":"select","class":"form-control"},
            "NoOfLanes"          : {"label":"No. Of Lanes","key":"NoOfLanes","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "TotalWidth"         : {"label":"Total Width (m)","key":"TotalWidth","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "SideWalkWidth"      : {"label":"SideWalk Width (m)","key":"SideWalkWidth","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "CarriageWidth"      : {"label":"Carriage Width (m)","key":"CarriageWidth","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "SkewDeg"            : {"label":"Skew Angle (degrees)","key":"TotalWidth","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "BearingType"        : {"label":"Bearing Type","key":"BearingType","type":"string","options":datamodel.options.bearingtype,"style":"","ctrl":"select","class":"form-control"},
            "RiverWidth"         : {"label":"River Width","key":"RiverWidth","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
            "RiverAlignment"     : {"label":"River Alignment","key":"RiverAlignment","type":"string","options":datamodel.options.riveralignment,"style":"","ctrl":"select","class":"form-control"},
            "DebrisFlow"         : {"label":"Debris Flow","key":"DebrisFlow","type":"string","options":datamodel.options.debrisflow,"style":"","ctrl":"select","class":"form-control"},
            "Deck"               : {"label":"Deck","key":"Deck","type":"string","options":datamodel.options.deck,"style":"","ctrl":"select","class":"form-control"},
            "LeftSideWalk"       : {"label":"Left Sidewalk","key":"LeftSideWalk","type":"string","options":datamodel.options.leftsidewalk,"style":"","ctrl":"select","class":"form-control"},
            "RightSideWalk"      : {"label":"Right Sidewalk","key":"RightSideWalk","type":"string","options":datamodel.options.rightsidewalk,"style":"","ctrl":"select","class":"form-control"},
            "LeftRailing"        : {"label":"Left Railing","key":"Left Railing","type":"string","options":datamodel.options.leftrailing,"style":"","ctrl":"select","class":"form-control"},
            "RightRailing"       : {"label":"Right Railing","key":"RightRailing","type":"string","options":datamodel.options.rightrailing,"style":"","ctrl":"select","class":"form-control"},
            "FirstAppSlab"       : {"label":"First Approach Slab","key":"FirstAppSlab","type":"string","options":datamodel.options.firstappslab,"style":"","ctrl":"select","class":"form-control"},
            "SecondAppSlab"      : {"label":"Second Approach Slab","key":"SecondAppSlab","type":"string","options":datamodel.options.secondappslab,"style":"","ctrl":"select","class":"form-control"},

}
//Road KM Post
datamodel.RoadLocRefPoints = {
        "R_ID"      : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
        "KMPostNo"  : {"label":"KM Post No.","key":"KMPostNo","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
        "LAT"       : {"label":"Latitude","key":"LAT","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
        "LONG"      : {"label":"Longitude","key":"LONG","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
}

//Road Other Features
datamodel.RoadSideFriction={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.ofeaturetype,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "From_"      : {"label":"From_","key":"From_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "To_"        : {"label":"To_","key":"To_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
}
datamodel.RoadPlaceNames={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},    
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Name"       : {"label":"Name","key":"Name","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
};
datamodel.RoadJunctions={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.junctiontype,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","float":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","float":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
}
datamodel.RoadMedian={
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.mediantype,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","float":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","float":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Width"      : {"label":"Width(m)","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
}

//Road Safety Features
datamodel.RoadGuardrails = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","float":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","float":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.safetyfeaturetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "From_"      : {"label":"From_","key":"From_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "To_"        : {"label":"To_","key":"To_","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}
};
datamodel.RoadHazards = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.hazardtype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Severity"     : {"label":"Type","key":"Severity","type":"string","options":datamodel.options.hazardseverity,"visible":true,"style":"","ctrl":"select","class":"form-control"}          
};

datamodel.RoadLightings = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "NoOfLightings" : {"label":"No. of Lightings","key":"NoOfLightings","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}
};
datamodel.RoadMarkings = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "MarkingType"  : {"label":"Type","key":"MarkingType","type":"string","options":datamodel.options.markingtype,"visible":true,"style":"","ctrl":"select","class":"form-control"}
};
datamodel.RoadSigns = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "SignageType"   : {"label":"Type","key":"SignageType","type":"string","options":datamodel.options.signagetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "SignageSize"   : {"label":"Size","key":"SignageSize","type":"string","options":datamodel.options.signagesize,"visible":true,"style":"","ctrl":"select","class":"form-control"}
};

//Road Side Features
datamodel.RoadShoulders = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.shouldertype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Exist"      : {"label":"Exist","key":"Exist","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}    
};
datamodel.RoadSideSlopes = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.sideslopetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Angle"      : {"label":"Angle","key":"Angle","type":"float","options":datamodel.options.angle,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Protection"   : {"label":"Protection","key":"Protection","type":"string","options":datamodel.options.protection,"visible":true,"style":"","ctrl":"select","class":"form-control"},    
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}    
};
datamodel.RoadStructures = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.structuretype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}
};
datamodel.RoadSideWalks = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.surfacetype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}    
};

// Road Drainage
datamodel.RoadCauseways = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Length" : {"label":"Length(m)","key":"length","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}        
};

datamodel.RoadCulverts = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.culverttype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Width" :    {"label":"Width","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "NumBarrels" : {"label":"No. Of Barrels","key":"NumBarrels","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Length"     : {"label":"Length(m)","key":"length","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},            
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.culvertcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},      
    "BarrelMaterialType"  : {"label":"Barrel Material Type","key":"BarrelMaterialType","type":"string","options":datamodel.options.culvertmaterialtype,"visible":true,"style":"","ctrl":"select","class":"form-control"},              
    "HeadwayMaterial"  : {"label":"Headway Material Type","key":"HeadwayMaterial","type":"string","options":datamodel.options.culvertmaterialtype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "ApronType"  : {"label":"Apron Type","key":"ApronType","type":"string","options":datamodel.options.culvertaprontype,"visible":true,"style":"","ctrl":"select","class":"form-control"},                        
    "InvertType" : {"label":"Invert Type","key":"InvertType","type":"string","options":datamodel.options.culvertaprontype,"visible":true,"style":"","ctrl":"select","class":"form-control"},                        
    "Slope"      : {"label":"Slope","key":"Slope","type":"string","options":datamodel.options.culvertslope,"visible":true,"style":"","ctrl":"select","class":"form-control"},                        
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"}        
};
datamodel.RoadDitches = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "TypeID"     : {"label":"Type","key":"TypeID","type":"string","options":datamodel.options.ditchestype,"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "Position"   : {"label":"Position","key":"Position","type":"string","options":datamodel.options.position,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Size"       : {"label":"Size","key":"Size","type":"string","options":datamodel.options.ditchessize,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}    
};
datamodel.RoadSpillways = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm" : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo" : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},        
    "Cost"       : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife" : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Condition"  : {"label":"Condition","key":"Condition","type":"string","options":datamodel.options.roadcondition,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "ConstructionDate" : {"label":"Construction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "Width" : {"label":"Width","key":"Width","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Length" : {"label":"Length(m)","key":"length","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}        
};

 //Traffic
 /*
datamodel.RoadTraffic = {
    "R_ID"         : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "LRPStartKm"   : {"label":"Start(Km)","key":"LRPStartKm","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPStartDi"   : {"label":"","key":"LRPStartDi","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "LRPEndKmPo"   : {"label":"End(Km)","key":"LRPEndKmPo","type":"integer","options":[],"visible":true,"style":"","ctrl":"select","class":"form-control"},
    "LRPEndDisp"   : {"label":"","key":"LRPEndDisp","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},        
    "Cost"         : {"label":"Cost","key":"Cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "Usefullife"   : {"label":"Useful Life","key":"Usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "VehicleType"  : {"label":"Vehicle Type","key":"VehicleType","type":"string","options":datamodel.options.vehicletype,"visible":true,"style":"","ctrl":"select","class":"form-control"},        
    "Date"         : {"label":"Date","key":"Date","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "From"         : {"label":"From","key":"From","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "To"           : {"label":"To","key":"To","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "FromDi"       : {"label":"","key":"FromDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "ToDi"         : {"label":"","key":"ToDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}        
}
*/

datamodel.RoadTraffic = {
    "R_ID"         : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"},   
    "motor_cycle_dec":{"label":"Motor Tricycle dec","key":"motor_cycle_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "motor_cycle_inc":{"label":"Motor Tricycle inc","key":"motor_cycle_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "passenger_car_dec":{"label":"Passenger Car dec","key":"passenger_car_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "passenger_car_inc":{"label":"Passenger Car inc","key":"passenger_car_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "passenger_utility_dec":{"label":"Passenger Utility dec","key":"passenger_utility_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "passenger_utility_inc":{"label":"Passenger Utility inc","key":"passenger_utility_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "goods_utility_dec":{"label":"Goods Utility dec","key":"goods_utility_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "goods_utility_inc":{"label":"Goods Utility inc","key":"goods_utility_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "small_bus_dec":{"label":"Small Bus dec","key":"small_bus_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "small_bus_inc":{"label":"Small Bus inc","key":"small_bus_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "large_bus_dec":{"label":"Large Bus dec","key":"large_bus_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "large_bus_inc":{"label":"Large Bus inc","key":"large_bus_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "rigid_truck_2_axles_dec":{"label":"Rigid Truck 2 Axles dec","key":"rigid_truck_2_axles_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "rigid_truck_2_axles_inc":{"label":"Rigid Truck 2 Axles inc","key":"rigid_truck_2_axles_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "rigid_truck_3_axles_dec":{"label":"Rigid Truck 3+ Axles dec","key":"rigid_truck_3_axles_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "rigid_truck_3_axles_inc":{"label":"Rigid Truck 3+ Axles inc","key":"rigid_truck_3_axles_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "trucksemi_trailer_3_4_axles_dec":{"label":"Truck Semi-Trailer 3 and 4 axles dec","key":"trucksemi_trailer_3_4_axles_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "trucksemi_trailer_3_4_axles_inc":{"label":"Truck Semi-Trailer 3 and 4 axles inc","key":"trucksemi_trailer_3_4_axles_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "trucksemi_trailer_5_axles_dec": {"label":"Truck Semi-Trailer 5+ axles dec","key":"trucksemi_trailer_5_axles_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "trucksemi_trailer_5_axles_inc":{"label":"Truck Semi-Trailer 5+ axles inc","key":"trucksemi_trailer_5_axles_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "truck_trailer_4_axles_dec":{"label":"Truck Trailer 4 axles dec","key":"truck_trailer_4_axles_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "truck_trailer_4_axles_inc":{"label":"Truck Trailer 4 axles inc","key":"truck_trailer_4_axles_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "truck_trailer_5_axles_dec":{"label":"Truck Trailer 5+ axles dec","key":"truck_trailer_5_axles_dec","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "truck_trailer_5_axles_inc":{"label":"Truck Trailer 5+ axles inc","key":"truck_trailer_5_axles_inc","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "AADT":{"label":"AADT","key":"AADT","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},     
}

module.exports = datamodel;