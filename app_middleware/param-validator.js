'use strict';

/*
{
  url:'/upload',   <rest url>
  params:[],  <parameter to check>  
}
*/
module.exports = function(Urls) {
    return function(req, res, next) {
        let baseURL = req.originalUrl.indexOf("?")>-1 ?req.split("?")[0] : req.originalUrl;
        let idx = Urls.map((d)=>{d.url}).indexOf(baseURL);
        if(idx>-1){
            let params = Urls[idx].params;
            let resParams = req.body || req.query;
            let keyInvalid = [];
            for(a in resParams){
                if(params.indexOf(a)==-1){keyInvalid.push(a);}                                                   
            }
            if(keyInvalid.length>0){
                if(next){(next(keyInvalid));return;}
                res.send(keyInvalid);
            }            
        }
        
      next()
    }
  }