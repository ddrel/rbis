'use strict';
const user = require("../controllers/user");
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;
module.exports = (app)=>{
    app.get("/login",(req,res)=>{
                 if(req.user){
                        res.redirect("/");
                 }else{
                        res.render("login");
                 }                                   
                
    });

   /*     
    app.get("/register",(req,res)=>{
            res.render("register");
    });
        
    */    
    
}