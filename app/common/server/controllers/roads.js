'use strict';
const mongoose = require('mongoose');


const getlocaccess = (req)=>{
       var user = req.user || {};
       if(user.roles.indexOf("SUPER ADMINISTRATOR")>-1 || user.roles.indexOf("ROAD BOARD")>-1){
           return false;
       }else if(user.roles.indexOf("SUPERVISOR")>-1 || user.roles.indexOf("ENCODER")>-1){
           if(user.location.municity!="--" && user.location.municity!==""){
                return {CityMunCod:user.location.municity,R_CLASS:"City"};
           }else{
               return {ProvinceCo:user.location.province};               
           };
       }; 

       return false;

}


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

exports.saveroad = (req,res)=>{
    var roads = mongoose.model("Roads");
    var data = req.body.roaddata;    
    roads.save(data,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
}






