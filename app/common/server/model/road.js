'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
   _ = require('lodash'),
   moment = require('moment'),
   RBISModelSchema = require('../schema/road-features').RBISModelSchema;

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ROAD_ATTR_DET = ["RoadBridges", 
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
                    "RoadStructures",
                    "RoadTraffic"]

const ROAD_MODEL_STRUC = {      
    "RegionCode" : String, 
    "ProvinceCo" : String, 
    "CityMunCod" : String, 
    "R_ID" : String, 
    "R_NAME" : String, 
    "R_CLASS" : String, 
    "R_Importan" : String, 
    "Environmen" : String, 
    "RROW" : Number, 
    "RROWAcquir" : String, 
    "DirFlow" : String, 
    "Terrain" : String, 
    "Length" : Number, 
    "oldid" : String, 
    "RROW_acq_date": Date,
    "RROW_acq_cost":Number,
    "RROW_usefullife":Number,
    "remarks":String,
    "RoadBridges" : [RBISModelSchema.RoadBridges], 
    "RoadCarriageway" : [RBISModelSchema.RoadCarriageway], 
    "RoadCauseways" : [RBISModelSchema.RoadCauseways], 
    "RoadCulverts" : [RBISModelSchema.RoadCulverts], 
    "RoadDitches" : [RBISModelSchema.RoadDitches], 
    "RoadGuardrails" : [RBISModelSchema.RoadGuardrails], 
    "RoadHazards" : [RBISModelSchema.RoadHazards], 
    "RoadJunctions" : [RBISModelSchema.RoadJunctions], 
    "RoadLightings" : [RBISModelSchema.RoadLightings], 
    "RoadLocRefPoints" : [RBISModelSchema.RoadLocRefPoints], 
    "RoadMarkings" : [RBISModelSchema.RoadMarkings], 
    "RoadMedian" : [RBISModelSchema.RoadMedian], 
    "RoadPlaceNames" : [RBISModelSchema.RoadPlaceNames], 
    "RoadShoulders" : [RBISModelSchema.RoadShoulders], 
    "RoadSideFriction" : [Schema.Types.Mixed], 
    "RoadSideSlopes" : [RBISModelSchema.RoadSideSlopes], 
    "RoadSideWalks" : [RBISModelSchema.RoadSideWalks], 
    "RoadSigns" : [RBISModelSchema.RoadSigns], 
    "RoadSpillways" : [RBISModelSchema.RoadSpillways], 
    "RoadStructures" : [RBISModelSchema.RoadStructures],
    "RoadTraffic": [RBISModelSchema.RoadTraffic],
    "geometry" : Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
    "updated_by":Schema.Types.Mixed,
    "lastupdate_date":{
                    type:Date,
                    default:Date.now()
    },
    "created_date":{
        type:Date,
        default:Date.now()
    }
}
const RoadsSchema = new Schema(ROAD_MODEL_STRUC,{ collection: 'Roads' });
RoadsSchema.set('toJSON', { getters: true, virtuals: true });


var _toDataType =  function(v){
    if(moment(v, "YYYY-MM-DDTHH:mm:ss", false).isValid()){
        return new Date(v);
    }else if (!isNaN(Number(v))){
        return Number(v)
    }else{
        return v;
    };
}



RoadsSchema.statics.getObjectID = function(){
    return new mongoose.mongo.ObjectId();
}

RoadsSchema.statics.generateRoadID =  function(options,cb){
    var road =  mongoose.model("Roads");
    var _qry = {};
    if(options.CityMunCod){
        _qry.CityMunCod = options.CityMunCod;
        _qry.R_CLASS = "City"; 
    }else if(options.ProvinceCo){
        _qry.ProvinceCo = options.ProvinceCo; 
        _qry.R_CLASS = "Provincial";
    }

    console.log(_qry);    
    road.findOne(_qry)
    .select({R_ID:1,_id:0})
    .sort({R_ID:-1})
    .exec(function(err,doc){
        var rid = doc.R_ID.toString().substring(9,doc.R_ID.length);
            rid = parseInt(rid) + 1;
            var rlen = (4 - rid.toString().length),padStr="";
            for(var i = 0;i< rlen;i++){padStr+="0";}
            padStr+=rid.toString(); 
            padStr= doc.R_ID.toString().substring(0,9) + padStr; 
        cb(padStr);
    })
}

