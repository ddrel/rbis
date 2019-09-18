'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema

const RoadCarriageway = {
"R_ID"       : String, 
"SegmentID"  : String,
"LRPStartKm" : Number,
"LRPStartDi" : Number,
"LRPEndKmPo" : Number,
"LRPEndDisp" : Number,
"NumLanes"   : Number,
"LaneWidthL" : Number,
"LaneWidthR" : Number,
"SegmentLen" : Number,
"SurfaceTyp" : String,  
"PavementTy" : String,
"DateOfLast" : Date,
"YearOfReco" : String,
"SegmentCon" : String, 
"PavementThickness" : Number,
"PavementStrength"  : Number,
"ConstructionDate" : Date,
"Lifeyears"  : Number,
"carriagewayWidth":Number,
"remarks": String,
"ConstructionValue":Number,
"geometry":Schema.Types.Mixed,
"created_by":Schema.Types.Mixed,
"updated_by":Schema.Types.Mixed,
"lastupdate_date":{
    type:Date,
    default:new Date()
},
"created_date":{
            type:Date,
            default:new Date()
            },
file_attachment:[Schema.Types.Mixed], 
file_roadimages:[Schema.Types.Mixed],
remarks_trail:[Schema.Types.Mixed],
status:String           
}

const RoadBridges = {
    "R_ID"          :String,             
    "Name"          :String,
    "Length"        :Number, 
    "TypeID"        :String, 
    "LRPStartKm"    :Number,
    "LRPStartDi"    :Number, 
    "LRPEndKmPo"    :Number, 
    "LRPEndDisp"    :Number,  
    "YearBuilt"     :String,  
    "LoadLimit"     :Number,   
    "SuperStruc"    :String,  
    "NumGirders"    :Number, 
    "DeckDimens"    :Number, 
    "DeckDime_1"    :Number, 
    "DeckDime_2"    :Number,  
    "DeckDime_3"    :Number,   
    "ExpansionJ"    :String,   
    "Surfacing"     :String,   
    "RailingTyp"    :String, 
    "PierType"      :String,  
    "PierFounda"    :String, 
    "PierProtec"    :String, 
    "AbutmentTy"    :String,  
    "AbutmentFo"    :String,   
    "RiverName"     :String,      
    "MaximumFlo"    :String,
    "Navigation"    :String, 
    "Constructi"    :String,       
    "AbtProtect"    :String, 
    "NoOfPier"      :Number,       
    "NoOfSpan"      :Number,       
    "SpanLength"    :String, 
    "From_"         :Number,  
    "To_"           :Number,
    "remarks"       :String,
    "Terrain"            : String,
    "AlternativeRoute"   : String,
    "StructuresROW"      : String,
    "LandUse"            : String,
    "BridgeUtil"         : String,
    "NoOfLanes"          : Number,
    "TotalWidth"         : Number,
    "SideWalkWidth"      : Number,
    "CarriageWidth"      : Number,
    "SkewDeg"            : Number,
    "BearingType"        : String,
    "RiverWidth"         : Number,
    "RiverAlignment"     : String,
    "DebrisFlow"         : String,
    "Deck"               : String,
    "LeftSideWalk"       : String,
    "RightSideWalk"      : String,
    "LeftRailing"        : String,
    "RightRailing"       : String,
    "FirstAppSlab"       : String,
    "SecondAppSlab"      : String,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String           
}


const RoadLocRefPoints = {
    "R_ID"      : String,
    "KMPostNo"  : Number, 
    "LAT"       : Number,
    "LONG"      : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                           
}

const RoadSideFriction={
    "R_ID"       : String,
    "TypeID"     : String, 
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,
    "From_"      : Number,
    "To_"        : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed],
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                           
}

const RoadPlaceNames={
    "R_ID"       : String,    
    "LRPStartKm" : Number,    
    "LRPEndKmPo" : Number,    
    "Name"       : String,    
    "LRPStartDi" : Number,
    "LRPEndDisp" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                           
};


const RoadJunctions={
    "R_ID"       : String,
    "TypeID"     : String, 
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,    
    "LRPEndDisp" : Number,
    "LRPEndKmPo" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed],
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                           
};

const RoadMedian={
    "R_ID"       : String,
    "TypeID"     : String, 
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,
    "Width"      : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                               
};


const RoadGuardrails = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "Position"   : String,    
    "TypeID"     : String,    
    "From_"      : Number,
    "To_"        : Number,
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                               
};

const RoadHazards = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "Position"   : String,    
    "TypeID"     : String,
    "Severity"     : String,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                         
};


const RoadLightings = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "Position"   : String,    
    "Exist"      : String,
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "NoOfLightings" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                            
};



const RoadMarkings = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "Position"   : String,    
    "Exist"      : String,
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "MarkingType"  : String,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                             
};


