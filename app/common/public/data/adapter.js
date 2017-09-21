angular.module('RBIS').service('adapter', ['$window','$rootScope','utilities','$http','datamodel',function ($window, $rootScope,utilities,$http,datamodel){

var adapter = {};
adapter.data = [];
adapter.newFeatureObj = [];
adapter.roadID = "";
adapter.init =  function(id){
    adapter.data = [];
    adapter.roadID = id;
};

adapter.addNewtate = false;

var getinitValue =  function(t){
        return {"string":"","date":null,"float":0.0,"integer":0}[t];
}


adapter.newfeature =  function(model,rid,cb){
        var _newRow = {};
        for(var k in model){
                var mObj = model[k];
                _newRow[mObj.key] = getinitValue(mObj.type) 
        }
        _newRow["R_ID"] = rid;
        $http.get("/api/roads/getObjectID").success(function(_id){
                _newRow["_id"] = _id;      
                adapter.newFeatureObj.push(_newRow);
                cb(_newRow);
        });        
};

adapter.removenewfeature = function(id){
        var mdx = adapter.newFeatureObj.map(function(d){return d._id}).indexOf(id);
        adapter.newFeatureObj.splice(mdx,1);
}
adapter.getdata =  function(){
    return adapter.data;
};

adapter.processdata =  function(a,b,c){    
    var dx = adapter.data.map(function(d){return d.table}).indexOf(a.name);
    if(dx==-1){
            var d = {id:"",table:"",rows:[]};;
                    d.table = a.name;
                    d.rows.push({id:a.currentItem._id,key:b,value:c});
            adapter.data.push(d);
    }else{

            var table = adapter.data[dx];
            var rdx = table.rows.map(function(d){return d.id}).indexOf(a.currentItem._id);
            if(rdx==-1){
                        table.rows.push({id:a.currentItem._id,key:b,value:c});
            }else{
                    if(table.rows[rdx].key==b){
                            table.rows[rdx].value = c;
                    }else{
                           table.rows.push({id:a.currentItem._id,key:b,value:c}); 
                    }
            } 
            
    }     
    //console.log(adapter.data);
}

var _crud = {};

_crud.send =  function(data){

}


adapter.clear =  function(b){
if(b){
        for(var i=0;adapter.data.length;i++){
                var r = adapter.data[i];
                    if(r.table==b){adapter.data.splice(i,1);}    
        };
}else{
        adapter.data = [];
        adapter.roadID = "";
}
        
};

adapter.save = function(k,cb){
var _bodydata = {};
_bodydata.R_ID=adapter.roadID;
_bodydata.data = adapter.data

 if(k && k.name!='road'){
        var dx = adapter.data.map(function(d){return d.table}).indexOf(k.name);
        var row =  adapter.data[dx];
        _bodydata.data = [row];
 }else{
        //console.log(adapter.data);
 }

//console.log(_bodydata);
//console.log(adapter.newFeatureObj)

/* */
 $http.post("/api/roads/saveroad",{roaddata:_bodydata}).success(function(data){
         if(cb) {                
                _bodydata.data.forEach(function(d){
                        d.rows.forEach(function(o){
                                adapter.removenewfeature(o.id);
                        });
                });
                cb(data)
                };
 }).error(function(error){
         console.log(error);
        if(cb) cb(null,error);
 });

};

adapter.readonlyModel = false;


var _user = null;
adapter.user = function(cb){
        if(_user==null && cb){
                $http.get("/ws/users/me").success(function(user){                        
                        _user = user;
                        adapter.readonlyModel = datamodel.optionReadOnly.indexOf(user.role) >-1;
                        if(cb)cb(_user);
                        return _user;
                });
        };

        if(cb)cb(_user);
        return _user;
};

return adapter;
}]);