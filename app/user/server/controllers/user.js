'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
  User = mongoose.model('User'),
  USER_IS = ["SUPERVISOR","ENCODER"],
  appRoot = require('app-root-path'),
  mailsender = require(appRoot.path + "/utils/mailsender")

/**
 * Create user
 */

var sendmailaccess = function(opt){
  var _opt = {};
  _opt.email = opt.email;
  var _urlactivate = process.env.HOST_DOMAIN + "/activate?email="+ opt.email + "&code=" + opt.code;
  _opt.html = "<b>Here's your user Access Credential</b><br/><br/>" + 
              "<b>Username:</b>&nbsp;" +  opt.email +"<br/>" + 
              "<b>Temporary Password:</b>&nbsp;" +  opt.password +"<br/>" +
              "<b>Activation Link:</b>&nbsp;<a rel='nofollow' style='text-decoration:none;' target='_blank' href='" + _urlactivate +"'>" + _urlactivate+ "</a><br/><br/>"+
              "<i>To activate your account, please click the link or copy then paste to browser address bar.<i/>" + 
              "<br/><br/>" + 
              "-<b><i>RBIS OPDS TEAM</i></b>";

  _opt.subject = "Welcome to RBIS " + opt.name + "!";                
  mailsender.sendMailGeneral(_opt);
} 


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
    userObj.location.province_text = _usr.province_text
  };

  if(_usr.municity){
    userObj.location.municity = _usr.municity;
    userObj.location.municity_text = _usr.municity_text;
  };

  if(_usr.region){
    userObj.location.region = _usr.region;
    userObj.location.region_text = _usr.region_text;
  }

 
//console.log(userObj.location);



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
  user.activation_code = User.genactivationKey();

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
      sendmailaccess({name:user.name,email:user.email,password:_usr.password,code:user.activation_code});
      return;
    }
      
  });
};

exports.changepassword = function(req,res){
  if(!req.user){res.redirect("/login");return;};
  //req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.assert('newPassword', 'Password must be between 8-20 characters long').len(8, 20);


  var errors = req.validationErrors() || [];
  if(errors.length>0){
    res.status(500).json(errors);
    return;    
  }

  var usraccess = req.body;  
  User.changePassword(req.user._id,usraccess.password,usraccess.newPassword,function(err,data){
    if(err){res.status(500).json([{msg:err}]);return;}
    res.status(200).json(200);
    if(usraccess.sendtomail){
      var opt = {};
      opt.email =  req.user.email;
      opt.subject = "Your password have been changed";
      opt.html = "<b>New Password:</b>&nbsp;" + usraccess.newPassword +  "<br/><br/>" +                               
                  "-<b><i>RBIS OPDS TEAM</i></b>";
      mailsender.sendMailGeneral(opt);
    }
  });
}


/**
 * Send User
 */