const RoadSigns = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "Position"   : String,    
    "Exist"      : String,
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "SignageType"   :String,
    "SignageSize"   : String,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                           
};


const RoadShoulders = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "TypeID"     : String,
    "Position"   : String,    
    "Exist"      : String,
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "Width" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                   
};




const RoadSideSlopes = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "TypeID"     : String,
    "Position"   : String,    
    "Angle"      : String,    
    "Protection"   : String,    
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                       
};


const RoadStructures = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "TypeID"     : String,
    "Position"   : String,        
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                             
};

const RoadSideWalks = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "TypeID"     : String,
    "Position"   : String,        
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "Width" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                               
};


const RoadCauseways = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,        
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "Width" : Number,
    "Length" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                       
};

const RoadCulverts = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "TypeID"     : String,
    "Width" :    Number,
    "NumBarrels" : Number,
    "Length"     : Number,            
    "Condition"  : String,      
    "BarrelMaterialType"  : String,              
    "HeadwayMaterial"  : String,
    "ApronType"  : String,                        
    "InvertType"  : String,                        
    "Slope"  : String,                        
    "Cost"       : Number,
    "Usefullife" : Number,    
    "ConstructionDate" : Date,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                           
};



const RoadDitches = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,    
    "TypeID"     : String,
    "Position"   : String,        
    "Size"   :   String,        
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "Width" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                               
};

const RoadSpillways = {
    "R_ID"       : String,   
    "LRPStartKm" : Number,
    "LRPStartDi" : Number,
    "LRPEndKmPo" : Number,
    "LRPEndDisp" : Number,        
    "Cost"       : Number,
    "Usefullife" : Number,
    "Condition"  : String,        
    "ConstructionDate" : Date,
    "Width" : Number,
    "Length" : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                   
};



const RoadTraffic2 = {
    "R_ID"         : String,   
    "LRPStartKm"   : Number,
    "LRPStartDi"   : Number,
    "LRPEndKmPo"   : Number,
    "LRPEndDisp"   : Number,        
    "Cost"         : Number,
    "Usefullife"   : Number,
    "VehicleType"  : String,        
    "Date"         : Date,
    "From"         : Number,
    "To"           : Number,  
    "FromDi"       : Number,
    "ToDi"         : Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                   
            
};

const RoadTraffic = {
    "R_ID"         : String,   
    "motor_cycle_dec":Number,
    "motor_cycle_inc":Number,
    "passenger_car_dec":Number,
    "passenger_car_inc":Number,
    "passenger_utility_dec":Number,
    "passenger_utility_inc":Number,
    "goods_utility_dec":Number,
    "goods_utility_inc":Number,
    "small_bus_dec":Number,
    "small_bus_inc":Number,
    "large_bus_dec":Number,
    "large_bus_inc":Number,
    "rigid_truck_2_axles_dec":Number,
    "rigid_truck_2_axles_inc":Number,
    "rigid_truck_3_axles_dec":Number,
    "rigid_truck_3_axles_inc":Number,
    "trucksemi_trailer_3_4_axles_dec":Number,
    "trucksemi_trailer_3_4_axles_inc":Number,
    "trucksemi_trailer_5_axles_dec":Number,
    "trucksemi_trailer_5_axles_inc":Number,
    "truck_trailer_4_axles_dec":Number,
    "truck_trailer_4_axles_inc":Number,
    "truck_trailer_5_axles_dec":Number,
    "truck_trailer_5_axles_inc":Number,
    "AADT":Number,
    "geometry": Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
        type:Date,
        default:new Date()
    },
    "created_date":{
                type:Date,
                default:new Date()
                },
    file_attachment:[Schema.Types.Mixed], 
    file_roadimages:[Schema.Types.Mixed],
    remarks_trail:[Schema.Types.Mixed],
    status:String                                   
            
};




exports.RBISModelSchema = {"RoadCarriageway":RoadCarriageway, 
                        "RoadBridges":RoadBridges,
                        "RoadCauseways":RoadCauseways,
                        "RoadCulverts":RoadCulverts,
                        "RoadDitches":RoadDitches,
                        "RoadGuardrails":RoadGuardrails,
                        "RoadHazards":RoadHazards,
                        "RoadJunctions":RoadJunctions,
                        "RoadLightings":RoadLightings,
                        "RoadLocRefPoints":RoadLocRefPoints,
                        "RoadMarkings":RoadMarkings,
                        "RoadMedian":RoadMedian,
                        "RoadPlaceNames":RoadPlaceNames,
                        "RoadShoulders":RoadShoulders,
                        "RoadSideFriction":RoadSideFriction,
                        "RoadSideSlopes":RoadSideSlopes,
                        "RoadSideWalks":RoadSideWalks,
                        "RoadSigns":RoadSigns,
                        "RoadSpillways":RoadSpillways,
                        "RoadStructures":RoadStructures,
                        "RoadTraffic":RoadTraffic
}                                