RoadsSchema.statics.newRoad =  function(data,cb){
    RoadsSchema.statics.generateRoadID(data,function(rid){
        var road =  mongoose.model("Roads");

        var _road = new road(data);
            _road.R_ID = rid;
        _road.save(function(err){
            cb(err,_road)
        });
    });
};

RoadsSchema.statics.getprovroadshortinfo =  function(code,cb){
    this.find({ProvinceCo:code,R_CLASS:'Provincial'})
        .select("R_ID R_NAME R_CLASS R_Importan Environmen RROW RROWAcquir DirFlow Terrain Length")
        .exec(function(err,docs){
        if(err){cb(err,null);return;}
        var _tree_roads = [];        
        /*
        ocs.forEach(function(attr){
            console.log(attr);
            var _attr = {};                
            _tree_roads.push(_attr);
        })
        */
        return cb(null,docs);
    });

};


RoadsSchema.statics.getcitymunroadshortinfo =  function(code,cb){
    this.find({CityMunCod:code,R_CLASS:'City'})
        .select("R_ID R_NAME R_CLASS R_Importan Environmen RROW RROWAcquir DirFlow Terrain Length")
        .exec(function(err,docs){
        if(err){cb(err,null);return;}               
        return cb(null,docs);
    });

}

RoadsSchema.statics.getroadattrinfo =  function(rid,cb){
    this.findOne({R_ID:rid})        
        .exec(cb);

};

RoadsSchema.statics.getroadshortattrinfo =  function(rid,cb){
    this.findOne({R_ID:rid}).exec(function(err,data){
            if(data==null) {cb({"error":"no data"},null); return ;}
            var _row = {};
            _row._id = data._id;
            for( var key in ROAD_MODEL_STRUC){
                if(ROAD_ATTR_DET.indexOf(key)>-1){
                    var a = key + "_length";
                    _row[a] = data[key].length;
                }else{
                    _row[key] = data[key];
                }
            }

            cb(err,_row);
    });
}

RoadsSchema.statics.getroadattr =  function(rid,attr,cb){
    this.findOne({R_ID:rid}).exec(function(err,data){
        cb(err,data[attr]);
    })
}

RoadsSchema.statics.getroadaggmain =  function(qry,page,limit,cb){    
    /*
    var aggregate = [
                {
                    $project: { 
                        R_ID: 1,
                        SegmentID:1,
                        R_NAME:1,
                        R_CLASS:1,            
                        bridgecount: { $size: "$RoadBridges" },
                        segmentcount:{$size:"$RoadCarriageway"},     
                        roadlengths:"$RoadCarriageway.SegmentLen"            
                    }       
                },{$unwind: "$roadlengths"},
              )      {$group:{
                            _id:{_id:"$_id",R_ID:"$R_ID",R_NAME:"$R_NAME",R_CLASS:"$R_CLASS",segmentcount:"$segmentcount",SegmentID:"$SegmentID",bridgecount:"$bridgecount",segmentcount:"$segmentcount"},
                            roadlengths: {$sum:"$roadlengths"}
                            }
                    }
            ];
    */
    var aggregate = this.aggregate();
       if(qry){aggregate.match(qry);}
        aggregate.project({ 
                        R_ID: 1,
                        SegmentID:1,
                        R_NAME:1,
                        R_CLASS:1,          
                        R_Importan:1,  
                        bridgecount: { $size: "$RoadBridges" },
                        segmentcount:{$size:"$RoadCarriageway"},     
                        roadlengths: {$cond: [ { '$eq':[{$size:"$RoadCarriageway"},0]}, [0], "$RoadCarriageway.SegmentLen"]}//"$RoadCarriageway.SegmentLen"            
        })
        .unwind("$roadlengths")
        .group({_id:{_id:"$_id",R_ID:"$R_ID",R_NAME:"$R_NAME",R_CLASS:"$R_CLASS",R_Importan:"$R_Importan",segmentcount:"$segmentcount",SegmentID:"$SegmentID",bridgecount:"$bridgecount",segmentcount:"$segmentcount"},
                    roadlengths: {$sum:"$roadlengths"}
                });

    var options = { page : page, limit : limit};        
    this.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
           cb({err:"error processing data"},null);
        }
        else
        { 
            cb(null,{data:results,pagecount:pageCount,count:count})
        }
    });
    
};


