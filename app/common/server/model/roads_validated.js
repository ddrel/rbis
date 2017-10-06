'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate'),
  utilities = require("../utils/utilities");


  const RoadsValidatedtruct = {
    identifier:String,
    r_id:String,
    road_name:String,
    road_class:String,
    ref_id:String,
    attr_type:String,
    location:{},
    submit_by:{},
    validated_by:{},        
    validated_dated:{type:Date,          
            default:new Date() 
          }
  }

const RoadsValidatedSchema = new Schema(RoadsValidatedtruct,{ collection: 'Roads_Validated' });

RoadsValidatedSchema.pre('save', function (next) {
    var self = this;
    mongoose.model("Roads_Validated").find({ref_id : self.ref_id}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
          mongoose.model("Roads_Validated").findOneAndRemove({ref_id:self.ref_id},function(err,docs){
              if(err){ next(new Error(err));}else{next()}
          });
        }
    });
  });

 
RoadsValidatedSchema.statics.savevalidated =  function(opt,cb){        
     var  Roads_ForReview = mongoose.model("Roads_ForReview");
     var rv = mongoose.model("Roads_Validated");
     var rvh = mongoose.model("Roads_Validated_History");
     var Roads = mongoose.model("Roads");

     Roads_ForReview.findOne({_id:opt.id}).exec(function(err,data){
        if(err ||!data){cb(err || "error",null);return};
        var _data = {};                
        _data.identifier = data.identifier; 
        _data.r_id = data.r_id;
        _data.road_name = data.road_name;
        _data.road_class = data.road_class;        
        _data.ref_id = data.ref_id;
        _data.attr_type = data.attr_type        
        _data.submit_by = data.submit_by;
        _data.validated_by = opt.validated_by;            
        _data.location = data.location;     

        Roads_ForReview.findOneAndRemove({_id:opt.id},function(err,docs){
            if(err){cb(err || "error",null);return};
            
            new rv(_data).save(function(err){            
                if(err){cb(err,null);return};



                
                var optr = {};
                optr.r_id = data.r_id;
                optr.status = "validated";
                optr.attr_id = data.ref_id;
                optr.key_name = data.attr_type;
        
                
            
                Roads.updateStatus(optr,function(err,data){
                    cb(err,rv);
                });

                //forget and save
                rvh.savevalidatedhistory(_data,function(err,data){});
              });
        });

    });  
  }


RoadsValidatedSchema.statics.removeroadvalidated =  function(opt,cb){
    this.findOneAndRemove({ref_id:opt.ref_id},function(err,docs){
        cb(err,docs);
    });
  }


RoadsValidatedSchema.statics.getroadvalidated =  function(qry,opt,cb){
  this.paginate(qry, { page: opt.page, limit: opt.limit}, function(err, result) {  
    if(err){cb(err,null);return;}
    cb(null,result);  
  });
}


RoadsValidatedSchema.plugin(mongoosePaginate);
mongoose.model('Roads_Validated', RoadsValidatedSchema);





