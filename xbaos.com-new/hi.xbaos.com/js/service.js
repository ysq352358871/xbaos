angular.module("service",[])
.factory("urlInfoOne",function () {
    return "http://192.168.1.124:8080/Xbaos-web/"
    return "http://developer.xbaos.com/"
}).factory("urlInfoTwo",function () {
    return "http://192.168.1.124:8080/Xbaos-web/"
    return "http://developer.xbaos.com/"
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

}).directive("startTime",function () {
    return{
        restrict : 'A',
        link : function($scope, $element, $attrs) {
            $element.datetimepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                showMeridian: true,
                pickerPosition: "bottom-right",
                startView: 2,//Monthly view
                minView: 2//The most accurate time - to - view view that the date - time picker can provide
            });
        }
    }
}).directive("endTime",function () {
    return{
        restrict : 'A',
        link : function($scope, $element, $attrs) {
            $element.datetimepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                showMeridian: true,
                pickerPosition: "bottom-left",
                startView: 2,//Monthly view
                minView: 2//The most accurate time - to - view view that the date - time picker can provide
            });
        },
    }
}).directive("mothTime",function () {
    return{
        restrict : 'A',
        require : '?ngModel',
        link : function($scope, $element, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }
            $element.datetimepicker({
                format: "yyyy-mm",
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                showMeridian: true,
                pickerPosition: "bottom-left",
                startView: 3,//Monthly view
                minView: 3//The most accurate time - to - view view that the date - time picker can provide
            });
        },
    }
}).directive('loadingEffect',function () {
    return{
        'restrict':'A',
        replace:true,
        template:"<div id=\"loading-center\">\n" +
        "    <div id=\"loading-center-absolute\">\n" +
        "        <div class=\"object\" id=\"object_one\"></div>\n" +
        "        <div class=\"object\" id=\"object_two\"></div>\n" +
        "        <div class=\"object\" id=\"object_three\"></div>\n" +
        "        <div class=\"object\" id=\"object_four\"></div>\n" +
        "        <div class=\"object\" id=\"object_five\"></div>\n" +
        "        <div class=\"object\" id=\"object_six\"></div>\n" +
        "        <div class=\"object\" id=\"object_seven\"></div>\n" +
        "        <div class=\"object\" id=\"object_eight\"></div>\n" +
        "        <div class=\"object\" id=\"object_big\"></div>\n" +
        "    </div>\n" +
        "</div>",
        link:function (scope,element,attrs) {
            //console.log(scope.mediaa)
        }
    }
}).directive("selectCountry",function () {
    return{
        'restrict':'E',
        scope: {
            search:"=",
            country:"="
        },
        replace:true,
        template:"<ul class=\"system-son animated-my\">\n" +
        "<li class=\"text\" ng-repeat=\"item in data | filter:{countryName:search}\" id=\"{{item.countryCode}}\" ng-click=\"get(item.countryName,item.countryCode)\" title='{{item.countryName}}'>\n" +
        " {{item.countryName}}\n" +
        " </li>\n" +
        " </ul>",
        link:function (scope,element,attrs) {
            //console.log(scope.country);
            $.getJSON('../js/country.json',function (data) {
                scope.data=data;
                scope.$apply();
            });
            //下拉框效果
            var flag=true;
            $("input.con").on('focus',function (e) {
                e.stopPropagation();//清除默认设置；
                $(this).siblings(".system-son").addClass("open");
                $(this).siblings(".system-son").find("li.text").eq(0).addClass("active");
                if(e.target.id=="con-one"){
                    $(this).siblings("i").find('img').attr({"src":'../img/icon_shouhui.png'})
                }
            });
            $(".system-son").delegate("li.text","mouseenter",function () {
                $(".system-son .text").removeClass("active");
                $(this).addClass("active");
            });

            $(document).on("click",function (e) {
                e.stopPropagation();
                if(e.target.id!='con'&& e.target.id!='con-one'&&e.target.id!='con-two'){
                    $(".system-son").removeClass("open");
                    $("#con-one").siblings("i").find('img').attr({"src":'../img/icon_xiala_12x7.png'})
                }
            })

            $('#con').on("change",function () {
                if(!$(this).val()){
                    $(".country.con").find("i").css({"display":'none'});
                }
            });
            scope.get=function (para,paraCode) {
                scope.search=para;
                scope.country=paraCode;
                if(scope.search){
                    $('.country.con').find("i").css({"display":'block'});
                }
            }
            $('.country.con i').on("click",function () {
                scope.search='';
                scope.country="";
                scope.$apply();
                $(this).css({"display":"none"});
            })
        }
    }
}).directive("selectNetId",function () {
    return{
        'restrict':'E',
        scope: {
            token:"=",
            user:"=",
            url:"=",
            searchNetId:"=",
            advertiser:"="
        },
        replace:true,
        template:"<div class=\"selectNetIdWrap\">\n" +
        "<label for=\"selectNetId\" class=\"label\">advertiser</label>\n" +
        "<input type=\"text\" class=\"form-control netIdCon\" id=\"selectNetId\" ng-model='searchNetId' placeholder='Net ID'>\n" +
        "<ul class=\"netIdList\">\n" +
        "<li ng-class=\"{'active':$index==0}\" title=\"{{item.netid}}-{{item.company}}\" ng-repeat=\"item in netWorkList | filter:{netid:searchNetId}\" id=\"{{item.netid}}\" ng-click='getCon(item.netid,item.company)'>{{item.netid}}-<span ng-if=\"item.api==true\">api-</span>{{item.company}}</li>\n" +
        "</ul>\n" +
        "</div>",
        link:function ($scope,element,attrs) {
            $("#selectNetId").on("click",function () {
                $(this).siblings("ul.netIdList").css({"display":"block"});
            });
            $(".netIdList").delegate("li","mouseenter",function(){
                $(".netIdList li").removeClass("active");
                $(this).addClass("active");
            });
            $(document).on("click",function(e){
                if($(e.target).attr("id")!="selectNetId"){
                    $(".netIdList").css({"display":"none"});
                }
            });
            $scope.getCon=function(netId,company){
                $scope.searchNetId=netId+"-"+company;
                $scope.advertiser=netId;
            }
            $.ajax({
                type:"post",
                url:$scope.url+"findUsrIdNameByRoleId",
                data:{
                    token:$scope.token,
                    userId:$scope.user.id,
                    roleId:3
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callbackNetId",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    if(data.respCode=="00"){
                        $scope.netWorkList=data.content;
                        $scope.$apply();
                    }
                }
            })
        }
    }
}).directive("selectAffId",function () {
    return{
        'restrict':'E',
        scope: {
            id:"@",
            token:"=",
            user:"=",
            url:"="
        },
        replace:true,
        template:"<select class=\"form-control input-con\" >\n" +
        "<option ng-repeat=\"item in pubData\" value=\"{{item.netid}}\">{{item.netid}} - {{item.user_name}}</option>\n" +
        "</select>",
        link:function ($scope,element,attrs) {
            $.ajax({
                type:"post",
                url:$scope.url+"findUsrIdNameByRoleId",
                data:{
                    token:$scope.token,
                    userId:$scope.user.id,
                    roleId:2
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callbackAffId",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    //console.log(data);
                    if(data.respCode=="00"){
                        $scope.pubData=data.content;
                        $scope.$apply();
                    }else{
                        console.error(data.errorInfo)
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        }
    }
}).directive("multiSelect",function () {
    /**
     * data: 1.父控制器传过来  或者  2. 本控制器下ajax请求获取。
     * transmitData：接受父控制器定义的对象，数据双向绑定，把多选的值进行前后台交互
     * */
    return{
        'restrict':"EA",
        scope:{
            data:'=',
            transmitData:"="
        },
        replace: true,
        template:"<div id=\"multiselectBox\">\n" +
        "<ul class=\"multiselectWrap\">\n" +
        "<li class=\"selectDefault\">\n" +
        "<input type=\"text\">\n" +
        "</li>\n" +
        "</ul>\n" +
        "<ul id=\"conListWrap\">\n" +
        "<li class=\"'active':$index=='0'\" ng-repeat='item in data'>{{item}}</li>\n" +
        "</ul>\n" +
        "</div>",
        link:function (scope,element,attrs) {
            $(document).on("click",function(e){
                if(e.target.className=="multiselectWrap"){
                    $("li.selectDefault input").get(0).focus();
                    $(".multiselectWrap").siblings("#conListWrap").css({"display":"block"});
                }else if(e.target.className=="delSelectedEl"){
                    var delCon=$(e.target).siblings("span").html();
                    $("#conListWrap li").each(function (index,dom) {
                        if($(dom).html()==delCon){
                            $(dom).css({"display":"block"});
                            return;
                        }
                    })
                    $(e.target).parent().remove();
                }else{
                    $("#conListWrap").css({"display":"none"})
                }

            });
            $("#conListWrap").delegate("li","mouseenter",function () {
                $("#conListWrap li").removeClass("active");
                $(this).addClass("active");
            })
            $("#conListWrap").delegate("li","click",function(){
                $(this).parent().css({"display":"none"});
                var newObj=$("<li class='selectedEl'><span></span><em class='delSelectedEl'>x</em></li>");
                newObj.find("span").html($(this).html());
                newObj.prependTo(".multiselectWrap");
                $(this).css({"display":"none"});
            });
            //监听dom元素变化
            var container =element.find(".multiselectWrap").get(0);
            container.addEventListener('DOMSubtreeModified', function () {
                var selectedArr=[];
                $("li.selectedEl span").each(function (index,dom) {
                    selectedArr.push($(dom).html());
                })
                scope.transmitData.a=selectedArr;
            }, false);

        }
    }
}).directive('copyContent',function () {
    return{
        restrict:'A',

        link:function ($scope, $element, $attrs) {
            var clipboard=new Clipboard($element[0]);
            clipboard.on('success', function() {
                $(".add_successfully").css({'display':"block"}).html("复制成功");
                setTimeout(function () {
                    $(".add_successfully").css({'display':"none"});
                    $(".triangle").css({"display":"none"});
                    $(".titleInfo").css({"display":"none"});
                },1000)
            });
            clipboard.on('error', function(e) {
                console.log(e);
            });
        }
    }
})
