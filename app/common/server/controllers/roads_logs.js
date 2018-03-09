'use strict';
const mongoose = require('mongoose'),
utilities = require("../utils/utilities");

exports.getlogs =  (req,res)=>{
    let opt = {};
        opt.page= req.query.page || 1;
        opt.limit= req.query.limit || 5;        
    let qry = utilities.getlocaccess(req.user);

    mongoose.model("Roads_Logs").getLogs(qry,opt,function(err,data){
        if(err){res.status(500).json(err);return;};
        res.status(200).json(data);
    });
}