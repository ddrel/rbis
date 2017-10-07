  angular.module('RBIS').service('DialogService2', ['$modal', function($modal) {
    var DialogProvider = {};
    /*
     * Will create a new instance of confirm dialog
     */
     DialogProvider.confirm = function( msg ){
      return $modal.open({
          animation: true,
          templateUrl: '/common/views/dialog/confirm.html',
          controller: 'ConfirmDialogController',
          backdrop: 'static',
          resolve: {
            msg: function () {
              return msg;
            }
          }
        });
    };

    return DialogProvider;
  }
])
.service("DialogService",["$mdDialog",function($mdDialog){
  var DialogProvider = {};


  DialogProvider.confirm =  function(title,msg,button){
    button = button || {};
    var confirm = $mdDialog.confirm()
    .title(title || "Confirm Action")
    .textContent(msg)
    .ariaLabel('Lucky day')
    //targetEvent(ev)
    .ok(button.ok || "Yes")
    .cancel(button.cancel || "No");
    return $mdDialog.show(confirm);
  };

  return DialogProvider;
}])
