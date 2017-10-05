'use strict';
const fs=require("fs"),
      walk = require('walk'),
      path = require('path'),
      appRoot = require('app-root-path'),
      express = require('express');

module.exports = (app,passport)=>{

    app.setMultiView = (viewpath) =>{
        const viewDirs = app.get('views');
          if( typeof viewDirs.push == 'undefined'){
             app.set('views',[viewpath]);
          }else{
             viewDirs.push(viewpath);
          }
          return viewDirs;
    };

    app.use(function(req, res, next) {
        res.locals.user = req.user;
        next();
      });

    const options = {
        followLinks: false,
          listeners: {      
           directories:  (root, dirStatsArray, next)=> {
              dirStatsArray.forEach( (n) => {
                  if(n.name.toLowerCase()=="public"){
                      var ppath = appRoot.path  + "/" + path.join(root, n.name);
                      var rpath = root.replace(process.env.MODULE_PATH,"").replace("/","");
                      rpath = rpath.indexOf("\\")>-1?rpath.replace("\\","/") : ("/" + rpath);
                      app.use(rpath, express.static(ppath, { maxAge: 3600 })); 
                  }
                  else if(n.name.toLowerCase().indexOf("view")>-1 && root.indexOf("public")==-1){
                      app.setMultiView( root + '/views');
                  }else if(n.name.toLowerCase().indexOf("model")>-1 && root.indexOf("public")==-1){
                      var _path = appRoot.path + "/"  + path.join(root, n.name);
                      fs.readdirSync(_path).forEach(function(file) {
                          var modelpath=_path + "/" + file;
                          require( modelpath );
                      });
                  }else if(n.name.toLowerCase().indexOf("service")>-1 && root.indexOf("public")==-1){
                      var _path =appRoot.path   + "/" + path.join(root, n.name);
                      fs.readdirSync(_path).forEach(function(file) {
                          var modelpath=_path + "/" + file;
                          require(modelpath)(app,passport);
                      });    
                  }else if(n.name.toLowerCase().indexOf("route")>-1 && root.indexOf("public")==-1){
                      var _path = appRoot.path   + "/"  +  path.join(root, n.name);
                      fs.readdirSync(_path).forEach(function(file) {
                          var modelpath=_path + "/" + file;
                          require(modelpath)(app,passport);
                      });
                  }
              });
              next();
            }
          
          }
        };
      
      
      walk.walkSync(process.env.MODULE_PATH, options);

};