'use strict';
angular.module('RBIS')
.controller("uploadroadimagesCtrl", function( $scope,$http,$rootScope,$window,$timeout,utilities,$mdDialog,uploadroadSvcsData) {        
   
   $scope.progressFiles = [];
    $scope.init =  function(){
        
    }

    $scope.progressvalue = 80;
    
    $scope.submitfiles = function(files){
        var _rdData = uploadroadSvcsData.get();
        angular.forEach(files,function(obj){
            if(!obj.isRemote){
                var _roadAttr = {key_name:_rdData.name,r_id:_rdData.currentItem.R_ID,"_id":_rdData.currentItem._id}                    
                var _objFile = {file:obj.lfFile,
                    roadattr:JSON.stringify(_roadAttr),            
                    pv:0,
                    uid:utilities.uuid()}
                $scope.progressFiles.push(_objFile);
                
                /**/ 
                utilities.file.upload("/upload/roads/uploadimages",_objFile,
                                    function(data){
                                        console.log(data);
                                    },
                                    function(progress,file){
                                        var fdx = $scope.progressFiles.map(function(d){return d.uid}).indexOf(file.uid);                                                
                                        $scope.progressFiles[fdx].pv = progress;
                                        $scope.$apply();
                                    });               
                                                   
                }
        });
        
        
        

        /*
        $http.post('/upload/roads/uploadimages', formData,{            
            headers: {
                transformRequest: angular.identity,
                __XHR__: function() {
                    return function(xhr) {
                        xhr.upload.addEventListener("progress", function(event) {
                            console.log("uploaded " + ((event.loaded/event.total) * 100) + "%");
                        });
                    };
                },
            },
        }).success(function(data){
                console.log(data);
        });

        
        $http.post('/upload/roads/images', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(result){
            // do sometingh
            console.log(result);                   
        },function(err){
            // do sometingh
        });
    */



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
  
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };    
})
.service('uploadroadSvcs', ['$window','utilities','$http','$mdDialog',function ($window,utilities,$http,$mdDialog){
var uploadroadSvcs = {};
uploadroadSvcs.images =  function(ev){
    return $mdDialog.show({
        controller: 'uploadroadimagesCtrl',
        templateUrl: '/road/views/uploadroadimages.html',
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
    