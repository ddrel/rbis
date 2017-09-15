'use strict';
const mongoose = require('mongoose');
const shapes = require('../controllers/shapes');
module.exports = (app)=>{

app.get("/api/shapes/download/geojson",(req,res)=>{
    shapes.getRoadgeojson(req,res);
});


app.get("/api/shapes/download/kml",(req,res)=>{
    shapes.getRoadKml(req,res);
});
}