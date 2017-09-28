angular.module("controller",["ngRoute","service"])
    .controller("index",["$scope","$location","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData","$rootScope",function ($scope,$location,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData,$rootScope) {
        //console.log(userData);
        $rootScope.num=localStorage.num?localStorage.num*1:0;
        $scope.$watch('num',function (newValue,oldValue) {
            if(newValue!=oldValue){

            }
        });
        $scope.accountName=userData.company;
        $scope.accountId=userData.id;
        var confirmedFlag=localStorage["confirmed"+userData.id]?localStorage["confirmed"+userData.id]:'';
        $scope.confirmed=localStorage["confirmed"+userData.id];
        $scope.ref=localStorage['ref'+userData.id]?$.parseJSON(localStorage['ref'+userData.id]):"";
        $scope.para=$location.path().split("/");
        if($scope.para[1]==undefined || $scope.para[1]==""){
            $scope.paraText="Dashboard";
        }else if($scope.para[1]=="appstore" || $scope.para[1]=="myStore" || $scope.para[1]=="appDetail"){
            $scope.paraText="App Store";
        }else if($scope.para[1]=="report"){
            $scope.paraText="Report";
        }else if($scope.para[1]=="payment"){
            $scope.paraText="Payment";
        }else if($scope.para[1]=="profile" || $scope.para[1]=="trafficInfo" || $scope.para[1]=="password"){
            $scope.paraText="Account center";
        }else if($scope.para[1]=="postBack" || $scope.para[1]=="apiDoc"){
            $scope.paraText="Support";
        }
        $scope.navSelected=[
            {
                title:"Dashboard",
                href:"#!/",
                icon:"iconfont icon-yibiaopan"
            },
            {
                title:"App Store",
                href:"#!/appstore",
                icon:"iconfont icon-wangdianshangpin"
            },
            {
                title:"Report",
                href:"#!/report",
                icon:"iconfont icon-baogao"
            },
            {
                title:"Payment",
                href:"#!/payment",
                icon:"iconfont icon-fukuan"
            },
            {
                title:"Support",
                href:"#!/postBack",
                icon:"iconfont icon-ajbshezhizhongxinjishuzhichi"
            },
            {
                title:"Account center",
                href:"#!/profile",
                icon:"iconfont icon-yonghu"
            }

        ];
        setTimeout(function () {
            $("ul.top-nav").find("li").each(function (index,dom) {
                if($(dom).hasClass("action")){
                    $(".sub-nav-list").css({"display":"none"});
                    $(".sub-nav-list").eq(index).css({"display":"block"});
                }
            });
        },0);
        //页面加载
        if(confirmedFlag==''){
                $.ajax({
                    type:"post",
                    url:urlInfoOne+"findOtherUserInformat",
                    data:{
                        token:token,
                        id:userData.id,
                        userId:userData.id,
                        refid:userData.refid
                    },
                    dataType:"jsonp",
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callbackIndex",
                    cache:false,
                    beforeSend :function(xmlHttp){
                        xmlHttp.setRequestHeader("If-Modified-Since","0");
                        xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    },
                    success:function (data) {
                        //console.log(data);
                        if(data.respCode=='00'){
                            if(data.content.Confirmed!=undefined){
                                $scope.confirmed=data.content.Confirmed.toFixed(2);
                                localStorage["confirmed"+userData.id]=JSON.stringify($scope.confirmed);
                            }else{
                                localStorage["confirmed"+userData.id]="";
                            }
                            $scope.ref=data.content.ref;
                            if($scope.ref!=undefined){
                                localStorage['ref'+userData.id]=JSON.stringify($scope.ref);
                            }else{
                                localStorage['ref'+userData.id]="";
                            }
                            $scope.$apply();
                        }else{
                            console.error(data.errorInfo);
                        }
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
        }
        //用户中心效果
        var flag=true;
        $("#userCenter img").on("click",function () {
            if(flag){
                $(this).siblings(".userCenter_con").removeClass("zoomOutUp").addClass("zoomInDown").css({"opacity":1});
                flag=false;
            }else{
                $(this).siblings(".userCenter_con").removeClass("zoomInDown").addClass("zoomOutUp").css({"opacity":0});
                flag=true;
            }
        })
        //时间效果
        function getLocalTime(para) {
            var time = new Date();
            var localTime=time.getTime();
            var localOffset = time.getTimezoneOffset() * 60000;
            var utc=localOffset+localTime;
            var offset = para;
            var calctime = utc + (3600000*offset);
            //var nd = new Date(calctime);
            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };
            var time1 = new Date(calctime).Format("yyyy-MM-dd hh:mm:ss");
            return time1;
        }
        setInterval(function () {
            $("#time span").html(getLocalTime(8));
        },1000)
        setInterval(function () {
            $("#USTime span").html(getLocalTime(-5));
        },1000)

        //导航栏效果
        $(".top-nav").delegate("li","click",function () {
            $(".top-nav li").removeClass("action");
            $(".top-nav li a").removeClass("swing");
            $(this).addClass("action");
            $(this).find("a").addClass("swing");
            var num=$(this).index();
            $(".sub-nav-list").css({"display":"none"});
            $(".sub-nav-list").eq(num).css({"display":"block"});
        })
        //勾选效果
        $(".shopping-list").on("click",function (e) {
            if(e.target.className=='radioImg' || e.target.className=="name"){
                var attr=$(this).attr("attr");
                if(attr=="false"){
                    $(this).attr({"attr":"true"});
                    $(this).find("span.img img").attr({"src":"../img/shopcart_Checkbox_selected.png"});
                }else if(attr=="true"){
                    $(this).attr({"attr":"false"});
                    $(this).find("span.img img").attr({"src":"../img/shopcart_Checkbox_default.png"});
                }
            }

        })


            //tab nav
        $(".tab-nav .icon").on("click",function (e) {
            var attr =$(this).find(".tab-nav-con-wrap").css("display");
            if(e.target.id=="icon" || e.target.id=="img"){
                if(attr=="none"){
                    $(this).find(".tab-nav-con-wrap").css({"display":"block"});
                    //发起ajax请求
                    $.ajax({
                        type:'post',
                        url:urlInfoOne+'AfffindNewApp',
                        data:{
                            token:token,
                            affid:userData.id,
                            userId:userData.id
                        },
                        dataType:'jsonp',
                        jsonp:'jsonpCallback',
                        jsonpCallback:"callback",
                        success:function (data) {
                            //console.log(data);
                            if(data.respCode=='00'){
                                $scope.indexData=data.content;
                                $scope.lengthApp=$scope.indexData.length;
                                //console.log($scope.lengthApp);
                                $scope.$apply();
                            }
                        },
                        error:function (data) {
                            console.log(data);
                        }
                    })
                }else{
                    $(this).find(".tab-nav-con-wrap").css({"display":"none"});
                }
            }


        });

        $scope.checkLength=function (para) {
            if(para>0){
                return true;
            }else{
                return false;
            }
        }

        // //点击send发送数据
        $("#btn").on("click",function () {
            var arr=$(".shopping-list[attr='true']");
            var str="";
            for(var i=0;i<arr.length;i++){
               str=str+$(arr[i]).find("p.name").html()+"-";
            }
            str=str.slice(0,-1);
            var usrId=$scope.keyid;
            var data={
                id:usrId,
                classiFications:str,
                token:token,
                userId:userData.id
            }
            $.ajax({
                type:"post",
                url:urlInfoOne+'sendMsg',
                data:data,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (data) {
                    if(data.respCode=="03"){
                        alert(data.errorInfo);
                        $(".tab-nav-con-wrap").css({"display":"none"});
                        $(".shopping-box").css({"display":"none"});
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })

        //判断是否加end类名的函数
        $scope.check=function (paraOne,para) {
            var index=para+1;
            if(paraOne=="app"){
                if($scope.lengthApp==index){
                    return true;
                }else{
                    return false;
                }
            }else if(paraOne=="cap"){
                if($scope.lengthCap==index){
                    return true;
                }else{
                    return false;
                }
            }else if(paraOne=="pay"){
                if($scope.lengthPay==index){
                    return true;
                }else{
                    return false;
                }
            }else if(paraOne=="pause"){
                if($scope.lengthpause==index){
                    return true;
                }else{
                    return false;
                }
            }

        }
        //点击删除
        $(".shopping-box").delegate('.delCon',"click",function () {
            var obj=$(this);
            var appid=$(this).siblings("p.name").find("span").html();
            $.ajax({
                type:"post",
                url:urlInfoOne+"AffDeletCartApp",
                data:{
                    appid:appid,
                    token:token,
                    affid:userData.id,
                    userId:userData.id
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (data) {
                    if(data.respCode=="00"){
                        obj.parents(".shopping-con").remove();
                        $("#prompt").css({"display":"block"});
                        $('.'+appid).removeClass("active"); //解除相应app的锁 不能重复添加
                        $rootScope.num=$rootScope.num-1;
                        localStorage.num=$rootScope.num;
                        $scope.$apply();
                        setTimeout(function () {
                            $("#prompt").css({"display":"none"});
                            $(".tab-nav-con-wrap").css({"display":"none"});
                        },3000);
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })
        //退出登录
        $(".user_detailCon").find("i").bind('click',function () {

            // $.ajax({
            //     type:"post",
            //     data:{
            //         id:userData.id,
            //         token:token
            //     },
            //     dataType:"jsonp",
            //     jsonp:"jsonpCallback",
            //     jsonpCallback:"callbac",
            //     success:function (data) {
            //         console.log(data);
            //     },
            //     error:function (data) {
            //         console.log(data);
            //     }
            // })
            localStorage.clear();
            window.location="http://u.xbaos.com/";

        })



    }])
    .controller("dashboard",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        //hover效果
       $(".new_content").delegate(".img_box","mouseenter",function () {
           $(this).find(".img_hover").css({"display":"block"}).addClass('bounceInUp');
       })
        $(".new_content").delegate(".img_box","mouseleave",function () {
            $(this).find(".img_hover").css({"display":"none"});
        })
        $(".add_img").hover(function () {
            $(this).find("a").addClass("rotateIn");
        },function () {
            $(this).find("a").removeClass("rotateIn");
        })
        //console.log(token)
        //页面载入 发起ajax 请求
        var arrLegend=[];
        var arrItem=[];
        var appcount=[];
        var callback=[];
        var click=[];
        var earning=[];
        $scope.data=[];
        $scope.legend=[];
        $scope.item=[];
        $.ajax({
            type:"post",
            url:urlInfoTwo+"queryAffDashboard",
            dataType:"jsonp",
            data:{
                token:token,
                id:userData.id,
                userId:userData.id
            },
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
                $("#loading-center").css({"display":"block"});
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.AppEPClist=data.content.AppEPClist;
                    for(var i=0;i<$scope.AppEPClist.length;i++){
                        $scope.AppEPClist[i].epc=$scope.AppEPClist[i].epc.toFixed(5);
                    }
                    $scope.ApprovedApplist=data.content.ApprovedApplist;
                    $scope.NewApplist=data.content.NewApplist;
                    $scope.earnings=data.content.earnings;
                    $scope.today=data.content.today//今天的数据
                    $scope.yesterday=data.content.yesterday;//昨天的数据
                    for(var i in $scope.earnings[0]){
                        if(i!="date"){
                            if(i=="click"){
                                arrLegend.push(i+"(×10,000)");
                            }else{
                                arrLegend.push(i);
                            }

                        }
                    }
                    for(var x=0;x<$scope.earnings.length;x++){
                        arrItem.unshift($scope.earnings[x].date);
                        appcount.unshift($scope.earnings[x].appcount);
                        callback.unshift($scope.earnings[x].callback);
                        click.unshift($scope.earnings[x].click);
                        earning.unshift($scope.earnings[x].earning);
                    }
                    $scope.item=arrItem;
                    $scope.legend=arrLegend;
                    $scope.data.push(appcount)
                    $scope.data.push(callback)
                    $scope.data.push(click)
                    $scope.data.push(earning);
                    //console.log(earning);



                    $scope.$apply();

                }else{
                    console.error("error");
                }
            },
            complete:function () {
                $("#loading-center").css({"display":"none"});
            },
            error:function (data) {
                if(data){
                    $(".prompt").css({"display":'block'}).html("Network connection error");
                    setTimeout(function () {
                        $(".prompt").css({"display":'none'});
                    },2000)
                }
            }
        })


    }])
    .controller("appstore",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData","$rootScope",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData,$rootScope) {
        $scope.packageName="";
        $scope.appName="";
        $scope.appId="";
        $scope.countryCode="";
        $scope.type='all';
        $scope.pages='';
        var id=0;
        $scope.imgUrl="http://xbaos-countryicon.oss-ap-southeast-1.aliyuncs.com/";
        //获取app详细内容
        //获取json
        $.getJSON('../js/country.json',function (data) {
            $scope.data=data;
            $scope.$apply();
        })
        //检查显示ios or Android
        $scope.checkIos=function (para) {
            if(para=='iOS'){
                return true;

            }else {
                return false;
            }

        }
        $scope.checkAndroid=function (para) {
            if(para=="Android"){
                return true;
            }else{
                return false;
            }
        }

        var pageNo=1;//当前页数
        var pageSize=20;//长度：20
        $scope.pageNo=pageNo;
        $scope.pageSize=pageSize;
        $scope.ajaxData={
            id:id,
            userId:userData.id,
            name:$scope.appName,
            packageName:$scope.packageName,
            accept: $scope.countryCode,
            type:$scope.type,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            token:token
        };
        //ajax 函数
        function toGO() {
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findAffAppList",
                dataType: 'jsonp',
                data: $scope.ajaxData,
                jsonp: "jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (e) {
                    //console.log(e)
                    if(e.respCode=="00"){
                        $scope.contents=e.content.dataList;
                        $scope.pages=e.content.pages;
                        $scope.$apply();
                    }else{
                        console.log(e);
                    }
                },
                complete:function () {
                    $("#loading-center").css({"display":"none"});
                },
                error:function (e) {
                    console.log(e);
                }
            })
        }
            //页面载入-ajax请求all
            toGO();

            //输入页面 跳转
            $("#toPages").on("blur",function () {
                $scope.ajaxData={
                    id:id,
                    userId:userData.id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token
                };
                toGO();
            })
            $("#toPages").bind("keypress",function (e) {
                if(e.keyCode==13){
                    $scope.ajaxData={
                        id:id,
                        userId:userData.id,
                        name:$scope.appName,
                        packageName:$scope.packageName,
                        accept: $scope.countryCode,
                        type:$scope.type,
                        pageNo:$scope.pageNo,
                        pageSize:$scope.pageSize,
                        token:token
                    };
                    toGO();
                }
            });
            $(".select-list li input").each(function (index,dom) {
                $(dom).bind("keypress",function (e) {
                    if(e.keyCode==13){
                        $(".btn-search").click();
                    }
                })
            })

        //点击搜索
        $scope.ajaxGet=function () {
            $scope.type=$scope.system;
            if($scope.type==undefined){
                $scope.type="all";
            }
            if($scope.appId==""){
                id=0;
            }else{
                id=$scope.appId;
            }
            if(isNaN($scope.appId)==false){
                $scope.ajaxData={
                    id:id,
                    userId:userData.id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token
                };
                   toGO();
            }else{
                $('#con-id').parent('.system.con').addClass("active");
                $('#con-id').get(0).focus();
            }

        }
        //首页 上一页 下一页 末页
        $("#page-con li a").on("click",function () {
            if($(this).parent().attr("id")==='firstpage'){
                $scope.pageNo=1;
                $scope.pageSize=20;
                $scope.ajaxData={
                    id:id,
                    userId:userData.id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token
                };
                toGO();

            }else if($(this).parent().attr("id")==='previouspage'){
                $scope.pageNo=$scope.pageNo-1;
                if($scope.pageNo<=0){
                    $(".pagesPrompt").css({"display":"block"}).html("It's the first page already");
                    setTimeout(function () {
                        $(".pagesPrompt").css({"display":"none"})
                    },2000)
                    $scope.pageNo=1;
                    return false;
                }
                $scope.ajaxData={
                    id:id,
                    userId:userData.id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token
                };
                toGO();
            }else if($(this).parent().attr("id")==='nextpage'){
                $scope.pageNo=$scope.pageNo+1;
                if($scope.pageNo>$scope.pages){
                    $(".pagesPrompt").css({"display":"block"}).html("It's the last page already");
                    setTimeout(function () {
                        $(".pagesPrompt").css({"display":"none"})
                    },2000)
                    $scope.pageNo=$scope.pages;
                    return false;
                }
                $scope.ajaxData={
                    id:id,
                    userId:userData.id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token
                };
                toGO();
            }else if($(this).parent().attr("id")==='lastpage'){
                $scope.pageNo=$scope.pages;
                $scope.ajaxData={
                    id:id,
                    userId:userData.id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token
                };
                toGO();
            }
        })

        //加入购物车
        $scope.cap=0;
            var flag=true;
        var offset = $("#img").offset();
        $(".cartBox").delegate("div.patch .content img","click",function () {
            var appId=$(this).parent().siblings(".header").find("span").eq(0).attr("id");
            var payout=$(this).siblings(".content_inner").find(".app_detail_con p i").attr("id");
            //console.log(appId+"-----yes");
            if(flag && !$(this).hasClass("active")){
                $(this).addClass("active");
                flag=false;
                var addcar = $(this);
                var img = addcar.siblings(".content_inner").find("img.appIcon").attr("src");
                var flyer = $('<img class="u-flyer" src="'+img+'">');
                flyer.fly({
                    start: {
                        left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                        top: event.pageY //开始位置（必填）
                    },
                    end: {
                        left: offset.left+10, //结束位置（必填）
                        top: offset.top+10, //结束位置（必填）
                        width: 0, //结束时宽度
                        height: 0 //结束时高度
                    },
                    onEnd: function(){ //结束回调
                        console.log("飞入成功！")
                    }
                });
                $.ajax({
                    type:"post",
                    url:urlInfoOne+"AffAddCart",
                    data:{
                        appid:appId,
                        payout:payout,
                        cap:$scope.cap,
                        refid:userData.id,
                        affid:userData.id,
                        token:token,
                        userId:userData.id
                    },
                    dataType:"jsonp",
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callback",
                    beforeSend :function(xmlHttp){
                        xmlHttp.setRequestHeader("If-Modified-Since","0");
                        xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    },
                    success:function (data) {
                        //console.log(data);
                        if(data.respCode=="00"){
                            $rootScope.num=$rootScope.num+1;
                            localStorage.num=$rootScope.num;
                            $scope.$apply();
                            flag=true;
                        }else{
                            console.error(data.errorInfo);
                        }
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            }


        })
        //获取System
        $(".system-son").delegate(".text.get-con","click",function () {
            $scope.system=$(this).html();
            $scope.$apply();

        })


        //下拉框效果
        var flag=true;
        $("input.con").on('focus',function (e) {
            e.stopPropagation();//清除默认设置；
            $(this).siblings(".system-son").css({"display":"block"});
            $(this).siblings(".system-son").find("li.text").eq(0).addClass("active")
            if(e.target.id=="con-one"){
                $(this).siblings("i").find('img').attr({"src":'../img/icon_shouhui.png'})
            }
        })
        $(".system-son .text").hover(function () {
            $(".system-son .text").removeClass("active");
            $(this).addClass("active")
        },function () {
        });
        $scope.search="";
        $scope.get=function (para,paraCode) {
            $scope.search=para;
            $scope.countryCode=paraCode;

            if($scope.search){
                $('.country.con').find("i").css({"display":'block'});
            }
        }
        $(document).on("click",function (e) {
            e.stopPropagation();
            if(e.target.id!='con'&& e.target.id!='con-one'){
                $(".system-son").css({"display":"none"});
                $("#con-one").siblings("i").find('img').attr({"src":'../img/icon_xiala_12x7.png'})
            }
        })

        $('#con').on("change",function () {
            if(!$(this).val()){
                $(".country.con").find("i").css({"display":'none'});
            }
        })
        $('.country.con i').on("click",function () {
            // $(this).siblings("#con").val("");
            $scope.search='';
            $scope.$apply();
            $(this).css({"display":"none"});
        })

    }])
    .controller("myStore",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.packageName="";
        $scope.appName="";
        $scope.appId="";
        $scope.countryCode="";
        $scope.type='all';
        $scope.pages='';
        var id=0;
        $scope.imgUrl="http://xbaos-countryicon.oss-ap-southeast-1.aliyuncs.com/";
        //获取app详细内容
        //获取json
        $.getJSON('../js/country.json',function (data) {
            $scope.data=data;
            $scope.$apply();
        })
        //检查显示ios or Android
        $scope.checkIos=function (para) {
            if(para=='iOS'){
                return true;

            }else {
                return false;
            }

        }
        $scope.checkAndroid=function (para) {
            if(para=="Android"){
                return true;
            }else{
                return false;
            }
        }

        var pageNo=1;//当前页数
        var pageSize=20;//长度：20
        $scope.pageNo=pageNo;
        $scope.pageSize=pageSize;
        $scope.ajaxData={
            id:id,
            name:$scope.appName,
            packageName:$scope.packageName,
            accept: $scope.countryCode,
            type:$scope.type,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            token:token,
            userId:userData.id
        };
        //页面载入-ajax请求all
        toGO();

        //输入页面 跳转
        // $("#toPages").on("blur",function () {
        //     $scope.ajaxData={
        //         id:id,
        //         name:$scope.appName,
        //         packageName:$scope.packageName,
        //         accept: $scope.countryCode,
        //         type:$scope.type,
        //         pageNo:$scope.pageNo,
        //         pageSize:$scope.pageSize,
        //         token:token
        //     };
        //     toGO();
        // })
        document.onkeydown=function (e) {
            if(e.keyCode=="13"){
                $scope.ajaxData={
                    id:id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                };
                toGO()
            }
        }
        //ajax 函数
        function toGO() {
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findAffMyAppList",
                dataType: 'jsonp',
                data: $scope.ajaxData,
                jsonp: "jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (e) {
                    console.log(e);
                    if(e.respCode=="00"){
                        $scope.contents=e.content.dataList;
                        $scope.pages=e.content.pages;
                        $("#loading-center").css({"display":"block"});
                        $scope.$apply();
                    }else{
                        console.log(e);
                    }
                },
                complete:function () {
                    $("#loading-center").css({"display":"none"});
                },
                error:function (e) {
                    console.log(e);
                }
            })
        }

        //点击搜索
        $scope.ajaxGet=function () {
            $scope.type=$scope.system;
            if($scope.type===undefined){
                $scope.type="all";
            }
            if($scope.appId==""){
                id=0;
            }else{
                id=$scope.appId;
            }
            if(isNaN($scope.appId)==false){
                $scope.ajaxData={
                    id:id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                };
                toGO();
            }else{
                $('#con-id').parent('.system.con').addClass("active");
                $('#con-id').get(0).focus();
            }

        }
        //首页 上一页 下一页 末页
        $("#page-con li a").on("click",function () {
            if($(this).parent().attr("id")==='firstpage'){
                $scope.pageNo=1;
                $scope.pageSize=20;
                $scope.ajaxData={
                    id:id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                };
                toGO();

            }else if($(this).parent().attr("id")==='previouspage'){
                $scope.pageNo=$scope.pageNo-1;
                if($scope.pageNo<=0){
                    $(".pagesPrompt").css({"display":"block"}).html("It's the first page already");
                    setTimeout(function () {
                        $(".pagesPrompt").css({"display":"none"})
                    },2000)
                    $scope.pageNo=1;
                    return false;
                }
                $scope.ajaxData={
                    id:id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                };
                toGO();
            }else if($(this).parent().attr("id")==='nextpage'){
                $scope.pageNo=$scope.pageNo+1;
                if($scope.pageNo>$scope.pages){
                    $(".pagesPrompt").css({"display":"block"}).html("It's the last page already");
                    setTimeout(function () {
                        $(".pagesPrompt").css({"display":"none"})
                    },2000)
                    $scope.pageNo=$scope.pages;
                    return false;
                }
                $scope.ajaxData={
                    id:id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                };
                toGO();
            }else if($(this).parent().attr("id")==='lastpage'){
                $scope.pageNo=$scope.pages;
                $scope.ajaxData={
                    id:id,
                    name:$scope.appName,
                    packageName:$scope.packageName,
                    accept: $scope.countryCode,
                    type:$scope.type,
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                };
                toGO();
            }
        })


        //获取System
        $(".system-son").delegate(".text.get-con","click",function () {
            $scope.system=$(this).html();
            $scope.$apply();

        })


        //下拉框效果
        var flag=true;
        $("input.con").on('focus',function (e) {
            e.stopPropagation();//清除默认设置；
            $(this).siblings(".system-son").css({"display":"block"});
            $(this).siblings(".system-son").find("li.text").eq(0).addClass("active")
            if(e.target.id=="con-one"){
                $(this).siblings("i").find('img').attr({"src":'../img/icon_shouhui.png'})
            }
        })
        $(".system-son .text").hover(function () {
            $(".system-son .text").removeClass("active");
            $(this).addClass("active")
        },function () {
        });
        $scope.search="";
        $scope.get=function (para,paraCode) {
            $scope.search=para;
            $scope.countryCode=paraCode;

            if($scope.search){
                $('.country.con').find("i").css({"display":'block'});
            }
        }
        $(document).on("click",function (e) {
            e.stopPropagation();
            if(e.target.id!='con'&& e.target.id!='con-one'){
                $(".system-son").css({"display":"none"});
                $("#con-one").siblings("i").find('img').attr({"src":'../img/icon_xiala_12x7.png'})
            }
        })

        $('#con').on("change",function () {
            if(!$(this).val()){
                $(".country.con").find("i").css({"display":'none'});
            }
        })
        $('.country.con i').on("click",function () {
            // $(this).siblings("#con").val("");
            $scope.search='';
            $scope.$apply();
            $(this).css({"display":"none"});
        })
    }])
    .controller("appDetail",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.appId=$routeParams.id; //获取细节的 appId
        $scope.payOut=$routeParams.payOut;
        $scope.cap=$routeParams.cap;
        if($scope.cap=='0'){
            $scope.cap="Open Cap";
        }
        $scope.apply=$routeParams.apply;
        //console.log($scope.appId,$scope.payOut,$scope.cap,$scope.apply)
        $.ajax({
            type:'post',
            url:urlInfoTwo+'findAffAppDetail',
            data:{
                appid:$scope.appId,
                token:token,
                userId:userData.id
            },
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:'callback',
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                console.log(data);
                if(data.respCode=="00"){
                    $scope.dataDetail=data.content.appdetail;
                    $scope.tracking=data.content.tracking;
                    $scope.desc=$scope.dataDetail.description;
                    $("#descriptionCon").html($scope.desc)
                    if($scope.dataDetail.idfa=="0" && $scope.dataDetail.gaid=="0"){
                        $scope.device="NONE";
                    }else if($scope.dataDetail.idfa=="1"){
                        $scope.device="Upload idfa";
                    }else if($scope.dataDetail.gaid=="1"){
                        $scope.device="Upload gaid";
                    }
                    $scope.$apply();
                }else{
                     console.error(data.errorInfo)
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
        $(".closeBtn").bind("click",function () {
            $("#applyBox").css({"display":"none"});
            $('.mask').css({"display":"none"});
        })
        //点击申请
        $(".trackLink").delegate("a.trackLinkApply","click",function () {
            $(".mask").css({"display":"block"});
            $("#applyBox").css({"display":"block"});
        })
        $(".goBtn").bind("click",function () {
            if($scope.cap=="Open Cap"){
                $scope.cap=0;
            }
            $.ajax({
                type:'post',
                url:urlInfoOne+"AffAddCart",
                data:{
                    token:token,
                    affid:userData.id,
                    refid:userData.id,
                    appid:$scope.appId,
                    payout:$scope.payOut,
                    cap:$scope.cap,
                    userId:userData.id
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (data) {
                    console.log(data);
                    if(data.respCode=="00"){
                        $("#applyBox").css({"display":"none"});
                        $('.mask').css({"display":"none"});
                    }else{
                        $(".promptContentWrap p").html("You do not have permission to apply for this application, please contact your account manager.")
                        $(".goBtn").css({"display":"none"});
                        $(".closeBtn").css({"display":"block"});
                    }
                },
                error:function (data) {
                    console.log(data)
                }
            })
        })

    }])
    .controller("report",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
        $("#startDate").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            showMeridian: true,
            pickerPosition: "bottom-left",
            startView: 2,//Monthly view
            minView: 2//The most accurate time - to - view view that the date - time picker can provide
        });
        $("#endDate").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            showMeridian: true,
            pickerPosition: "bottom-left",
            startView: 2,//Monthly view
            minView: 2//The most accurate time - to - view view that the date - time picker can provide
        });
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        var time1 = new Date().Format("yyyy-MM-dd");
        $scope.startDate=time1;
        $scope.endDate=time1;
        $scope.appName="";
        $scope.pageNo=1;
        $scope.pageSize=10;

        function reportAjax() {
                $.ajax({
                    type:"post",
                    url:urlInfoTwo+"findAppReport",
                    data:{
                        pageNo:$scope.pageNo,
                        pageSize:$scope.pageSize,
                        appname:encodeURI($scope.appName),
                        firstdate:$scope.startDate,
                        lastdate:$scope.endDate,
                        token:token,
                        userId:userData.id,
                        affid:userData.id
                    },
                    dataType:'jsonp',
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callback",
                    cache:false,
                    beforeSend :function(xmlHttp){
                        xmlHttp.setRequestHeader("If-Modified-Since","0");
                        xmlHttp.setRequestHeader("Cache-Control","no-cache");
                        $("#loading-center").css({"display":"block"});
                    },
                    success:function (data) {
                        if(data.respCode=="00"){
                            $scope.flag=function () {
                                if(data.content.resultlist.dataList.length>0){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                            $scope.reportData=data.content.resultlist.dataList;
                            for(var i=0;i<$scope.reportData.length;i++){
                                $scope.reportData[i].eCPC=($scope.reportData[i].revenue/$scope.reportData[i].tracking).toFixed(5);
                            }
                            $scope.pages=data.content.resultlist.pages;
                            $scope.coversion=data.content.coversion;
                            $scope.revenue=data.content.revenue;
                            $scope.$apply();
                        }else {
                            console.error("error")
                        }
                    },
                    complete:function () {
                        $("#loading-center").css({"display":"none"});
                    }
                })
        }
        //点击搜索按钮 发动ajax
        $(".btnSearch").on('click',function () {
            reportAjax();
        })
        //分页导航
        $("#firstpage a").on("click",function () {
            $scope.pageNo=1;
            reportAjax()
        })
        $("#previouspage a").on("click",function () {
            $scope.pageNo=$scope.pageNo-1;
            if($scope.pageNo<=0){
                $scope.pageNo=1;
            }
            reportAjax()
        })
        $("#nextpage a").on("click",function () {
            $scope.pageNo=$scope.pageNo+1;
            if($scope.pageNo>$scope.pages){
                $scope.pageNo=$scope.pages;
            }
            reportAjax()
        })
        $("#lastpage a").on("click",function () {
            $scope.pageNo=$scope.pages;
            reportAjax()
        })
        $("#jumpBtn").on("click",function () {
            reportAjax();
        })
        //App点击 出细节
        $(".table").delegate(".app","click",function () {
            if($(this).html()=="No Resulst Found"){
                return false;
            }
            var appId=$(this).attr("attr");
            $(".alert_box").css({"display":"block"});
            $(".mask").css({"display":"block"});
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findAffReportDate",
                data:{
                    firstdate:$scope.startDate,
                    lastdate:$scope.endDate,
                    appid:appId,
                    token:token,
                    userId:userData.id
                },
                dataType:'jsonp',
                jsonp:"jsonpCallback",
                jsonpCallback:'callback',
                success:function (data) {
                    if(data.respCode=="00"){
                        $scope.appAllData=data.content;
                        $scope.$apply();
                    }else{
                        console.error(data.errorInfo);
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })
        //点击关闭
        $(".header_img img").on("click",function () {
            $(".alert_box").css({"display":"none"});
            $(".mask").css({"display":"none"});
        })

    }])
    .controller("payment",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.title="account";
        $scope.desc = 0;
        //    模拟数据
        $scope.blance="";
        $scope.detail="";
        $scope.account="";
        $scope.pageNo=1;
        $scope.pageSize=6;
        $scope.pages="";
        $scope.history="";
        //    点击downLHeader显示弹框
        $(".table").delegate(".popup","click",function () {
            var id=$(this).attr("id");
            $(this).parents().find(".form-box").removeClass("hide");
            $(this).parents().find(".bgC").removeClass("hide");
            $.ajax({
                type:"post",
                url:urlInfoTwo+"queryPaymentAccount",
                data:{
                    id:id,
                    token:token,
                    userId:userData.id
                },
                dataType:'jsonp',
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (data) {
                    console.log(data);
                    if(data.respCode=="00"){
                        $scope.downLHeaderData=data.content;
                        $scope.additionalPaymentDetails=$scope.downLHeaderData.additionalPaymentDetails;
                        $scope.$apply();
                    }else{
                        console.error(data.errorInfo)
                    }
                },
                error:function(data){
                    console.log(data);
                }
            })
        });
        //点击save 关闭弹框；
        $("#cha").on("click",function () {
            $(this).parents().find(".form-box").addClass("hide");
            $(this).parents().find(".bgC").addClass("hide");
        });
        // 点击下拉内容显示，
        var paymentFlag=true;
        $(".table.table-bordered").delegate("td.drop_back i","click",function () {
            $(this).parents().find("table#detail").slideToggle();
            if(paymentFlag){
                $("#xiala").css({"display":"none"});
                $(".takeback ").css({"display":"block"});
                paymentFlag=false;
            }else{
                $("#xiala").css({"display":"block"});
                $(".takeback ").css({"display":"none"});
                paymentFlag=true;
            }
        })
        $scope.imageObject = {
            clickSwap : function(obj) {
                obj.click(function() {
                    $scope.activeImage = $(this).children('img.active');
                    $scope.activeImage.removeClass('active');
                    if ($scope.activeImage.next().length > 0) {
                        $scope.activeImage.next().addClass('active');
                    } else {
                        $(this).children('img:first-child').addClass('active');
                    }
                    return false;
                });
            }
        };
        $(function() {
            $scope.imageObject.clickSwap($('#sort1'));
        });
        $(function() {
            $scope.imageObject.clickSwap($('#sort2'));
        });
        $(function() {
            $scope.imageObject.clickSwap($('#sort3'));
        });
        $(function() {
            $scope.imageObject.clickSwap($('#sort4'));
        });
        $scope.sort="month";
        $scope.desc=true;
        $scope.sortFun=function (para) {
            $scope.sort=para;
            $scope.desc=!$scope.desc;
        }
        function selectData(data,url,callback) {
            $.ajax({
                type:"post",
                url:urlInfoTwo+url,
                data:data,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:callback,
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (data) {
                    if(url=="finndBillAff"){
                        $scope.Approved=data.content.Approved;
                        $scope.Callback=data.content.Callback;
                        $scope.Deduct=data.content.Deduct;
                        $scope.Pending=data.content.Pending;
                        $scope.holdPayment=data.content.holdPayment;
                        var newArr=[];
                        $scope.Callback.forEach(function (x) {
                            var newObj={};
                            newObj.month=x.month;
                            newObj.callback=x.param;
                            $scope.Approved.forEach(function (y) {
                                if(newObj.month===y.month){
                                    newObj.approved=y.param;
                                    return;
                                }
                            })
                            $scope.Deduct.forEach(function (a) {
                                if(newObj.month===a.month){
                                    newObj.deduct=a.param;
                                    return;
                                }
                            })
                            $scope.Pending.forEach(function (b) {
                                if(newObj.month===b.month){
                                    newObj.pending=b.param;
                                    return;
                                }
                            })
                            $scope.holdPayment.forEach(function (c) {
                                if(newObj.month===c.month){
                                    newObj.holdPayment=c.param;
                                    return;
                                }
                            })
                            newArr.push(newObj);
                        })
                        $scope.newArr=newArr;
                    }else if(url=="findAccPayment"){
                        $scope.account=data.content;
                    }else if(url=="queryPayHistory"){
                        $scope.pages=data.content.pages;
                        $scope.history=data.content.dataList;
                    }
                    $scope.$apply();
                },
                complete:function(){
                    $("#loading-center").css({"display":"none"});
                }
            })
        }
        //页面载入 获取Blances Accounts数据
        selectData({
            token:token,
            userId:userData.id,
            affid:userData.id
        },"finndBillAff","callback");
        //页面载入 获取Payment Accounts 数据
        selectData({
            token:token,
            userId:userData.id,
            affid:userData.id
        },"findAccPayment","callbackAccPayment");
        //获取Payments History的数据
        selectData({
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            token:token,
            userId:userData.id,
            affid:userData.id
        },"queryPayHistory","callbackHistory");

        //分页导航
        $("#firstpage").on("click",function () {
            $scope.pageNo=1;
            $scope.pageSize=6;
            selectData({
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                token:token,
                userId:userData.id
            },"queryPayHistory","callbackHistory");
        })
        $("#previouspage").on("click",function () {
            $scope.pageNo=$scope.pageNo-1;
            $scope.pageSize=6;
            if($scope.pageNo<=0){
                $scope.pageNo=1;
                $(".pagesPrompt").css({"display":"block"}).html("It's the first page already");
                setTimeout(function () {
                    $(".pagesPrompt").css({"display":"none"});
                },2000)
            }else {
                selectData({
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                },"queryPayHistory","callbackHistory");
            }
        })
        $("#nextpage").on("click",function () {
            $scope.pageNo=$scope.pageNo+1;
            $scope.pageSize=6;
            if($scope.pageNo>$scope.pages){
                $scope.pageNo=$scope.pages;
                $(".pagesPrompt").css({"display":"block"}).html("It's the last page already");
                setTimeout(function () {
                    $(".pagesPrompt").css({"display":"none"});
                },2000)
            }else {
                selectData({
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    token:token,
                    userId:userData.id
                },"queryPayHistory","callbackHistory");
            }
        })
        $("#lastpage").on("click",function () {
            $scope.pageNo=$scope.pages;
            $scope.pageSize=6;
            selectData({
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                token:token,
                userId:userData.id
            },"queryPayHistory","callbackHistory");
        })


    }])
    .controller("paymentDetail",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.month=$routeParams.month;
        $(window).scroll(function () {
            if($(document).scrollTop()>=300){
                $("#conHead").css({"visibility":"hidden"});
                $("#hideTable").css({"opacity":1}).width($(".table.table-bordered").eq(1).width());
            }else{
                $("#conHead").css({"visibility":"visible"});
                $("#hideTable").css({"opacity":0});
            }
        })
        //页面加载 发起ajax
        $.ajax({
            type:"post",
            url:urlInfoTwo+"selectAccountBlancesDetail",
            data:{
                token:token,
                userId:userData.id,
                affid:userData.id,
                month:$scope.month
            },
            dataType:'jsonp',
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                if(data.respCode=="00"){
                    $scope.dataList=data.content;
                    $scope.$apply();
                }
            }
        })
    }])
    .controller("profile",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
           //console.log(userData);
           $scope.firstName="";
           $scope.lastName="";
           $scope.company="";
           $scope.email="";
           $scope.phoneNumber="";
           $scope.officePhoneNumber="";
           $scope.contactInformation="";
           $scope.website="";
           $scope.link="";
           $scope.userId="";
           $scope.id="";
            $scope.offerEmail='';
            $scope.BillingEmail='';
            var offerEmail,BillingEmail;
            $scope.flagKey="";
            //console.log(userData.id)
        //页面加载 发起ajax请求
            $.ajax({
                type:"post",
                url:urlInfoOne+"findUserInfoById",
                data:{
                    token:token,
                    userId:userData.id,
                    userid:userData.id
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    if(data.respCode=="00"){
                        $scope.profileInfo=data.content;
                        $scope.flagKey=data.content;
                        if($scope.profileInfo!=undefined){
                            $scope.link=$scope.profileInfo.companys_link_website;
                            $scope.officePhoneNumber=$scope.profileInfo.office_phone_number;
                            $scope.phoneNumber=$scope.profileInfo.phone_number;
                            $scope.website=$scope.profileInfo.companys_website;

                            $scope.userId=$scope.profileInfo.userid;
                            $scope.id=$scope.profileInfo.id;

                            $scope.firstName=$scope.profileInfo.firstName;
                            $scope.lastName=$scope.profileInfo.lastName;
                            $scope.company=$scope.profileInfo.company;
                            $scope.email=$scope.profileInfo.user_name;
                            $scope.offerEmail=$scope.profileInfo.offerEmail;
                            $scope.BillingEmail=$scope.profileInfo.billingEmail;
                            $scope.contactInformation=$scope.profileInfo.skype;
                        }
                        if($scope.offerEmail!="" && $scope.offerEmail!=undefined){
                            offerEmail= $scope.offerEmail.split("|");
                            $("#offerEmail").val(offerEmail[0]);
                            for(var x=1;x<offerEmail.length;x++){
                                var input=$("<div class='newAddWrap'>" +
                                    "<input type='email' value="+offerEmail[x]+" class='form-control newAdd' title='Please enter email'>" +
                                    "<em class='reduce'></em>"+
                                    "</div>");
                                $("#OfferemailWrap").append(input);
                            }

                        }
                        if($scope.BillingEmail!="" && $scope.BillingEmail!=undefined){
                            BillingEmail= $scope.BillingEmail.split("|");
                            $("#billingEmail").val(BillingEmail[0]);
                            for(var y=1;y<BillingEmail.length;y++){
                                var inputs=$("<div class='newAddWrap'>" +
                                    "<input type='email' value="+BillingEmail[y]+"  class='form-control newAdd' title='Please enter email'>" +
                                    "<em class='reduce'></em>"+
                                    "</div>");
                                $("#billingEmailWrap").append(inputs);
                            }
                        }
                        $scope.$apply();
                    }else{
                        console.error(data.errorInfo);
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })

        //添加发送邮箱的输入框
            $("em.add").on("click",function () {
               var input=$("<div class='newAddWrap'>" +
                   "<input type='email' class='form-control newAdd' title='Please enter email'>" +
                   "<em class='reduce'></em>"+
                   "</div>");
                $(this).parent().append(input);
            })
            //移除对应的输入框
            $("div.form-group").delegate("em.reduce","click",function () {
                $(this).parent().remove();
            })

            //前端验证
            // var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            // var regOfficeNum=/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
            function updateOrInsert(data,url) {
                $.ajax({
                    type:"post",
                    url:urlInfoOne+url,
                    data:data,
                    dataType:"jsonp",
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callback",
                    success:function (e) {
                        if(e.respCode=="00"){
                            $(".prompt").css({"display":"block"}).html("Save successfully");
                            setTimeout(function () {
                                $(".prompt").css({"display":"none"});
                            },2000)
                        }else{
                            console.error(e.errorInfo)
                        }
                    },
                    error:function(e){
                        console.log(e);
                    }
                })
            }

            $(":button").on("click",function () {
                var OfferemailArr="";
                var billingEmailArr="";
                $("#OfferemailWrap").find("input").each(function (index,dom) {
                    OfferemailArr=OfferemailArr+($(dom).val())+"|";
                });
                $("#billingEmailWrap").find("input").each(function (index,dom) {
                    billingEmailArr=billingEmailArr+($(dom).val())+"|";
                });
                OfferemailArr=OfferemailArr.slice(0,-1);
                billingEmailArr=billingEmailArr.slice(0,-1);
                // if($scope.flagKey!=undefined && $scope.flagKey!=""){
                //     updateOrInsert({
                //         token:token,
                //         userId:userData.id,
                //         userid:userData.id,
                //         refid:userData.refid,
                //         firstName:$scope.firstName,
                //         lastName:$scope.lastName,
                //         company:$scope.company,
                //         user_name:$scope.email,
                //         phone_number:$scope.phoneNumber,
                //         office_phone_number:$scope.officePhoneNumber,
                //         skype:$scope.contactInformation,
                //         companys_website:$scope.website,
                //         companys_link_website:$scope.link,
                //         offerEmail:OfferemailArr,
                //         billingEmail:billingEmailArr
                //     },"updateUserInfo")

                // }else{
                    updateOrInsert({
                        token:token,
                        userId:userData.id,
                        userid:userData.id,
                        refid:userData.refid,
                        firstName:$scope.firstName,
                        lastName:$scope.lastName,
                        company:$scope.company,
                        user_name:$scope.email,
                        phone_number:$scope.phoneNumber,
                        office_phone_number:$scope.officePhoneNumber,
                        skype:$scope.contactInformation,
                        companys_website:$scope.website,
                        companys_link_website:$scope.link,
                        offerEmail:OfferemailArr,
                        billingEmail:billingEmailArr
                    },"saveUI")
                // }
                    
            })


    }])
    .controller("trafficInfo",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
        //console.log(userData);
        //点击多选
        $("#strongestGeos").on("click",function () {
            $('.countryList').css({"display":'block'});
        });
        var num=0;
        var oldWidth;
        var newWidth;
        $(".countryList").delegate("li","click",function () {
            $(this).css({"display":"none"});
            num=num+1;
            var span=document.createElement('span');
            oldWidth=(100-num*6);
            span.innerHTML=$(this).html();
            span.id=$(this).attr("id");//获取span 的id;
            $(".moreIdWrap").get(0).insertBefore(span,$('#strongestGeos').get(0));
            $('#strongestGeos').css({"width":oldWidth+"%"});

        });
        $(".moreIdWrap").delegate("span","click",function () {
            $(this).addClass("special");
        });
        document.onkeydown=function (e) {
            var numTwo=0;
            if($(".moreIdWrap").find("span").hasClass("special")){
                $(".moreIdWrap").find("span.special").each(function (index,dom) {
                    $(".countryList li").each(function (indexLi,domLi) {
                        if($(dom).html()==$(domLi).html()){
                            $(domLi).css({"display":"block"});
                        }
                    })
                });
                num=num-$(".moreIdWrap").find("span.special").length;
                numTwo=numTwo+$(".moreIdWrap").find("span.special").length;
                if(e.keyCode===8){
                    $('.special').remove();
                    if(num>=0){
                        newWidth=oldWidth+6*numTwo;
                        oldWidth=newWidth;
                        $('#strongestGeos').css({"width":newWidth+"%"});
                    }else{
                        $('#strongestGeos').css({"width":oldWidth+"%"});
                    }
                }
            }

        };



        $(document).on("click",function (e) {
            if(e.target.id!="strongestGeos" && e.target.className!="strongestGeos1"){
                $('.countryList').css({"display":'none'});
            }
        });

            //获取国家
            var strongestGeos=$("#strongestGeos").get(0);
            var countryList=$(".countryList").get(0);
            var timeZone=$("#timeZone").get(0);
            $.getJSON('../js/country.json',function (data) {
                for(var i=0;i<data.length;i++){
                    // var para=document.createElement("option");
                    var para=document.createElement("li");
                    para.class="strongestGeos1";
                    para.id=data[i].countryCode;
                    para.value=data[i].countryName;
                    para.innerHTML=data[i].countryName;
                    //strongestGeos.appendChild(para);//
                    countryList.appendChild(para);//
                }

            });
            $.getJSON('../js/timeZone.json',function (data) {
                for(var i=0;i<data.length;i++){
                    var para=document.createElement("option");
                    para.id=data[i].id;
                    para.value=data[i].value.toFixed(2);
                    para.innerHTML=data[i].name+"&nbsp;(UTC"+data[i].value+")";
                    timeZone.appendChild(para);
                }
            });

            $(".radio-inline.one").on('click',function (e) {
                e.stopPropagation();
                $(".circular img.img").attr({"src":"../img/but_Radio_default.png"});
                $(this).find(".circular img.img").attr({"src":"../img/but_Radio_selected.png"});
                $("input.radio").removeAttr("checked");
                $(this).find("input.radio").attr({"checked":"checked"});
            });

            $(".radio-inline.much-num").on('click',function (e) {
                e.stopPropagation();
                $(".circular img.img-two").attr({"src":"../img/but_Radio_default.png"});;
                $(this).find(".circular img.img-two").attr({"src":"../img/but_Radio_selected.png"});
                $("input.radio-two").removeAttr("checked");
                $(this).find("input.radio-two").attr({"checked":"checked"});

            })
            $scope.userId=userData.id;
            $scope.flagKey="";
            //console.log($scope.userId)
            //页面加载 发动ajax
            $.ajax({
                type:"post",
                url:urlInfoOne+"findUserTrafficById",
                data:{
                    token:token,
                    userId:userData.id,
                    userid:userData.id
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (data) {
                    //console.log(data);
                    if(data.respCode=="00"){
                        $scope.flagKey=data.content;
                        if(data.content!=undefined){
                            $scope.trafficInfo=data.content;
                            $scope.campaignSupport=$scope.trafficInfo.campaignSupport;
                            $scope.geos=$scope.trafficInfo.geos;
                            $scope.revenue=$scope.trafficInfo.revenue;
                            $scope.targetsSuppor=$scope.trafficInfo.targetsSuppor;
                            $scope.timeZone=$scope.trafficInfo.timeZone;
                            $scope.traffic=$scope.trafficInfo.traffic;
                            $scope.companyIm=$scope.trafficInfo.companyIm;
                            var campaignSupport=$scope.campaignSupport.split("|");//campaignSupport
                            $(".form-group.campaignSupport").find("input").each(function (index,dom) {
                                for(var i=0;i<campaignSupport.length;i++){
                                    if(campaignSupport[i]==$(dom).val()){
                                        $(dom).attr({"checked":"checked"});
                                    }
                                }
                            })
                            // accep kpi
                            if($scope.trafficInfo.acceptKpi=="0"){
                                $("#no").attr({"checked":"checked"}).siblings("span.circular").find("img").attr({"src":"../img/but_Radio_selected.png"});
                            }else if($scope.trafficInfo.acceptKpi=="1"){
                                $("#yes").attr({"checked":"checked"}).siblings("span.circular").find("img").attr({"src":"../img/but_Radio_selected.png"});
                            }
                            //country
                            var geos=$scope.geos.split("|");
                            $("ul.countryList li").each(function (index,dom) {
                                for(var y=0;y<geos.length;y++){
                                    if($(dom).attr("id")==geos[y]){
                                        num=num+1;
                                        var span=document.createElement('span');
                                        oldWidth=(100-num*6);
                                        span.innerHTML=$(dom).html();
                                        span.id=$(dom).attr("id");//获取span 的id;
                                        $(".moreIdWrap").get(0).insertBefore(span,$('#strongestGeos').get(0));
                                        $('#strongestGeos').css({"width":oldWidth+"%"});
                                        continue;
                                    }
                                }
                            })

                            //revenue 单选
                            $("#revenue").find("input").each(function (index,dom) {
                                if($scope.revenue==$(dom).val()){
                                    $(dom).attr({"checked":"checked"}).siblings("span.circular").find("img").attr({"src":"../img/but_Radio_selected.png"});
                                    return;
                                }
                            })
                            //targetsSuppor 多选
                            var targetsSuppor=$scope.targetsSuppor.split("|");
                            $(".form-group.targetsSupport").find("input").each(function (index,dom) {
                                for(var i=0;i<targetsSuppor.length;i++){
                                    if(targetsSuppor[i]==$(dom).val()){
                                        $(dom).attr({"checked":"checked"});
                                    }
                                }
                            });
                            //时区
                            $("#timeZone").find("option").each(function(index,dom){
                                if($(dom).val()==$scope.timeZone){
                                    $(dom).attr({"selected":"selected"});
                                    return;
                                }
                            });
                            //traffic
                            $("#traffic").find("option").each(function(index,dom){
                                if($(dom).val()==$scope.traffic){
                                    $(dom).attr({"selected":"selected"});
                                    return;
                                }
                            });
                            //company
                            var companyIm=$scope.companyIm.split("|");
                            var companyImArr=[];
                            for(var x=0;x<companyIm.length;x++){
                                var a={};
                                companyIm[x].split("-");
                                a.com=companyIm[x].split("-")[0];
                                a.im=companyIm[x].split("-")[1];
                                companyImArr.push(a);
                            }
                            $scope.companyImArr=companyImArr;
                            $scope.$apply();
                        }

                    }else{
                        console.error(data.errorInfo);
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            });
            function updateOrInsert(data,url) {
                $.ajax({
                    type:"post",
                    url:urlInfoOne+url,
                    data:data,
                    dataType:"jsonp",
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callback",
                    success:function (e) {
                        //console.log(e);
                        if(e.respCode=="00"){
                            $(".prompt").css({"display":"block"}).html("Modify successfully");
                            setTimeout(function () {
                                $(".prompt").css({"display":"none"})
                            },2000)
                        }else{
                            console.error(e.errorInfo);
                        }
                    },
                    error:function (e) {
                        console.log(e);
                    }
                })
            }
            //点击提交 发动ajax
            $("#btns").on("click",function () {
                var source=$("#traffic").val();
                var agencyNames=$("#agencyName").val();
                var trafficEtc=$("#trafficSources").val();
                var acceptKpi=$(".radio-inline.one").find("input.radio:checked").val();
                var clickDescription=$("#description").val();
                //声明一个数组
                var geos=[];
                //将所有span的id push 到数组里
                $(".moreIdWrap").find("span").each(function (index,dom) {
                    geos.push($(dom).attr("id"));
                });
                //console.log(geos.toString())


                var crPlacement=$("#complianceManagement").val();
                var setCampaignsDes=$("#campaigns").val();
                //work
                var sonObject="";
                $(".comIm").each(function (index,dom) {
                    sonObject+=$("#company-one"+index).val()+"-"+$("#IM-one"+index).val()+"|";

                })
                sonObject=sonObject.slice(0,-1);

                //two checkbox
                var arr=$(".targetsSupport").find('input:checked');
                var arrTwo=$(".campaignSupport").find("input:checked");
                var str="";
                var strTwo="";
                // targetsSuppor:str,
                //campaignSupport:strTwo
                for(var i=0;i<arr.length;i++){
                    str=str+$(arr[i]).val()+"|";
                }
                str=str.slice(0,-1);
                for(var y=0;y<arrTwo.length;y++){
                    strTwo=strTwo+$(arrTwo[y]).val()+"|";
                }
                strTwo=strTwo.slice(0,-1);
                var sourcesTransp=$("#transparency").val();
                var hardKpi=$(".radio-inline.much-num").find("input:checked").val();
                var timeZone=$("#timeZone").find("option:checked").val();
                var data={
                    traffic:encodeURI(source),
                    agencyNames:encodeURI(agencyNames),
                    trafficEtc:encodeURI(trafficEtc),
                    acceptKpi:encodeURI(acceptKpi),
                    clickDescription:encodeURI(clickDescription),
                    geos:encodeURI(geos.toString().replace(/,/g,"|")),
                    source:encodeURI(crPlacement),
                    setCampaignsDes:encodeURI(setCampaignsDes),
                    companyIm:encodeURI(sonObject),
                    targetsSuppor:encodeURI(str),
                    campaignSupport:encodeURI(strTwo),
                    sourcesTransp:encodeURI(sourcesTransp),
                    revenue:encodeURI(hardKpi),
                    timeZone:encodeURI(timeZone),
                    token:token,
                    userId:userData.id,
                    userid:userData.id
                };
                if($scope.flagKey!=undefined && $scope.flagKey!=""){
                    updateOrInsert(data,"updateUserTraffic");
                }else{
                    updateOrInsert(data,"saveUserTraffic");
                }

            })



    }])
    .controller("password",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData","urlInfoThree",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData,urlInfoThree) {
        $scope.oldPss="";
        $scope.newPass="";
        $scope.passAgain="";
        $("#oldPass").on("blur",function () {
            $.ajax({
                type:"post",
                url:urlInfoThree+"matchingPWD",
                data:{
                    User_pass:$scope.oldPss,
                    token:token,
                    userId:userData.id,
                    id:userData.id
                },
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (data) {
                    if(data.respCode=="00"){
                        $("#oldPass").removeClass("active").attr({"attr":"true"});
                        $("#oldPass").parent().siblings(".errorPrompt").css({"display":"none"});
                    }else{
                        $("#oldPass").addClass("active").attr({'attr':"true"}).parent().siblings(".errorPrompt").css({"display":"block"});
                        $("#oldPass").get(0).focus();
                    }
                }
            })
        })
        $("#passAgain").on("blur",function () {
            if($scope.newPass != $scope.passAgain){
                $(this).addClass("active").attr({"attr":"false"}).parent().siblings(".errorPrompt").css({"display":"block"});

            }else{
                $(this).removeClass("active").attr({"attr":"true"}).parent().siblings(".errorPrompt").css({"display":"none"});
            }
            if($("#oldPass").attr("attr")=="true" && $("#passAgain").attr("attr")=="true"){
                $("#submit").addClass("active");
            }else{
                $("#submit").removeClass("active");
            }
        })
        //判断新旧密码是否相同
        $("#newPass").on("blur",function () {
            if($scope.newPass==$scope.oldPss){
                this.focus();
                $(this).addClass("active").parent().siblings(".errorPrompt").css({"display":'block'});
            }else{
                $(this).removeClass("active").parent().siblings(".errorPrompt").css({"display":'none'});
            }
        })

        //点击提交
        $("#submit").on("click",function () {
            if($("#oldPass").attr("attr")=="true" && $("#passAgain").attr("attr")=="true"){
                var data={
                    user_pass:$scope.oldPss,
                    newPassword:$scope.newPass,
                    token:token,
                    userId:userData.id,
                    id:userData.id
                }
                $.ajax({
                    type:'post',
                    url:urlInfoThree+"updatePassword",
                    data:data,
                    dataType:"jsonp",
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callback",
                    success:function (data) {
                        if(data.respCode="00"){
                            $(".pagesPrompt").css({"display":"block"}).html("Modify successfully");
                            setTimeout(function () {
                                $(".pagesPrompt").css({"display":"none"});
                                localStorage.clear();
                                window.location="http://u.xbaos.com/";
                            },2000)
                        }else{
                            $(".pagesPrompt").css({"display":"block"}).html("Modify failed");
                            setTimeout(function () {
                                $(".pagesPrompt").css({"display":"none"})
                            },2000);
                        }
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            }
            return false;


        })

    }])
    .controller("postBack",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.clickid="";
        $scope.publisherid="";
        $scope.gaid="";
        $scope.idfa="";
        $scope.scrid="";
        $scope.postBack="";
        $scope.currentId=userData.id;
        //页面加载
        $.ajax({
            type:"post",
            url:urlInfoOne+"findUserById",
            data:{
                token:token,
                id:userData.id,
                userId:userData.id
            },
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            success:function (data) {
                if(data.respCode=="00"){
                    $scope.postBackData=data.content;
                    $scope.gaid=$scope.postBackData.k_gaid;
                    $scope.idfa=$scope.postBackData.k_idfa;
                    $scope.scrid=$scope.postBackData.k_srcid;
                    $scope.postBack=$scope.postBackData.postback;
                    $scope.clickid=$scope.postBackData.k_refid;
                    $scope.publisherid=$scope.postBackData.k_pubid;
                    $scope.$apply();
                }else{
                    console.error(data.errorInfo);
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
        $(".Add_btn").bind("click",function () {
            var data={
                token:token,
                id:userData.id,
                k_gaid:$scope.gaid,
                k_idfa:$scope.idfa,
                k_srcid:$scope.scrid,
                postback:$scope.postBack,
                k_refid:$scope.clickid,
                k_pubid:$scope.publisherid,
                userId:userData.id
            };
            $.ajax({
                type:"post",
                url:urlInfoOne+"updateUser",
                data:data,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (data) {
                    if(data.respCode=="00"){
                        $(".pagesPrompt").css({"display":"block"}).html("Save successfully");
                        setTimeout(function () {
                            $(".pagesPrompt").css({"display":"none"});
                        },2000)
                    }else{
                        $(".pagesPrompt").css({"display":"block"}).html("Save failed");
                        setTimeout(function () {
                            $(".pagesPrompt").css({"display":"none"});
                        },2000)
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })
}])
    .controller("apiDoc",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
}])