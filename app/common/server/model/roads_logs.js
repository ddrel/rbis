'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require('mongoose-paginate'),
  utilities = require("../utils/utilities"),
  enumObj = require("../enum/enumarates"),
  datamodel = require("../enum/datamodel")


  const RoadsLogstruct = {
    identifier:String,
    r_id:String,
    road_name:String,
    road_class:String,
    ref_id:String,
    table:String,
    user:{},
    data:Schema.Types.Mixed,
    tag: String,
    transaction_date: {
                       type: Date,
                       default: Date.now
    }
  }

const RoadsLogsSchema = new Schema(RoadsLogstruct,{ collection: 'Roads_Logs' });




RoadsLogsSchema.statics.add =  function(opt,cb){
    var rl =  mongoose.model('Roads_Logs');          

    //console.log(JSON.stringify(opt));    
    //console.log(rl);
    new rl(opt).save(function(err){        
            if(err){if(cb)cb(err,null)}
            else{if(cb)cb(null,opt)};
    });
    
  }

var logstextstatus  = function(b,table){
  var  _text = ""; 
  if(enumObj.logsTag[b] == "data.update"){_text=`update ${table}`}
  else if(enumObj.logsTag[b] == "data.new"){_text=`created new ${table}`}
  else if(enumObj.logsTag[b] == "shapes.importnew"){_text=`import new shapes to ${table}`}
  else if(enumObj.logsTag[b] == "shapes.importupdate"){_text=`update shapes from ${table}`}
  else if(enumObj.logsTag[b] == "media.uploadimage"){_text=`upload image(s) to ${table}`}       
  else if(enumObj.logsTag[b] == "media.deleteimage"){_text=`delete image from ${table}`}       
  else if(enumObj.logsTag[b] == "media.uploadattachment"){_text=`upload attachment to ${table}`}
  else if(enumObj.logsTag[b] == "media.deleteattachment"){_text=`delete attachment from ${table}`}
  else if(enumObj.logsTag[b] == "status.inprogress"){_text=`set status of ${table} to in 'progress'`}
  else if(enumObj.logsTag[b] == "status.pending"){_text=`set status of ${table} to 'pending'`}
  else if(enumObj.logsTag[b] == "status.forreview"){_text=`change status of ${table} to 'for review'`}
  else if(enumObj.logsTag[b] == "status.returned"){_text=`change status of ${table} to 'returned'`}
  else if(enumObj.logsTag[b] == "status.validated"){_text=`change status of ${table} to 'validated'`}
  else if(enumObj.logsTag[b] == "remarks.add"){_text=`add remark to ${table}`}

  return _text;
}

var builddata =  function(o){
  var keyvalue = [];
  var table = datamodel[o.table];
  if(!table) return [];
  if(["media.uploadimage","media.deleteimage","media.uploadattachment","media.deleteattachment"].indexOf(o.tag)>-1){
    for(var k in o.data){if(k=="name" || k=="mime"){keyvalue.push({key:k,value:o.data[k]})};}
  }else if (["status.inprogress","status.pending","status.forreview","status.returned","status.validated"].indexOf(o.tag)>-1){
    keyvalue.push({key:"Message",value:o.data.message});
  }else if(["data.new"].indexOf(o.tag)>-1 && o.table=="road"){
    for(var k in o.data){     
      if(k!=="created_by" && table[k]){
        var v = utilities.modelgetvalue(table[k],o.data);
        keyvalue.push({key:table[k].label || "Field",value:v })
      }
    }
  }else if(["data.update"].indexOf(o.tag)>-1 && o.table=="road"){
    o.data.forEach(function(d){
      for(var k in d){          
        if(table[k]){
            var v = utilities.modelgetvalue(table[k],d);          
            keyvalue.push({key:table[k].label,value:v})
          };
      }
    })
  }
  else if(["data.update","data.new"].indexOf(o.tag)>-1 &&  o.table!="road"){
      o.data.forEach(function(d){
        for(var k in d){          
          if(table[k]){
              var v = utilities.modelgetvalue(table[k],d);          
              keyvalue.push({key:table[k].label,value:v})
            };
        }
      });
  }

  return keyvalue;
};
var buildLogs =  function(data) {
  var _dta = {};
      _dta.date = data.transaction_date;
      _dta.email = data.user.email; 
      _dta.text = logstextstatus(data.tag,data.identifier || data.r_id) + " from " + enumObj.tableName[data.table]
      _dta.data = data?builddata(data) : [];
  return _dta;

}



RoadsLogsSchema.statics.getLogs =  function(qry,opt,cb){
  this.paginate(qry, { page: opt.page, limit: opt.limit,sort:{"transaction_date": -1}}, function(err, result) {  
    if(err){cb(err,null);return;}
      var _logsdata = [];

      result.docs.forEach(function(data){
          _logsdata.push(buildLogs(data));
      })

      result.docs = _logsdata;
    
    cb(null,result);  
  });
  
}

RoadsLogsSchema.plugin(mongoosePaginate);
mongoose.model('Roads_Logs', RoadsLogsSchema);





