'use strict';
const user = require("../controllers/user");
module.exports = (app,passport)=>{
      
    app.post("/ws/register",(req,res)=>{
            user.create(req,res);
    });

    app.post('/login',passport.authenticate('local', {
      failureFlash: true
    }), function(req, res) {
      res.send({
        user: req.user,
        redirect: '/'
      });
    });
    app.get("/activate",user.activate);
    app.get('/logout',user.signout);
    app.get('/ws/users/getall',user.getusers);
    app.post('/ws/users/updateroles',user.updateroles);
    app.delete('/ws/users/delete',user.delete);
    app.get("/ws/users/generatepw",user.generatepw);
    
    

}