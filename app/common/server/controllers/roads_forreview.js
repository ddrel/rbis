'use strict';
const mongoose = require('mongoose');


var _validateReq =  function(req){
    var opt = req.body || {};
    if(!opt.r_id || !opt.road_class  || opt.ref_id || opt.attr_type || !req.user){
        cb("Error Saving FOr Review",null);
    };

    if(req.user.roles.indexOf("SUPERVISOR")>-1 || req.user.roles.indexOf("VIEWER REGION")>-1 || req.user.roles.indexOf("COA")>-1){
        cb("Error access",null);
    };

    cb(null,true);
}

exports.saveforreview =  (req,res)=>{
    var opt = req.body;
    _validateReq(req,function(err,done){
        if(err){res.status(500).send(err);return;}
        mongoose.model("Roads_ForReview").saveforreview(opt,function(err,data){
            if(err){res.status(500).send(err);return;}
            res.status(200).json(data);
        });
    });
};


exports.removefromreview = (req,res)=>{
    var opt = req.body || req.query || {};
    if(!opt.ref_id  || req.user.roles.indexOf("ENCODER")>-1 || req.user.roles.indexOf("VIEWER REGION")>-1 || req.user.roles.indexOf("COA")>-1){
        res.status(500).send("Error removing for review");return;
    };

    mongoose.model("Roads_ForReview").removefromreview(opt,function(err,data){
        if(err){res.status(500).send(err);return;}
        res.status(200).json({sucess:true});
    });
}


exports.getforreview = (req,res)=>{
    var qry = {};
    var opt = {};   
    opt.page = parseInt(req.query.page || 1);
    opt.limit = parseInt(req.query.limit || 10);

    if(req.user.roles.indexOf("ROAD BOARD")>-1 || req.user.roles.indexOf("COA")>-1){
        res.status(500).send("Error Access");return;
    };

    if(req.user.roles.indexOf("SUPERVISOR")>-1){
        if(req.user.location.municity!="--" && req.user.location.municity!==""){
            qry = {"location.municity_code":req.user.location.municity,road_class:"City"};
        }else{
            qry =  {"location.province_code":req.user.location.province,road_class:"Provincial"};               
        };
    }; 

    if(req.user.roles.indexOf("VIEWER REGION")>-1){
        if(req.user.location.region!="--"){        
            var search = req.user.location.region.substring(0,2),
            rgx = new RegExp("^"+search)
            //console.log(rgx);
            qry =  {"location.province_code":rgx};
        };
    }
    
    if(req.user.roles.indexOf("ENCODER")>-1){
        qry = {"submit_by.email":req.user.email};
    }


    mongoose.model("Roads_ForReview").getforreview(qry,opt,function(err,data){
        if(err){res.status(500).send(err);return;}
        res.status(200).json(data);
    });   
}