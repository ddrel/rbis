const formidableObj = require('formidable');
const path = require('path');
const fs = require('fs');
const dirupload = '/data_file/tmp/';
const  appRoot = require('app-root-path');
const Jimp = require("jimp");
const lwip = require("lwip");
const tj = require('@mapbox/togeojson');
const DOMParser = require('xmldom').DOMParser;

const storage_roads_thumb = require('filestorage').create(path.join(appRoot.path, '/data_file/') + "/roads_images/thumb");
const storage_roads_lowres = require('filestorage').create(path.join(appRoot.path, '/data_file/') + "/roads_images/lowres");
const storage_roads_orig = require('filestorage').create(path.join(appRoot.path, '/data_file/') + "/roads_images/orig");
const reducedSizedefault = 60 //60kb
const storage_users = require('filestorage').create(path.join(appRoot.path, '/data_file/') + "/users_images/");
const storage_roads_media = require('filestorage').create(path.join(appRoot.path, '/data_file/') + "/roads_attachment/");

const mongoose = require('mongoose');

const fileObj =  {
     createDirectory:function(path){
        if (!fs.existsSync(path)){            
            fs.mkdirSync(path);
        };

        return path;
     },reduceQuality:function(size){
        var _returnQ =size;
        if(size<=100){
            _returnQ = 95                        
        }else if(size<=200){
            _returnQ = 50;
        }else if(size<350){
            _returnQ = 45;
        }else if(size<500){
            _returnQ= 35;
        }else if(size<750){
            _returnQ = 15;
        }else if(size<1000){
            _returnQ = 10;
        }else if(size<1500){
            _returnQ = 5;
        }else if(size<2000){
            _returnQ = 1;
        }else if(size<3500){
            _returnQ = 1;
        }else{
            _returnQ=1;
        }
        return _returnQ;
     }, isJSON :function(jsonString){
        try {
            var o = JSON.parse(jsonString);
            if (o && typeof o === "object") {
                return o;
            }
        }
        catch (e) { } 
        return false;
    },removeFile:function(path,cb){
        //console.log(fs.existsSync(path) + "  " + path);
        if(fs.existsSync(path)){
            fs.unlinkSync(path,function(err){cb(err)})
        }
    }
}


const uploadRoadImage =  (req,res,target,cb)=>{
  var roads = mongoose.model("Roads");
    // create an incoming form object
  var form = new formidableObj.IncomingForm(); 
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
  
    // store all uploads in the /uploads directory    
    var _rpath = path.join(appRoot.path, dirupload);   
    var _uploadDir = fileObj.createDirectory(_rpath);    
    form.uploadDir = _uploadDir;  
  
    var _roadData = false;
    form.on('field', function (name, field) {
        if(name=="roadattr"){
            _roadData = fileObj.isJSON(field); 
        };
    })
    form.on('file', function(field, file) { 
        var _uidFilename =   new mongoose.mongo.ObjectId().toString() + "_" + file.name;           
       
       
        fs.rename(file.path,path.join(form.uploadDir, _uidFilename) ,function(err){      
            var promise =  new Promise(function(resolve, reject){
                var _opt = {};
                    _opt.key_name = _roadData.key_name;     
                    _opt.r_id = _roadData.r_id;
                    _opt._id = _roadData._id;
                    _opt.name = file.name;
                    _opt.size = file.size;
                    _opt.mime = file.type;
            
                    _opt.created_by = {name:req.user.name,email:req.user.email};
                    _opt.sizes = {};
                    _opt.sizes.thumb = -1
                    _opt.sizes.lowres = -1
                    _opt.sizes.orig = -1
                
                var jobs = {}
                    jobs.a = false;
                    jobs.b = false;
                    jobs.c =  false;            
                Jimp.read(path.join(form.uploadDir, _uidFilename)).then(function (image) {                
                    var thumbfilename = path.join(form.uploadDir, "thumb_"  + _uidFilename);
                    image
                        .resize(100, 100,Jimp.RESIZE_BILINEAR)
                        .write(thumbfilename,function(err){
                            if(err){return reject(err);return;}
                            if(!err){
                                storage_roads_thumb.insert(file.name, thumbfilename, _opt, function(err, id, stat) {                                         
                                    _opt.sizes.thumb  = id;   
                                    jobs.a = true;
                                    fileObj.removeFile(thumbfilename,function(err){return reject(err);return;});  
                                    if(jobs.a && jobs.b && jobs.c){
                                        fileObj.removeFile(path.join(form.uploadDir, _uidFilename),function(err){return reject(err);return;});                                                                
                                        if(err){return reject(err);return;}
                                        return resolve(_opt);
                                    }                                                      
                                });
                            };
                        })                        
                        
                        
                }).catch(function (err) {
                    // handle an exception 
                });
    
                lwip.open(path.join(form.uploadDir, _uidFilename), function(err, image){
                    var lowresfilename = path.join(form.uploadDir, "lowres_"  + _uidFilename);    
                    var img_size = file.size / 1024
                    var qlty = fileObj.reduceQuality(img_size) //100 - parseInt(Math.ceil(reducedSizedefault / img_size) * 100);                    
                      image                                
                        .writeFile(lowresfilename,{quality:qlty}, function(err){
                          if(!err){
                            storage_roads_lowres.insert(file.name, lowresfilename, _opt, function(err, id, stat) {            
                                _opt.sizes.lowres = id;
                                jobs.b = true;                                 
                                fileObj.removeFile(lowresfilename,function(err){return reject(err);return;});                                
                                if(jobs.a && jobs.b && jobs.c){
                                    fileObj.removeFile(path.join(form.uploadDir, _uidFilename),function(err){return reject(err);return;});                                
                                    if(err){return reject(err);return;}
                                    return resolve(_opt);
                                }    
                            });
                          }
                        });                
                });
                

                storage_roads_orig.insert(file.name, path.join(form.uploadDir, _uidFilename), _opt, function(err, id, stat) {            
                    if(!err){
                        _opt.sizes.orig = id;
                        jobs.c = true;                    
                        if(jobs.a && jobs.b && jobs.c){
                            fileObj.removeFile(path.join(form.uploadDir, _uidFilename),function(err){return reject(err);return;});
                            if(err){return reject(err);return;}
                            return resolve(_opt);
                        }
                    };                    
                });
            });// end promise

            //Add Image details to Db
            promise.then(function(opt){    
                opt.fieldtype = "file_roadimages";            
                mongoose.model("Roads").addRoadMedia(opt,req.user,function(err,doc){
                            return cb(err,doc);                        
                    });
            }).catch(function(err){
                console.log("errrorrrrrrr");
                console.log(err);
                cb(err,null);
                return;
            });
            
        });//end rename;
    });

  
    // log any errors that occur
    form.on('error', function(err) {
        return cb(err,null);        
    });
  
    // once all the files have been uploaded, send a response to the client
    form.on('end', function(a,b) {
        console.log(a);
        console.log(b);
        //return cb(null,true);        
    });
  
    // parse the incoming request containing the form data
    form.parse(req);
}


