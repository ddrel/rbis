'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate'),
  utilities = require("../utils/utilities");


  const RoadsForReviewStruct = {
    identifier:String,
    r_id:String,
    road_name:String,
    road_class:String,
    ref_id:String,
    attr_type:String,
    location:{},
    submit_by:{},    
    status:String,
    submit_date:{type:Date,          
            default: new Date() 
          }
  }

const RoadsForReviewSchema = new Schema(RoadsForReviewStruct,{ collection: 'Roads_ForReview' });



RoadsForReviewSchema.pre('save', function (next) {
  var self = this;
  mongoose.model("Roads_ForReview").find({ref_id : self.ref_id}, function (err, docs) {
      if (!docs.length){
          next();
      }else{                
        mongoose.model("Roads_ForReview").findOneAndRemove({ref_id:self.ref_id},function(err,docs){
            if(err){ next(new Error(err));}else{next()}
        });
      }
  });
});

RoadsForReviewSchema.statics.removefromreview = function(opt,cb){
    this.findOneAndRemove({ref_id:opt.ref_id},function(err,docs){
      if(err){ cb(err,null)}else{cb(null,true)}
    });
}

RoadsForReviewSchema.statics.saveforreview =  function(opt,cb){
    var rfr =  mongoose.model("Roads_ForReview");
    var province = mongoose.model('Provinces');
    var municity = mongoose.model('CityMun');
    var locate = utilities.parseLocation(opt.r_id);

    var loc_promise =  new Promise(function(res,rej){
      var _loc_data = {};
      province.findOne({Code:locate.province_code}).exec(function(err,data){        
        _loc_data.province = data;
        if(err || !data){ rej("province")};
        if(_loc_data.province && (_loc_data.municity || opt.road_class!="City") && !err){res(_loc_data)}

      });

      if(opt.road_class=="City" && locate.municity_code!=""){
        municity.findOne({Code:locate.municity_code}).exec(function(err,data){
          _loc_data.municity = data;
          if(err || !data){ rej("municity")};
          if(_loc_data.province && _loc_data.municity && !err){res(_loc_data)}
          });
      };
    })

    loc_promise.then(function(loc){
      var _data = {};                
        _data.identifier = opt.identifier; 
        _data.r_id = opt.r_id;
        _data.road_name = opt.road_name;
        _data.road_class = opt.road_class;        
        _data.ref_id = opt.ref_id;
        _data.attr_type = opt.attr_type        
        _data.submit_by = opt.submit_by;    
        _data.status = "forreview";

        _data.location = {};
        _data.location.province_code = loc.province.Code;
        _data.location.province_name = loc.province.Name;
        _data.location.municity_code = loc.municity.Code;
        _data.location.municity_name = loc.municity.Name;
        
        new rfr(_data).save(function(err){            
          if(err){cb(err,null);return};
          cb(null,rfr);
        });

    }).catch(function(err){
      console.log("error   " + err);  
      cb({error: "Error in " + err},null);
    });  
  }


RoadsForReviewSchema.statics.getforreview =  function(qry,opt,cb){
  this.paginate(qry, { page: opt.page, limit: opt.limit}, function(err, result) {  
    if(err){cb(err,null);return;}
    cb(null,result);  
  });
}


RoadsForReviewSchema.plugin(mongoosePaginate);
mongoose.model('Roads_ForReview', RoadsForReviewSchema);
   