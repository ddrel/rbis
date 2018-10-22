'use strict';

const Enums = {};
const tableName = {
                "road":"Road",
                "RoadCarriageway":"Carriageway", 
                "RoadBridges":"Bridge",
                "RoadCauseways":"Road Causeways",
                "RoadCulverts":"Road Culverts",
                "RoadDitches":"Road Ditches",
                "RoadGuardrails":"Road Guardrails",
                "RoadHazards":"Road Hazards",
                "RoadJunctions":"Road Junctions",
                "RoadLightings":"Road Lightings",
                "RoadLocRefPoints":"Km Post",
                "RoadMarkings":"Road Markings",
                "RoadMedian":"Road Median",
                "RoadPlaceNames":"PlaceNames",
                "RoadShoulders":"Road Shoulders",
                "RoadSideFriction":"Road Side Friction",
                "RoadSideSlopes":"Road Side Slopes",
                "RoadSideWalks":"Road SideWalks",
                "RoadSigns":"Road Signs",
                "RoadSpillways":"Road Spillways",
                "RoadStructures":"Road Structures",
                "RoadTraffic":"Road Traffic"
}

const logsTag = {
                "data.update":"data.update",
                "data.new":"data.new",
                "data.delete":"data.delete",
                "shapes.importnew":"shapes.importnew",
                "shapes.importupdate":"shapes.importupdate",                
                "media.uploadimage":"media.uploadimage",
                "media.deleteimage":"media.deleteimage",
                "media.uploadattachment":"media.uploadattachment",
                "media.deleteattachment":"media.deleteattachment",
                "status.inprogress":"status.inprogress",
                "status.pending":"status.pending",
                "status.forreview":"status.forreview",
                "status.returned":"status.returned",
                "status.validated":"status.validated",
                "remarks.add":"remarks.add",
                };                   

const roadstatus = {"forreview":"For Review","inprogress":"In Progress","pending":"Pending","validated":"Validated","rejected":"Rejected","returned":"Returned","forupdate":"For Update"};
Enums.tableName = tableName;
Enums.logsTag = logsTag; 
Enums.status = roadstatus;
module.exports = Enums