const uploadRoadFile =  (req,res,target,cb)=>{
    var roads = mongoose.model("Roads");
    var form = new formidableObj.IncomingForm(); 
      form.multiples = true;
    
      // store all uploads in the /uploads directory    
      var _rpath = path.join(appRoot.path, dirupload);   
      var _uploadDir = fileObj.createDirectory(_rpath);    
      form.uploadDir = _uploadDir;  
    
      var _roadData = false;
      form.on('field', function (name, field) {
          if(name=="roadattr"){_roadData = fileObj.isJSON(field);};
      });
      form.on('file', function(field, file) { 
          var _uidFilename =   new mongoose.mongo.ObjectId().toString() + "_" + file.name;                             
          fs.rename(file.path,path.join(form.uploadDir, _uidFilename) ,function(err){      
            var promise =  new Promise(function(resolve,reject){
                var _opt = {};
                _opt.key_name = _roadData.key_name;     
                _opt.r_id = _roadData.r_id;
                _opt._id = _roadData._id;
                _opt.name = file.name;
                _opt.size = file.size;
                _opt.mime = file.type;                
                _opt.created_by = {name:req.user.name,email:req.user.email};
                
                
                storage_roads_media.insert(file.name, path.join(form.uploadDir, _uidFilename), _opt, function(err, id, stat) {            
                    if(!err){                        
                        _opt.doc_id = id;                                        
                            fileObj.removeFile(path.join(form.uploadDir, _uidFilename),function(err){return reject(err);return;});
                            if(err){return reject(err);return;}
                            resolve(_opt);
                    };                    
                });
            });
            
            promise.then(function(opt){    
                opt.fieldtype = "file_attachment";            
                mongoose.model("Roads").addRoadMedia(opt,req.user,function(err,doc){
                            return cb(err,doc);                        
                    });
            }).catch(function(err){                                
                console.log(err);
                cb(err,null);
                return;
            });
        
          });//end rename;
      });
      
    
      form.on('error', function(err) {return cb(err,null);});
      form.on('end', function(a,b) {});
      form.parse(req);
  };


