'use strict';
angular.module('RBIS')
.controller("uploadCtrl", function( $scope,$http,$rootScope,$window,$timeout,utilities,$mdDialog,uploadroadSvcsData) {        
   
   $scope.progressFiles = [];
   var _rdData = {};
   
    $scope.init =  function(){
        _rdData = uploadroadSvcsData.get();
        $scope.headertitle = _rdData.headertitle;
    }
    $scope.headertitle = "";
    $scope.progressvalue = 0;
    
    $scope.submitfiles = function(files){
        
        
        angular.forEach(files,function(obj){
            if(!obj.isRemote){
                var _roadAttr = {key_name:_rdData.name,r_id:_rdData.currentItem.R_ID,"_id":_rdData.currentItem._id}                    
                var _objFile = {file:obj.lfFile,
                    roadattr:JSON.stringify(_roadAttr),            
                    pv:0,
                    uid:utilities.uuid()}
                $scope.progressFiles.push(_objFile);
                 
                var _urlpath = "";
                if(_rdData.filetype=="image"){_urlpath = "/upload/roads/uploadimages"}
                else if(_rdData.filetype=="file"){_urlpath = "/upload/roads/uploadfiles"}
                else if(_rdData.filetype=="shapes"){_urlpath = "/upload/roads/uploadshapefile"}    
                if(_urlpath){
                    utilities.file.upload(_urlpath,_objFile,
                        function(data){
                            $timeout(function(){
                                $mdDialog.hide(data);
                            },500);                                        
                        },
                        function(progress,file){
                            var fdx = $scope.progressFiles.map(function(d){return d.uid}).indexOf(file.uid);                                                
                            $scope.progressFiles[fdx].pv = progress;
                            $scope.$apply();
                    });
                };
                                   
            }
        });
        

    };

    $scope.onFileClick = function(obj,idx){
		console.log(obj);
	};
	$scope.onFileRemove = function(obj,idx){
		console.log(obj);
	};
	$scope.onSubmitClick = function(files) {
		console.log(files);
	}
    

      $scope.hide = function() {
        $mdDialog.hide();
      };
  
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
  
      $scope.action = function(answer) {
        $mdDialog.hide(answer);
      };    
})
.service('uploadroadSvcs', ['$window','utilities','$http','$mdDialog',function ($window,utilities,$http,$mdDialog){
var uploadroadSvcs = {};
uploadroadSvcs.images =  function(ev){
    return $mdDialog.show({
        controller: 'uploadCtrl',
        templateUrl: '/road/views/uploadroadimages.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: true
      });        
}

uploadroadSvcs.files =  function(ev){
    return $mdDialog.show({
        controller: 'uploadCtrl',
        templateUrl: '/road/views/uploadroadfiles.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: true
      });        
}
uploadroadSvcs.shapes =  function(ev){
    return $mdDialog.show({
        controller: 'uploadCtrl',
        templateUrl: '/road/views/uploadroadshapes.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: true
      });        
}
return uploadroadSvcs;
}])

.service('uploadroadSvcsData', ['utilities',function (utilities){
    var uploadroadSvcsData = {};
    var _data = null;
    uploadroadSvcsData.set= function(d){
        _data=d;
    }
    
    uploadroadSvcsData.get= function(){
        return _data;
    }
    return uploadroadSvcsData;
}]);
    