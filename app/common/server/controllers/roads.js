'use strict';
const mongoose = require('mongoose'),
    moment = require('moment')


const getlocaccess = (req)=>{
       var user = req.user || {};
       if(user.roles.indexOf("SUPER ADMINISTRATOR")>-1 || user.roles.indexOf("ROAD BOARD")>-1){
           return false;
       }else if(user.roles.indexOf("SUPERVISOR")>-1 || user.roles.indexOf("ENCODER")>-1){
           if(user.location.municity!="--" && user.location.municity!==""){
                return {CityMunCod:user.location.municity,R_CLASS:"City"};
           }else{
               return {ProvinceCo:user.location.province,R_CLASS:"Provincial"};               
           };
       }; 

       return false;

}

exports.newRoad =  (req,res)=>{
    var roads = mongoose.model("Roads");
    var _roadAttr = req.body;
    var roadObjData = {};
    var errors = [];
    if(_roadAttr.R_NAME==""){
        errors.push({message:"Road Name Can't be Blank"});
    }else if(!_roadAttr.ProvinceCo ||_roadAttr.ProvinceCo =="" && req.user.roles.indexOf("SUPER ADMINISTRATOR")>-1){
        errors.push({message:"Please specify location"});
    }else if(req.user.roles.indexOf("SUPERVISOR")>-1 || req.user.roles.indexOf("ROAD BOARD")>-1){
        errors.push({message:"No Acess"});
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
        if(err){res.status(500).json(err);return};
        res.status(200).json(data);
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
}

exports.getObjectID = (req,res)=>{
    res.send(mongoose.model("Roads").getObjectID());
}

exports.saveroad = (req,res)=>{
    var roads = mongoose.model("Roads");
    var data = req.body.roaddata;    
        data.user = req.user; 
    roads.save(data,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
}


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



