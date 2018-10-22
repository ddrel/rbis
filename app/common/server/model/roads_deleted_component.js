'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate'),
  utilities = require("../utils/utilities");


  const Roads_DeletedComponent = {
    r_id:String,
    attr_type:String,
    identifier:String,
    ref_id:Schema.Types.ObjectId,
    OrigData: Schema.Types.Mixed,
    user:Schema.Types.Mixed,    
    deleted_date:{type:Date,default:new Date() }
  }

const Roads_DeletedComponentSchema = new Schema(Roads_DeletedComponent,{ collection: 'Roads_Deleted_Component' });

Roads_DeletedComponentSchema.statics.save =  function(opt,cb){
    var rd = mongoose.model("Roads_Deleted_Component");
    new rd(opt).save(function(err){
        if (cb) cb(err);
    });
}


Roads_DeletedComponentSchema.plugin(mongoosePaginate);
mongoose.model('Roads_Deleted_Component', Roads_DeletedComponentSchema);




