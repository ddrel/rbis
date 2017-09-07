(function () {
    'use strict';
    angular
        .module('ui.blueimp.gallery', ['ui.blueimp.gallery.templates'])
        .directive('uiGallery', uiGallery);

    uiGallery.$inject = ['$window'];

    function uiGallery($window){

        var directive = {
            templateUrl: 'gallery.html',
            scope: {
                options: '=',
                list: '=',
                ondelete:'&'
            },
            link: link,
            controller: function($scope){
              $scope.value = 'directive scope value';
            }
        };
        return directive;


        function link(scope, element, attr) {
            scope.slides = scope.list;

            // Dynamically update list value.
            scope.$watch('list', function(newVal, oldVal){
                scope.slides = newVal;
            });

            angular.element("#links").on('click', function(event){
                event = event || $window.event;
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event},
                    links = this.getElementsByTagName('a');
                angular.extend(options, scope.options);

                if(blueimp){
                    blueimp.Gallery(links, options);
                }else{
                    console.log('Make sure you added blueimp-gallery.js file');
                }

            });            

            scope.isondelete = false;            
            scope.isondelete = element.context.attributes.getNamedItem("ondelete")!=null;

            scope.deleteClick= function(evt){
                //console.log(evt.currentTarget.dataset.dataobject);                
                if (evt.stopPropagation)    evt.stopPropagation();
                if (evt.cancelBubble!=null) evt.cancelBubble = true;
                scope.ondelete({a:evt.currentTarget.dataset.dataobject});
            }

            scope.onclickdownload =  function(evt){
                var ddata = evt.currentTarget.dataset.downloaddata;
                if (evt.stopPropagation)    evt.stopPropagation();
                if (evt.cancelBubble!=null) evt.cancelBubble = true;
                var link = $window.document.createElement("a");    
                link.href = ddata;
                link.style = "visibility:hidden";
                $window.document.body.appendChild(link);
                    link.click();
                $window.document.body.removeChild(link);

            }
        }
    }

    angular
        .module("ui.blueimp.gallery.templates", [])
        .run(uiGalleryTemplate);


    uiGalleryTemplate.$inject = ['$templateCache'];

    function uiGalleryTemplate($templateCache){
        $templateCache.put("gallery.html","<div id=\"blueimp-gallery\" class=\"blueimp-gallery blueimp-gallery-controls\">\n <div class=\"slides\"></div>\n <h3 class=\"title\"></h3>\n <a class=\"prev\">‹</a>\n <a class=\"next\">›</a>\n <a class=\"close\">×</a>\n <a class=\"play-pause\"></a>\n <ol class=\"indicator\">\n <li ng-repeat=\"slide in slides\" title=\"{{slide.title}}\" data-index=\"{{$index}}\" style=\"background-image: url({{slide.thumb}})\"></li>\n </ol>\n </div>\n\n <div id=\"links\" class=\"links blueimp-gallery-inner\">\n  <div class=\"property-image\" ng-repeat=\"slide in slides\"><a id=\"a-image\" class=\"a-image\" href=\"{{slide.href}}\" title=\"{{slide.title}}\" data-index=\"{{$index}}\">\n    <img ng-src=\"{{slide.thumb}}\" alt=\"{{slide.title}}\">\n</a>\n <input ng-if=\"isondelete\" id=\"image-delete\" type=\"button\" value=\"Delete\" style=\"display:block\" class=\"btn btn-danger delete-confirm-ajax\"  data-dataObject={{slide.data}} ng-click=\"deleteClick($event)\"></input>\n<input style=\"display:block\" class=\"btn btn-primary2 donwload-button-slide\" value=\"Download\" data-downloaddata={{slide.download}} ng-click=\"onclickdownload($event)\" ></input>\n</div></div>\n");
    }

})();