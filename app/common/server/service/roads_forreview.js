'use strict';
const mongoose = require('mongoose');
const roadforreview = require('../controllers/roads_forreview');
module.exports = (app)=>{

app.post("/api/road_forreview/saveforreview",(req,res)=>{
    roadforreview.saveforreview(req,res);
});

app.delete("/api/road_forreview/removefromreview",(req,res)=>{
    roadforreview.removefromreview(req,res);
});

app.get("/api/road_forreview/getforreview",(req,res)=>{
    roadforreview.getforreview(req,res);
});

}