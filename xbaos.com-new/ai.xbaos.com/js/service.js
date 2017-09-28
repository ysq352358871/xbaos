angular.module("service",[])
.factory("urlInfoOne",function () {
    return "http://192.168.1.124:8080/Xbaos-web/"
    return "http://developer.xbaos.com/"
}).factory("urlInfoTwo",function () {
    return "http://192.168.1.124:8080/Xbaos-web/"
    return "http://developer.xbaos.com/"
}).factory("urlInfoThree",function () {
    //return "http://192.168.1.124:8080/Xbaos-account/"
    return "http://account.xbaos.com/"
}).factory("token",function () {
    if(localStorage.browserToken==undefined){
        window.location="http://u.xbaos.com/";
    }else{
        return $.parseJSON(localStorage.browserToken)
    }
}).factory("userData",function () {
    if(localStorage.userData==undefined){
        window.location="http://u.xbaos.com/";
    }else{
        return $.parseJSON(localStorage.userData);
    }
}).directive("line",function () {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height: 400px"></div>',
        replace: true,
        link: function($scope, element, attrs) {
            var myChart,myCharts,option;
           $scope.$watch('item+legend+data',function (newVal,oldVal) { //监听函数
               //console.log(newVal)
               if(newVal !== undefined){
                   option = {
                       title: {
                           text: ''
                       },
                       tooltip : {
                           trigger: 'axis',
                           axisPointer: {
                               type: 'cross',
                               label: {
                                   backgroundColor: '#6a7985'
                               }
                           }
                       },
                       legend: {
                           data:$scope.legend
                       },
                       toolbox: {
                           feature: {
                               saveAsImage: {}
                           }
                       },
                       grid: {
                           left: '3%',
                           right: '4%',
                           bottom: '3%',
                           containLabel: true
                       },
                       xAxis : [
                           {
                               type : 'category',
                               boundaryGap : false,
                               data :$scope.item
                           }
                       ],
                       yAxis : [
                           {
                               type : 'value'
                           }
                       ],
                       series : function () {
                           var series=[];
                           for(var i=0;i<$scope.legend.length;i++){
                               var item;
                               if(i==3){
                                   item={
                                       name:$scope.legend[i],
                                       type:'line',
                                       stack: '总量', label: {
                                           normal: {
                                               show: true,
                                               position: 'top'
                                           }
                                       },
                                       areaStyle: {normal: {}},
                                       data:$scope.data[i]
                                   };
                               }else{
                                   item={
                                       name:$scope.legend[i],
                                       type:'line',
                                       stack: '总量',
                                       areaStyle: {normal: {}},
                                       data:$scope.data[i]
                                   };
                               }


                               series.push(item);
                           }
                           return series;
                       }()
                   };
                   myChart=document.getElementById($scope.id);
                   myCharts = echarts.init(myChart);
                   myCharts.setOption(option);
                   myCharts.resize();
               }
           })
            window.onresize = function () {
                myChart.style.width=$(myChart).parent().width()+"px";
                myCharts.setOption(option,true);
                myCharts.resize();
            };
        }
    };
}).directive("loadingEffect",function () {
    return{
        'restrict':'A',
        replace:true,
        template:"<div class=\"spinner\">\n" +
        "  <div class=\"double-bounce1\"></div>\n" +
        "  <div class=\"double-bounce2\"></div>\n" +
        "</div>",
        link:function (scope,element,attrs) {
            //console.log(scope.mediaa)
        }
    }
})