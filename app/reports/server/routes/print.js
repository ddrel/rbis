'use strict';

module.exports = (app)=>{
            
        app.get("/print/road-section-profile",(req,res)=>{    
                if ( !req.user ){
                        res.redirect('/login');
                } else {                        
                            res.locals.rid = req.query.rid || "";
                            res.render("print-road-section-profile");                        
                };         
        });


        app.get("/print/road-summary",(req,res)=>{    
                if ( !req.user ){
                        res.redirect('/login');
                } else {                        
                            res.render("print-road-summary");                        
                };         
        });
}