RoadsSchema.statics.getroadlengthtotal =  function(qry,cb){
    var _agg = [{$group: {_id:'',Roadlengthtotal: { $sum: '$Length' }}},
                    {$project: {_id: 0,Roadlengthtotal: '$Roadlengthtotal'}}];

    if(qry){_agg.unshift(qry)}                     

    this.aggregate(_agg,cb)
};


RoadsSchema.statics.getbridgelengthtotal = function(qry,cb){
    var _agg = [					
					{
                    '$project': {
                      				_id:{'_id':'$_id'},                         			
                        			totalbridgelength: '$RoadBridges.Length'
                        		}       
                	},
                	{'$unwind':'$totalbridgelength'},
                	{'$group':{
                				_id:'',
                				totalbridgelength: {$sum:'$totalbridgelength'}
                			 }
                	},
                		{'$project':{
                		_id:0,
                		totalbridgelength: '$totalbridgelength'
                		}
                	}	
                ];
    if(qry){_agg.unshift(qry)}                
    this.aggregate(_agg,cb)
}


RoadsSchema.statics.getcarriagewayperconcount =  function(qry,cb){    
    var _agg = [{$group: { '_id': '$RoadCarriageway.SegmentCon', 'SegmentCon': { $push: '$RoadCarriageway.SegmentCon'}}},
					{'$project':{_id:1,'SegmentCon':'$SegmentCon'}
					},
					{'$unwind':'$_id'},
					{'$project':
					  			{
								'Good':{'$cond':[{'$eq':['G','$_id']},1,0]},
								'Poor':{'$cond':[{'$eq':['P','$_id']},1,0]},
								'Fair':{'$cond':[{'$eq':['F','$_id']},1,0]},
								'New':{'$cond':[{'$eq':['N','$_id']},1,0]},
								'Bad':{'$cond':[{'$eq':['B','$_id']},1,0]}
								}
					},
					{ '$group': {
        						'_id': '',
        						'Poor': { '$sum': '$Poor' },
        						'Good': { '$sum': '$Good' },
        						'Fair': { '$sum': '$Fair' },
        						'New': { '$sum': '$New' },
        						'Bad': { '$sum': '$Bad' },        						
        						 'total': { '$sum': 1 }
    				}}					
					];


    if(qry){_agg.unshift(qry)}                    
    this.aggregate(_agg,cb)
}

RoadsSchema.statics.getcarriagewayperconlength =  function(qry,cb){
    var _agg = [{ '$unwind': '$RoadCarriageway' },
                            { '$group': {
                                            '_id': '$_id',
                                            'Good': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SegmentCon', 'G' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Poor': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SegmentCon', 'P' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Fair': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SegmentCon', 'F' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'New': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SegmentCon', 'N' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Bad': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SegmentCon', 'B' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            }																
                                        }
                            },
                            {
                            '$group': {
                                            '_id': '',
                                            'Good': { '$sum': '$Good' },
                                            'Poor': { '$sum': '$Poor' },
                                            'Fair': { '$sum': '$Fair' },
                                            'New': { '$sum': '$New' },
                                            'Bad': { '$sum': '$Bad' },        						
                                            'total': { '$sum': 1 }
                                }
                            }
            ];

    if(qry){_agg.unshift(qry)}                    
    this.aggregate(_agg,cb)
}    

