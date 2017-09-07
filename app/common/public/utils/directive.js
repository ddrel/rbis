'use strict';

angular.module('RBIS').directive("filterInput",function(){

    return {
        scope:{
            datatype: '@',
        },link:function (scope, element, attrs){
            element.on("keypress",function(e){
                var _type =  scope.datatype.toLowerCase();

                console.log(["integer","int"].indexOf(_type));

                var charCode = (e.which) ? e.which : e.keyCode;                
                if(["float","decimal","double","number"].indexOf(_type)>-1){                    
                    if (charCode == 46 && e.currentTarget.value.split('.').length>1) {return false;}
                    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))return false;
                }else if(["integer","int"].indexOf(_type)>-1){
                    if (charCode == 46) {return false;}
                    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))return false;
                }else{
                    return true;
                }
            });
        }
    }

})