const shapeUtil = {
                    parseShapeExtension :  function(f){
                    f = f.toLowerCase();
                    var _extenstion = "";
                    if((f.indexOf(".geojson")>-1 || f.indexOf(".json")>-1) && (f.substring(f.length-7,f.length)=="geojson" || f.substring(f.length-4,f.length)=="json") ){
                        _extenstion = "json";
                    }else if(f.indexOf(".kml")>-1 && f.substring(f.length-3,f.length)=="kml"){
                        _extenstion = "kml";
                    }
                    return _extenstion;
                },
                parsegeometry : function(f){
                    var geo = {};
                    if(f.type=="FeatureCollection"){
                        geo  = f.features[0].geometry || {};
                    }else if(f.type=="Feature"){
                        geo  = f.geometry ||  {};
                    }
                    return geo;
                }

}
const uploadShapeFile =  (req,res,target,cb)=>{
    var roads = mongoose.model("Roads");
    var form = new formidableObj.IncomingForm(); 
      form.multiples = true;
    
      var _rpath = path.join(appRoot.path, dirupload);   
      var _uploadDir = fileObj.createDirectory(_rpath);    
      form.uploadDir = _uploadDir;  
    
      var _roadData = false;
      form.on('field', function (name, field) {
          if(name=="roadattr"){_roadData = fileObj.isJSON(field);};
      });

      form.on('file', function(field, file) { 
          var _uidFilename =   new mongoose.mongo.ObjectId().toString() + "_" + file.name;                             
          var uiname =path.join(form.uploadDir, _uidFilename)
          fs.rename(file.path,uiname ,function(err){      
              var ext = shapeUtil.parseShapeExtension(uiname);
              var opt = {};
                  opt.r_id = _roadData.r_id
                  opt._id =  _roadData._id;      
                  opt.key_name = _roadData.key_name;            
              if(ext=="kml"){
                var kml = new DOMParser().parseFromString(fs.readFileSync(uiname, 'utf8'));            
                var converted = tj.kml(kml);
                opt.geometry = shapeUtil.parsegeometry(converted)
              }else if(ext=="json"){
                  var jsn = fs.readFileSync(uiname, 'utf8');
                      jsn = JSON.parse(jsn);                     
                      opt.geometry = shapeUtil.parsegeometry(jsn)                        
              }else {
                  res.status(500).send("Invalid shape file supported");
              }
            

              roads.updateShapes(opt,req.user,function(err,data){
                if(err){
                    res.send("error");return;
                }else{
                    res.send("success");return;
                }
              });

              fs.unlinkSync(uiname,function(err){});
          });//end rename;
      });
      
    
      form.on('error', function(err) {return cb(err,null);});
      form.on('end', function(a,b) {});
      form.parse(req);
};

module.exports = (app)=>{
    app.post("/upload/roads/uploadimages",(req,res)=>{
        uploadRoadImage(req,res,"",(err)=>{
            if(err){
                res.send("error");
                return;
            }else{
                res.send("success");
                return;
            }
        });
    });


    app.post("/upload/roads/uploadfiles",(req,res)=>{
        uploadRoadFile(req,res,"",(err)=>{
            if(err){
                res.send("error");
                return;
            }else{
                res.send("success");
                return;
            }
        });
    });

    app.post("/upload/roads/uploadshapefile",(req,res)=>{
        uploadShapeFile(req,res,"",(err)=>{
            if(err){
                res.send("error");
                return;
            }else{
                res.send("success");
                return;
            }
        });
    });

    app.get("/images/road",(req,res)=>{
        var _id = req.query.id;
        var type = req.query.type;
        if(type=="thumb"){
            storage_roads_thumb.pipe(_id, req, res, false);
        }else if(type=="lowres"){
            storage_roads_lowres.pipe(_id, req, res, false);
        }else if(type=="orig"){
            storage_roads_orig.pipe(_id, req, res, false);
        }else{
            storage_roads_orig.pipe(_id, req, res, true);
        };        
    });

    app.get("/media/road",(req,res)=>{
        var _id = req.query.id || -1;    
        return  storage_roads_media.pipe(_id, req, res, true);
    });

    app.delete("/media/road/delete",(req,res)=>{
        var opt = {};
            opt.r_id = req.query.r_id;
            opt.attr_id = req.query.attr_id;
            opt.f_id = req.query.f_id;
            opt.key_name = req.query.key_name;
            opt.field_file = req.query.field_file;

            if(opt.key_name!=="road" && !opt.attr_id && !opt.r_id && !opt.f_id){
                res.status(500).send("error");
                return; 
            }else if(opt.key_name=="road" && !opt.f_id && !opt.r_id){
                res.status(500).send("error");
                return;
            }else if(["file_roadimages","file_attachment"].indexOf(opt.field_file)==-1){
                res.status(500).send("error");
                return;
            }


        mongoose.model("Roads").removeRoadMedia(opt,req.user,function(err,data){
                if(!err){
                    if(opt.field_file=="file_roadimages"){
                        storage_roads_thumb.remove(data.thumb,function(err){});
                        storage_roads_lowres.remove(data.lowres,function(err){});
                        storage_roads_orig.remove(data.orig,function(err){});
                    }else if(opt.field_file=="file_attachment"){
                        storage_roads_media.remove(data.doc_id,function(err){});
                    }
                    
                    res.status(200).send("success");
                }else{
                    res.status(500).send("error");
                }
        });
    })
}