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
            ondelete:'&',
            readonly: '=', 
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

        scope.$watch('readonly', function(newVal, oldVal){
            scope.readonly = newVal;
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
                "<td width='35px'><a ng-if='!readonly' href='' ng-click='deleteClickFile(row)'><i class='fa fa-trash' aria-hidden='true'>&nbsp;Delete</i></a></td>" +
                "</tr>" +
                "</tbody>"  
        "</table>"
    } 
    
    return directive;
    
}).directive("formField",function($compile){

    var directive = {           
        scope: {
            field: '@',
            currentmodel: '=',
            ondatadirty:'&',
            readonly:'='
        },
        link: link,
        controller: function($scope){
            $scope.value = 'directive scope value';
          }
    };

    var _parseValue = function(v){
        return (typeof v=="undefined" || v =="NaN" || v == "Null" || v=="undefined")?"":v;
    }
    var _getoptionsvalue = function(options,value){
        var mdx = options.map(function(d){return d.key}).indexOf(value);
            return _parseValue(mdx>-1?options[mdx].label:"");
    };


    var _formatdate =  function(d){
        if(d){
            var date = new Date(d);
            return _parseValue((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + " ");
        }else{
            return "";
        };
    }


    

    var _gettemplates = function(scope){
            var field = scope.field,currentmodel = scope.currentmodel;
        
            if(!currentmodel || !currentmodel.currentItem){
                return "---";
            }//----------------------------------------------------------------------------------------
            else if(scope.readonly  &&  currentmodel.struct[field].ctrl=='text'){
                return "<label>" + _parseValue(currentmodel.currentItem[field]) +"</label>";                
            }
            else if(scope.readonly  &&  currentmodel.struct[field].ctrl=='select'){
                return "<label>" + _getoptionsvalue(currentmodel.struct[field].options, currentmodel.currentItem[field]) +"</label>";
            }
            else if(scope.readonly  && currentmodel.struct[field].ctrl=='date'){
                return "<label>" + _formatdate(currentmodel.currentItem[field]) +"</label>";
            } //----------------------------------------------------------------------------------------
            else if(currentmodel.currentItem.status && ["forreview","validated"].indexOf(currentmodel.currentItem.status)>-1 && currentmodel.struct[field].ctrl=='text'){
                return "<label>" + currentmodel.currentItem[field] +"</label>";
            }else if(currentmodel.currentItem.status && ["forreview","validated"].indexOf(currentmodel.currentItem.status)>-1 && currentmodel.struct[field].ctrl=='select'){
                return "<label>" + _getoptionsvalue(currentmodel.struct[field].options, currentmodel.currentItem[field]) +"</label>";
            }else if(currentmodel.currentItem.status && ["forreview","validated"].indexOf(currentmodel.currentItem.status)>-1 && currentmodel.struct[field].ctrl=='date'){
                return "<label>" + _formatdate(currentmodel.currentItem[field]) +"</label>";
            }//----------------------------------------------------------------------------------------
            else if(currentmodel.struct[field].ctrl=='label'){                
                return "<label>" + currentmodel.currentItem[field] +"</label>";
            }else if(currentmodel.struct[field].ctrl=='text'){
                return "<input filter-input  datatype='{{currentmodel.struct[field].type}}' ng-blur='ondatadirtyForm(currentmodel,field,currentmodel.currentItem[field])' type='text'  ng-model='currentmodel.currentItem[field]' class='{{currentmodel.struct[field].class}}'></input>";
            }else if(currentmodel.struct[field].ctrl=='select'){
                    return "<select ng-blur='ondatadirtyForm(currentmodel,field,currentmodel.currentItem[field])' ng-model='currentmodel.currentItem[field]' class='{{currentmodel.struct[field].class}}'>" + 
                            "<option value='{{opt.key}}'  ng-selected='currentmodel.currentItem[field]==opt.key' ng-repeat='opt in currentmodel.struct[field].options'>{{ opt.label }}</option>" +
                            "</select>";
            }else if(currentmodel.struct[field].ctrl=='date'){
                return "<div layout-gt-xs='row'>" + 
                       "<div flex-gt-xs>" +                                     
                        "<md-datepicker ng-blur='ondatadirtyForm(currentmodel,field,currentmodel.currentItem[field])' ng-model='currentmodel.currentItem[field]' md-placeholder='Enter date'></md-datepicker>" + 
                        "</div>" + 
                        "</div>";
            }                                             
    }


    function link(scope, element, attr) {
        scope.$watch('currentmodel.currentItem', function(newVal, oldVal){                
                element.html(_gettemplates(scope));
                $compile(element.contents())(scope);
         }); 

         scope.$watch('currentmodel.currentItem.status', function(newVal, oldVal){                
            element.html(_gettemplates(scope));
            $compile(element.contents())(scope);
        }); 
 
         scope.$watch('readonly', function(newVal, oldVal){
            element.html(_gettemplates(scope));
            $compile(element.contents())(scope);
          });



        element.html(_gettemplates(scope));
        $compile(element.contents())(scope);

        scope.ondatadirtyForm =  function(a,b,c){
            scope.ondatadirty({a:a,b:b,c:c});
        }
    }


    return directive;
}).directive("formRemarks",function($window,$compile){
    
        var directive = {
            template:_templateremarks(),   
            scope: {
                list: '=',
                status: '=',
                readonly: '=',
                options: '=',
                onsumbit:'&'
            },
            link: link,
            controller: function($scope){
                $scope.value = 'directive scope value';
              }
        };


        function link(scope, element, attr) {
            scope.items = scope.list;
            scope.charlenght = 300;
            scope.maxlenght=300;
            scope.$watch('list', function(newVal, oldVal){
                scope.items = newVal;
            });
            //<font color='#ff6347'></font>
            var _defaultOptions = [{"key":"inprogress","label":"In Progress"},
                                    {"key":"forreview","label":"For Review (The current data will be locked.)"},
                                    {"key":"pending","label":"Pending"}];

            scope.optionsitem = scope.options || _defaultOptions;                                         
    
            scope.$watch('status', function(newVal, oldVal){
                //scope.status = newVal || '';                
                scope.messageremarks = '';
                if(scope.items && scope.items.length>1){
                    scope.items = scope.items.sort(function(a,b){return (new Date(b.remark_date) - new Date(a.remark_date));})    
                };
            });

            scope.$watch('readonly',function(newVal,oldVal){

            });

            scope.$watch('options',function(newVal,oldVal){
                scope.optionsitem = newVal || _defaultOptions;
                //console.log("optionsssssssssssss");
            });
            scope.$watch('items',function(newVal,oldVal){
                if(scope.items && scope.items.length>1){
                    scope.items = scope.items.sort(function(a,b){return (new Date(b.remark_date) - new Date(a.remark_date));})    
                }    
            });

            
            
            
            scope.isnewremarks = true;
            scope.status = scope.status || '';
            

            scope.messageremarks = '';
            scope.selectstatus = (!scope.status ||  scope.status== '')?scope.optionsitem[0].key:scope.status;

            scope.ontextchange =  function(e){
                scope.charlenght = scope.maxlenght - e.currentTarget.value.length;
            }

            scope.onclicksumbit =  function(e){
                if(scope.messageremarks!=='' && scope.selectstatus!==''){                    
                    scope.onsumbit({a:scope.messageremarks,b:scope.selectstatus});
                    scope.messageremarks = "";
                }

                return;
            };

            scope.onrowclick =  function(rmk){
                scope.isnewremarks = false;
                scope.messageremarks = rmk.message;
            };


            scope.onclickaddremark =  function(){
                scope.messageremarks = "";
                scope.isnewremarks = true;
            };

            scope.onclearmessage =  function(){
                scope.messageremarks = "";
            };

            scope.statustext = function(s){
                return {"inprogress":"In Progress","forreview":"For Review","pending":"Pending","validated":"Validated","reopen":"Reopen","returned":"Return"}[s]; 
            };
            scope.formatdate = function(d){
                if(d){
                    var date = new Date(d);
                    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + " " + date.toLocaleTimeString();
                };
                return "";
            }


            scope.readonlystate =  function(){
                return !(["forreview","validated"].indexOf(scope.status)>-1 || scope.readonly);
            }


           scope.onstatuschange =  function(b){
            scope.selectstatus = b;
           }; 

        }

        function _templateremarks(){

            var _listtable = "<table class='table table-bordered table-hover' style='border-bottom:solid 1px transparent'>"+
                            "<thead><tr><td>Status</td><td>Date</td><td>Remarks By</td></tr></thead>"  +    
                            "<tbody><tr style='cursor:pointer;' ng-repeat='rmk in items' title='{{rmk.message}}' ng-click='onrowclick(rmk)'>"+
                            "<td>{{ statustext(rmk.status) }}</td>" + 
                            "<td>{{ formatdate(rmk.remark_date) }}</td>" + 
                            "<td title='{{ rmk.remark_by}}({{ rmk.remark_by_email}})'>{{ rmk.remark_by }}</td>" + 
                             "</tr></tbody>" +               
                             "</table>";

            var _status =   "<md-input-container style='margin:0px;padding:0px;width:130px;'><md-select ng-model='selectstatus' ng-change='onstatuschange(selectstatus)' style='margin:0px;padding:0px'>"+
                            "<md-option ng-repeat='opt in optionsitem' value='{{opt.key}}'><em>{{opt.label}}<em></md-option>" +                                                                                     
                            "</md-select></md-input-container";                                             

            return "<table class='table table-bordered'>" + 
                     "<thead ng-if='readonlystate()' ><tr><td ng-show='isnewremarks' colspan='2' style='padding: 0 0 0 5px !important;'>&nbsp;<label>Status:</label> &nbsp;" + _status + "</td></tr></thead>"  + 
                     "<tbody>" + 
                     "<tr><td colspan='2' style='padding:0px !important;'><textarea class='form-control' ng-disabled ='!isnewremarks || !readonlystate()' ng-model='messageremarks' maxlength='{{maxlenght}}' ng-keyup='ontextchange($event)' style='width:100%;height:80px;font-size:1.2em'></textarea></td></tr>"+
                     "<tr ng-if='readonlystate()' ><td style='8px  0 0 6px !important' align='left'><label style='margin:0px !important'>Remaining Character(s) : <font color='red'>{{ charlenght}}</font></label></td>" + 
                     "<td ng-if='readonlystate()' colspan='2' align='right' style='padding:2px !important'>" + 
                     "<input type='button' ng-show='!isnewremarks' ng-click='onclickaddremark($event)' class='btn btn-primary2' value='Add Remarks'></input>"+
                     "<input type='button' ng-show='isnewremarks' ng-click='onclicksumbit($event)' class='btn btn-primary2' value='Submit'></input>"+
                     "<input type='button' ng-show='isnewremarks' ng-click='onclearmessage($event)' class='btn' value='Clear'></input>"+
                     "</td></tr>"+
                     "<tr><td colspan='2' style='padding:0px !important;'>" + _listtable +"</td></tr>"+                     
                     "</tbody>" + 
                     "</table>";
        };


        return directive;
});