RoadsSchema.statics.getcarriagewaypersurfacelength =  function(qry,cb){
    var _agg = [{ '$unwind': '$RoadCarriageway' },
                            { '$group': {
                                            '_id': '$_id',
                                            'Asphalt': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SurfaceTyp', 'A' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Concrete': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SurfaceTyp', 'C' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Earth': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SurfaceTyp', 'E' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Gravel': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SurfaceTyp', 'G' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            },
                                            'Mixed': {
                                                            '$sum': {
                                                                    '$cond': [{ '$eq': [ '$RoadCarriageway.SurfaceTyp', 'M' ] },'$RoadCarriageway.SegmentLen',0]
                                                                    }
                                                            }																
                                        }
                            },
                            {
                            '$group': {
                                            '_id': '',
                                            'Concrete': { '$sum': '$Concrete' },
                                            'Asphalt': { '$sum': '$Asphalt' },
                                            'Gravel': { '$sum': '$Gravel' },
                                            'Earth': { '$sum': '$Earth' },
                                            'Mixed': { '$sum': '$Mixed' },        						
                                            'total': { '$sum': 1 }
                                }
                            }
            ];

    if(qry){_agg.unshift(qry)}                    
    this.aggregate(_agg,cb)
}    
 
RoadsSchema.statics.getcarriagewaypersurfacecount =  function(qry,cb){

    var _agg = [{$group: { '_id': '$RoadCarriageway.SurfaceTyp', 'SurfaceTyp': { $push: '$RoadCarriageway.SurfaceTyp'}}},
					{'$project':{_id:1,'SurfaceTyp':'$SurfaceTyp'}
					},
					{'$unwind':'$_id'},
					{'$project':
					  			{
								'Concrete':{'$cond':[{'$eq':['C','$_id']},1,0]},
								'Asphalt':{'$cond':[{'$eq':['A','$_id']},1,0]},
								'Gravel':{'$cond':[{'$eq':['G','$_id']},1,0]},
								'Earth':{'$cond':[{'$eq':['E','$_id']},1,0]},
								'Mixed':{'$cond':[{'$eq':['M','$_id']},1,0]}
								}
					},
					{ '$group': {
        						'_id': '',
        						'Concrete': { '$sum': '$Concrete' },
        						'Asphalt': { '$sum': '$Asphalt' },
        						'Gravel': { '$sum': '$Gravel' },
        						'Earth': { '$sum': '$Earth' },
        						'Mixed': { '$sum': '$Mixed' },        						
        						'total': { '$sum': 1 }
    				}}];
     if(qry){_agg.unshift(qry)}              
    this.aggregate(_agg,cb)
}

	



RoadsSchema.statics.getcarriagewaycount =  function(qry,cb){

    var _agg = [
                {
                    "$project": { 
                        segmentcount:{$size:"$RoadCarriageway"}                        
                    }       
                },
                    {"$group":{
                            _id:"",	
                            segmentcount: {$sum:"$segmentcount"}
                            }
                    }
            ]

    if(qry){_agg.unshift(qry)}                    
    this.aggregate(_agg,cb)
};


var _validateData =  function(data,cb){
    if(!data.R_ID){
        cb(false);
    }
    cb(true);
};




