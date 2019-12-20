'use strict';
const mongoose = require('mongoose'),
    moment = require('moment'),
    enums = require("../enum/enumarates"),
    utilities = require("../utils/utilities");


const getlocaccess = (req)=>{
       var user = req.user || {};
       if(user.roles.indexOf("SUPER ADMINISTRATOR")>-1){
           return false;
       }else if(user.roles.indexOf("VIEWER REGION")>-1){
            return (user.location.region=="--")?false:{RegionCode:user.location.region};
        }else if(user.roles.indexOf("SUPERVISOR")>-1 || user.roles.indexOf("ENCODER")>-1){
           if(user.location.municity!="--" && user.location.municity!==""){
                return {CityMunCod:user.location.municity,R_CLASS:"City"};
           }else{
               return {ProvinceCo:user.location.province,R_CLASS:"Provincial"};               
           };
       }; 

       return false;
}



exports.getProvinceStatus = (req,res)=>{
    var roads = mongoose.model("Roads");
    var qry = getlocaccess(req);
    

    if(qry.RegionCode){
        qry = {$match: {"R_CLASS":"Provincial","RegionCode":qry.RegionCode}}
    }else if(!qry){
        qry = {$match: {"R_CLASS":"Provincial"}}
    }else if(qry){
        qry = {'$match':qry};
    } 


    roads.getProvinceStatus(qry,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}

exports.getCityStatus = (req,res)=>{
    var roads = mongoose.model("Roads");
    var qry = getlocaccess(req);
    

    if(qry.RegionCode){
        qry = {$match: {"R_CLASS":"City","RegionCode":qry.RegionCode}}
    }else if(!qry){
        qry = {$match: {"R_CLASS":"City"}}
    }else if(qry){
        qry = {'$match':qry};
    } 

    roads.getCityStatus(qry,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}

exports.getProvinceStatusSummary = (req,res)=>{
    var roads = mongoose.model("Roads");
    var qry = getlocaccess(req);
    
    
    if(qry.RegionCode){
        qry = {$match: {"R_CLASS":"Provincial","RegionCode":qry.RegionCode}}
    }else if(!qry){
        qry = {$match: {"R_CLASS":"Provincial"}}
    }else if(qry){
        qry = {'$match':qry};
    } 
    
    roads.getRoadStatusSummary(qry,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}

exports.getCityStatusSummary = (req,res)=>{
    var roads = mongoose.model("Roads");
    var qry = getlocaccess(req);
    

    if(qry.RegionCode){
        qry = {$match: {"R_CLASS":"City","RegionCode":qry.RegionCode}}
    }else if(!qry){
        qry = {$match: {"R_CLASS":"City"}}
    }else if(qry){
        qry = {'$match':qry};
    }  

    roads.getRoadStatusSummary(qry,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}


exports.getPIRStatus = (req,res)=>{
    var roads = mongoose.model("Roads");
    var page = req.query.page || 1;
    var qry = getlocaccess(req);    
    var qry2  = { "status":{$in:["inprogress","returned","pending"]}}; 
    if(qry){
        for(var x in qry){
            qry2[x] = qry[x];
        }
    }

    roads.getPIRStatus(qry2,page,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}


exports.newRoad =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var _roadAttr = req.body;
    var roadObjData = {};
    var errors = [];

    if(_roadAttr.R_NAME==""){
        errors.push({message:"Road Name Can't be Blank"});
    }else if((!_roadAttr.ProvinceCo ||_roadAttr.ProvinceCo =="") && req.user.roles.indexOf("SUPER ADMINISTRATOR")>-1){
        errors.push({message:"Please specify location"});
    }else if(req.user.roles.indexOf("SUPERVISOR")>-1 || req.user.roles.indexOf("ROAD BOARD")>-1){
        errors.push({message:"No Access"});
    };

    

    if(errors.length>0){res.status(500).json(errors);return;}
    for(var k in _roadAttr){
        roadObjData[k] = _roadAttr[k];
    };

    if(req.user.roles.indexOf("ENCODER")>-1){
        roadObjData.CityMunCod = req.user.location.municity.replace("--","");
        roadObjData.ProvinceCo = req.user.location.province.replace("--","");
        roadObjData.R_CLASS = (req.user.location.municity=="--")?"Provincial":"City";
    };

    roadObjData.RegionCode =  roadObjData.ProvinceCo.toString().substring(0,2) + "0000000";
    roadObjData.created_by = {
                               email:req.user.email,
                               name:req.user.name, 
    };

    

    roadObjData.Length  = _roadAttr.Length || 0;
    roads.newRoad(roadObjData,function(err,data){
        console.log(err);
        if(err){res.status(500).json(err);return};
        res.status(200).json(data);
        var _datalogs = {};
            _datalogs.r_id = data.R_ID;
            _datalogs.road_name = data.R_NAME;
            _datalogs.road_class = data.R_CLASS;
            _datalogs.user = {email:req.user.email,location:req.user.location,role: req.user.roles};
            _datalogs.identifier = "road-" + data.R_ID;
            _datalogs.table = "road";
            _datalogs.ref_id = data.R_ID;  
            _datalogs.tag = "data.new";
            _datalogs.data =  {"R_ID" : data.R_ID, 
                                "R_CLASS" : data.R_CLASS, 
                                "R_NAME" : data.R_NAME, 
                                "R_Importan" : data.R_Importan, 
                                "Environmen" : data.Environmen, 
                                "DirFlow" : data.DirFlow, 
                                "Terrain" : data.Terrain, 
                                "Length" : data.Length, 
                                "RROW_usefullife" : data.RROW_usefullife, 
                                "CityMunCod" : data.CityMunCod, 
                                "ProvinceCo" : data.ProvinceCo, 
                                "RegionCode" : data.RegionCode, 
                                "created_by" : data.created_by,
                                "RROW_acq_date": data.RROW_acq_date,
                                "RROW_acq_cost": data.RROW_acq_cost 
                                }
            mongoose.model('Roads_Logs').add(_datalogs);
    });
};

exports.getprovroadshortinfo =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var code = req.query.code;
    roads.getprovroadshortinfo(code,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}

exports.getcitymunroadshortinfo =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var code = req.query.code;
    roads.getcitymunroadshortinfo(code,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
}

exports.getroadattrinfo =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var rid = req.query.rid || "";
    if(rid=="") {res.status(500).json({"error":"no road id supplied"});return}

    roads.getroadattrinfo(rid,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
};

exports.getroadshortattrinfo =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var rid = req.query.rid || "";
    if(rid=="") {res.status(500).json({"error":"no road id supplied"});return}
    roads.getroadshortattrinfo(rid,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
};

exports.getroadattr = (req,res)=>{
    var roads = mongoose.model("Roads");
    var rid = req.query.rid || "";
    var attr = req.query.attr || "";
    if(rid=="") {res.status(500).json({"error":"no road id supplied"});return}
    if(attr=="") {res.status(500).json({"error":"no attribute supplied"});return} 
    roads.getroadattr(rid,attr,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
};

exports.getroadattrbyid = (req,res)=>{
    var roads = mongoose.model("Roads");
    var opt = {};
        opt.r_id = req.query.r_id || "";
        opt.attr = req.query.attr || "";
        opt.id = req.query.attr_id || "";

    if(opt.r_id=="") {res.status(500).json({"error":"no road id supplied"});return}
    if(opt.attr=="") {res.status(500).json({"error":"no attribute supplied"});return} 
    if(opt.id=="") {res.status(500).json({"error":"no id supplied"});return} 
    roads.getroadattrbyid(opt,function(err,docs){
        if(err){res.status(500).json(err);return};
        res.status(200).json(docs);
    })
};



exports.getroadaggmain = (req,res)=>{
    var roads = mongoose.model("Roads");
    var qryStr = req.query.qry;
    var page= req.query.page || 1;
    var limit= req.query.limit || 10;
    var fordisplay = req.query.fordisplay || false;

    var rname = new RegExp(qryStr,'i'),rid = new RegExp(qryStr,'i'); 
    
    var a_qry = getlocaccess(req);
    var qry  = false;
    
    //terrible condition

    if(!a_qry || fordisplay){            
                if(qryStr){qry  = {$or:[{"R_NAME":rname},{"R_ID":rid}]};}
    }else {
            if(qryStr){
                    qry = {$or:[{"R_NAME":rname},{"R_ID":rid}],$and:[a_qry]};
            }else{
                    qry = a_qry;
            }
                
    }

    roads.getroadaggmain(qry,page,limit,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    })
}


exports.getroadlengthtotal = (req,res)=>{
    var roads = mongoose.model("Roads");
    
    var qry = getlocaccess(req);
    if(qry){qry = {'$match':qry};}

    console.log(qry);

    roads.getroadlengthtotal(qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
}

exports.getbridgelengthtotal = (req,res)=>{
    var roads = mongoose.model("Roads");

    var qry = getlocaccess(req);
    if(qry){qry = {'$match':qry};}
    
    roads.getbridgelengthtotal(qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
}


exports.getcarriagewayperconcount = (req,res)=>{
    var roads = mongoose.model("Roads");
    var _qry = req.query.qry || false;
    
    var a_qry = getlocaccess(req);
    if(_qry){_qry = {'$match':{R_ID: _qry}};}
    if(!_qry && a_qry){_qry  = {'$match':a_qry};}

    roads.getcarriagewayperconcount(_qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
}


exports.getcarriagewayperconlength = (req,res)=>{
    var roads = mongoose.model("Roads");
    var _qry = req.query.qry || false;
    
    var a_qry = getlocaccess(req);
    if(_qry){_qry = {'$match':{R_ID: _qry}};}
    if(!_qry && a_qry){_qry  = {'$match':a_qry};}

    roads.getcarriagewayperconlength(_qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
}

exports.getcarriagewaypersurfacelength = (req,res)=>{
    var roads = mongoose.model("Roads");
    var _qry = req.query.qry || false;
    
    var a_qry = getlocaccess(req);
    if(_qry){_qry = {'$match':{R_ID: _qry}};}
    if(!_qry && a_qry){_qry  = {'$match':a_qry};}

    roads.getcarriagewaypersurfacelength(_qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
};

exports.getcarriagewaypersurfacecount = (req,res)=>{
    var roads = mongoose.model("Roads");
    var _qry = req.query.qry || false;

    var a_qry = getlocaccess(req);
    if(_qry){_qry = {'$match':{R_ID: _qry}};}
    if(!_qry && a_qry){_qry  = {'$match':a_qry};}

    roads.getcarriagewaypersurfacecount(_qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
};

exports.getcarriagewaycount = (req,res)=>{
    var roads = mongoose.model("Roads");
    var _qry = req.query.qry || false;

    var a_qry = getlocaccess(req);
    if(_qry){_qry = {'$match':{R_ID: _qry}};}
    if(!_qry && a_qry){_qry  = {'$match':a_qry};}


    roads.getcarriagewaycount(_qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data[0]);
    });
};

exports.getObjectID = (req,res)=>{
    res.send(mongoose.model("Roads").getObjectID());
};

exports.saveroad = (req,res)=>{
    var roads = mongoose.model("Roads");
    var data = req.body.roaddata;    
        data.user = req.user; 
    roads.save(data,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
};


exports.deleteroadcomponent = (req,res)=>{
    var roads = mongoose.model("Roads");
    var opt = {};            
        opt.r_id = req.query.r_id    
        opt.attr_id = req.query.attr_id;
        opt.key_name = req.query.key_name; 
    roads.deleteRoadComponent(opt,function(err,data,component){
        if(err){res.status(500).json(err);return;};
        //logs
        var logopt = {};                
        logopt.identifier = utilities.getattribdisplay(component,opt.key_name)
        logopt.r_id = data.R_ID;
        logopt.road_name = data.R_NAME;
        logopt.road_class = data.R_CLASS;
        logopt.ref_id = opt.attr_id;
        logopt.table = opt.key_name
        logopt.tag = enums.logsTag["data.delete"];
        logopt.user = {email:req.user.email,location:req.user.location,role: req.user.roles};
        logopt.data = component;               

        mongoose.model('Roads_Logs').add(logopt);  
        //deleted data

        var delOpt = {};
        delOpt.r_id = data.R_ID;
        delOpt.attr_type = opt.key_name;
        delOpt.identifier =  utilities.getattribdisplay(data,opt.key_name);
        delOpt.ref_id =  component._id;
        delOpt.OrigData = component;
        delOpt.user = {email:req.user.email,location:req.user.location,role: req.user.roles};

        mongoose.model("Roads_Deleted_Component").save(delOpt);
        res.status(200).json(data);
    });
    
}



exports.addRoadRemarks = (req,res)=>{
    var roads = mongoose.model("Roads");
    var opt = {};
        opt.r_id = req.body.r_id;
        opt.attr_id = req.body.attr_id;
        opt.key_name = req.body.key_name;
        
        opt.status = req.body.status || "";
        opt.message = req.body.message || "";
        if(!opt.r_id && opt.key_name   && !opt.attr_id && !req.user && opt.message!=""){res.status(500).send("Error Saving Remarks");return;};
        if(req.user.roles.indexOf("ROAD BOARD")>-1 || req.user.roles.indexOf("COA")>-1){
            res.status(500).send("Error Saving Access");return;
        };

        if(req.user.roles.indexOf("SUPERVISOR")>-1 && (opt.status.toLowerCase()=="forreview" || opt.status.toLowerCase()=="inprogress")){
            res.status(500).send("Error Saving Access");return;
        }

        if(opt.status==""){res.status(500).send("Error Status Value");return;};

        opt.remark_by = req.user.name;
        opt.remark_by_email = req.user.email;
        opt.message = opt.message.substring(0,300);

        roads.addRoadRemarks(opt,function(err,data){
            if(err){res.status(500).json(err);return;};
            //set for review   
            //  || opt.status.toLowerCase()=="inprogress"
                    
            var logopt = {};                
            logopt.identifier = req.body.identifier;
            logopt.r_id = opt.r_id;
            logopt.road_name = req.body.r_name;
            logopt.road_class = req.body.r_class;
            logopt.ref_id = opt.attr_id;
            logopt.table = opt.key_name            
            logopt.user = {email:req.user.email,location:req.user.location,role: req.user.roles};
            logopt.data = {message:opt.message};
            
        
            if(opt.status.toLowerCase()=="forreview"){
                var optreview = {};
                optreview.identifier = req.body.identifier;
                optreview.r_id = opt.r_id;
                optreview.road_name = req.body.r_name;
                optreview.road_class= req.body.r_class;
                optreview.ref_id = opt.attr_id;
                optreview.attr_type = opt.key_name;
                optreview.submit_by = {name:req.user.name,email:req.user.email};    
                optreview.status = opt.status;
                
                mongoose.model("Roads_ForReview").saveforreview(optreview,function(err,data){
                    if(err){res.status(500).send(err);return;}
                    //Save remarks                    
                    res.status(200).json(data);       
        
                    logopt.tag = enums.logsTag["status.forreview"];
                    mongoose.model('Roads_Logs').add(logopt);

                });
            }else if(opt.status.toLowerCase()=="validated"){            
                        var optvalidated = {};
                        optvalidated.id = req.body.id;
                        optvalidated.validated_by = {name:req.user.name,email:req.user.email};   
                        mongoose.model("Roads_Validated").savevalidated(optvalidated,function(err,data){
                            if(err){res.status(500).json(err);return;};
                            res.status(200).json(data);
                            logopt.tag = enums.logsTag["status.validated"];
                            mongoose.model('Roads_Logs').add(logopt);
                        });
            }else if(opt.status.toLowerCase()=="returned"){
                var prm =  new Promise(function(res,rej){
                                        var _err = [],a=false,b=false;
                                        mongoose.model("Roads_ForReview").findOneAndRemove({ref_id:opt.attr_id},function(err,docs){
                                            if(err){ _err.push(err)};
                                            a=true;
                                            if(_err.length==2){rej({error:_err})}
                                            if(a && b) res({err:_err,status:true});
                                        });            
                                        mongoose.model("Roads_Validated").removeroadvalidated({ref_id:opt.attr_id},function(err,data){
                                            if(err){ _err.push(err)};
                                            b=true;    
                                            if(_err.length==2){rej({error:_err})};
                                            if(a && b) res({err:_err,status:true});
                                        });
                                });

                    prm.then(function(a,b){
                        res.status(200).json({err:a,data:data});
                        //logs
                        logopt.tag = enums.logsTag["status.returned"];
                        mongoose.model('Roads_Logs').add(logopt);
                    }).catch(function(a){
                        res.status(500).json({err:a});
                    })                                
            }else{ // inprogress || pending
                res.status(200).json(data);                

                logopt.tag = opt.status.toLowerCase()=="pending"?enums.logsTag["status.pending"]:enums.logsTag["status.inprogress"];  
                mongoose.model('Roads_Logs').add(logopt);

            }; //end if status checking
        });
};

exports.getRoadRemarks = (req,res)=>{

    var roads = mongoose.model("Roads");
    var opt = {};
        opt.r_id = req.query.r_id;
        opt.key_name = req.query.key_name;
        opt.attr_id = req.query.attr_id;
        if(!opt.r_id && !opt.key_name && !attr_id){res.status(500).send("Error Saving Remarks");return;};


        roads.getRoadRemarks(opt,function(err,data){
            if(err){res.status(500).json(err);return;};
            res.status(200).json(data);
        });
};

exports.getRoadImages =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var opt = {};
        opt.r_id = req.query.r_id;
        opt.key_name = req.query.key_name;
        opt.attr_id = req.query.attr_id;
    roads.getRoadImages(opt,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
}


exports.getRoadFile =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var opt = {};
        opt.r_id = req.query.r_id;
        opt.key_name = req.query.key_name;
        opt.attr_id = req.query.attr_id;
    roads.getRoadFile(opt,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
}


exports.getRoadByLocation =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var opt = {};
    opt.location = req.query.location;
    opt.r_class = req.query.r_class || "";
    
    if(opt.location=="" || opt.r_class==""){
        if(err){res.status(500).json(err);return;};
    }


    roads.getRoadByLocation(opt,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
}


exports.summaryroadreport = (req,res)=>{
    var roads = mongoose.model("Roads");
    var _qry = {};

    var a_qry = getlocaccess(req);    
    if(a_qry){_qry  =a_qry} // {'$match':
    else{
            var field = req.query.hasOwnProperty("CityMunCod")?"CityMunCod":"ProvinceCo";                     
            if(req.query.class==""){res.status(500).send("error query");return;};            
            
            var opt = {};
            var kfieldvalue = field=="ProvinceCo"? req.query.location : req.query[field];
            opt[field] = kfieldvalue;       
             if(req.query.class!="all"){
                opt.R_CLASS = req.query.class;
             };
             

            //_qry  = {'$match':opt};
            _qry  = opt;                   
    }

    roads.summaryroadreport(_qry,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    })

}

/*
exports.clenupdata = (req,res)=>{
    console.log("---------------------------------");
    var roads = mongoose.model("Roads");
    roads.find({"$where":"this.RoadCarriageway.length>0"}, '_id', function(err, docs){ //find({}).select("_id").exec(function(err,docs){
        var i=0;
        //console.log("Length: " + docs.length)
        var ddcs = docs;
        var _recursiveSave =  function(ddf,index){
            //console.log(ddf.length);
            if(index > ddf.length-1) return;
            var dd = ddf[index];
            //console.log(dd._id);
            roads.findOne({_id:dd._id}).exec(function(err,docsRD){
                //console.log(docsRD.RoadCarriageway.length);
                if(err){
                    console.log(err);
                };
                if(docsRD.RoadCarriageway.length>0){
                        docsRD.RoadCarriageway.forEach(function(rd){

                                                        
                            if(!moment(rd.DateOfLast, "YYYY-MM-DDTHH:mm:ss", false).isValid()){
                                 rd.DateOfLast=undefined;                                 
                            }else{
                                rd.DateOfLast=new Date(rd.DateOfLast);
                            };

                            if(!isNaN(rd.YearOfReco)){
                                 rd.YearOfReco=undefined;
                            }else{
                                rd.YearOfReco = isNaN(parseInt(rd.YearOfReco))?undefined: parseInt(rd.YearOfReco);
                            };

                        });

                        docsRD.markModified("RoadCarriageway");
                        docsRD.save(function(err){
                             console.log("Save >>>> " + dd._id + "    "+ index + "   count: " + docsRD.RoadCarriageway.length);                                                        
                            _recursiveSave(ddf, (index + 1) );

                        });
                    };                                    
            });
        }

        _recursiveSave(ddcs,0);
    });
    res.send("done");    
}
*/



