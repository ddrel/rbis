'use strict';

module.exports = (app)=>{
        //Home Page    
        app.get("/print/road-section-profile",(req,res)=>{    
                if ( !req.user ){
                        res.redirect('/login');
                } else {                        
                            res.locals.rid = req.query.rid || "";
                            res.render("print-road-section-profile");                        
                };         
        });
}