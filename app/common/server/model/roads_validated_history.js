'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate'),
  utilities = require("../utils/utilities");


  const RoadsValidateHistorystruct = {
    identifier:String,
    r_id:String,
    road_name:String,
    road_class:String,
    ref_id:String,
    attr_type:String,
    location:{},
    submit_by:{},
    validated_by:{},        
    validated_date:{type:Date,default:new Date() },
    data_value:Schema.Types.Mixed
  }

const RoadsValidatedHistorySchema = new Schema(RoadsValidateHistorystruct,{ collection: 'Roads_Validated_History' });

RoadsValidatedHistorySchema.statics.savevalidatedhistory =  function(opt,cb){        
  var rvh = mongoose.model("Roads_Validated_History");
  var Roads = mongoose.model("Roads");
  var _data = {};
  _data.identifier = opt.identifier; 
  _data.r_id = opt.r_id;
  _data.road_name = opt.road_name;
  _data.road_class = opt.road_class;        
  _data.ref_id = opt.ref_id;
  _data.attr_type = opt.attr_type        
  _data.submit_by = opt.submit_by;
  _data.validated_by = opt.validated_by;            
  _data.location = opt.location;
  
  var optr = {};
  optr.r_id = _data.r_id;
  optr.attr_id = _data.ref_id;
  optr.key_name = _data.attr_type;

  Roads.getRoadDataOnly(optr,function(err,data){
    _data.data_value = data;
    console.log(_data.data_value);
    new rvh(_data).save(function(err){
        cb(err,rvh);
    });
  });
}


RoadsValidatedHistorySchema.statics.getroadvalidatedhistory =  function(qry,opt,cb){
this.paginate(qry, { page: opt.page, limit: opt.limit}, function(err, result) {  
 if(err){cb(err,null);return;}
 cb(null,result);  
});
}


RoadsValidatedHistorySchema.plugin(mongoosePaginate);
mongoose.model('Roads_Validated_History', RoadsValidatedHistorySchema);