exports.me = (req, res)=> {
  var _user = {};
  var _ruser = req.user || {};
  _user.name  = _ruser.name;
  _user.email  = _ruser.email;
  _user.location  = _ruser.location;
  _user.role  = _ruser.roles[0];
  _user.profile = _ruser.profile; 
  res.json(_user || null);
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

exports.updateprofile =  function(req,res){
  var body =  req.body;
  var _id = req.user._id;
  var profile = {};


  var reg_Mobile = new RegExp("^[0-9]{4} [0-9]{3}-[0-9]{4}$");
  var reg_Phone = new RegExp("^[0-9]{3}-[0-9]{4}$");

  var errors = [];

  if(body.profile.mobile1  && body.profile.mobile1!=""){
    if (!reg_Mobile.test(body.profile.mobile1)){
      errors.push({msg:"Invalid primary mobile number format"});      
    }
  } 
   
  if(body.profile.mobile2  && body.profile.mobile2==""){
    if (!reg_Mobile.test(body.profile.mobile2)){
      errors.push({msg:"Invalid secondary mobile number format"});      
    }
  } 

  if(!body.profile.mobile1){
    errors.push({msg:"Primary mobile number is required"});
  }


  if(body.profile.phone1  && body.profile.phone1==""){
    if (!reg_Phone.test(body.profile.phone1)){
      errors.push({msg:"Invalid primary phone number format"});      
    }
  }


  if(body.profile.phone2  && body.profile.phone2==""){
    if (!reg_Phone.test(body.profile.phone2)){
      errors.push({msg:"Invalid secondary phone number format"});      
    }
  }

 if(errors.length>0){
   res.status(500).json(errors);return;
 }

 for(var p in body.profile){
  profile[p] = body.profile[p];
 }



  User.update({_id:_id},{profile:profile},function(err,data){    
    if(err){
        res.status(500).json([{msg:"Error saving profile!"}]);
    }else{
        res.status(200).json(data);
    }
});


};

exports.forgotpassword =  function(req,res){
  var _email = req.body.email || "";
  User.findOne({activated:true,email:_email}).select("_id name location email activated roles").exec(function(err,result){    
    if(err){res.status(500).json({error:"Error fetch data"});return;}
    if(!result){res.status(500).json({error:"Not yet activated or invalid account"});return;}
    var newpassword =  User.generatepw();
    User.forgotpassword(result._id,newpassword,function(err,data){
      if(err){res.status(500).json({error:"Error change password"});return;}
      res.status(200).json(result); 

      var opt = {};
      opt.email =  _email;
      opt.subject = "Your password have been changed";
      opt.html = "<b>New Password:</b>&nbsp;" + newpassword +  "<br/><br/>" +                               
                  "-<b><i>RBIS OPDS TEAM</i></b>";
      mailsender.sendMailGeneral(opt);
    });  
    
    
})
}


exports.getuserbyemail = (req,res)=>{
  var _email = req.query.email || "";
  User.findOne({email:_email}).select("_id name location email activated roles").exec(function(err,result){
      if(err){res.status(500).json({error:"error fetch data"});return;}
        res.status(200).json(result);
  })
};


exports.getusersall =  (req, res)=> {
  var _qry = req.query.qry ||  false;
  var _limit = req.query.limit || 10;
  var _page  = req.query.page || 1;

  var qry_stry = new RegExp(_qry,'i')
  if(req.query.hasOwnProperty("activated")){
    _qry = {activated:req.query.activated} 
  }else if(req.query.hasOwnProperty("activated") && _qry){
        _qry = {$or:[{name:qry_stry},{email:qry_stry},{"location.municity_text":qry_stry},{"location.province_text":qry_stry}],activation:req.query.activated};
  }else if(_qry){
      _qry = {$or:[{name:qry_stry},{email:qry_stry},{"location.municity_text":qry_stry},{"location.province_text":qry_stry}]}
  }else{
      _qry = {};
  };

  //console.log(_qry);

  User.paginate(_qry, { page: _page, limit: _limit,select:"name email location roles _id activated profile" }, function(err, result) {  
    if(err){res.status(500).json({error:"error fetch data"});return;}
    res.status(200).json(result);
  });

}

exports.updateuseraccess =  (req,res)=>{
  var _user = (req.body);

  console.log(_user);
  var usrObj = {};
      usrObj.location = {};    
      if(_user.accesstype=="VIEWER REGION"){
        usrObj.location.region = _user.region;
        usrObj.location.region_text = _user.region_text;  
      }else{
        usrObj.location.province = _user.province;
        usrObj.location.province_text = _user.province_text;
        usrObj.location.municity = _user.municity;
        usrObj.location.municity_text = _user.municity_text;
      }
      
      usrObj.roles = [_user.accesstype];
      usrObj.activated = _user.activated;
      
      
      User.update({email:_user.email},usrObj,{multi:false},function(err,n){
          if(err){
                  res.status(500).json(err); 
              }else{

                  res.status(200).json({status:"saved"});
            }
      });
}


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
	var _email = req.query.email || req.body.email  || "";
  
  User.findOneAndRemove({email:_email},function(err,docs){
    if (err)  {
      return res.status(500).json({
          msg: 'Failed to delete users.',
          err : err
        });
    }else{
      res.status(200).json({
        msg: 'Successfully deleted users.'
    }); 
    }
  });
};


exports.generatepw = (req,res)=>{
    var text = User.generatepw();
    res.status(200).json({password:text});
}








