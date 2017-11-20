'use strict';
const mongoose = require('mongoose'),
    utilities = require("../utils/utilities");

exports.getregionprovince =  (req,res)=>{
    var region = mongoose.model("Regions");        
        region.getregionprovince(function(err,data){
                    res.status(200).json(data);
        });
}


exports.getmunicity = (req,res)=>{
       var citymuni = mongoose.model("CityMun");        
       var _code = req.query.code; 
        citymuni.getmunicity(_code,function(err,data){
            if(err) {res.status(500).json(err); return;}             
            res.status(200).json(data);
        }); 
}


exports.getlocfromrid = (req,res)=>{
    var r_id =  req.query.rid || "";    
    var locate = utilities.parseLocation(r_id);

    if(req.query.rid==""){
        res.status(500).send("Error");
        return;
    }


    var _location = {};
    _location.CityMun = {};
    _location.Province = {};
    _location.Region = {};

    var _resp= function(a,b,c){
        if(a && b && c){
            return  res.status(200).json(_location);
        }
    }
    var a=false,b=false,c=false;
    if(locate.municity_code!=""){
        mongoose.model("CityMun").findOne({Code:locate.municity_code}).exec(function(err,data){
            a=true;
            if(!err && data){
                _location.CityMun.code = data.Code || ""
                _location.CityMun.name = data.Name || ""
            }
            return _resp(a,b,c);
        });
    }else{
        a=true;
    }
    

    mongoose.model("Provinces").findOne({Code:locate.province_code}).exec(function(err,data){
        b=true;
        if(!err && data){
            _location.Province.code = data.Code || ""
            _location.Province.name = data.Name || ""
        }
        return _resp(a,b,c);
    });

    mongoose.model("Regions").findOne({Code:locate.region_code}).exec(function(err,data){
        c=true;
        if(!err && data){
            _location.Region.code = data.Code || ""
            _location.Region.name = data.Name || ""
        }
        return _resp(a,b,c);
    });

    
    
    

}