'use strict';
(function(){
    var RBIS = angular.module('RBIS', ['ui.router','uiRouterStyles','ngSanitize','oc.lazyLoad','ui.bootstrap','ui.sortable','chart.js','moment-picker','ngMaterial','angular-timeline','lfNgMdFileInput','ui.blueimp.gallery']);            
    RBIS.config(['$stateProvider','$urlRouterProvider', '$httpProvider', '$ocLazyLoadProvider',function($stateProvider, $urlRouterProvider, $httpProvider,$ocLazyLoadProvider) {
                $ocLazyLoadProvider.config({
                    // Set to true if you want to see what and when is dynamically loaded
                    debug: true
                });

                $urlRouterProvider.otherwise('dashboard');
                $stateProvider
                            .state('home', {
                                 abstract:true,
                                  url: '/',
                                  templateUrl: '/home/views/index.html'
                              })
                              .state('home.dashboard', {                                  
                                  url: 'dashboard',
                                  templateUrl: '/home/views/main.html',
                                  data : { pageTitle: 'Dashboard | Road and Bridge Information System' },
                                  controller:"dashboardCtrl",
                                  resolve:{                                            
                                            loadfile: function ($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                    {
                                                        cache:true,
                                                        files: ['/home/assets/css/dashboard.css',
                                                                '/home/controllers/dashboard.js'                                                                
                                                                ]
                                                    }                                                    
                                                ]);
                                            }                                      
                                  }  
                              })
                              .state('road', {
                                 abstract:true,
                                  url: '/road',
                                  templateUrl: '/road/views/index.html'
                              })
                              .state('road.list', {
                                  url: '/list',
                                  templateUrl: '/road/views/road.html',
                                  controller:"roadsCtrl",
                                  data : { pageTitle: 'Roads | Road and Bridge Information System' },
                                  resolve:{                                            
                                            loadfile: function ($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                    {
                                                        cache:true,
                                                        files: ['/road/assets/css/roads.css',
                                                                '/road/controllers/roads.js'                                                                
                                                                ]
                                                    }                                                    
                                                ]);
                                            }                                      
                                  }  
                              })
                              .state('road.update', {
                                  url: '/update/:id',
                                  templateUrl: '/road/views/roadupdate.html',
                                  controller:"roadsupdateCtrl",
                                  data : { pageTitle: 'Roads | Updates Roads' },
                                  resolve:{                                            
                                            loadfile: function ($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                    {
                                                        serie: true,
                                                        cache:true,
                                                        files: ['/common/plugins/leaflet/leaflet.js',
                                                                '/common/plugins/leaflet/leaflet.css',
                                                                '/bower_components/leaflet-draw/dist/leaflet.draw.js',
                                                                '/bower_components/leaflet-draw/dist/leaflet.draw.css',                                                                
                                                                '/common/js/leaflet.maps.jquery.js',
                                                                '/road/service/uploadroadfile.js',
                                                                '/road/assets/css/roads.css',
                                                                '/road/controllers/roadsupdate.js'                                                                
                                                                ]
                                                    }                                                    
                                                ]);
                                            }                                      
                                  }  
                              })
                              .state('home.roadmaintenance', {
                                  url: 'roadmaintenance',
                                  templateUrl: '/roadmaintenance/views/roadmaintenance.html',
                                  data : { pageTitle: 'Maintenance | Road and Bridge Information System' }                                   
                              })
                             .state('home.impairment', {
                                  url: 'impairment',
                                  templateUrl: '/impairment/views/impairment.html',
                                  data : { pageTitle: 'Impairment | Road and Bridge Information System' }
                              })
                              .state('home.reports', {
                                  url: 'reports',
                                  templateUrl: '/reports/views/reports.html',
                                  data : { pageTitle: 'Reports | Road and Bridge Information System' }
                              })
                              .state('home.roadmaps', {
                                url: 'roadmaps',
                                controller: 'roadmapsCtrl',
                                templateUrl: '/roadmaps/views/roadmaps.html',                                  
                                  data : { pageTitle: 'Road Maps | Road and Bridge Information System'},
                                  resolve: {                                            
                                            loadfile: function ($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                    {
                                                        serie: true,
                                                        cache:false,
                                                        files: ['/common/plugins/leaflet/leaflet.js',
                                                                '/common/plugins/leaflet/leaflet.css',
                                                                '/bower_components/leaflet-draw/dist/leaflet.draw.js',
                                                                '/bower_components/leaflet-draw/dist/leaflet.draw.css',                                                                
                                                                '/bower_components/Leaflet.GridLayer.GoogleMutant/Leaflet.GoogleMutant.js',
                                                                '/common/js/leaflet.maps.jquery.js',
                                                                '/roadmaps/assets/css/roadmaps.css',
                                                                '/road/assets/css/roads.css',
                                                                '/roadmaps/controllers/roadmaps.js'                                                                
                                                                ]
                                                    }                                                    
                                                ]);
                                            }
                                  }              
                                })
                              .state('home.geotags', {
                                  url: 'geotags',
                                  templateUrl: '/geotags/views/geotags.html',
                                  data : { pageTitle: 'Geotags | Road and Bridge Information System' }
                              })
                              .state('user', {
                                 abstract:true,
                                  url: '/user',
                                  templateUrl: '/user/views/index.html'
                              })                              
                              .state('user.myprofile', {
                                  url: '/myprofile',
                                  controller: 'myprofileCtrl',
                                  templateUrl: '/user/views/myprofile.html',
                                  data : { pageTitle: 'My Profile | Road and Bridge Information System' },
                                  resolve:{                                            
                                            loadfile: function ($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                    {
                                                        cache:true,
                                                        files: ['/user/assets/css/user.css',
                                                                '/user/controllers/myprofile.js'                                                                
                                                                ]
                                                    }                                                    
                                                ]);
                                            }                                      
                                  }  
                              })                             

         }])
         .run(function($rootScope, $state, $urlMatcherFactory) {
                $rootScope.$state = $state;
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
})();