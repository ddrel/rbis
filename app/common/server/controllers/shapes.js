'use strict';
const mongoose = require('mongoose');


exports.getRoadgeojson =  (req,res)=>{
    var roads =  mongoose.model("Roads");

    var opt = {};
        opt.r_id = req.query.r_id;
        opt.key_name = req.query.key_name;
        opt.attr_id = req.query.attr_id;

    if(!opt.r_id && !opt.key_name && !opt.attr_id){
        res.status(500).send("error");
        return;
    }

    roads.getRoadgeojson(opt,function(err,data){
        if(err){res.status(500).json(err);return;};     
        var _fn =  opt.key_name + "-" + opt.r_id + "-" + opt.attr_id  + ".geojson";
        res.writeHead(200, {'Content-Type': 'application/json',
        "Content-Disposition" : "attachment; filename=" +_fn});    
        res.write(JSON.stringify(data));
        res.end();
    })

    
}

exports.getRoadKml =  (req,res)=>{
    var roads =  mongoose.model("Roads");
    
        var opt = {};
            opt.r_id = req.query.r_id;
            opt.key_name = req.query.key_name;
            opt.attr_id = req.query.attr_id;
    
        if(!opt.r_id && !opt.key_name && !opt.attr_id){
            res.status(500).send("error");
            return;
        }
    
        roads.getRoadKml(opt,function(err,data){
            if(err){res.status(500).json(err);return;};     
            var _fn =  opt.key_name + "-" + opt.r_id + "-" + opt.attr_id  + ".kml";   
            res.writeHead(200, {'Content-Type': 'application/vnd.google-earth.kml+xml',
            "Content-Disposition" : "attachment; filename=" +_fn});    
            res.write(data);
            res.end();
        });

}



