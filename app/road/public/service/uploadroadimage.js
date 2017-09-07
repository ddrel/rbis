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
                utilities.file.upload("/upload/roads/uploadimages",_objFile,
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
    