'use strict';
const mongoose = require('mongoose');
const logs = require('../controllers/roads_logs');
module.exports = (app)=>{
    app.get("/api/logs/getlogs",(req,res)=>{
        logs.getlogs(req,res);
    });
}