RoadsSchema.statics.save =  function(objdata,cb){
    var road = this;
    var _dataOnComplete = [];

    console.log(JSON.stringify(objdata.user));
        
    _validateData(objdata,function(b){
        //console.log(JSON.stringify(objdata));
        if(b){
            road.findOne({"R_ID":objdata.R_ID}).exec(function(err,doc){                    
                    var _pp = {};

                    for(var i=0;i<objdata.data.length;i++){
                          var _row = objdata.data[i];
                            if(_row.table=="road"){
                                _row.rows.forEach(function(d){
                                        doc[d.key] =d.value;                                            
                                });
                                
                                //update date
                                doc.updated_by.name = objdata.user.name;
                                doc.updated_by.email = objdata.user.email; 
                                doc.lastupdate_date = new Date();
                                
                                var _pdx = _dataOnComplete.map(function(d){return d.table}).indexOf("Road");
                                if(_pdx>-1){
                                    _dataOnComplete[_pdx].count+=1;     
                                }else{
                                    _dataOnComplete.push({"table":"road",count:1});
                                }


                            }else{
                                var features = doc[_row.table];
                                _row.rows.forEach(function(d){                                                                                
                                    var fdx = doc[_row.table].map(function(c){return c._id.toString()}).indexOf(d.id);                                                                                
                                        
                                    
                                    if(fdx>-1){ //Update new Features                                                
                                            doc[_row.table][fdx][d.key] = d.value;                                                
                                            //console.log(d.key + " : " +doc[_row.table][fdx][d.key]);    

                                            //temporary for KM Post Geomety
                                            if(_row.table=="RoadLocRefPoints"){
                                                if(d.key=="LONG"){
                                                    doc[_row.table][fdx].geometry.coordinates[0] =d.value; 
                                                }else if(d.key=="LAT"){
                                                    doc[_row.table][fdx].geometry.coordinates[1] = d.value;
                                                }
                                            }
                                            
                                            //Update date
                                            doc[_row.table][fdx].updated_by = {
                                                                                email:objdata.user.email,
                                                                                name:objdata.user.name, 
                                                                             }; 
                                            doc[_row.table][fdx].lastupdate_date = new Date();
                                     }else{ // insert new Features
                                        var _newAttr = {};
                                        if(_row.table=="RoadCarriageway"){
                                            var segmentNumber  = objdata.R_ID + "0001";
                                            if(doc[_row.table].length>0){
                                                segmentNumber = doc[_row.table].sort() [ doc[_row.table].length -1 ];
                                                segmentNumber  = segmentNumber.substring(objdata.R_ID.length,segmentNumber.length);
                                                segmentNumber =  parseInt(segmentNumber)  + 1;
                                                var padStr = "";
                                                for(var i = 0;i< segmentNumber.toString().length ;i++){padStr+="0";}
                                                segmentNumber = objdata.R_ID  + padStr + segmentNumber.toString();  
                                            }    

                                            _newAttr.SegmentID = segmentNumber;                                            
                                        }else if(_row.table=="RoadLocRefPoints"){
                                            _newAttr.geometry = {};
                                            _newAttr.geometry.type = "Point";
                                            _newAttr.geometry.coordinates = [];
                                            _newAttr.geometry.coordinates.push(0.0);;
                                            _newAttr.geometry.coordinates.push(0.0);;
                                            if(d.key=="LONG"){
                                                _newAttr.geometry.coordinates[0] =d.value; 
                                            }else if(d.key=="LAT"){
                                                _newAttr.geometry.coordinates[1] = d.value;
                                            }
                                        }

                                             _newAttr[d.key] =d.value;
                                             _newAttr._id =  new mongoose.mongo.ObjectId(d.id);
                                             _newAttr.R_ID = objdata.R_ID;
                                             
                                             //User logs
                                             _newAttr.created_by = {
                                                email:objdata.user.email,
                                                name:objdata.user.name, 
                                             };
                                             
                                             doc[_row.table].push(_newAttr);
                                     };

                                    var _pdx = _dataOnComplete.map(function(d){return d.table}).indexOf(_row.table);
                                    if(_pdx>-1){
                                        _dataOnComplete[_pdx].count+=1;     
                                    }else{
                                        _dataOnComplete.push({"table":_row.table,count:1});
                                    };                                                                                    
                                });                                    
                                doc.markModified(_row.table);
                            }

                            
                    };
                    
                    doc.save(function(err){
                        cb(err,_dataOnComplete);
                    }) //findone
            }); //validate       
        }//end if
    });
    


};




RoadsSchema.plugin(mongooseAggregatePaginate);
mongoose.model('Roads', RoadsSchema);