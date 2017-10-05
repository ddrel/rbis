'use strict';
const mongoose = require('mongoose');
const roadsvalidated = require('../controllers/roads_validated');
module.exports = (app)=>{



app.delete("/api/road_validated/removefromvalidated",(req,res)=>{
    roadsvalidated.removefromreview(req,res);
});

app.get("/api/road_validated/getroadvalidated",(req,res)=>{
    roadsvalidated.getroadvalidated(req,res);
});

}