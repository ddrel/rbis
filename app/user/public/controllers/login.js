//(function(){
  angular.module("LoginModule",['ui.bootstrap'])
  .service('forgotpaswordService',function($modal) {
  var _forgotpaswordDialog = {};
  var _fctrl =  function($scope,$http,$modalInstance){
    $scope.forgotpasswordError = '';
  
    $scope.cancel =  function() {
      $modalInstance.dismiss('Dismiss forgot password dialog instance.');
    };

    $scope.send =  function(){
      console.log($scope.forgotpassword.email);
      $http.post("/ws/users/forgotpassword",$scope.forgotpassword).success(function(){
        $modalInstance.dismiss('Dismiss forgot password dialog instance.');  
      }).error(function(err){
        $scope.forgotpasswordError = err.error;
      })
    }

    $scope.close = function(){
      $modalInstance.dismiss('Dismiss forgot password dialog instance.');
    }
  }

  _forgotpaswordDialog.loadDialog = function(){
    return $modal.open({
        animation: true,
        templateUrl: "/user/views/dialog/forgotpassword.html",
        controller: _fctrl,
        backdrop: "static"
      });
  };

  return _forgotpaswordDialog;
})
.controller("LoginController",['$scope', '$http','$rootScope','forgotpaswordService', function( $scope, $http,$rootScope,forgotpaswordService) {
      $scope.user= {}      
      $scope.user.email = "";
      $scope.user.password = "";
      $scope.loginError = "";

      /**
       * Use to pass the credentials
       */
       $scope.login = function() {
        $http.post('/login', {
          email: $scope.user.email,
          password: $scope.user.password
        })
        .success(function(response) {           
            $scope.loginError = "";           
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }
          })
          .error(function() {            
            $scope.loginError = 'Authentication failed.';
            //console.log($scope.loginError);
          });
       }


       $scope.forgotpassword = function(){
         var _forgotpaswordService = forgotpaswordService.loadDialog();
         _forgotpaswordService.result.then(function(){

         });
       } 
     

      
  }]);
  
//})();

