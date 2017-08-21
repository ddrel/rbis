'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
   _ = require('lodash');

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
    "RoadBridges" : [Schema.Types.Mixed], 
    "RoadCarriageway" : [Schema.Types.Mixed], 
    "RoadCauseways" : [Schema.Types.Mixed], 
    "RoadCulverts" : [Schema.Types.Mixed], 
    "RoadDitches" : [Schema.Types.Mixed], 
    "RoadGuardrails" : [Schema.Types.Mixed], 
    "RoadHazards" : [Schema.Types.Mixed], 
    "RoadJunctions" : [Schema.Types.Mixed], 
    "RoadLightings" : [Schema.Types.Mixed], 
    "RoadLocRefPoints" : [Schema.Types.Mixed], 
    "RoadMarkings" : [Schema.Types.Mixed], 
    "RoadMedian" : [Schema.Types.Mixed], 
    "RoadPlaceNames" : [Schema.Types.Mixed], 
    "RoadShoulders" : [Schema.Types.Mixed], 
    "RoadSideFriction" : [Schema.Types.Mixed], 
    "RoadSideSlopes" : [Schema.Types.Mixed], 
    "RoadSideWalks" : [Schema.Types.Mixed], 
    "RoadSigns" : [Schema.Types.Mixed], 
    "RoadSpillways" : [Schema.Types.Mixed], 
    "RoadStructures" : [Schema.Types.Mixed],
    "RoadTraffic": [Schema.Types.Mixed],
    "geometry" : Schema.Types.Mixed,
    "created_by":Schema.Types.Mixed,
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
        
    _validateData(objdata,function(b){
        //console.log(JSON.stringify(objdata));
        if(b){
            road.findOne({"R_ID":objdata.R_ID}).exec(function(err,doc){                    
                    var _pp = {};

                    for(var i=0;i<objdata.data.length;i++){
                          var _row = objdata.data[i];
                            if(_row.table=="road"){
                                _row.rows.forEach(function(d){
                                        doc[d.key] = d.value;                                            
                                });

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
                                        if(fdx>-1){                                                
                                            doc[_row.table][fdx][d.key] = d.value;                                                
                                            console.log(d.key + " : " +doc[_row.table][fdx][d.key]);    
                                        };

                                        var _pdx = _dataOnComplete.map(function(d){return d.table}).indexOf(_row.table);
                                        if(_pdx>-1){
                                            _dataOnComplete[_pdx].count+=1;     
                                        }else{
                                            _dataOnComplete.push({"table":_row.table,count:1});
                                        }                                                                                    
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