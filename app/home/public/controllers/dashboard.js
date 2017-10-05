angular.module('RBIS').controller("dashboardCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,adapter,datamodel,$mdSidenav) {


  $scope.events = 
[
{
    badgeClass: 'info',
    badgeIconClass: 'glyphicon-check',
    title: 'Road Update 11100000',
    content: 'Some awesome content.'
},
{
    badgeClass: 'warning',
    badgeIconClass: 'glyphicon-credit-card',
    title: 'Line segment update 111100000000',
    content: 'Content .'
}
];


$scope.modelData = {};
$scope.modelData.review = {};
$scope.modelData.review.pagination = {};
$scope.modelData.validated = {}
$scope.modelData.validated.pagination = {};


$scope.summary = {};
$scope.summary.chart = {};
$scope.summary.chart.sc = {};
$scope.summary.chart.sc.data = [];
$scope.summary.chart.sc.labels = [];
$scope.summary.chart.sc.colors = [];

$scope.summary.chart.st={};
$scope.summary.chart.st.data = [];
$scope.summary.chart.st.labels = [];
$scope.summary.chart.st.colors = [];

$scope.summary.surfacetype = {};
$scope.summary.surfacetypeCount= {};

$scope.colorST = function(t){
  return utilities.roads.ST[t].color;
}

$scope.colorSC =  function(c){
  return utilities.roads.SC[c].color;
};
$scope.getpercent = function(a,b){
    return utilities.getPercent(a,b);
}

$scope.formatToDecimal =  function(d){
  return utilities.formatToDecimal(parseFloat("0" + d));
}




var _getRoadStatus =  function(){
  $http.get("/api/road_forreview/getforreview").success(function(d){
    $scope.modelData.review.List = d;
    if($scope.modelData.review.List.length>0){$("#roadmapdashboard").leafletMaps();}      
  });
};

var _getValidatedStatus =  function(){
  $http.get("/api/road_validated/getroadvalidated").success(function(d){
    $scope.modelData.validated.List = d;
    if($scope.modelData.validated.List.length>0){$("#roadmapdashboard").leafletMaps();}          
  });
}

$scope.init =  function(){
    adapter.user(function(_user){
      $scope.user = _user;     
    });

    $http.get("/api/roads/getroadlengthtotal").success(function(d){      
        $scope.summary.roadlengthtotal = utilities.formatToDecimal(Math.ceil(d.Roadlengthtotal));
    });
    
    $http.get("/api/roads/getbridgelengthtotal").success(function(d){
        $scope.summary.totalbridgelength = utilities.formatToDecimal((d.totalbridgelength /1000).toFixed(2));
    });

    $http.get("/api/roads/getcarriagewaycount").success(function(d){
        $scope.summary.segmentcount = utilities.formatToDecimal(Math.ceil(d.segmentcount));
    });

    
    //chart    
    ///api/roads/getcarriagewaypersurfacecount
    $http.get("/api/roads/getcarriagewaypersurfacelength").success(function(d){
          $scope.summary.surfacetype = d;
          var _total = 0;          
          for(var n in d){
            if(n.indexOf("_id")==-1 && n!="total"){
              _total+=$scope.summary.surfacetype[n];         
                $scope.summary.surfacetype[n]= (parseFloat("0" + d[n])).toFixed(2);                                
            };
          };
          $scope.summary.surfacetype.total = _total.toFixed(2);
          //console.log($scope.summary.surfacetype);
    });
    
    $http.get("api/roads/getcarriagewaypersurfacecount").success(function(d){
          $scope.summary.surfacetypeCount = d;
          $scope.summary.surfacetypeCount.total = 0;
          var _total = 0;          
          for(var n in d){
            if(n.indexOf("_id")==-1 && n!="total"){                
                $scope.summary.surfacetypeCount[n]= Math.round(parseFloat("0" + d[n]));                                
                _total +=$scope.summary.surfacetypeCount[n];
                
                $scope.summary.chart.st.labels.push(n);
                $scope.summary.chart.st.data.push(d[n]);
                
                var kcl = n.toString().substring(0,1).toUpperCase();
                var _colorHex = utilities.roads.ST[kcl].color;              
                $scope.summary.chart.st.colors.push(_colorHex);
            };
          };
          $scope.summary.surfacetypeCount.total =_total;
    });

   ///api/roads/getcarriagewayperconcount
    $http.get("/api/roads/getcarriagewayperconlength").success(function(d){
          $scope.summary.surfacecon = d;
          var _total = 0;    
          for(var n in d){
            if(n.indexOf("_id")==-1 && n!="total"){
                $scope.summary.surfacecon[n]= (parseFloat("0" + d[n])).toFixed(2);
                _total+= parseFloat($scope.summary.surfacecon[n]);             
            };
          };
   
         $scope.summary.surfacecon.total = _total.toFixed(2);
    });


    $http.get("/api/roads/getcarriagewayperconcount").success(function(d){
        $scope.summary.surfaceconCount = d;
        $scope.summary.surfaceconCount.total = 0;
        for(var n in d){
          if(n.indexOf("_id")==-1 && n!="total"){
                $scope.summary.surfaceconCount[n]= Math.round(parseFloat("0" + d[n]));
                $scope.summary.surfaceconCount.total+=$scope.summary.surfaceconCount[n];

                $scope.summary.chart.sc.data.push($scope.summary.surfaceconCount[n]);
                var kcl = n.toString().substring(0,1).toUpperCase();                
                $scope.summary.chart.sc.labels.push(n);    
                var _colorHex = utilities.roads.SC[kcl].color;              
                $scope.summary.chart.sc.colors.push(_colorHex);
            };
        };
    });


    //load review and validated    
    _getRoadStatus(); 
    _getValidatedStatus();  
};





/**paging */

$scope.pageChangedReview =  function(i){

}

$scope.pageChangedValidated =  function(i){
  
}

/******************************* FOR Review **************************/



$scope.onRemarksSubmit = function(a,b){

  var opt = {};
  opt.r_id =    $scope.modelData.selectedItem.r_id;   
  opt.attr_id = $scope.modelData.selectedItem.ref_id
  opt.key_name = $scope.modelData.selectedItem.attr_type;
  opt.message = a;
  opt.status = b;
  opt.id = $scope.modelData.selectedItem._id;

  //console.log($scope.modelData.currentItem);
  //console.log(opt);

  console.log(opt);
  $http.post("/api/roads/addRoadRemarks",opt).success(function(){
          toastr.success("Successfully add remark ...");          
          $scope.modelData.currentItem.status = opt.status;          
          _getRoadStatus();

          
  }).error(function(err){
          toastr.error("Error saving remarks");
  });

};


var _getshapestyle = function(o,name){    
  if(name=="Carriageway"){
      return utilities.roads.STStyle(o.SurfaceTyp); 
  }else{
              return {
                                      style: function(f){
                                      return {weight: 4,
                                              opacity: 1,
                                              color: '#ff6666',
                                              dashArray: '4',
                                              fillOpacity: 0.7
                                          }											
                                      }
                      }
          };
  };

var shapemap =  function(data,name){
  $("#roadmapdashboard").leafletMaps("clear");
  var geojson =  data.geometry || null;
  if(!geojson) {return;}

  name =  name.replace("Road","");
  var _style = _getshapestyle(data,name);
  var _geo = $("#roadmapdashboard").leafletMaps("setGeoJSON", geojson,null,_style);
  _geo.on({
      mouseover: function (e) {_geo.openPopup(); },
      click: function (e) {
          $("#roadmapdashboard").leafletMaps("zoomToFeature", e.target);
      }
  });
  
  var tooltiptext = utilities.roads.getattribdisplay(data,name);
  _geo.eachLayer(function (layer) {                        
          layer.bindPopup(name + ": "  + tooltiptext);
      });
  $("#roadmapdashboard").leafletMaps("zoomToFeature", _geo);
};

$scope.optionStatus = [{"key":"validated","label":"Validated"},{"key":"returned","label":"Return"}];

$scope.onmaptabclick =  function(){
  $("#roadmapdashboard").leafletMaps("refresh");
}


//$scope.optionStatus = [];
$scope.ontabselected = function(status){
  var thestatus = status=="review"?[{"key":"validated","label":"Validated"},{"key":"returned","label":"Return"}]:[{"key":"returned","label":"Return"}];
  $scope.optionStatus = thestatus; 
}

$scope.onloaddata =  function(item,status){
  

$http.get("/api/roads/getroadattrbyid?r_id="+ item.r_id +"&attr=" + item.attr_type + "&attr_id=" + item.ref_id).success(function(data){
  $mdSidenav("left").toggle();  
  $("#roadattrttabledashboard").html("");                        

 $scope.modelData.selectedItem = item;
 $scope.modelData.currentItem =  data;
 $scope.modelData.roadImageList = utilities.file.getCurrentImageList(data);
 $("#roadattrttabledashboard").html(datamodel.utils.displayattributestable(item.attr_type,data));
 shapemap(data,item.attr_type);

})

}

});