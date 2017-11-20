'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
   _ = require('lodash');

// Barangay Schema
const BrgySchema = new Schema({
    "ProvinceID" : Number, 
    "RegionCode" : String, 
    "Code" : String, 
    "Name" : String, 
    "StatusID" : String, 
    "RowID" : Number
},{ collection: 'Brgy' });

// City Municipality Schema
const CityMunSchema = new Schema({
    "CityMunID" : Number, 
    "ProvinceCode" : String, 
    "Code" : String, 
    "Name" : String, 
    "StatusID" : String, 
    "ClassID" : String, 
    "RowID" : Number
},{ collection: 'CityMun' });

// Province  Schema
const ProvincesSchema = new Schema({
    "ProvinceID" : Number, 
    "RegionCode" : String, 
    "Code" : String, 
    "Name" : String, 
    "StatusID" : String, 
    "RowID" : Number
},{ collection: 'Provinces' });


// Region  Schema
const RegionsSchema = new Schema({
    "RegionID" : Number, 
    "Code" : String, 
    "Name" : String, 
    "StatusID" : String, 
    "GLat" : String, 
    "GLong" : String, 
    "RowID" : Number
},{ collection: 'Regions' });

RegionsSchema.set('toJSON', { getters: true, virtuals: true });
RegionsSchema.statics.getregionprovince =  function(cb){
        var province = mongoose.model('Provinces');
        var _treedata = [];
        this.find({}).sort({"Name": 1}).exec(function(err1,regions){     
            if(err1) return cb(err1,null);       
            var _index = 0;
            regions.forEach(function(region){
                var r  =  JSON.stringify(region);
                    r = JSON.parse(r);
                    r.provinces = [];

                mongoose.model("Roads").aggregate([
                    { $match: { R_CLASS: 'Provincial',RegionCode:region.Code }},    
                    { $group: { _id: "$ProvinceCo", total: { $sum: 1 } } },
                                { $sort: { total: -1 } }
                ],function(err,roads){
                        province.find({RegionCode:region.Code}).exec(function(err2,provs){
                            if(err2) return cb(err2,null);   
                            provs = JSON.parse(JSON.stringify(provs));
                            r.provinces.push.apply( r.provinces, provs ); 
                                                       
                            if(roads.length>0){                                
                                roads.forEach(function(road){
                                    var pIdx = r.provinces.map(function(d){return d.Code}).indexOf(road._id);                                    
                                    if(pIdx>-1){
                                        var prov = r.provinces[pIdx];
                                        prov.roadcount = 0;
                                        prov.roadcount = road.total;    
                                    }                                    
                                    //console.log(prov);
                                });
                            }
                            

                            //console.log(r.provinces);
                            _treedata.push(r);
                            if(_index>=regions.length -1){
                                return cb(null,_treedata)
                            }
                            _index+=1;
                        });
                });                
            });//end for each regions 
        }) 
}

CityMunSchema.statics.getmunicity = function(code,cb){
        return this.find({"ProvinceCode":code}).sort({"Name":1}).exec(cb);
}



mongoose.model('Brgy', BrgySchema);
mongoose.model('CityMun', CityMunSchema);
mongoose.model('Provinces', ProvincesSchema);
mongoose.model('Regions', RegionsSchema);
