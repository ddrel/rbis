(function(){
    angular.module('RBIS').run(function($rootScope, $state, $urlMatcherFactory,$templateCache,$http,adapter,datamodel) {
        $rootScope.$state = $state;


        //load model
        datamodel.load("");

        function message(to, toP, from, fromP) { return from.name  + angular.toJson(fromP) + " -> " + to.name + angular.toJson(toP); }
        $rootScope.$on("$stateChangeStart", function(evt, to, toP, from, fromP) { console.log("Start:   " + message(to, toP, from, fromP)); });
        $rootScope.$on("$stateChangeSuccess", function(evt, to, toP, from, fromP) { console.log("Success: " + message(to, toP, from, fromP)); });
        $rootScope.$on("$stateChangeError", function(evt, to, toP, from, fromP, err) { console.log("Error:   " + message(to, toP, from, fromP), err); });
    })
    .directive('ngIncludeTemplate', function() {  
        return {  
            templateUrl: function(elem, attrs) { return attrs.ngIncludeTemplate; },  
            restrict: 'A',  
            scope: {  
            'ngIncludeVariables': '&'  
            },  
            link: function(scope, elem, attrs) {  
            var vars = scope.ngIncludeVariables();  
            if(typeof vars!="undefined"){
                Object.keys(vars).forEach(function(key) {  
                    scope[key] = vars[key];  
                });  
            }                    
            }  
        }  
    });    
})()

