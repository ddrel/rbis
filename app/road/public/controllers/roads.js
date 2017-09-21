angular.module('RBIS').controller("roadsCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$mdDialog,datamodel,adapter) {
    $scope.roadsCollection = [];
    $scope.paging = {};
    $scope.pagination = {};
    $scope.pagination.max = 1;
    $scope.pagination.current = 1;
    $scope.searchText = "";
    $scope.advancefilterdisplay=0;
    $scope.user = {};
    $scope.truncatetext = function(txt){
        return utilities.text.truncate(txt,30);
    }

    $scope.formatToDecimal =  function(d){
        return utilities.formatToDecimal(d);
    }
    

    $scope.getroads = function(qry,cb){
        $http.get("/api/roads/getroadaggmain" + qry).success(function(data){
                cb(data);
        });
    }

    $scope.init = function(){
        adapter.user(function(_user){
            $scope.user = _user;
            console.log($scope.user);
        });
        $timeout(function(){    
            $scope.getroads("",function(response){
                        $scope.roadsCollection = response.data;
                        $scope.pagination.max = response.pagecount;
                        //$scope.pagination.max
                });
        });
    }



    /* Events*/
    $scope.update =  function(road){
        console.log("/road/update/" +  road._id.R_ID);
        //$state.go("/road/update/" +  road._id.R_ID);
        $window.location.href = "/#/road/update/" + road._id.R_ID;
    };

    $scope.onSearch =  function(s){        
        $scope.getroads("?qry=" + s,function(response){
                        $scope.roadsCollection = response.data;
                        $scope.pagination.max = response.pagecount;
                })
    }

    $scope.pageChanged = function(page){
        var _qry = ($scope.searchText!="")? "?qry=" + $scope.searchText + "&page=" + page:"" + "?page=" +page;
        $scope.getroads(_qry,function(response){
                        $scope.roadsCollection = response.data;
                        //$scope.pagination.max
                })

    };





    /*---------------------------------------- Create new road dialog --------------------------------------------------*/
    $scope.createNewRoad = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/road/views/roadnew.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(data) {
          if(data){
            $http.post("/api/roads/newRoad",data).success(function(data){
                $window.location.href = "/#/road/update/" + data.R_ID;
              }).error(function(err){
                toastr.error("Error Saving Roads ...");
              })// [post]
          }          
        }, function(error) {
            
        });
      };

      function DialogController($scope, $mdDialog,datamodel,$http,adapter) {
        
        $scope.roadModel = datamodel.structure.road; 
        $scope.roadObjData = {};
        $scope.byselect = {};
        $scope.provinces = []
        $scope.municipalities = [];
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
          $mdDialog.cancel(); 
        };
    
        $scope.action = function(data) {
            if(data){
                data.CityMunCod = $scope.byselect.municity;
                data.ProvinceCo = $scope.byselect.province;
            }
            
            $mdDialog.hide(data);
        };

        $scope.onchange_provinces =  function(){
            $http.get("/api/location/getmunicity?code=" + $scope.byselect.province).success(function(data){                
                    utilities.sort(data,"Name");
                    $scope.municipalities = data;
            });
    
        };

        $scope.onchange_municity =  function(a){            
                    $scope.roadObjData.R_CLASS=(a!=="")?"City":"Provincial";
        };
        $scope.userObject = {};
        $scope.init =  function(){            
            $timeout(function(){
                $http.get("/ws/users/me").success(function(user){
                    $scope.userObject = user;                    
                    //console.log($scope.userObject);
                    if(user.role=="SUPER ADMINISTRATOR"){
                        $http.get("/api/location/getregionprovince").success(function(data){
                            utilities.sort(data,"Code");                                
                            data.forEach(function(region) {
                                   region.provinces.forEach(function(province){
                                           var _d = {regionCode:province.RegionCode,code:province.Code,prov_name:region.Name + " > " + province.Name,name:province.Name};
                                           $scope.provinces.push(_d);                
                                   });    
                           });                       
           
                        });
                    }                    
                });        
            });
            
        }
      }

});