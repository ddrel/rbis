'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
  User = mongoose.model('User')

const  USER_IS = ["SUPERVISOR","ENCODER"];

/**
 * Create user
 */
exports.create = (req, res)=> {  
  var _usr = req.body;
  var userObj = {};
  userObj.name = _usr.name;
  userObj.email = _usr.email;
  userObj.password = _usr.password; 
  userObj.confirmPassword = _usr.password;
  userObj.location = {};
  userObj.roles = [_usr.accesstype];
  
  if(_usr.province){
    userObj.location.province = _usr.province;
  };

  if(_usr.municity){
    userObj.location.municity = _usr.municity;
  };

  var user = new User(userObj);
  user.provider = 'local';
  req.assert('name', 'You must enter a name').notEmpty();
  req.assert('email', 'You must enter a valid email address').isEmail();
  req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);


  
  
  var errors = req.validationErrors() || [];
  if(_usr.accesstype=="--"){
      errors.push({"param":"accesstype","msg":"You must select an access type"});
  }

  if(USER_IS.indexOf(_usr.accesstype)>-1 && _usr.province=="--"){      
      errors.push({"param":"location","msg":"You must select a location"});
  }

  if(errors.length>0){
       res.status(500).json(errors);
       return;
  }

  var modelErrors = [];
  
  user.email = user.email.toLowerCase();
   
   user.save(function(err) {
    if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
        //console.log(err);
          modelErrors.push([{
            msg: 'Username already taken',
            param: 'username'
          }]);
          break;
        default:          
          if (err.errors) {
            for (var x in err.errors) {
              modelErrors.push({
                param: x,
                msg: err.errors[x].message,
                value: err.errors[x].value
              });
            }            
             res.status(500).json(modelErrors);
             return;
          }
      }

    }else{      
      res.status(200).json(user);
      return;
    }
      
  });
};

/**
 * Send User
 */
exports.me = (req, res)=> {
  res.json(req.user || null);
};

exports.signout = (req,res)=>{
    req.logout();
    res.redirect('/login');
};
exports.getusers = (req, res)=> {
  User.find({}).select({name:1,email:1,roles:1,_id:1})
      .exec((err,user)=>{
          if(err){
          }else{
            res.status(200).json(user);
          }

      });
};

exports.activate = (req,res)=>{
  var _ac = req.query.code || "";
  var _email = req.query.email || "";
  User.findOne({activation_code:_ac,email:_email}).exec(function(err,doc){    
      if(err || (doc==null)){
            res.send("ERROR ACTIVATION, Please Contact RBIS Team");
      }else{
          var newActivationKey = User.genactivationKey();
          User.update({_id:doc._id},{activated:true,activation_code:newActivationKey},function(err,n){
                if(err){
                      res.send("ERROR ACTIVATION, Please Contact RBIS Team");
                }else{
                      res.redirect("/login");
                }
        });

      };
  });
};



exports.updateroles = (req, res)=> {
  var _user = (req.body);
  var roles =  _user.roles.indexOf("ADMIN")>-1?"ADMIN":"USER";

  User.update({_id:_user._id},{roles:[roles]},{multi:false},function(err,n){
     if(err){
                     res.status(500).json(err); 
                  }else{

                     res.status(200).json({status:"saved"});
                  }

  });

  //console.log(_user);
  /*
  User.findOne({_id:_user._id})
      .exec((err,user)=>{
          if(err){
            res.status(500).json(user);
          }else{
              user.roles.splice(0,1);
              var roles =  _user.roles.indexOf("ADMIN")>-1?"ADMIN":"USER";
              user.roles.push(roles);
              user.save((err)=>{
                     // console.log(err);       
                  if(err){
                     res.status(500).json(err); 
                  }else{

                     res.status(200).json({status:"saved"});
                  }
              })
          }

      });
    */
};

//delete event
exports.delete = (req,res)=>{
	var _id = req.query._id;
    User.findOne({
        _id : _id
        }).exec((err, docs)=> {
            if (err) {
                return res.status(500).json({
                    msg: 'Failed to delete users.',
                    err : err
                });
            }
            docs.remove(function(){			     	   
                res.status(200).json({
                    msg: 'Successfully deleted users.'
                });
            })
        });
};


exports.generatepw = (req,res)=>{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    res.status(200).json({password:text});
}








