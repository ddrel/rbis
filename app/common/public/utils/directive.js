'use strict';

angular.module('RBIS')
.directive("filterInput",function(){

    return {
        scope:{
            datatype: '@',
        },link:function (scope, element, attrs){
            element.on("keypress",function(e){
                var _type =  scope.datatype.toLowerCase();

                //console.log(["integer","int"].indexOf(_type));

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
.directive("fileList",function($window){
    var directive = {
        template:_templateFileList(),   
        scope: {
            list: '=',
            ondelete:'&'
        },
        link: link,
        controller: function($scope){
            $scope.value = 'directive scope value';
          }
    };


    function link(scope, element, attr) {
        scope.items = scope.list;
        scope.$watch('list', function(newVal, oldVal){
            scope.items = newVal;
        });

        scope.deleteClickFile= function(evt){                                        
            if (evt.stopPropagation)    evt.stopPropagation();
            if (evt.cancelBubble!=null) evt.cancelBubble = true;
            scope.ondelete({b:evt});
            return false;
        }

        scope.converttomb =  function(b){
                if(!b){return "N/A"};
                if(b.toString().length<=3){
                    return b + "Kb"
                }else{
                    return (Math.round(Number(b) / 1024) /1024) .toFixed(3) + "Mb";
                }
                
        }

        scope.limitstring =  function(a){
            return a.length>=35?a.substring(0,35) + " ...":a;
        }

        scope.formatdate = function(d){
            if(d){
                var date = new Date(d);
                return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + " " + date.toLocaleTimeString();
            };
            return "";
        }

        
        scope.onclickdownload =  function(id){
            var link = $window.document.createElement("a");    
            link.href = "/media/road?id=" + id;
            link.style = "visibility:hidden";
            $window.document.body.appendChild(link);
            link.click();
            $window.document.body.removeChild(link);

        }

    }
    
    function _templateFileList(){
        return "<table class='table table-bordered table-hover'>" +
                "<thead><tr><td>File name</td><td>Size</td><td>Upload Date</td><td width='70px' colspan='2'></td></tr></thead>" + 
                "<tbody>" + 
                "<tr ng-repeat='row in items'>" + 
                "<td title='{{ (row.name) }}'>{{ limitstring(row.name) }}</td>" +
                "<td>{{ converttomb(row.size) }}</td>" + 
                "<td>{{ formatdate(row.created_date) }}</td>" + 
                "<td width='35px'><a href='' ng-click='onclickdownload(row.doc_id)'><i class='fa fa-cloud-download' aria-hidden='true'>&nbsp;Download</i></a></td>" + 
                "<td width='35px'><a href='' ng-click='deleteClickFile(row)'><i class='fa fa-trash' aria-hidden='true'>&nbsp;Delete</i></a></td>" +
                "</tr>" +
                "</tbody>"  
        "</table>"
    } 
    
    return directive;
    
}).directive("formField",function($compile){

    var directive = {
        template:_templateCtrl(),   
        scope: {
            field: '@',
            currentmodel: '=',
            ondatadirty:'&'
        },
        link: link,
        controller: function($scope){
            $scope.value = 'directive scope value';
          }
    };

    var _gettemplates = function(field,currentmodel){
            //on progress
            if(currentmodel.struct[field].ctrl=='label'){
                console.log("<label ng-click=ondatadirtyForm(field,currentmodel,null)>" + currentmodel.currentItem[field] +"</label>");
                return "<label ng-click=ondatadirtyForm(field,currentmodel,null)>" + currentmodel.currentItem[field] +"</label>";
            }
    }


    function link(scope, element, attr) {
        element.html(_gettemplates(scope.field,scope.currentmodel));
        $compile(element.contents())(scope);

        scope.ondatadirtyForm =  function(a,b,c){
            console.log(a);
            console.log(b);
            scope.ondatadirty(a,b,c);
        }
    }


    function _templateCtrl(){
        return ""
    }

    return directive;
})
