angular.module("controller",["ngRoute","service","tm.pagination"])
.controller("index",["$scope","$rootScope","$http","$location","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$rootScope,$http,$location,urlInfoOne,urlInfoTwo,token,userData) {
        //$scope.dataTest=1;
        // console.log(token);
        $rootScope.token=token;
        $rootScope.url=urlInfoOne;
        $rootScope.user=userData;
        $scope.para=$location.path().split("/");
        if($scope.para[1]=="" ||$scope.para[1]==undefined || $scope.para[1]=="affApply"){
            $scope.paraText="Dashboard";
        }else if($scope.para[1]=="apps" || $scope.para[1]=="offers" || $scope.para[1]=="appDetail" || $scope.para[1]=="offersDetail" || $scope.para[1]=="editOffers" || $scope.para[1]=="addCart"){
            $scope.paraText="App Store";
        }else if($scope.para[1]=="advFilter" || $scope.para[1]=="affFilter"){
            $scope.paraText="Filter";
        }else if($scope.para[1]=="offerReport" || $scope.para[1]=="appReport" || $scope.para[1]=="qualityReport" || $scope.para[1]=="qualityReportDetail"){
            $scope.paraText="Report";
        }else if($scope.para[1]=="myAc" || $scope.para[1]=="affAccount" || $scope.para[1]=="addOffer" || $scope.para[1]=="seeDetail" || $scope.para[1]=="affAccountDetail" || $scope.para[1]=="trafficInfo" ||$scope.para[1]=="payInfo" ||$scope.para[1]=="password" ||$scope.para[1]=="advAccount" || $scope.para[1]=="advAccountDetail"){
            $scope.paraText="Account";
        }else if($scope.para[1]=="billReport" || $scope.para[1]=="billingDetail" || $scope.para[1]=="billAffReport"||$scope.para[1]=="holdBilling" ){
            $scope.paraText="Billing";
        }
        $scope.navSlecected=[
            {
                title:'Dashboard',
                href:"#!/"
            },
            {
                title:'Account',
                href:"#!/myAc"
            },
            {
                title:'App Store',
                href:"#!/apps/all"
            },
            {
                title:'Filter',
                href:"#!/advFilter"
            },
            {
                title:'Report',
                href:"#!/offerReport"
            },
            {
                title:'Billing',
                href:"#!/billReport"
            }

        ]
        $scope.getIcon=function (para) {
            if(para==0){
                return "iconfont icon-yibiaopan";
            }else if(para==1){
                return "iconfont icon-yonghu";
            }else if(para==2){
                return "iconfont icon-wangdianshangpin";
            }else if(para==3){
                return "iconfont icon-kucunh";
            }else if(para==4){
                return "iconfont icon-baogao";
            }else if(para==5){
                return "iconfont icon-baogao";
            }
        }
        setTimeout(function () {
           $("ul.top-nav").find("li").each(function (index,dom) {
               if($(dom).hasClass("action")){
                   $(".sub-nav-list").css({"display":"none"});
                   $(".sub-nav-list").eq(index).css({"display":"block"});
               }
           });
        },0)
        //取用户名
        $scope.firstName=userData.firstName;
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
        $(".shopping-box").delegate(".shopping-list","click",function (e) {
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

        });

        //tab nav

        $(".tab-nav .icon").on("click",function (e) {
            var attr =$(this).find(".tab-nav-con-wrap").css("opacity");
            var that=this;
            if(e.target.id=="icon" || e.target.id=="img"){
                if(attr==0){
                    $(this).find(".tab-nav-con-wrap").removeClass('fadeOutLeft').addClass("fadeInRight");
                    $(".tab-nav-con .keyId").css({"display":"block"});
                    //发起ajax请求
                     $.ajax({
                        type:'post',
                        url:urlInfoOne+'findAffByCart',
                        data:{
                            token:token,
                            userId:userData.id
                        },
                        dataType:'jsonp',
                        jsonp:'jsonpCallback',
                        jsonpCallback:"callback",
                        cache:false,
                        beforeSend :function(xmlHttp){
                            xmlHttp.setRequestHeader("If-Modified-Since","0");
                            xmlHttp.setRequestHeader("Cache-Control","no-cache");
                        },
                        success:function (data) {
                            if(data.respCode=='00'){
                                $scope.indexData=data.content;
                                $scope.$apply();
                            }
                        },
                        error:function (data) {
                            console.log(data);
                        }
                    })
                }else{
                    $(this).find(".tab-nav-con-wrap").removeClass("fadeInRight").addClass("fadeOutLeft");
                    // $(that).find(".tab-nav-con-wrap").css({'display':"none"});
                    $(".tab-nav-con .keyId").css({"display":"none"});
                    $(".shopping-box").css({"display":"none"});
                }
            }


        })
        //点击id发起ajax请求
        $(".tab-nav-con").delegate('.keyId a',"click",function () {
            $(".tab-nav-con .keyId").css({"display":"none"}).removeClass("displayBox");
            $(this).parent(".tab-nav-con .keyId").css({"display":"block"}).addClass("displayBox");
            var id=$(this).attr("id");
            $scope.keyid=id;
            $.ajax({
                type:"post",
                url:urlInfoOne+"findAPPByCart",
                data:{
                    id:id,
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
                        $(".shopping-box").css({"display":"block"});
                        $scope.newApp=data.content.newApp;
                        $scope.newCap=data.content.newCap;
                        $scope.newPayout=data.content.newPayout;
                        $scope.pause=data.content.pause;

                        //获取每个数组长度
                        $scope.lengthApp=$scope.newApp.length;
                        $scope.lengthCap=$scope.newCap.length;
                        $scope.lengthPay=$scope.newPayout.length;
                        $scope.lengthpause=$scope.pause.length;
                        $scope.$apply();
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })
        $scope.checkLength=function (para) {
            if(para>0){
                return true;
            }else{
                return false;
            }
        }
        //点击send发送数据
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
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    //console.log(data);
                    if(data.respCode=="03"){
                        alert(data.errorInfo);
                        $(".tab-nav-con-wrap").removeClass("fadeInRight").addClass("fadeOutLeft");
                        $(".shopping-box").css({"display":"none"});
                        history.go(0);//强制页面刷新
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
            console.log(this)
            var obj=$(this);
            var appid=$(this).siblings("p.name").find("span").html();
            console.log(appid)
            $.ajax({
                type:"post",
                url:urlInfoOne+"romoveApp",
                data:{
                    appid:appid,
                    affid:$scope.keyid,
                    token:token,
                    userId:userData.id
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
                        obj.parents(".shopping-con").remove();
                        $("#prompt").css({"display":"block"});
                        setTimeout(function () {
                            $("#prompt").css({"display":"none"});
                        },3000);
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })

    /**
     * 修改payout cap
     * */
    $scope.updateName=""; //用于显示弹出框 更新名称
    $scope.newData=""; //新输入的值 即跟新的值
    $(".shopping-box").delegate(".desc.updateCon","click",function () {
        $(".desc.updateCon").removeClass("true");
        $(this).addClass("true");
        $('#mask').css({"display":"block"});
        $("#updateData").css({"display":"block"}).removeClass().addClass("animated fadeInDown");
        $scope.updateName="New "+$(this).find("span:first").html();
        $scope.updateAppid=$(this).siblings("p.name").find("span").html();
        $scope.updateAffid=$(this).parents(".shopping-box").siblings(".tab-nav-con").find("li.displayBox a").html();
        $scope.$apply();
    });
    $("#close").bind("click",function () {
        $("#updateData").removeClass().addClass("animated fadeOutUp");
        $('#mask').css({"display":"none"});
    });
    function updateCapPayout(data,url){
        $.ajax({
            type:"get",
            url:urlInfoOne+url,
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.newCopyData=$scope.newData;
                    $(".desc.updateCon.true").find("span.text").html($scope.newCopyData);
                    $scope.newData="";
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    $("#updateBtn").on("click",function () {
        var newData="";
        if($(".desc.one.updateCon").hasClass("true")){
             newData={
                token:token,
                userId:userData.id,
                cap:$scope.newData,
                appid:$scope.updateAppid,
                affid:$scope.updateAffid
            };
        }else if($(".desc.two.updateCon").hasClass("true")){
             newData={
                token:token,
                userId:userData.id,
                payout:$scope.newData,
                appid:$scope.updateAppid,
                affid:$scope.updateAffid
            };
        }
        updateCapPayout(newData,"updateCartCapPou");
    })


 }])
.controller("dashboard",["$scope","$location","$rootScope","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$location,$rootScope,urlInfoOne,urlInfoTwo,token,userData) {
    //   点击custom
    $("a.custom").on("click",function () {
        $(".alert").show();
        $(".alert_box").removeClass("hinge").addClass("rollIn")
    });
    $("#close").on("click",function () {
        $(".alert").hide();
        $(".alert_box").removeClass("rollIn").addClass("hinge")
    });
    /**
     * 自定义菜单
     *
     * */
    $scope.appIdFlag=true;
    $scope.affIdFlag=true;
    $scope.offerIdFlag=true;
    $scope.netIdFlag=true;
    $scope.appNameFlag=true;
    $scope.markPayoutFlag=true;
    $scope.dateFlag=true;
    $scope.postCvrFlag=true;
    $scope.cvrFlag=true;
    $scope.click=true;
    $scope.postback=true;
    $scope.callback=true;
    $("#menuWrap div").on('click',function () {
        if($(this).hasClass("true")){
            $(this).removeClass("true").addClass("false");
            if($(this).hasClass('appId')){
                $scope.appIdFlag=false;
            }else if($(this).hasClass('affId')){
                $scope.affIdFlag=false;
            }else if($(this).hasClass('offerId')){
                $scope.offerIdFlag=false;
            }else if($(this).hasClass('netId')){
                $scope.netIdFlag=false;
            }else if($(this).hasClass('appName')){
                $scope.appNameFlag=false;
            }else if($(this).hasClass('markPayout')){
                $scope.markPayoutFlag=false;
            }else if($(this).hasClass('date')){
                $scope.dateFlag=false;
            }else if($(this).hasClass('postCvr')){
                $scope.postCvrFlag=false;
            }else if($(this).hasClass('cvr')){
                $scope.cvrFlag=false;
            }else if($(this).hasClass('click')){
                $scope.click=false;
            }else if($(this).hasClass('postback')){
                $scope.postback=false;
            }else if($(this).hasClass('callback')){
                $scope.callback=false;
            }
        }else if($(this).hasClass("false")){
            $(this).removeClass("false").addClass("true");
            if($(this).hasClass('appId')){
                $scope.appIdFlag=true;
            }else if($(this).hasClass('affId')){
                $scope.affIdFlag=true;
            }else if($(this).hasClass('offerId')){
                $scope.offerIdFlag=true;
            }else if($(this).hasClass('netId')){
                $scope.netIdFlag=true;
            }else if($(this).hasClass('appName')){
                $scope.appNameFlag=true;
            }else if($(this).hasClass('markPayout')){
                $scope.markPayoutFlag=true;
            }else if($(this).hasClass('date')){
                $scope.dateFlag=true;
            }else if($(this).hasClass('postCvr')){
                $scope.postCvrFlag=true;
            }else if($(this).hasClass('cvr')){
                $scope.cvrFlag=true;
            }else if($(this).hasClass('click')){
                $scope.click=true;
            }else if($(this).hasClass('postback')){
                $scope.postback=true;
            }else if($(this).hasClass('callback')){
                $scope.callback=true;
            }
        }

    })
    $(".save").on("click",function () {
        $(".alert").css({"display":"none"});
        $(".alert_box").removeClass("rollIn").addClass("hinge");
        $scope.$apply();
    });
    /**
     * 查询数据函数
     * */
    function selectData() {
        $rootScope.r=$.ajax({
            type:"post",
            url:urlInfoOne+"findCvr",
            data:$scope.data,
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
                    $scope.dataList=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.total=data.content.total;
                    $scope.paginationConf.totalItems=$scope.total;
                    $scope.$apply();
                }

            },
            complete:function () {
                $("#loading-center").css({"display":"none"});
            }
        });
    }
    /**
     * 页面加载
     * 获取页面的数据
     * */
    $scope.pageNo=1;
    $scope.pageSize=10;
    $scope.date=0;
    $scope.data={
        token:token,
        userId:userData.id,
        date:$scope.date,
        pageNo:$scope.pageNo,
        pageSize:$scope.pageSize
    }
    selectData();
    /**
     * 时间change事件发起请求
     * */
    $('#time').on("change",function () {
        if($rootScope.r){
            $rootScope.r.abort();
        }
        $scope.date=$(this).val();
        $scope.data={
            token:token,
            userId:userData.id,
            date:$scope.date,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize
        };
        selectData();
    });
    //分页导航
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            $scope.data={
                token:token,
                userId:userData.id,
                date:$scope.date,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
            };
            if($rootScope.r){
                $rootScope.r.abort();
            }
            selectData();
        }
    };
}])
.controller("affApply",["$scope","$location","$rootScope","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$location,$rootScope,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.flag=false;//判断no result 显示隐藏
    //页面载入 获取publisher值
    $.ajax({
        type:'post',
        url:urlInfoTwo+"findUsrIdNameByRoleId",
        data:{
            token:token,
            userId:userData.id,
            roleId:2
        },
        dataType:'jsonp',
        jsonp:"jsonpCallback",
        jsonpCallback:"callback",
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
                console.error("error");
            }
        },
    });
    //页面载入获取所有内容
    $scope.pageNo=1;
    $scope.pageSize=10;
    function selectData(para) {
        $rootScope.r=$.ajax({
            type:'post',
            url:urlInfoTwo+"findAffcart",
            data:para,
            dataType:'jsonp',
            jsonp:"jsonpCallback",
            jsonpCallback:"callbackTwo",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.applyData=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.total=data.content.total;
                    $scope.paginationConf.totalItems=$scope.total;
                    if($scope.applyData.length<=0){
                        $scope.flag=true;
                    }else{
                        $scope.flag=false;
                    }
                    $scope.$apply();
                }
            }
        });
    }
    selectData({
        token:token,
        userId:userData.id,
        pageNo:$scope.pageNo,
        pageSize:$scope.pageSize
    });//页面载入 获取所有值
    $("#affiliate").on("change",function () {
        $scope.SelectAjaxData="";
        if($(this).val()==0){
            $scope.SelectAjaxData={
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
            }
        }else{
            $scope.SelectAjaxData={
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                affid:$(this).val()
            }
        }
        if($rootScope.r){
            $rootScope.r.abort();
        }
        selectData($scope.SelectAjaxData);
    });
    //分页导航
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            $scope.SelectAjaxData={
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                affid:$("#affiliate").val()
            };
            if($rootScope.r){
                $rootScope.r.abort();
            }
            selectData($scope.SelectAjaxData);
        }
    };
    var flag=true;
    var applyFlag=true;
    /**
     * 编辑表格、和多选、单选
     * */
    $scope.updateApplyAndEditData="";
    function updateApplyAndEdit(data,url) {
        $rootScope.r=$.ajax({
            type:'post',
            url:urlInfoOne+url,
            data:data,
            dataType:'jsonp',
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    // flag=true;
                     applyFlag=true;
                }
            },
            error:function (data) {
                console.log(data);
            }
        });
    }
    //全选
    $("#applyWrap img").bind("click",function(){
        if(flag){
            flag=false;
            if($(this).hasClass("true")){
                // $(this).parent().removeClass("true").addClass("false");
                // $(".apply").removeClass("true").addClass("false");
            }else if($(this).hasClass("false")){
                $(this).parent().removeClass("false").addClass("true");
                $(".apply").removeClass("false").addClass("true");
                $scope.updateApplyAndEditData={
                    token:token,
                    userId:userData.id,
                    affid:$("#affiliate").val(),
                    apply:1
                }
            }
            if($rootScope.r){
                $rootScope.r.abort();
            }
            updateApplyAndEdit($scope.updateApplyAndEditData,'updateCartapply');
            return false;
        }
    });
    //单选
    $('table.table').delegate("td.apply img","click",function () {
        if(applyFlag){
            applyFlag=false;
            if($(this).hasClass("true")){
                // $(this).parent().removeClass("true").addClass("false");
            }else if($(this).hasClass("false")){
                $(this).parent().removeClass("false").addClass("true");
                $scope.updateApplyAndEditData={
                    token:token,
                    userId:userData.id,
                    affid:$(this).parent().siblings(".affid").html(),
                    appid:$(this).parent().siblings(".appid").html(),
                    apply:1
                }
            }
            if($rootScope.r){
                $rootScope.r.abort();
            }
            updateApplyAndEdit($scope.updateApplyAndEditData,'updateCartapply');
            return false;
        }

    })
    /**
     * 双击编辑操作
     * */
    var oldCon="";
    var editPara="";
    $("table.table").delegate(".edit","dblclick",function () {
        var that=this;
        if($(this).hasClass("payout")){
            editPara="payout";
        }else if($(this).hasClass("cap")){
            editPara="cap"
        }else if($(this).hasClass("margin")){
            editPara="margin"
        }else if($(this).hasClass("profit")){
            editPara="profit"
        }else if($(this).hasClass("shared")){
            editPara="shared"
        }
        if($(this).children("input").length > 0){
            return false;
        };
        var inputObj=$("<input type='text' class='form-control'>");
        oldCon=$(this).html();
        $(this).html("");
        inputObj.val(oldCon).appendTo($(this));
        inputObj.focus();
        inputObj.on("blur",function () {
            if(oldCon!=inputObj.val()){
                oldCon=inputObj.val();
                $scope.updateApplyAndEditData={
                    token:token,
                    userId:userData.id,
                    appid:$(that).siblings(".appid").html(),
                    affid:$(that).siblings(".affid").html()
                };
                $scope.updateApplyAndEditData[editPara]=oldCon;
                if($rootScope.r){
                    $rootScope.r.abort();
                }
                updateApplyAndEdit($scope.updateApplyAndEditData,'updateCartpcmpsa');
            }
            $(this).parent().html(oldCon);
            $(this).remove();

        })
    })

}])
.controller("apps",["$scope","$rootScope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$rootScope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.packageName="";
    $scope.appName="";
    $scope.appId="";
    $scope.appidCon="";
    $scope.countryCode=undefined;
    //获取app详细内容

    //分页导航
    $scope.pageNo=1;//当前页数
    $scope.pageSize=20;//长度：20
    $scope.key=$routeParams.key;//判断请求类型
    $scope.type=$routeParams.type;
    $scope.search="";
    $scope.total="";
    $scope.appId=$scope.appidCon?$scope.appidCon:0;
    var variable={
        id:$scope.appId,
        name:encodeURI($scope.appName),
        packageName:encodeURI($scope.packageName),
        accept:$scope.countryCode,
        pageNo:$scope.pageNo,
        pageSize:$scope.pageSize,
        type:$scope.type,
        token:token,
        userId:userData.id
    };
    function toGO() {
        if($scope.pageNo!=''){
            $rootScope.r=$.ajax({
                type:"post",
                url:urlInfoTwo+"findAppsPayout",
                dataType: 'jsonp',
                data:variable,
                jsonp: "jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (e) {
                    //console.log(e);
                    if(e.respCode=="00"){
                        $scope.contents=e.content.dataList;
                        $scope.pages=e.content.pages;
                        $scope.total=e.content.total;
                        $scope.paginationConf.totalItems=$scope.total;
                        $scope.$apply();
                    }
                },
                complete:function(){
                    $("#loading-center").css({"display":"none"});
                }
            })
        }
    }
    //页面加载 搜索数据
    if($rootScope.r){
        $rootScope.r.abort();
    }
    toGO();
    //分页导航
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            variable={
                id:$scope.appId,
                name:encodeURI($scope.appName),
                packageName:encodeURI($scope.packageName),
                accept:$scope.countryCode,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                type:$scope.type,
                token:token,
                userId:userData.id
            };
            $rootScope.r.abort();
            toGO();
        }
    };
    //点击搜索
    $scope.ajaxGet=function(){
        $scope.appId=$scope.appidCon?$scope.appidCon:0;
        variable={
            id:$scope.appId,
            name:encodeURI($scope.appName),
            packageName:encodeURI($scope.packageName),
            accept:$scope.countryCode,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            type:$scope.type,
            token:token,
            userId:userData.id
        };
        $rootScope.r.abort();
        toGO();
    }
    $(".select-list li input").each(function (index,dom) {
        $(dom).bind("keypress",function (e) {
            if(e.keyCode == "13") $('.btn-search').click();
        })
    });
        //Switching effect
        $scope.switch=function (para,index) {
            var active='';
            var flag=true;
            if(flag){
                if($(".status_img").eq(index).attr("id")=='true'){
                    $(".status_img").eq(index).attr({"id":"false"});
                    active=false;
                }else {
                    $(".status_img").eq(index).attr({"id":"true"});
                    active=true;
                }
                flag=false;
                $.ajax({
                    type:"post",
                    url:urlInfoTwo+"updateAppActive ",
                    data:{
                        id:para,
                        active:active,
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
                        flag=true;
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            }

        }
        //多选 添加购物车
        $scope.cap=0;
        // $scope.payout="";
        $scope.margin=25;
        $scope.profit=20;
        $scope.shared=15;

        var appcheckFlag=true;
        $("#select_btn").on("click",function () {
            if(appcheckFlag){
                $("#addCartBtn").css({"display":"block"});
                $(".appSelect").css({"display":'block'});
                $(this).html("Quit");
                appcheckFlag=false;
            }else {
                $(".appSelect[attr='true']").each(function (index,dom) {
                    $(dom).attr({"attrId":"false"}).find("img").attr({"src":"../img/appSelect.png"});
                })
                $("#addCartBtn").css({"display":"none"});
                $(".appSelect").css({"display":'none'});
                $(this).html("Administrate");
                appcheckFlag=true;
            }

        })
        //复选效果
        $(".listWhole").delegate('.appSelect',"click",function () {
            var attrCheck=$(this).attr("attr");
            if(attrCheck=="false"){
                $(this).attr({'attr':"true"}).find("img").attr({"src":"../img/appSelected.png"});
            }else if(attrCheck=="true"){
                $(this).attr({'attr':"false"}).find("img").attr({"src":"../img/appSelect.png"});
            }
        })
        //add btn 向后台获取数据id
        $scope.select={};
        $scope.select.a="";
        $("#addCartBtn").on("click",function () {
            $(".addAppMask").css({"display":"block"});
            $(".bigBoxWrap").css({"display":"block"});
            var appIdSArrOne=[];//appids数组
            $(".appSelect[attr='true']").each(function (index,dom) {
                appIdSArrOne.push($(dom).attr("attrId"))
            })
            $rootScope.r.abort();
            $rootScope.r=$.ajax({
                type:"post",
                url:urlInfoOne+"findAllAffid",
                data:{
                    token:token,
                    userId:userData.id,
                    appids:encodeURI(appIdSArrOne)
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
                    //console.log(data);
                    if(data.respCode=="00"){
                        $scope.appsAffidData=data.content;
                        $scope.$apply();
                    }else{
                        console.error("error");
                    }
                }
            })
        })
        // 关闭按钮
        $(".closeBtn").on("click",function () {
            $(".moreIdWrap span").each(function (index,dom) {
                $(dom).remove();
            });
            $(".affIdList li").each(function (index,dom) {
                $(dom).css({"display":"block"});
            })
            $('#AffId').css({"width":"100%"});
            $scope.cap=0;
            // $scope.payout="";
            $scope.margin=25;
            $scope.profit=20;
            $scope.shared=15;
            $(".bigBoxWrap").css({"display":"none"});
            $(".addAppMask").css({"display":"none"});
        })
        //agree点击效果
        $('.radioWrap').on("click",function () {
            var attr=$(this).find("em").attr('id');
            if(attr=="true"){
                $(this).find("em").attr({"id":"false"});
                $(this).find("img").attr({"src":'../img/but_Checkbox_default_dark.png'})
            }else if(attr=="false"){
                $(this).find("em").attr({"id":"true"});
                $(this).find("img").attr({"src":'../img/but_Checkbox_selected.png'})
            }
        })
        //save 点击发起ajax请求
        $scope.saveAjax=function () {
            //获取appids
            var appIdSArr=[];//appids数组
            $(".appSelect[attr='true']").each(function (index,dom) {
                appIdSArr.push($(dom).attr("attrId"))
            })
            var attr=$(".radioWrap").find("em").attr('id');//获取agree状态 apply
            var cap=$scope.cap;
            // var payout=$scope.payout;
            var margin=$scope.margin;
            var profit=$scope.profit;
            var shared=$scope.shared;
            var apply='';
            if(attr=="true"){
                apply=1;
            }else if(attr=="false"){
                apply=0;
            }
            if($scope.select.a==''){
                $("#AffId").addClass("active").get(0).focus();
            }else if(isNaN(cap)){
                $("#cap").addClass("active").get(0).focus();
            }
            else if(isNaN(margin) || margin==''){
                $("#margin").addClass("active").get(0).focus();
            }else if(isNaN(profit) || profit==''){
                $("#profit").addClass("active").get(0).focus();
            }else if(isNaN(shared) || shared==''){
                $("#shared").addClass("active").get(0).focus();
            }
            var data={
                appids:encodeURI(appIdSArr),
                ids:encodeURI($scope.select.a),
                cap:cap,
                // payout:payout,
                margin:margin,
                profit:profit,
                shared:shared,
                apply:apply,
                token:token,
                userId:userData.id
            }
            $rootScope.r.abort();
            $rootScope.r=$.ajax({
                type:"post",
                url:urlInfoOne+"addCart",
                dataType:"jsonp",
                data:data,
                jsonp:'jsonpCallback',
                jsonpCallback:'callback',
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    if(data.respCode=="00"){
                        $(".prompt").css({"display":"block"}).html("Add success");
                        setTimeout(function () {
                            $(".prompt").css({"display":"none"});
                        },2000)
                    }
                }
            })
        }



    }])
.controller("appDetail",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.index=0;
        $scope.tab=$routeParams.table;
        $scope.id=$routeParams.id;
        if($scope.tab=="table2"){
            $("#setting").get(0).click();
        }else if($scope.tab=="table3"){
            $("#bidding").get(0).click();
        }else if($scope.tab=="table4"){
            $("#getMark").get(0).click();
        }else if($scope.tab=="table5"){
            $("#help").get(0).click();
        }
        //导航栏效果
        $(".lab li").on("click",function () {
            $(".lab li").removeClass("first");
            $(this).addClass("first");
            $(".con-list").css({'display':'none'});
            $(".con-list").eq($(this).index()).css({'display':"block"})
        })
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
        $scope.getIndex=function () {
            var indexNum=$("#selectApp").find('option:checked').attr('id')
            console.log(indexNum);
            $scope.index=indexNum;
        }
        $scope.check=function (para) {
            if($scope.index==para){
                return true;
            }else {
                return false;
            }

        }
        $scope.id=$routeParams.id;
        function selectData(url,data,name) {
            this.url=url;
            this.data=data;
            this.name=name;//jsonpCallback name
        }
        selectData.prototype={
            select:function (callback) {
                    $.ajax({
                        type:'post',
                        url:urlInfoTwo+this.url,
                        dataType:'jsonp',
                        data:this.data,
                        jsonp:"jsonpCallback",
                        jsonpCallback:this.name,
                        cache:false,
                        beforeSend :function(xmlHttp){
                            xmlHttp.setRequestHeader("If-Modified-Since","0");
                            xmlHttp.setRequestHeader("Cache-Control","no-cache");
                            $("#loading-center").css({"display":"block"});
                        },
                        success:function (data) {
                            if(data.respCode=="00"){
                                callback(data)
                            }
                        },
                        complete:function(){
                            $("#loading-center").css({"display":"none"});
                        }
                    })
            }    
        }
        var unload=new selectData("findAppDetail",{ //页面加载 获取detail信息
            appid:$scope.id,
            token:token,
            userId:userData.id
        },"callback");
        unload.select(function (data) {
            $scope.DescKpilist=data.content.DescKpilist;
            $scope.appDetails=data.content.appDetails;
            $scope.hugeNum=$scope.appDetails.huge;//判断Promotion record里的Short Link
            if($scope.hugeNum==0){
                $scope.shortLink=false;
            }else{
                $scope.shortLink=true;
            }
            $scope.description=$scope.appDetails.description;
            $scope.oldRemark=$scope.appDetails.remark;
            $scope.remark= $scope.appDetails.remark;
            $("#descriptionCon").html($scope.description);
            //判断系统类型
            if($scope.appDetails.gaid==0 && $scope.appDetails.idfa==0){
                $scope.appDetailPlatform="NONE";
            }else if($scope.appDetails.gaid==1){
                $scope.appDetailPlatform="Android";
            }else if($scope.appDetails.idfa==1){
                $scope.appDetailPlatform="ios";
            }
            $scope.$apply();
        });
        //setting
        $("#setting").on("click",function () {
            var settingClick=new selectData("findOfferSettingByAppId",{
                appid:$scope.id,
                token:token,
                userId:userData.id
            },"callbackClick");
            settingClick.select(function (data) {
                $scope.OTlist=data.content.OTlist;
                $scope.OGlist=data.content.OGlist;
                $scope.OSlist=data.content.OSlist;
                $scope.$apply();
            })
        });
        //bidding
        $("#bidding").on("click",function () {
            var biddingClick=new selectData("findOfferBiddingByAppId",{
                appid:$scope.id,
                date:time1,
                token:token,
                userId:userData.id
            },"callbackClick");
            biddingClick.select(function (data) {
                $scope.OTotalBlist=data.content.OTotalBlist;
                $scope.OGBlist=data.content.OGBlist;
                $scope.OSBlist=data.content.OSBlist;
                $scope.OTBlist=data.content.OTBlist;
                $scope.$apply();
            })
        });
        //点击菜单导航promotion record
        $("#getMark").on("click",function () {
            var proClick=new selectData("findMarkByAppId",{
                appid:$scope.id,
                token:token,
                userId:userData.id
            },"callbackClick");
            proClick.select(function (data) {
                $scope.prData=data.content;
                $scope.$apply();
            })
        });
        //点击help
        $("#help").on("click",function(){
            var helpClick=new selectData("findApp_traceByid",{
                appid:$scope.id,
                token:token,
                userId:userData.id
            },"callbackClick");
            helpClick.select(function (data) {
                $scope.helpData=data.content;
                $scope.$apply();
            })
        });
        //编辑detail Remark
        $('.edit').on("click",function () {
            if($scope.remark!=$scope.oldRemark){
                var editRemark=new selectData("saveRemark",{
                    id:$scope.id,
                    remark:encodeURI($scope.remark),
                    token:token,
                    userId:userData.id
                },"callback");
                editRemark.select(function (data) {
                    $scope.oldRemark=$scope.remark;
                })
            }else{
                $("#mark").get(0).focus();
                $("#mark").addClass("active");
            }
        });
        //Promotion record
        //邮件预览效果
        $('.table').delegate(".preview","click",function () {
            var affidPre=$(this).parent("td").siblings("td.affid").html();
            var previewApp=new selectData("previewApp",{
                appid:$scope.id,
                affid:affidPre,
                token:token,
                userId:userData.id
            },"callback");
            previewApp.select(function (data) {
                $scope.emailData=data.content;
                $scope.gaid=data.content.gaid;
                $scope.idfa=data.content.idfa;

                if($scope.gaid=='false' && $scope.idfa=="false"){
                    $scope.gaId="NONE";
                }else if($scope.gaid=='true'){
                    $scope.gaId="gaid";
                }else if($scope.idfa=='true'){
                    $scope.gaId="idfa";
                }
                if(data.content.android=="true"){
                    $scope.platform="Android";
                }else{
                    $scope.platform="ios";
                }
                if(data.content.incent==false){
                    $scope.incent="Non-Incent";
                }else {
                    $scope.incent="Incent";
                }
                $(".emailWrap").css({"display":"block"});
                $(".email_page").css({"display":"block"});
                $scope.$apply();
            })
        });
        //关闭邮件
        $(".email_header i").on("click",function () {
            $(this).parents(".email_page").css({"display":"none"});
            $(".emailWrap").css({"display":"none"})
        })
        //setting
        //获取traffic的状态并改变状态
        $(".table").delegate("td.traffic img","click",function () {
            var type;
            var active=""; //traffic的状态
            if($(this).hasClass("true")){
                $(this).parent("td.traffic").removeClass("true");
                $(this).parent("td.traffic").addClass("false");
                active=false;
            }else if($(this).hasClass("false")){
                $(this).parent("td.traffic").removeClass("false");
                $(this).parent("td.traffic").addClass("true");
                active=true;
            }
             // if($(this).parent(".traffic").siblings(".locked").hasClass("true")){
             //     lockActive=true;
             // }else if($(this).parent(".traffic").siblings(".locked").hasClass("false")){
             //     lockActive=false;
             // }
            var offer_id=$(this).parents("tr.farther").find("td a").eq(0).html();
            var attr=$(this).parents(".setting_list").find(".bigFather").attr("id");
            if(attr=="ts"){
                type="topic";
            }else if(attr=="gs"){
                type="group";
            }else if(attr=="ss"){
                type="smart";
            }
            var dataTr={
                appid:$scope.id,
                active:active,
                offer_id:offer_id,
                type:type,
                token:token,
                userId:userData.id
            };
            $.ajax({
                type:"get",
                url:urlInfoTwo+"updateSetting",
                data:dataTr,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    //console.log(data);
                        //do nothing
                },error:function (data) {
                    console.log(data);
                }
            })

        });
        //获取locked的状态
        $(".table").delegate("td.locked img","click",function () {
            var lockedActive=""; //locked的状态
            var type;
            if($(this).hasClass("true")){
                $(this).parent("td.locked").removeClass("true");
                $(this).parent("td.locked").addClass("false");
                lockedActive=false;
            }else if($(this).hasClass("false")){
                $(this).parent("td.locked").removeClass("false");
                $(this).parent("td.locked").addClass("true");
                lockedActive=true;
            }
            var offer_id=$(this).parents("tr.farther").find("td a").eq(0).html();
            var attr=$(this).parents(".setting_list").find(".bigFather").attr("id");
            if(attr=="ts"){
                type="topic";
            }else if(attr=="gs"){
                type="group";
            }else if(attr=="ss"){
                type="smart";
            }
            var dataLoc={
                offer_id:offer_id,
                locked:lockedActive,
                appid:$scope.id,
                type:type,
                token:token,
                userId:userData.id
            }
            //console.log(dataLoc);
            $.ajax({
                type:"get",
                url:urlInfoTwo+"updateSetting",
                data:dataLoc,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    //console.log(data);
                },error:function (data) {
                    console.log(data);
                }
            })
        });
        //更新weight ajax函数
        function updateWeight(affid,newValue,type) {
            // console.log(affid,newValue,type);
            var updateData={
                appid:$scope.id,
                offer_id:affid,
                weight:newValue,
                type:type,
                token:token,
                userId:userData.id
            }
            //console.log(updateData);
            $.ajax({
                type:"post",
                url:urlInfoTwo+"updateSetting",
                data:updateData,
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
                        return false;//do nothing
                    }else{
                        console.error(data.errorInfo);
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })

        }
        //双击weight 下的td,使其可编辑；
        $(".table").delegate(".td","dblclick",function(event){
            //td中已经有了input,则不需要响应点击事件
            if($(this).children("input").length > 0)
                return false;
            var tdObj = $(this);
            var preText = tdObj.html();
            //得到当前文本内容
            var inputObj = $("<input type='text' />");
            //创建一个文本框元素
            tdObj.html(""); //清空td中的所有元素
            inputObj
                .css({border:"0",fontSize:"12px",font:"宋体"})
                .val(preText)
                .appendTo(tdObj)
                //把创建的文本框插入到tdObj子节点的最后
                .trigger("focus")
                //用trigger方法触发事件
                .trigger("select");
            inputObj.keyup(function(event){
                if(13 == event.which)
                //用户按下回车
                {
                    var type;
                    var attr=$(this).parents(".setting_list").find(".bigFather").attr("id");
                    if(attr=="ts"){
                        type="topic";
                    }else if(attr=="gs"){
                        type="group";
                    }else if(attr=="ss"){
                        type="smart";
                    }
                    var affid=$(this).parents("tr").find("td a").eq(0).html();
                    var text = $(this).val();
                    $(this).remove();
                    tdObj.html(text);
                    if(preText==text){
                        return false;
                    }else{
                        updateWeight(affid,text,type);
                    }
                }
                else if(27 == event.which)
                //ESC键
                {
                    tdObj.html(preText);
                    $(this).remove();
                }
            });
            //失去焦点
            inputObj.on("blur",function () {
                var type;
                var attr=$(this).parents(".setting_list").find(".bigFather").attr("id");
                if(attr=="ts"){
                    type="topic";
                }else if(attr=="gs"){
                    type="group";
                }else if(attr=="ss"){
                    type="smart";
                }
                var affid=$(this).parents("tr").find("td a").eq(0).html();
                var text = $(this).val();
                $(this).remove();
                tdObj.html(text);
                if(preText==text){
                    return false;
                }else{
                    updateWeight(affid,text,type);
                }
            })
            //已进入编辑状态后，不再处理click事件
            inputObj.click(function(){
                return false;
            });
        });
        //promotion record
        //获取开关效果并且发送ajax
        var prActive="";
        $(".table").delegate("td.prFlag img","click",function () {
            if($(this).attr("class")=='true'){
                $(this).parent("td.prFlag").attr({"id":"false"});
                prActive=0;
            }else if($(this).attr("class")=='false'){
                $(this).parent("td.prFlag").attr({"id":"true"});
                prActive=1;
            }
            var affid=$(this).parent("td.prFlag").siblings(".affid").html();
            var data={
                appid:$scope.id,
                affid:affid,
                active:prActive,
                token:token,
                userId:userData.id
            };
            $.ajax({
                type:"post",
                url:urlInfoOne+"pauseCart",
                data:data,
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
                        //do nothing
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })

        });
        //点击编辑
        // #!/addCart/{{id}}/false
        $(".table").delegate(".editTable a","click",function () {
            localStorage.affid=$(this).parents(".editApp").siblings(".affid").html();
            localStorage.payout=$(this).parents(".editApp").siblings(".payout").html();
            localStorage.cap=$(this).parents(".editApp").siblings(".cap").html();
            localStorage.margin=$(this).parents(".editApp").siblings(".margin").html();
            window.location='#!/addCart/'+$scope.id+"/"+"true";
        });


    }])
    //addCart
.controller("addCart",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        //console.log(userData.id)
        $scope.data="";
        $scope.margin=25;
        $scope.profit=20;
        $scope.shared=15;
        $scope.cap=0;
        $scope.id=$routeParams.id;
        $scope.flag=$routeParams.flag;

        $scope.checkFlag=function () {
            if($scope.flag=='false'){
                return false;
            }else if($scope.flag=='true'){
                return true;
            }
        }
        $("#AffId").on("click",function () {
            $('.affIdList').css({"display":'block'});
        })
        var num=0;
        var oldWidth;
        var newWidth;
        $(".affIdList").delegate("li","click",function () {
            $(this).css({"display":"none"})
                num=num+1;
                var span=document.createElement('span');
                oldWidth=(100-num*14);
                span.innerHTML=$(this).html();
                $(".moreIdWrap").get(0).insertBefore(span,$('#AffId').get(0));
                $('#AffId').css({"width":oldWidth+"%"});

        })
        $(".moreIdWrap").delegate("span","click",function () {
            $(this).addClass("special");
        })
        document.onkeydown=function (e) {
            var numTwo=0;
            if($(".moreIdWrap").find('span').hasClass("special")){
                $(".moreIdWrap").find("span.special").each(function (index,dom) {
                    $(".affIdList li").each(function (indexLi,domLi) {
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
                        newWidth=oldWidth+14*numTwo;
                        oldWidth=newWidth;
                        $('#AffId').css({"width":newWidth+"%"});
                    }
                }
            }

        }

        $(document).on("click",function (e) {
            if(e.target.id!="AffId" && e.target.className!="AffIds"){
                $('.affIdList').css({"display":'none'});
            }
        })
        //agree点击效果
        $('.radioWrap').on("click",function () {
            var attr=$(this).find("em").attr('id');
            if(attr=="true"){
                $(this).find("em").attr({"id":"false"});
                $(this).find("img").attr({"src":'../img/but_Checkbox_default_dark.png'})
            }else if(attr=="false"){
                $(this).find("em").attr({"id":"true"});
                $(this).find("img").attr({"src":'../img/but_Checkbox_selected.png'})
            }
        })
        //console.log(userData);

        if($scope.flag=='false'){
            //页面加载，ajax请求affids
            $.ajax({
                type:"post",
                url:urlInfoOne+"findAllAffid",
                dataType:'jsonp',
                data:{
                    appids:$scope.id,
                    token:token,
                    userId:userData.id

                },
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    //console.log(data)
                    if(data.respCode=="00"){
                        $scope.data=data.content;
                        $scope.$apply();
                    }else {
                        console.log("error")
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
            //页面加载获取payout
            $.ajax({
                type:"post",
                url:urlInfoOne+"maxPayout",
                dataType:'jsonp',
                data:{
                    appid:$scope.id,
                    token:token,
                    userId:userData.id

                },
                jsonp:"jsonpCallback",
                jsonpCallback:"callbackPayout",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    //console.log(data);
                    if(data.respCode=="00"){
                        if(data.content==""){
                            return false;
                        }else{
                            $scope.payout=data.content[0].sumpayout;
                            $scope.$apply();
                        }

                    }else {
                        console.log("error")
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        }else if($scope.flag=='true'){
            $("#AffId").val(localStorage.affid);
            $scope.cap=localStorage.cap;
            $scope.payout=localStorage.payout;
            $scope.margin=localStorage.margin;

        }

        //save 点击发起ajax请求
        $scope.saveAjax=function () {
            var attr=$(".radioWrap").find("em").attr('id');
            var valueArr=[];//affIds
            if($scope.flag=="false"){
                $(".moreIdWrap span").each(function (index,dom) {
                    valueArr.push($(dom).html());
                })
            }else if($scope.flag=="true"){
                valueArr.push($("#AffId").val());
            }

            var cap=$scope.cap;
            var payout=$scope.payout;
            var margin=$scope.margin;
            var profit=$scope.profit;
            var shared=$scope.shared;
            var apply='';
            if(attr=="true"){
                apply=1;
            }else if(attr=="false"){
                apply=0;
            }
            if(valueArr==''){
                $("#AffId").addClass("active").get(0).focus();
            }else if(isNaN(cap) || cap==''){
                $("#cap").addClass("active").get(0).focus();
            }else if(isNaN(payout) || payout==''){
                $("#payout").addClass("active").get(0).focus();
            }else if(isNaN(margin) || margin==''){
                $("#margin").addClass("active").get(0).focus();
            }else if(isNaN(profit) || profit==''){
                $("#profit").addClass("active").get(0).focus();
            }else if(isNaN(shared) || shared==''){
                $("#shared").addClass("active").get(0).focus();
            }
            var data={
                appids:$scope.id,
                ids:encodeURI(valueArr),
                cap:cap,
                payout:payout,
                margin:margin,
                profit:profit,
                shared:shared,
                apply:apply,
                token:token,
                id:userData.id,
                userId:userData.id
            }
            if($scope.flag=="true"){
                data={
                    appid:$scope.id,
                    affids:encodeURI(valueArr),
                    cap:cap,
                    payout:payout,
                    margin:margin,
                    profit:profit,
                    shared:shared,
                    apply:apply,
                    token:token,
                    id:userData.id,
                    userId:userData.id
                };
                $.ajax({
                    type:"post",
                    url:urlInfoOne+"addMarkCheckProfits",
                    dataType:"jsonp",
                    data:data,
                    jsonp:'jsonpCallback',
                    jsonpCallback:'callback',
                    cache:false,
                    beforeSend :function(xmlHttp){
                        xmlHttp.setRequestHeader("If-Modified-Since","0");
                        xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    },
                    success:function (data) {
                        console.log(data);
                        if(data.respCode=="00"){
                            window.location="#!/appDetail/"+$scope.id+"/table1";
                        }
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            }else if($scope.flag=="false"){
                $.ajax({
                    type:"post",
                    url:urlInfoOne+"addCart",
                    dataType:"jsonp",
                    data:data,
                    jsonp:'jsonpCallback',
                    jsonpCallback:'callback',
                    cache:false,
                    beforeSend :function(xmlHttp){
                        xmlHttp.setRequestHeader("If-Modified-Since","0");
                        xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    },
                    success:function (data) {
                        if(data.respCode=="00"){
                            window.location="#!/appDetail/"+$scope.id+"/table1";
                        }
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            }

        }

}])
    //offers
.controller("addTrace",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.appid=$routeParams.id;
    //status点击效果
    $('.radioWrap').on("click",function () {
        var attr=$(this).find("em").attr('id');
        if(attr=="true"){
            $(this).find("em").attr({"id":"false"});
            $(this).find("img").attr({"src":'../img/but_Checkbox_default_dark.png'})
        }else if(attr=="false"){
            $(this).find("em").attr({"id":"true"});
            $(this).find("img").attr({"src":'../img/but_Checkbox_selected.png'})
        }
    })

    $scope.saveAjax=function(){
        $scope.main=$("#main").val();
        $scope.method=$("#method").val();
        $scope.netId=$("#netId").val();
        $scope.affId=$("#affId").val();
        $scope.link=$("#link").val();
        if($(".radioWrap em").attr("id")=="true"){
            $scope.staus=1;
        }else if($(".radioWrap em").attr("id")=="false"){
            $scope.staus=0;
        }
        $scope.link=$scope.link.replace(/\s+/g,"");
        $.ajax({
            type:"post",
            url:urlInfoOne+"saveApp_trace",
            data:{
                token:token,
                userId:userData.id,
                appid:$scope.appid,
                netid:$scope.netId,
                affid:$scope.affId,
                method:$scope.method,
                traceLink:$scope.link,
                major:$scope.main,
                status:$scope.staus
            },
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function(data){
                console.log(data);
                if(data.respCode=="00"){
                    window.location="#!/appDetail/"+$scope.appid+"/table5";
                }
            },
            error:function(data){
                console.log(data);
            }
        })
    }

}])
.controller("offers",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.packageName="";
    $scope.offerName="";
    $scope.offersId="";
    $scope.offersIdCon="";
    $scope.countryCode="";
    $scope.search="";
    //获取app详细内容
    $scope.offersId=$scope.offersIdCon==""?0:$scope.offersIdCon;
    //分页导航
    $scope.pageNo=1;//当前页数
    $scope.pageSize=20;//长度：20
    $scope.type=$routeParams.type;
    var variable={
        id:$scope.offersId,
        offerName:encodeURI($scope. offerName),
        packageName:encodeURI($scope.packageName),
        accept:$scope.countryCode,
        pageNo:$scope.pageNo,
        pageSize:$scope.pageSize,
        type:$scope.type,
        token:token,
        userId:userData.id
    };
    function toGo(){
        if($scope.pageNo!=''){
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findOffPayoutByConditions",
                dataType: 'jsonp',
                data:variable,
                jsonp: "jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (e) {
                    //console.log(e);
                    if(e.respCode=="00"){
                        $scope.contents=e.content.dataList;
                        $scope.pages=e.content.pages;
                        $scope.paginationConf.totalItems=e.content.total;
                        $scope.$apply();
                    }
                },
                complete:function(){
                    $("#loading-center").css({"display":"none"});
                },
                error:function (e) {
                    //console.log(e);
                }
            });
        }
    }
    //页面载入-ajax请求（分页）
    toGo();
    //分页导航
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.pages,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            variable={
                id:$scope.appId,
                name:encodeURI($scope.offerName),
                packageName:encodeURI($scope.packageName),
                accept:$scope.countryCode,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                type:$scope.type,
                token:token,
                userId:userData.id
            };
            toGo();
        }
    };
    //点击搜索
    $(".select-list input").on("keypress",function (e) {
        if(e.keyCode=="13"){
            $(".btn-search").click();
        }
    })
    $scope.ajaxGet=function () {
        $scope.offersId=$scope.offersIdCon==""?0:$scope.offersIdCon;
        variable={
            id:$scope.offersId,
            name:encodeURI($scope.offerName),
            packageName:encodeURI($scope.packageName),
            accept:$scope.countryCode,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            type:$scope.type,
            token:token,
            userId:userData.id
        };
        toGo();
    }
    //Switching effect
    $scope.switch=function (para,index) {
        var active='';
        var flag=true;
        if(flag){
            if($(".status_img").eq(index).attr("id")=='true'){
                $(".status_img").eq(index).attr({"id":"false"});
                active=false;
            }else {
                $(".status_img").eq(index).attr({"id":"true"});
                active=true;
            }
            flag=false;
            //console.log(active);
            $.ajax({
                type:"post",
                url:urlInfoTwo+"updateOfferActive",
                data:{
                    id:para,
                    active:active,
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
                    flag=true;
                }
            })
        }

    }

}])
.controller('offersDetail',["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.remark="";
        $scope.statuResult='';
        //导航栏效果
        $(".lab li").on("click",function () {
            $(".lab li").removeClass("first");
            $(this).addClass("first");
        })

        //下拉效果
        $(".select-box a").on("click",function () {
            var flag=$(".select-list").css("display");
            if(flag=="none"){
                $(".select-box em img").get(0).src='../img/huishou.png';
                $(".select-list").css({"display":"block"});
            }else if(flag=="block"){
                $(".select-box em img").get(0).src='../img/xiala.png';
                $(".select-list").css({"display":"none"})
            }
        })
        $(".select-list li").hover(function () {
            $(".select-list li").removeClass("color");
            $(this).addClass("color");
        },function () {

        })
        //获取状态
        $(".select-list li").on("click",function () {
            $scope.statuResult=$(this).html();
            $(".select-list").css({"display":"none"});
            $(".select-box em img").get(0).src='../img/xiala.png';
            $scope.$apply();
        })

        $scope.id=$routeParams.id;
        //页面加载，发起ajax
        $.ajax({
            type:'post',
            url:urlInfoTwo+'findByIdOffer',
            dataType:"jsonp",
            data:{
                id:$scope.id,
                token:token,
                userId:userData.id
            },
            jsonp:"jsonpCallback",
            jsonpCallback:'callback',
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=='00'){
                    if(data.content==""){
                        return false;
                    }else{
                        $scope.content=data.content[0];
                        $scope.payout=data.content[0].payout.toFixed(2);
                        $scope.remark=data.content[0].desc;
                        $scope.status=data.content[0].statu;
                        $scope.oldStatus=data.content[0].statu;
                        $scope.oldRemark=data.content[0].desc;
                        if($scope.status=="0"){
                            $scope.statuResult="Done";
                        }else if($scope.status=="1"){
                            $scope.statuResult="Save";
                        }else if($scope.status=="2"){
                            $scope.statuResult="Action";
                        }
                        $scope.$apply();
                    }

                }else{
                    console.log("error");
                }
            },
            error:function (data) {
                console.log(data)
            }
        })
        //点击save按钮 发起ajax；
        $(".save a").on("click",function () {
            var con=$(".select-box a").html();
            var active,verify;
            // if($scope.oldRemark==$scope.remark && con== $scope.statuResult){
            //     return false;
            // }else{

                if(con=="Done"){
                    active=0;
                    verify=0;
                }else if(con=="Action"){
                    active=1;
                    verify=1;
                }else if(con=="Save"){
                    active=1;
                    verify=0;
                }
                var data={
                    id:$scope.id,
                    desc:$scope.remark,
                    active:active,
                    verify:verify,
                    token:token,
                    userId:userData.id
                }
                //console.log(data);
                $.ajax({
                    type:"post",
                    url:urlInfoTwo+"updateAppDetailsStates",
                    dataType:"jsonp",
                    data:data,
                    jsonp:"jsonpCallback",
                    jsonpCallback:"callback",
                    cache:false,
                    beforeSend :function(xmlHttp){
                        xmlHttp.setRequestHeader("If-Modified-Since","0");
                        xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    },
                    success:function (data) {
                        if(data.respCode="00"){
                            $(".pagesPrompt").css({"display":"block"}).html("Save successfully");
                            setTimeout(function () {
                                $(".pagesPrompt").css({"display":"none"})
                            },2000)
                        }else{
                            $(".pagesPrompt").css({"display":"block"}).html("Save failed");
                            setTimeout(function () {
                                $(".pagesPrompt").css({"display":"none"})
                            },2000)
                        }
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            // }
        })



    }])
.controller("editOffers",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
        $scope.id=$routeParams.id;
        //下拉框效果
        $("#offerSource").on("click",function () {
            $("#system-son").css({"display":"block"})
        })
        $(document).on("click",function (e) {
            if(e.target.id!='offerSource'){
                $("#system-son").css({"display":"none"})
            }
        })

        //Radio box effect
        $('.selectRadio .radio-inline').on("click",function () {
            var name=this.className;
            if(name.indexOf('check')>-1){
                return false;
            }else {
                $(this).siblings(".radio-inline.check").find('input').removeAttr('checked');
                $(this).find("input").attr({"checked":"checked"});
                $(this).siblings(".radio-inline.check").removeClass("check").end().addClass('check');
            }
        })
        //Check box effect
        $('.select-list .checkbox-inline').on("click",function () {
            var name=this.className;
            if(name.indexOf('checkAgain')>-1){
                $(this).removeClass("checkAgain");
                $(this).find("input").removeAttr("checked");
            }else {
                $(this).find("input").attr({"checked":"checked"})
                $(this).addClass('checkAgain');
            }
            return false;
        })
        $.getJSON("../js/country.json",function (data) {
            $scope.data=data;
            $scope.$apply();
        })
        var timeZone=$("#timeZone").get(0);
        $.getJSON('../js/timeZone.json',function (data) {
            for(var i=0;i<data.length;i++){
                var para=document.createElement("option");
                para.id=data[i].value.toFixed(2);
                para.value=data[i].name+"-"+data[i].value.toFixed(2);
                para.innerHTML=data[i].name+" - "+data[i].value.toFixed(2);
                timeZone.appendChild(para);
            }

        });
        $scope.system=[
            {name:"ios"},
            {name:"Android"}
        ]
        var flag=true;
        $("input.cons").on('focus',function (e) {
            e.stopPropagation();//清除默认设置；
            $(this).siblings(".system-son").css({"display":"block"});
            if(e.target.id=="con-one"){
                $(this).siblings("i").find('img').attr({"src":'../img/icon_shouhui.png'})
            }
        })
        $scope.get_con=function (para) {
            $scope.systemSearch=para;
        }
        $(".system-son .text").bind("hover",function () {
            $(".system-son .text").removeClass("active");
            $(this).addClass("active")
        })

        $scope.get=function (paraOne,paraTwo) {
            $scope.search=paraOne;
            $scope.countryCode=paraTwo;
            if($scope.search){
                $('.country.con').find("i").css({"display":'block'});
            }
        }
        $scope.offerS=function (paraOne,paraTwo) {
            $scope.offerSource=paraOne,
            $scope.netid=paraTwo;//传给后台
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
            $scope.search='';
            $scope.countryCode="";
            $scope.$apply();
            $(this).css({"display":"none"});
        })
        $scope.checkeds=function (para) {
            if(para==$scope.payType){
                return true;
            }else{
                return false;
            }
        }
        //页面加载 获取netId
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
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.netWorkList=data.content;
                    $scope.$apply();
                }else{
                    console.error(data.errorInfo)
                }
            }
        })
        // 页面加载发动ajax 获取页面信息
        $.ajax({
            type:"post",
            url:urlInfoTwo+'findOffBeforeUpdate',
            dataType:"jsonp",
            data:{
                id:$scope.id,
                token:token,
                userId:userData.id
            },
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                if(data.respCode=="00"){
                    //$scope.networklist=data.content.networklist;
                    $scope.offerDetail=data.content.offerDetail;
                    $scope.paytypelist=data.content.paytypelist;
                    //console.log($scope.offerDetail.type);
                    $scope.offerSource=$scope.offerDetail.netName;
                    $scope.netid=$scope.offerDetail.netid;
                    $scope.systemSearch=$scope.offerDetail.platform;
                    $scope.countryCode=$scope.offerDetail.accept;
                    if($scope.countryCode!=""){
                        $scope.search=$("#"+$scope.countryCode).html();
                    }
                    $scope.packageName=$scope.offerDetail.packageName;
                    $scope.offerName= $scope.offerDetail.offerName;
                    $scope.payout=$scope.offerDetail.payout.toFixed(4);
                    $scope.dailyCap=$scope.offerDetail.dailyCap;
                    $scope.dailyLimit=$scope.offerDetail.saftycap;
                    $scope.totalCap=$scope.offerDetail.totalCap;
                    $scope.trackingLink=$scope.offerDetail.trackingLink;
                    $scope.desc=$scope.offerDetail.desc;
                    $scope.kpi=$scope.offerDetail.kpi;
                    $scope.payType=$scope.offerDetail.payType;//设置默认选中支付方式;
                    $scope.timeZone=$scope.offerDetail.timeZone.toFixed(2);
                    var arrOption=$('#timeZone').find("option");
                    for(var i=0;i<arrOption.length;i++){
                        if($(arrOption[i]).attr("id")==$scope.timeZone){
                            $(arrOption[i]).attr({"selected":"selected"});
                        };
                    }
                    if($scope.offerDetail.hard==true){
                        $("#hardKPI").parent(".checkbox-inline").addClass("checkAgain");
                        $("#hardKPI").attr({"checked":"checked"});
                    }
                    if($scope.offerDetail.type=='true'){
                        $("#gaid").parent(".checkbox-inline").addClass("checkAgain");
                        $("#gaid").attr({"checked":"checked"});
                    }
                    if($scope.offerDetail.huge==true){
                        $("#huge").parent(".checkbox-inline").addClass("checkAgain");
                        $("#huge").attr({"checked":"checked"});
                    }
                    if($scope.offerDetail.inWeb==true){
                        $("#inweb").parent(".checkbox-inline").addClass("checkAgain");
                        $("#inweb").attr({"checked":"checked"});
                    }
                    if($scope.offerDetail.inApp==true){
                        $("#inapp").parent(".checkbox-inline").addClass("checkAgain");
                        $("#inapp").attr({"checked":"checked"});
                    }
                    if($scope.offerDetail.mobile==true){
                        $("#phone").parent(".checkbox-inline").addClass("checkAgain");
                        $("#phone").attr({"checked":"checked"});
                    }
                    if($scope.offerDetail.tablet==true){
                        $("#tablet").parent(".checkbox-inline").addClass("checkAgain");
                        $("#tablet").attr({"checked":"checked"});
                    }
                    $scope.$apply();

                }
            },
            error:function (data) {
                console.log(data);
            }
        })

        //点击提交发送ajax
        $(".detail-btn a").on("click",function () {
            var payType=$("#payType").find("option:checked").val();
            var startDate=$("#startDate").val();
            var closeDate=$("#endDate").val();
            var hard,inApp,inWeb,Mobile,Tablet,type,huge;
            if($("#hardKPI").attr("checked")=="checked"){
                hard=true;
            }else{
                hard=false;
            }
            if($("#inapp").attr("checked")=="checked"){
                inApp=true;
            }else{
                inApp=false;
            }
            if($("#huge").attr("checked")=="checked"){
                huge=true;
            }else{
                huge=false;
            }
            if($("#inweb").attr("checked")=="checked"){
                inWeb=true;
            }else{
                inWeb=false;
            }
            if($("#phone").attr("checked")=="checked"){
                Mobile=true;
            }else{
                Mobile=false;
            }
            if($("#tablet").attr("checked")=="checked"){
                Tablet=true;
            }else{
                Tablet=false;
            }
            if($("#gaid").attr("checked")=="checked"){
                type=true;
            }else{
                type=false;
            }
            var timeZone=$("#timeZone").find("option:checked").attr("id");
            var data={
                id:$scope.id,
                platform:$scope.systemSearch,
                accept:$scope.countryCode,
                packageName:$scope.packageName,
                netid:$scope.netid,
                payType:payType,
                timeZone:timeZone,
                offerName:$scope.offerName,
                payout:$scope.payout,
                dailyCap:$scope.dailyCap,
                saftycap:$scope.dailyLimit,
                totalCap:$scope.totalCap,
                startDate:startDate,
                closeDate:closeDate,
                hard:hard,
                inApp:inApp,
                inWeb:inWeb,
                Mobile:Mobile,
                Tablet:Tablet,
                type:type,
                desc:$scope.desc,
                trackingLink:$scope.trackingLink,
                huge:huge,
                token:token,
                userId:userData.id

            }
            $.ajax({
                type:"post",
                url:urlInfoTwo+"updateOffer",
                dataType:"jsonp",
                data:data,
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    if(data.respCode=="00"){
                        window.location="#!/offersDetail/"+$scope.id;
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        })

    }])

.controller('offerReport',['$scope',"$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
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
        $scope.advertiser="";
        $scope.offId="";
        $scope.offName="";
        $scope.firstdate="";
        $scope.lastdate="";
        $scope.pageNo=1;
        $scope.pageSize=10;
        $scope.searchNetId="";
        $scope.advertiser="";
        function dataAjax() {
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findOfferReport",
                data:{
                    pageNo: $scope.pageNo,
                    pageSize: $scope.pageSize,
                    offerid:$scope.offId,
                    offerName:encodeURI($scope.offName),
                    netid:$scope.advertiser,
                    firstdate:$scope.firstdate,
                    lastdate:$scope.lastdate,
                    token:token,
                    userId:userData.id
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
                    //console.log(data);
                    if(data.respCode=="00"){
                        $scope.datas=data.content.resultlist.dataList;
                        $scope.pages=data.content.resultlist.pages;
                        $scope.runTotal=data.content.resultlist.total;
                        $scope.coversion=data.content.coversion;
                        $scope.revenue=data.content.revenue;
                        $scope.paginationConf.totalItems=data.content.resultlist.total;
                        $scope.flag=false;
                        $scope.$apply();
                    }else if(data.respCode=='023'){
                        $scope.datas=[];
                        $scope.pages=0;
                        $scope.runTotal=0;
                        $scope.coversion="";
                        $scope.revenue="";
                        $scope.flag=true;
                        $scope.$apply();
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })

        }

        //按下enter搜索
        $(".form-group.input-box input").each(function (index,dom) {
            $(dom).bind("keypress",function (e) {
                if(e.keyCode==13){
                    $(".btnSearch").click();
                }
            })
        });
        //点击搜素按钮 搜索
        $(".btnSearch").on("click",function () {

            $scope.firstdate=$scope.startDate;
            $scope.lastdate = $scope.endDate;
            if($scope.offId==''){
                $scope.offId=0;
            };
            if($("#selectNetId").val()==""){
                $scope.advertiser="";
            }
            if($scope.advertiser==""){
                return false;
            }
            if(isNaN($scope.offId)==false){
                 dataAjax();
                $scope.paginationConf.onChange=function(){
                    $scope.pageNo=$scope.paginationConf.currentPage;
                    $scope.pageSize=$scope.paginationConf.itemsPerPage;
                    dataAjax();
                }
            }else {
                $("#offId").addClass("active");
                $("#offId").get(0).focus();
            }
        });
    /**
     * 分页导航
     */
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50]
    };
}])
    //advFilter
.controller("advFilter",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
    //页面载入 发起ajax请求
    //搜索
    //搜索函数
    $("#netWrap").find(".label").css({"display":"none"});
    $scope.select="0";
    $scope.pageNo=1;
    $scope.pageSize=10;
    $scope.platform="";
    $scope.offerName="";
    $scope.search="";
    $scope.countryCode="";
    $scope.activeCon="All";
    $scope.activestate="-1";
    $scope.advertiser="";
    $scope.searchNetId="";
    function filterAjax(para) {
        $.ajax({
            type:"post",
            url:urlInfoOne+"findFilterOffer",
            data:para,
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
                    $scope.tableList=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.paginationConf.totalItems=data.content.total;
                    $scope.$apply();
                }else{

                }
            },
            complete:function(){
                $("#loading-center").css({"display":"none"});
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    $(".select-list li").find("input").each(function (index,dom) {
        $(dom).bind("keypress",function (e) {
            if(e.keyCode==13){
                $(".btn-search").click();
            }

        })
    });
    $scope.ajaxGet=function () {
        $scope.netId=$("#netWrap select").find("option:checked").attr("value");
        filterAjax({
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            accept:$scope.countryCode,
            platform:$scope.platform,
            offerName:encodeURI($scope.offerName),
            netid:$scope.advertiser,
            token:token,
            userId:userData.id,
            activestate:$scope.activestate
        });
    /*
    * 点击搜索、给分页导航添加onChange事件。
    * */
        $scope.paginationConf.onChange=function () {
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            filterAjax({
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                accept:$scope.countryCode,
                platform:$scope.platform,
                offerName:encodeURI($scope.offerName),
                netid:$scope.advertiser,
                token:token,
                userId:userData.id,
                activestate:$scope.activestate
            });

        }
    }
    /**
     * 分页导航
     * */
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50]
    };
    /**
     * 更新开关
     * **/
    function upDateFlag(para,url) {
        $.ajax({
            type:"post",
            url:urlInfoOne+url,
            data:para,
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
            }
        })
    }
    $(".table").delegate("td.flag img","click",function(){
        if($(this).hasClass("true")){
            $(this).parent().removeClass("true").addClass("false");
            if($(this).parent().hasClass("activeFlag")){ //更新active
                upDateFlag({
                    token:token,
                    userId:userData.id,
                    offid: $(this).parents("tr").attr("id"),
                    active:false
                },"updateTopFiletActive")
            }else if($(this).parent().hasClass("verifyFlag")){//更新Verify
                upDateFlag({
                    token:token,
                    userId:userData.id,
                    offid: $(this).parents("tr").attr("id"),
                    verify:false
                },"updateTopFiletVerify")
            }
        }else if($(this).hasClass("false")){
            $(this).parent().removeClass("false").addClass("true");
            if($(this).parent().hasClass("activeFlag")){
                upDateFlag({
                    token:token,
                    userId:userData.id,
                    offid: $(this).parents("tr").attr("id"),
                    active:true
                },"updateTopFiletActive")
            }else if($(this).parent().hasClass("verifyFlag")){
                upDateFlag({
                    token:token,
                    userId:userData.id,
                    offid: $(this).parents("tr").attr("id"),
                    verify:true
                },"updateTopFiletVerify")
            }
        }
    })

    //快捷按钮 创建Offer
    $scope.addOffer=function () {
        if($scope.countryCode==""){
            $scope.countryCode=0;
        }
        if($scope.platform==""){
            $scope.platform=0;
        }
        window.location="#!/seeDetail/"+$scope.platform+"/0/"+$scope.countryCode+"/0/0/"+$scope.select;
    }


}])
.controller("affFilter",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData){
    $scope.search="";
    //搜索
    //搜索函数
    $scope.pageNo=1;
    $scope.pageSize=10;
    $scope.platform="";
    $scope.appName="";
    function filterAjax() {
        $.ajax({
            type:"post",
            url:urlInfoOne+"findFilterApp",
            data:{
                pageSize:$scope.pageSize,
                pageNo:$scope.pageNo,
                accept:$scope.countryCode,
                platform:$scope.platform,
                name:$scope.appName,
                affid:$scope.affId,
                token:token,
                userId:userData.id
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
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.tableList=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.paginationConf.totalItems=data.content.total;
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    $(".select-list li").find("input").each(function (index,dom) {
        $(dom).bind("keypress",function (e) {
            if(e.keyCode==13){
                $(".btn-search").click();
            }

        })
    });
    $scope.ajaxGet=function () {
        $scope.affId=$("#netWrap select").find("option:checked").attr("value");
        filterAjax();
   /**
    * 点击搜索、给分页导航添加onChange事件。
    * */
        $scope.paginationConf.onChange=function () {
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            filterAjax();
        }
    }
    /**
     * 分页导航
     **/
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
    };

}])
.controller("appReport",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
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
        $scope.sbuPublisher="";
        $scope.campaignId="";
        $scope.campaignName="";
        $scope.pageNo=1;
        $scope.pageSize=10;
        //appAjax 函数
        function appAjax() {
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findAppReport",
                data:{
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    firstdate:$scope.firstdate,
                    lastdate:$scope.lastdate,
                    affid:$scope.publisher,
                    pubid:$scope.sbuPublisher,
                    appid: $scope.campaignId,
                    appname:$scope.campaignName,
                    token:token,
                    userId:userData.id
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
                    console.log(data);
                    if(data.respCode=="00"){
                        $scope.resultData=data.content.resultlist.dataList;
                        $scope.runTotal=data.content.resultlist.total;
                        $scope.pages=data.content.resultlist.pages;
                        $scope.coversion=data.content.coversion;
                        $scope.revenue=data.content.revenue;
                        /**
                         * 分页导航的总页数
                         * */
                        $scope.paginationConf.totalItems=data.content.resultlist.total;
                        $scope.flag=false;
                        $scope.$apply();
                    }else if(data.respCode=="023"){
                        $scope.resultData=[];
                        $scope.runTotal=0;
                        $scope.pages=0;
                        $scope.coversion="";
                        $scope.revenue="";
                        //$scope.length=$scope.resultData.length;
                        $scope.flag=true;
                        $scope.$apply();
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        }
        //按下enter 绑定事件
        $(".form-group.input-box input").each(function (index,dom) {
            $(dom).bind("keypress",function (e) {
                if(e.keyCode==13){
                    $(".btnSearch").click();
                }
            })
        });
        //点击搜索按钮
        $(".btnSearch").on("click",function () {
             $scope.firstdate=$scope.startDate;
            $scope.lastdate=$scope.endDate;
             $scope.publisher=$("#publisher").find("option:selected").val();
            //var sbuPublisher=$scope.sbuPublisher;
            //var campaignId=$scope.campaignId;
            if($scope.sbuPublisher==""){
                $scope.sbuPublisher=0;
            }
            if($scope.campaignId==""){
                $scope.campaignId=0;
            }
            if(isNaN($scope.sbuPublisher)){
                $("#sbuPub").addClass("active").get(0).focus();
            }else if(isNaN($scope.campaignId)){
                $("#campaignId").addClass("active").get(0).focus();
            }else{
                appAjax();
                $scope.paginationConf.onChange=function(){
                    $scope.pageNo=$scope.paginationConf.currentPage;
                    $scope.pageSize=$scope.paginationConf.itemsPerPage;
                    appAjax();
                }
            }
        });
        /**
         * 分页导航
         */
        $scope.paginationConf = {
            currentPage: $scope.pageNo,
            totalItems:$scope.total,
            itemsPerPage: $scope.pageSize,
            pagesLength: 9,
            perPageOptions: [10, 20, 30, 40, 50]
        };

    }])
.controller("qualityReport",["$scope","urlInfoOne","urlInfoTwo","token","userData",function ($scope,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.flag=false;//用来判断显示no result的
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate() //日
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    $scope.monthTime = new Date().Format("yyyy-MM-dd");
    $scope.endTime= new Date().Format("yyyy-MM-dd");
    $scope.netId=0;
    $scope.offerId=0;
    $scope.appId=0;
    $scope.affId=0;
    $scope.paraStart="";
    $scope.paraEnd="";
    $scope.pageNo=1;
    $scope.pageSize=20;
    //ajax 获取数据函数
    function selectData(data,url,callbackName) {
        $.ajax({
            type:"get",
            url:urlInfoTwo+url,
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:callbackName,
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
                $("#loading-center").css({"display":"block"});
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    if(url=="findNetid"){
                        $scope.netIdData=data.content;
                        $scope.$apply();
                    }else if(url=="findQualityReprot"){
                        $scope.listData=data.content.dataList;
                        $scope.pages=data.content.pages;
                        $scope.paginationConf.totalItems=data.content.total;
                        if($scope.listData.length<=0){
                            $scope.flag=true;
                        }
                        /**
                         * 为分页导航添加事件
                         * */
                        $scope.paginationConf.onChange=function(){
                            $scope.pageNo=$scope.paginationConf.currentPage;
                            $scope.pageSize=$scope.paginationConf.itemsPerPage;
                            $scope.IdData={
                                token:token,
                                userId:userData.id,
                                netid:$scope.netId,
                                offer_id:$scope.offerId,
                                appid:$scope.appId,
                                affid:$scope.affId,
                                pageNo:$scope.pageNo,
                                pageSize:$scope.pageSize
                            };
                            $scope.IdData[$scope.para]=$scope.monthTime;
                            $scope.IdData[$scope.paraEnd]=$scope.endTime;
                            selectData($scope.IdData,"findQualityReprot","callback");
                        };
                        $scope.$apply();
                    }else if(url=="findOfferid"){
                        $scope.offerIdData=data.content;
                        $scope.$apply();
                    }else if(url=="findAppid"){
                        $scope.appIdData=data.content;
                        $scope.$apply();
                    }else if(url=="findAffid"){
                        $scope.affIdData=data.content;
                        $scope.$apply();
                    }
                }
            },
            complete:function(){
                $("#loading-center").css({"display":"none"});
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    //页面加载
    $scope.type=$("input[type='radio']:checked").val();
    $scope.para=$("input[type='radio']:checked").val()+"_datestart";
    $scope.paraEnd=$("input[type='radio']:checked").val()+"_dateend";
    $scope.data={
        token:token,
        userId:userData.id
    };
    $scope.data[$scope.para]=$scope.monthTime;
    $scope.data[$scope.paraEnd]=$scope.endTime;
    selectData($scope.data,"findNetid","callback")//获netId信息
    //时间选择
    $(".timeSelect").bind("change",function(){
        if($(this).attr("id")=="startTime"){
            $scope.monthTime=$(this).val();
        }else if($(this).attr("id")=="endTime"){
            $scope.endTime=$(this).val();
        };
        if(Date.parse($scope.monthTime)>Date.parse($scope.endTime)){
            return false;
        }
        $scope.type=$("input[type='radio']:checked").val();
        $scope.para=$("input[type='radio']:checked").val()+"_datestart";
        $scope.paraEnd=$("input[type='radio']:checked").val()+"_dateend";
        $scope.data={
            token:token,
            userId:userData.id
        };
        $scope.data[$scope.para]=$scope.monthTime;
        $scope.data[$scope.paraEnd]=$scope.endTime;
        selectData($scope.data,"findNetid","callback")//获netId信息
    });
    //id选择
    $(".idSelect").bind("click",function(){
        $scope.type=$("input[type='radio']:checked").val();
        $scope.para=$("input[type='radio']:checked").val()+"_datestart";
        $scope.paraEnd=$("input[type='radio']:checked").val()+"_dateend";
        if($(this).attr("id")=="netId"){

        }else if($(this).attr("id")=="offerId"){
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId
            };
            $scope.IdData[$scope.para]=$scope.monthTime;
            $scope.IdData[$scope.paraEnd]=$scope.endTime;
            selectData($scope.IdData,"findOfferid","callback");
        }else if($(this).attr("id")=="appId"){
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                offer_id:$scope.offerId,
            };
            $scope.IdData[$scope.para]=$scope.monthTime;
            $scope.IdData[$scope.paraEnd]=$scope.endTime;
            selectData($scope.IdData,"findAppid","callback");
        }else if($(this).attr("id")=="affId"){
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                offer_id:$scope.offerId,
                appid:$scope.appId
            };
            $scope.IdData[$scope.para]=$scope.monthTime;
            $scope.IdData[$scope.paraEnd]=$scope.endTime;
            selectData($scope.IdData,"findAffid","callback");
        }
        $(this).siblings(".idListBox").css({"display":"block"});
    });
    // $(document).on("click",function (e) {
    //     console.log($(e.target).hasClass("idSelect"));
    // })
    //鼠标移入效果
    $(".idListBox").delegate("li","mouseenter",function () {
        $(".idListBox li").removeClass("active");
        $(this).addClass("active");
    });
    $(".idListBox").delegate("li","click",function () {
        $scope.type=$("input[type='radio']:checked").val();
        $scope.para=$("input[type='radio']:checked").val()+"_datestart";
        $scope.paraEnd=$("input[type='radio']:checked").val()+"_dateend";
        if($(this).parent().siblings("input.idSelect").attr("id")=="netId"){
            $scope.netId=$(this).html();
            $scope.$apply();
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
            };
        }else if($(this).parent().siblings("input.idSelect").attr("id")=="offerId"){
            $scope.offerId=$(this).html();
            $scope.mark="appid";
            $scope.$apply();
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                offer_id:$scope.offerId,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
            };
        }else if($(this).parent().siblings("input.idSelect").attr("id")=="appId"){
            $scope.appId=$(this).html();
            $scope.mark="affid";
            $scope.$apply();
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                offer_id:$scope.offerId,
                appid:$scope.appId,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
            };
        }else if($(this).parent().siblings("input.idSelect").attr("id")=="affId"){
            $scope.affId=$(this).html();
            $scope.$apply();
            $scope.IdData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                offer_id:$scope.offerId,
                appid:$scope.appId,
                affid:$scope.affId,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
            };
        }
        $scope.IdData[$scope.para]=$scope.monthTime;
        $scope.IdData[$scope.paraEnd]=$scope.endTime;
        if($(this).parent().siblings("input.idSelect").attr("id")!="netId"){

        }
        selectData($scope.IdData,"findQualityReprot","callback"); //查询列表信息
        $(this).parent().css({"display":"none"});
    });
    /**
     * 分页导航
     */
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50]
    };


}])
.controller("qualityReportDetail",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.netid=$routeParams.net;
    $scope.offer_id=$routeParams.offer;
    $scope.appid =$routeParams.app;
    $scope.affid=$routeParams.aff;
    $scope.startTime=$routeParams.start;
    $scope.endTime=$routeParams.end;
    $scope.type=$routeParams.type;//时间的类型 logs/leads
    $scope.para= $scope.type+"_datestart"; //查询时间的类型
    $scope.paraEnd= $scope.type+"_dateend";//查询时间的类型
    $scope.pageNo=1;
    $scope.pageSize=20;

    $scope.sort="netid";
    $scope.desc=true;
    $scope.sortFun=function(para){
        $scope.sort=para;
        $scope.desc=!$scope.desc;
    }
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
        $scope.imageObject.clickSwap($('#sortFraud'));
    });
    $(function() {
        $scope.imageObject.clickSwap($('#sortNetId'));
    });
    $(function() {
        $scope.imageObject.clickSwap($('#logsTime'));
    });
    $(function() {
        $scope.imageObject.clickSwap($('#leadTime'));
    });

    //页面加载 获取信息
    $scope.data={
        token:token,
        userId:userData.id,
        pageNo:$scope.pageNo,
        pageSize:$scope.pageSize,
        offer_id:$scope.offer_id,
        appid:$scope.appid,
        affid:$scope.affid
    };
    $scope.data[$scope.para]=$scope.startTime;
    $scope.data[$scope.paraEnd]=$scope.endTime;
    function selectData() {
        $.ajax({
            type:"get",
            url:urlInfoTwo+"findQualityReprotTwo",
            data:$scope.data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                console.log(data);
                if(data.respCode=="00"){
                    $scope.dataList=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    selectData();
    //分页导航
    $("#firstpage a").on("click",function () {
        $scope.pageNo=1;
        $scope.data={
            token:token,
            userId:userData.id,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            offer_id:$scope.offer_id,
            appid:$scope.appid,
            affid:$scope.affid
        };
        $scope.data[$scope.para]=$scope.startTime;
        $scope.data[$scope.paraEnd]=$scope.endTime;
        selectData();
    })
    $("#previouspage a").on("click",function () {
        $scope.pageNo=$scope.pageNo-1;
        if($scope.pageNo<=0){
            $scope.pageNo=1;
        }
        $scope.data={
            token:token,
            userId:userData.id,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            offer_id:$scope.offer_id,
            appid:$scope.appid,
            affid:$scope.affid
        };
        $scope.data[$scope.para]=$scope.startTime;
        $scope.data[$scope.paraEnd]=$scope.endTime;
        selectData();
    })
    $("#nextpage a").on("click",function () {
        $scope.pageNo=$scope.pageNo+1;
        if($scope.pageNo>$scope.pages){
            $scope.pageNo=$scope.pages;
        }
        $scope.data={
            token:token,
            userId:userData.id,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            offer_id:$scope.offer_id,
            appid:$scope.appid,
            affid:$scope.affid
        };
        $scope.data[$scope.para]=$scope.startTime;
        $scope.data[$scope.paraEnd]=$scope.endTime;
        selectData();
    })
    $("#lastpage a").on("click",function () {
        $scope.pageNo=$scope.pages;
        $scope.data={
            token:token,
            userId:userData.id,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            offer_id:$scope.offer_id,
            appid:$scope.appid,
            affid:$scope.affid
        };
        $scope.data[$scope.para]=$scope.startTime;
        $scope.data[$scope.paraEnd]=$scope.endTime;
        selectData();
    })
    $("#jumpBtn").on("click",function () {
        $scope.data={
            token:token,
            userId:userData.id,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            offer_id:$scope.offer_id,
            appid:$scope.appid,
            affid:$scope.affid
        };
        $scope.data[$scope.para]=$scope.startTime;
        $scope.data[$scope.paraEnd]=$scope.endTime;
        selectData();
    })
    $("#toPages").on("keypress",function (e) {
        if(e.keyCode==13){
            $scope.data={
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                offer_id:$scope.offer_id,
                appid:$scope.appid,
                affid:$scope.affid
            };
            $scope.data[$scope.para]=$scope.startTime;
            $scope.data[$scope.paraEnd]=$scope.endTime;
            selectData();
        }
    })

}])
.controller("billReport",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.flag=false;//用来判断显示no result的
    $scope.searchNetId="";
    $scope.advertiser="";
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate() //日
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    $scope.monthTime = new Date().Format("yyyy-MM");
    /**
     * 点击search 搜索数据
     * */
    $scope.pageNo=1;
    $scope.pageSize=10;
    function searchAjax() {
        $.ajax({
            type:"get",
            url:urlInfoOne+"findBillReprot",
            data:{
                token:token,
                userId:userData.id,
                netid:$scope.advertiser,
                month:$scope.monthTime,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
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
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.datas=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.paginationConf.totalItems=data.content.total;
                    if($scope.datas.length<=0){
                        $scope.flag=true;
                    }else{
                        $scope.flag=false;
                    }
                    $scope.paginationConf.onChange=function(){
                        $scope.pageNo=$scope.paginationConf.currentPage;
                        $scope.pageSize=$scope.paginationConf.itemsPerPage;
                        searchAjax();
                    }
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    $(".btnSearch").on("click",function () {
        $scope.approved=$("#approveSelect").val();
        $scope.invoiced=$("#invoice").val();
        searchAjax()
    });
    /**
     * 分页导航
     */
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50]
    };
}])
.controller("billingDetail",["$scope","$routeParams","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,$http,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.monthTime =$routeParams.month;
    $scope.netId=$routeParams.para;
    var moreSelect=true;//用于多选的判断开关
    function updateDeduct() {
        $.ajax({
            type:"post",
            url:urlInfoOne+"billReprotTwoUpdateDeduct",
            data:{
                token:token,
                userId:userData.id,
                offer_id:$scope.offerId,
                deduct:$scope.deduct,
                appid:$scope.appid,
                affid:$scope.affid,
                month:$scope.month
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
                    //do nothing
                }
            },
            error:function (data) {
                console.error(data.errorInfo);
            }
        })
    }
    var flag=true;
    function updateApprovedAndHold(para,url) {
        $.ajax({
            type:"get",
            url:urlInfoOne+url,
            data:para,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    flag=true;
                    $scope.holdFlag=true;
                    $scope.moreFlag=true;

                }
            },
            error:function (data) {
                console.error(data.errorInfo);
            }
        })
    }

    /**
     * 选中与不选中效果
     * approved
     * hold
     * */
    $("table.table").delegate("#approved img","click",function () {
        if(flag){
            flag=false;
            if($(this).parent().siblings("#hold").hasClass("true")){
                flag=true;
                return false;
            }else if($(this).hasClass("true")){
                $(this).parent().removeClass("true").addClass("false");
                $scope.offerId=$(this).parent().siblings('.offerId').find('.offerIdCon').html();
                $scope.appid=$(this).parent().siblings('.appId').html();
                $scope.affid=$(this).parent().siblings('.affId').html();
                $scope.month=$(this).parent().siblings('.month').html();
                $scope.approved=false;
                $scope.approvedData={
                    token:token,
                    userId:userData.id,
                    offer_id:$scope.offerId,
                    appid:$scope.appid,
                    affid:$scope.affid,
                    approved:$scope.approved,
                    month:$scope.month
                }
                updateApprovedAndHold($scope.approvedData,"billReprotTwoUpdateApproved");
            }else if($(this).hasClass("false")){
                $(this).parent().removeClass("false").addClass("true");
                $scope.offerId=$(this).parent().siblings('.offerId').find('.offerIdCon').html();
                $scope.appid=$(this).parent().siblings('.appId').html();
                $scope.affid=$(this).parent().siblings('.affId').html();
                $scope.month=$(this).parent().siblings('.month').html();
                $scope.approved=true;
                $scope.approvedData={
                    token:token,
                    userId:userData.id,
                    offer_id:$scope.offerId,
                    appid:$scope.appid,
                    affid:$scope.affid,
                    approved:$scope.approved,
                    month:$scope.month
                };
                updateApprovedAndHold($scope.approvedData,"billReprotTwoUpdateApproved");
            }
        }

    });
    $scope.holdFlag=true;
    $("table.table").delegate("#hold img","click",function () {
        if($scope.holdFlag){
            $scope.holdFlag=false;
            if($(this).parent().siblings("#approved").hasClass("true")){
                $scope.holdFlag=true;
                return false;
            }else if($(this).hasClass("true")){
                $(this).parent().removeClass("true").addClass("false");
                $scope.offerId=$(this).parent().siblings('.offerId').find('.offerIdCon').html();
                $scope.appid=$(this).parent().siblings('.appId').html();
                $scope.affid=$(this).parent().siblings('.affId').html();
                $scope.month=$(this).parent().siblings('.month').html();
                $scope.hold=false;
                $scope.holdData={
                    token:token,
                    userId:userData.id,
                    offer_id:$scope.offerId,
                    appid:$scope.appid,
                    affid:$scope.affid,
                    hold:$scope.hold,
                    month:$scope.month
                };
                updateApprovedAndHold($scope.holdData,"billReprotTwoUpdateHold");
            } else if($(this).hasClass("false")){
                 $(this).parent().removeClass("false").addClass("true");
                $scope.offerId=$(this).parent().siblings('.offerId').find('.offerIdCon').html();
                $scope.appid=$(this).parent().siblings('.appId').html();
                $scope.affid=$(this).parent().siblings('.affId').html();
                $scope.month=$(this).parent().siblings('.month').html();
                $scope.hold=true;
                $scope.holdData={
                    token:token,
                    userId:userData.id,
                    offer_id:$scope.offerId,
                    appid:$scope.appid,
                    affid:$scope.affid,
                    hold:$scope.hold,
                    month:$scope.month
                };
                updateApprovedAndHold($scope.holdData,"billReprotTwoUpdateHold");
            }
        }

    });
    /**
     * 全选
     * */
    $scope.moreFlag=true;
    $("#approvedWrap").bind("click",function () {
        var arrData=[];
        if($scope.moreFlag){
            if($(this).hasClass("true")){
                $(this).removeClass("true").addClass("false");
                $scope.approved=false;
                $('.dataWrap').each(function (index,dom) {
                    $(dom).find("#approved").removeClass().addClass("false");
                    // var moreObj={};
                    // moreObj["offer_id"]=$(dom).find(".offerId").html();
                    // moreObj["appid"]=$(dom).find(".appId").html();
                    // moreObj["affid"]=$(dom).find(".affId").html();
                    // moreObj["approved"]=false;
                    // moreObj["month"]=$(dom).find(".month").html();
                    // arrData.push(moreObj);
                })
            }else if($(this).hasClass("false")){
                $(this).removeClass("false").addClass("true");
                $scope.approved=true;
                $('.dataWrap').each(function (index,dom) {
                    $(dom).find("#approved").removeClass().addClass("true");
                    // var moreObj={};
                    // moreObj["offer_id"]=$(dom).find(".offerId").html();
                    // moreObj["appid"]=$(dom).find(".appId").html();
                    // moreObj["affid"]=$(dom).find(".affId").html();
                    // moreObj["approved"]=true;
                    // moreObj["month"]=$(dom).find(".month").html();
                    // arrData.push(moreObj);
                })
            }
            $scope.approvedData={
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                month: $scope.monthTime,
                approved:$scope.approved
            };
            //console.log($scope.approvedData);
            updateApprovedAndHold($scope.approvedData,"batchUpdateApproved");
        }

    });
    /**
     * 双击修改
     * */
    var oldCon="";
    $("#tableBox").delegate(".deduct","dblclick",function () {
        var that=this;
        if($(this).children("input").length > 0){
            return false;
        }
        var inputObj=$("<input type='text' class='form-control'>");
        oldCon=$(this).html();
        $(this).html("");
        inputObj.val(oldCon).appendTo($(this));
        inputObj.focus();
        inputObj.on("blur",function () {
            if(oldCon!=inputObj.val()){
                oldCon=inputObj.val();
                $scope.offerId=$(that).siblings(".offerId span").html();
                $scope.deduct=oldCon;
                $scope.appid=$(that).siblings(".appId").html();
                $scope.affid=$(that).siblings(".affId").html();
                $scope.month=$(that).siblings(".moth").html();
                updateDeduct();
            }
            $(this).parent().html(oldCon);
            $(this).remove();

        })
    })
    /**
     * 页面加载 获取数据
     * */
    $scope.pageNo=1;
    $scope.pageSize=10;
    function selectData() {
        $.ajax({
            type:'get',
            url:urlInfoOne+"findBillReprotTwo",
            data:{
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                netid:$scope.netId,
                month:$scope.monthTime
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
                console.log(data);
                if(data.respCode=="00"){
                    $scope.dataList=data.content.billTwoList.dataList;
                    $scope.sum=data.content.sumBillReprotTwo;
                    $scope.pages=data.content.billTwoList.pages;
                    $scope.paginationConf.totalItems=data.content.billTwoList.total;
                    $scope.$apply();
                    //用来做页面加载 或者分页导航刷新数据之后 Approved的状态。
                    $('.dataWrap').each(function (index,dom) {
                        if($(dom).find("#approved").hasClass("false")){
                            moreSelect=false;
                            return false;
                        }
                    })
                    if(moreSelect){
                        $("#approvedWrap").removeClass().addClass("text-center true");
                    }
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    selectData();
    /**
     * 事件变化 发起请求
     * */
    $("#monthTime").on("change",function () {
        $scope.monthTime=$(this).val();
        selectData();
    });

    /**
     * 排序
     * **/
    $scope.imageObject = {
        clickSwap : function(obj) {
            obj.click(function() {
                $scope.activeImage = $(this).children('img.active');
                $scope.activeImage.removeClass('active');
                if ($scope.activeImage.next().length > 0) {
                    $scope.activeImage.next().addClass('active');
                } else {
                    $(this).children('img:first-of-type').addClass('active');
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
    $(function() {
        $scope.imageObject.clickSwap($('#sort5'));
    });
    $scope.sort="offer_id";
    $scope.desc=true;
    $scope.sortFun=function (para) {
        $scope.sort=para;
        $scope.desc=!$scope.desc;
    };
    /**
     * 分页导航
     * **/
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            selectData();
        }
    };
}])
.controller("holdBilling",["$scope","$routeParams","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,$http,urlInfoOne,urlInfoTwo,token,userData) {
    //页面加载 获取数据
    $scope.pageNo=1;
    $scope.pageSize=10;
    function selectData() {
        $.ajax({
            type:"get",
            url:urlInfoOne+"findHoldBill",
            data:{
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
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
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.dataList=data.content.dataList;
                    $scope.paginationConf.totalItems=data.content.total;
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        });
    }
    selectData();
    function updateHold(para,url,obj) {
        $.ajax({
            type:"get",
            url:urlInfoOne+url,
            data:para,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    $(obj).parents(".dataWrap").remove();
                    $scope.holdFlag=true;
                }
            },
            error:function (data) {
                console.log(data);
            }
        });
    }
    $scope.holdFlag=true;
    $("table.table").delegate("#hold img","click",function () {
        if($scope.holdFlag){
            $scope.holdFlag=false;
            if($(this).hasClass("true")){
                $(this).parent().removeClass("true").addClass("false");
                $scope.offerId=$(this).parent().siblings('.offerId').html();
                $scope.appid=$(this).parent().siblings('.appId').html();
                $scope.affid=$(this).parent().siblings('.affId').html();
                $scope.month=$(this).parent().siblings('.month').html();
                $scope.hold=false;
                $scope.holdData={
                    token:token,
                    userId:userData.id,
                    offer_id:$scope.offerId,
                    appid:$scope.appid,
                    affid:$scope.affid,
                    hold:$scope.hold,
                    month:$scope.month
                };
                updateHold($scope.holdData,"billReprotTwoUpdateHold",this);
            } else if($(this).hasClass("false")){
                $(this).parent().removeClass("false").addClass("true");
                $scope.offerId=$(this).parent().siblings('.offerId').html();
                $scope.appid=$(this).parent().siblings('.appId').html();
                $scope.affid=$(this).parent().siblings('.affId').html();
                $scope.month=$(this).parent().siblings('.month').html();
                $scope.hold=true;
                $scope.holdData={
                    token:token,
                    userId:userData.id,
                    offer_id:$scope.offerId,
                    appid:$scope.appid,
                    affid:$scope.affid,
                    hold:$scope.hold,
                    month:$scope.month
                };
                updateHold($scope.holdData,"billReprotTwoUpdateHold",this);
            }
        }

    });
    /**
     * 分页导航
     */
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            selectData();
        }
    };
}])
.controller("billAffReport",["$scope","$routeParams","$timeout","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,$timeout,urlInfoOne,urlInfoTwo,token,userData) {
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate() //日
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    $scope.monthTime = new Date().Format("yyyy-MM");
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
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                if(data.respCode=="00"){
                    $scope.downLHeaderData=data.content;
                    $scope.additionalPaymentDetails=$scope.downLHeaderData.additionalPaymentDetails;
                    $scope.$apply();
                }
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
    });
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

    //点击渠道
    $("#Affiliate").on("change",function () {
        $scope.affiliate=$(this).val();
        datas({
            token:token,
            userId:userData.id,
            affid:$scope.affiliate
        },"finndBillAff","callbackBillAff");
        datas({
            token:token,
            userId:userData.id,
            affid:$scope.affiliate
        },"findAccPayment","callbackPayment");
        datas({
            token:token,
            userId:userData.id,
            affid:$scope.affiliate
        },"selectInvoicedDetil","callbackInvoice");
        history();
    });
    /**
     * datas:请求数据函数
     * data:向后台传递的数据
     * url:接口名
     * callbackName:jsonp回调函数名
     * callback:请求成功自定义回调函数(可有可无)
     * **/
    function datas(data,url,callbackName,callback) {
        $.ajax({
            type:"post",
            url:urlInfoTwo+url,
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:callbackName,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                if(data.respCode=="00"){
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
                    }else if(url=="selectInvoicedDetil"){
                        if(data.respCode=="00"){
                            $scope.invoiceData=data.content;
                        }
                    }else if(url=="findAccPayment"){
                        $scope.account=data.content;
                    }else if(url=="billAffInvoceByMont"){
                        if(data.respCode=="00"){
                            callback(data.content.createTime);
                        }
                    }else if(url=="updatePaid1"){
                        if(data.respCode=="00"){
                            callback(data.content);
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
    }
    function history() {
        $.ajax({
            type:"post",
            url:urlInfoTwo+"queryPayHistory",
            data:{
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                token:token,
                userId:userData.id,
                affid:$scope.affiliate
            },
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callbackHistory",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                if(data.respCode=="00"){
                    $scope.pages=data.content.pages;
                    $scope.history=data.content.dataList;
                    $scope.$apply();
                }
            }
        })
    }

    //分页导航
    $("#firstpage").on("click",function () {
        $scope.pageNo=1;
        $scope.pageSize=6;
        history();
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
            history();
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
            history();
        }
    })
    $("#lastpage").on("click",function () {
        $scope.pageNo=$scope.pages;
        $scope.pageSize=6;
        history();
    })
    //第四张表 开关
    $(".table").delegate(".confirmed img","click",function () {
        if($(this).hasClass("false")){
            var that=this;
            datas({
                token:token,
                userId:userData.id,
                affid:$scope.affiliate,
                month:$(this).parents(".tr").find("td:first-child").html()
            },"billAffInvoceByMont","callbackConfirm",function (data) {
                $(that).parent().removeClass("closeFlag").addClass("open");
                $(that).parent().siblings(".createTime").html(data);
            });
        }
    });
    $(".table").delegate(".paid img","click",function () {
        if($(this).hasClass("false")){
            var that=this;
            if($(this).parent().siblings(".createTime").html()==""){
                $(".pagesPrompt").css({"display":"block"}).html("Please confirm first");
                $timeout(function () {
                    $(".pagesPrompt").css({"display":"none"});
                    return false;
                },2000)
            }else{
                datas({
                    token:token,
                    userId:userData.id,
                    affid:$scope.affiliate,
                    month:$(this).parents(".tr").find("td:first-child").html()
                },"updatePaid1","callbackPaid",function (data) {
                    $(that).parent().removeClass("closeFlag").addClass("open");
                    $(that).parent().siblings(".updateTime").html(data);
                });
            }

        }
    })


}])
.controller("billAffReportDetail",["$scope","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function($scope,$routeParams,urlInfoOne,urlInfoTwo,token,userData){
    $scope.affId=$routeParams.affId;
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
            affid:$scope.affId,
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
.controller("view",["$scope","$routeParams","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$routeParams,$http,urlInfoOne,urlInfoTwo,token,userData) {

    //下载pdf文件
    $("#download").bind("click",function () {
        var headstr = "<html><head><title></title></head><body>";
        var footstr = "</body>";
        var printData = document.getElementById("downloadCon").innerHTML; //获得 div 里的所有 html 数据
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = headstr+printData+footstr;
        window.print();
        document.body.innerHTML = oldstr;
        return false;
        // 将 id 为 content 的 div 渲染成 canvas
        // html2canvas(document.getElementById("downloadCon"), {
        //     // 渲染完成时调用，获得 canvas
        //     onrendered: function(canvas) {
        //         // 从 canvas 提取图片数据
        //         var imgData = canvas.toDataURL('image/jpeg');
        //         var doc = new jsPDF("p", "mm", "a4");
        //         //                               |
        //         // |—————————————————————————————|
        //         // A0 841×1189
        //         // A1 594×841
        //         // A2 420×594
        //         // A3 297×420
        //         // A4 210×297
        //         // A5 148×210
        //         // A6 105×148
        //         // A7 74×105
        //         // A8 52×74
        //         // A9 37×52
        //         // A10 26×37
        //         //     |——|———————————————————————————|
        //         //                                 |——|——|
        //         //                                 |     |
        //         doc.addImage(imgData, 'JPEG', 0, 0,210,297);
        //         doc.save('content.pdf');
        //     }
        // });
    });
    $scope.netId=$routeParams.para;
    // $scope.confirmed=($routeParams.confirm*1).toFixed(2);
    $scope.month=$routeParams.month.replace(/-/g, "");
    $scope.rate=1.00;
    var key=new Date().getDate();
    if(key.toString().length==1){
        key="0"+key.toString();
    }
    $scope.invoiceNumber="INV-"+$scope.month+$scope.netId+key;
    //console.log($scope.confirmed);
    //获取英文时间
    var date = new Date();
    var monthArray=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    var month=date.getMonth();
    var day=date.getDate();
    if(day.toString().length == 1){
        day="0"+day.toString();
    }
    // $scope.engMonth=day+" "+monthArray[month]+" "+date.getFullYear();
    //console.log($scope.engMonth);


    //页面加载 发起ajax
    $.ajax({
        type:"get",
        url:urlInfoOne+"findInvoiceADV",
        data:{
            token:token,
            userId:userData.id,
            netid:$scope.netId,
            amount:$scope.confirmed,
            // invoceNo:$scope.invoiceNumber,
            month:$routeParams.month
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
            console.log(data);
            if(data.respCode=="00"){
                $scope.data=data.content.account;
                $scope.invoceAdv=data.content.invoceAdv;
                $scope.confirmed=$scope.invoceAdv.amount;
                /**
                 * 获取到时间字符串，拿到[2017,09,08]类型的数组$scope.time
                 * */
                $scope.time=$scope.invoceAdv.createTime.split(" ")[0].split("-");
                $scope.engMonth=$scope.time[2]+" "+monthArray[$scope.time[1].slice(1,2)-1]+" "+$scope.time[0];

                //获取30天后的时间
                date.setTime(Date.parse($scope.invoceAdv.createTime.split(" ")[0])+24*60*60*1000*30);
                var dayLate=date.getDate();
                if(dayLate.toString().length == 1){
                    dayLate="0"+dayLate.toString();
                }
                $scope.engMonthLate=dayLate+" "+monthArray[date.getMonth()]+" "+date.getFullYear();
                $scope.data.forEach(function (x,y) {
                    if(x.user_id=="1024"){
                        $scope.ourData=x;
                    }else{
                        $scope.advData=x;
                    }
                    $scope.$apply();
                })
            }
        },
        error:function (data) {
            console.log(data);
        }
    });
    //向后台发起确认信息
    $.ajax({
        type:"get",
        url:urlInfoOne+"clickView",
        data:{
            token:token,
            userId:userData.id,
            netid:$scope.netId,
            month:$routeParams.month,
            amount:$scope.confirmed
        },
        dataType:"jsonp",
        jsonp:"jsonpCallback",
        jsonpCallback:"callbackClickView",
        success:function (data) {
            //console.log(data);
        },
        error:function (data) {
            console.log(data);
        }
    });

    /**
     * 双击修改
     * */
    var oldCon="";
    $("table .itemBody").delegate("#confirmed","dblclick",function () {
        var that=this;
        if($(this).children("input").length > 0){
            return false;
        }
        var inputObj=$("<input type='text' class='form-control'>");
        //console.log($(this).html());
        oldCon=$(this).html();
        $(this).html("");
        inputObj.val(oldCon).appendTo($(this));
        inputObj.focus();
        inputObj.on("blur",function () {
            if(oldCon!=inputObj.val()){
                oldCon=inputObj.val();
                $scope.offerId=$(that).siblings(".offerId").html();
                $scope.deduct=oldCon;
                $scope.appid=$(that).siblings(".appId").html();
                $scope.affid=$(that).siblings(".affId").html();
                $scope.month=$(that).siblings(".moth").html();
                $.ajax({
                    type:"get",
                    url:urlInfoOne+"updateAmount",
                    data:{
                        token:token,
                        userId:userData.id,
                        netid:$scope.netId,
                        month:$routeParams.month,
                        amount:oldCon,
                        invoceNo:$scope.invoceAdv.invoceNo
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
                        //console.log(data);
                    },
                    error:function (data) {
                        console.log(data);
                    }
                })
            }
            $scope.confirmed=oldCon;
            $(this).parent().html(oldCon);
            $scope.$apply();
            $(this).remove();


        })
    })


    //确认invoce
    $('#submit').bind("click",function(){
        $.ajax({
            ype:"get",
            url:urlInfoOne+"startInvoce",
            data:{
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                month:$routeParams.month,
                engMonth:encodeURI($scope.engMonth),
                engMonthLate:encodeURI($scope.engMonthLate)
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
                //console.log(data);
            },
            error:function (data) {
                console.log(data);
            }
        })
    })
    //发送邮箱
    $("#email").bind("click",function(){
        $.ajax({
            ype:"get",
            url:urlInfoOne+"sendInvoceEmail",
            data:{
                token:token,
                userId:userData.id,
                netid:$scope.netId,
                month:$routeParams.month,

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
                console.log(data);
            },
            error:function (data) {
                console.log(data);
            }
        })
    })

}])
.controller("myAc",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
    $("#netWrap").find(".label").css({"display":"none"});
    $scope.packageName="";
    $scope.offerName="";
    $scope.offersId="";
    $scope.offersIdCon="";
    $scope.countryCode="";
    $scope.search="";
    $scope.platform="";
    $scope.searchNetId="";
    $scope.advertiser=0;
    //获取app详细内容
    if($scope.offersIdCon==""){
        $scope.offersId=0;
    }else{
        $scope.offersId=$scope.offersIdCon;
    }
    //分页导航
    $scope.pageNo=1;//当前页数
    $scope.pageSize=20;//长度：20
    $scope.type="all";
    if($scope.platform==""){
        $scope.Android=false;
        $scope.iOS=false;
    }else if($scope.platform=="ios"){
        $scope.Android=false;
        $scope.iOS=true;
    }else if($scope.platform=="Android"){
        $scope.Android=true;
        $scope.iOS=false;
    }
    var variable={
        id:$scope.offersId,
        refid:userData.id,
        offerName:encodeURI($scope. offerName),
        packageName:encodeURI($scope.packageName),
        accept:$scope.countryCode,
        pageNo:$scope.pageNo,
        pageSize:$scope.pageSize,
        type:$scope.type,
        token:token,
        userId:userData.id,
        netid:$scope.advertiser,
        Android:$scope.Android,
        iOS:$scope.iOS
    };
    function toGo(){
        if($scope.pageNo!=''){
            $.ajax({
                type:"post",
                url:urlInfoTwo+"findOffPayoutByConditions",
                dataType: 'jsonp',
                data:variable,
                jsonp: "jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                    $("#loading-center").css({"display":"block"});
                },
                success:function (e) {
                    //console.log(e);
                    if(e.respCode=="00"){
                        $scope.contents=e.content.dataList;
                        $scope.pages=e.content.pages;
                        $scope.paginationConf.totalItems=e.content.total;
                        $scope.$apply();
                    }
                },
                complete:function(){
                    $("#loading-center").css({"display":"none"});
                }
            });
        }
    }
    //页面载入-ajax请求（分页）
    toGo();
    //分页导航
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.pages,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            if($scope.platform==""){
                $scope.Android=false;
                $scope.iOS=false;
            }else if($scope.platform=="ios"){
                $scope.Android=false;
                $scope.iOS=true;
            }else if($scope.platform=="Android"){
                $scope.Android=true;
                $scope.iOS=false;
            }
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            variable={
                id:$scope.offersId,
                refid:userData.id,
                offerName:encodeURI($scope. offerName),
                packageName:encodeURI($scope.packageName),
                accept:$scope.countryCode,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize,
                type:$scope.type,
                token:token,
                userId:userData.id,
                Android:$scope.Android,
                iOS:$scope.iOS,
                netid:$scope.advertiser
            };
            toGo();
        }
    };
    //点击搜索
    $scope.ajaxGet=function () {
        if($scope.platform==""){
            $scope.Android=false;
            $scope.iOS=false;
        }else if($scope.platform=="ios"){
            $scope.Android=false;
            $scope.iOS=true;
        }else if($scope.platform=="Android"){
            $scope.Android=true;
            $scope.iOS=false;
        }
        variable={
            id:$scope.offersId,
            refid:userData.id,
            offerName:encodeURI($scope. offerName),
            packageName:encodeURI($scope.packageName),
            accept:$scope.countryCode,
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            type:$scope.type,
            token:token,
            userId:userData.id,
            Android:$scope.Android,
            iOS:$scope.iOS,
            netid:$scope.advertiser
        };
        toGo();
    }
    //Switching effect
    $scope.switch=function (para,index) {
        var active='';
        var flag=true;
        if(flag){
            if($(".status_img").eq(index).attr("id")=='true'){
                $(".status_img").eq(index).attr({"id":"false"});
                active=false;
            }else {
                $(".status_img").eq(index).attr({"id":"true"});
                active=true;
            }
            flag=false;
            $.ajax({
                type:"post",
                url:urlInfoTwo+"updateOfferActive",
                data:{
                    id:para,
                    active:active,
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
                    flag=true;
                },
                error:function (data) {
                    console.log(data);
                }
            })
        }

    }
}])
.controller("addOffer",["$scope","$http","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.search="";
    $scope.packageName='';
    $scope.countryCode="";
    $scope.name="";
    $scope.systemSearch='ios';
        //搜索jsonp
        $(".select-list input").each(function (index,dom) {
            $(dom).bind("keypress",function (e) {
                if(e.keyCode==13){
                    $('.btn-search').click();
                }
            })
        })
        $('.btn-search').on("click",function () {
            // var platform=$scope.systemSearch;
            // var countryCode=$scope.countryCode;
            // var packageName=$scope.packageName;
            var data={
                platform:$scope.systemSearch,
                countryCode:$scope.countryCode,
                packageName:$scope.packageName,
                token:token,
                userId:userData.id
            }
            $.ajax({
                type:"post",
                 url:urlInfoTwo+'searchApp',
                data:data,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (e) {
                    //console.log(e);
                    if(e.respCode=="00"){
                        $scope.appContent=e.content.dataList;
                        if($scope.appContent.length==0){
                            $('.no-data').css({"display":'block'});
                        }else{
                            $('.no-data').css({"display":'none'});
                        }
                        $scope.$apply();
                    }else{
                        console.log("error")
                    }
                },
                error:function (e) {
                    console.log(e)
                }
            })
        })
        $scope.detailCon=function (para1,para2,para3,para4) {
            window.location="#!/seeDetail/"+$scope.systemSearch+"/"+para1+"/"+para2+"/"+para3+"/"+encodeURI(para4)+"/0";
        }
        $scope.CreativeNewApp=function () {
            if($scope.packageName==""){
                $scope.packageName=0;
            }
            if($scope.countryCode==""){
                $scope.countryCode=0;
            }
            if($scope.name==""){
                $scope.name=0;
            }
            window.location="#!/seeDetail/"+$scope.systemSearch+"/0/"+$scope.countryCode+"/"+$scope.packageName+"/"+$scope.name+"/0";
        }


}])
.controller("seeDetail",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    //Start and end time selection
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
    // $("#startDate").val(time1);
    $scope.startDate=time1;
    //获取3个月后的日期
    /**
     *获取下一个月的输入日期
     *{param:DateTime} date 输入日期(YYYY-MM-DD)
     *{param:number } monthNum 月数
     */
    function GetNextMonthDay(date, monthNum) {
        var dateArr = date.split('-');
        var year = dateArr[0]; //获取当前日期的年份
        var month = dateArr[1]; //获取当前日期的月份
        var day = dateArr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + parseInt(monthNum);
        if (month2 >12) {
            year2 = parseInt(year2) + parseInt((parseInt(month2) / 12 == 0 ? 1 : parseInt(month2) / 12));
            month2 = parseInt(month2) % 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }
    $scope.endDate=GetNextMonthDay($scope.startDate,3);
    //获取参数
    $scope.system=$routeParams.system; //操作系统
    $scope.id=$routeParams.id; //appID
    $scope.accept=$routeParams.accept;//国家简称
    $scope.packageName=$routeParams.packageName;//包名
    $scope.offerName=$routeParams.name; //app name
    $scope.netIdPara=$routeParams.netId;//广告主
    //console.log($scope.system,$scope.id,$scope.accept,$scope.packageName,$scope.name);
    $scope.dailyCap=0;
    $scope.dailyLimit=0;
    $scope.totalCap=0;
    $scope.netid=$scope.netIdPara!="0"?$scope.netIdPara:"";
    $scope.payout="";
    $scope.search=$scope.netIdPara!="0"?$scope.netIdPara:"";
    if($scope.accept==0){
        $scope.accept="";
    }
    if($scope.packageName==0){
        $scope.packageName="";
    }
    if($scope.offerName==0){
        $scope.offerName="";
    }
    // console.log( $scope.system,$scope.id,$scope.accept, $scope.packageName);
            // if($scope.system=="ios"){
            //     $("#IOS").parent(".radio-inline").addClass("check");
            // }else if($scope.syste=="Android"){
            //     $("#android").parent(".radio-inline").addClass("check");
            // }

    //读取时区
    var timeZone=$("#timeZone").get(0);
    $.getJSON('../js/timeZone.json',function (data) {
        for(var i=0;i<data.length;i++){
            if(i==1){
                var para=document.createElement("option");
                para.selected="selected";
                para.id=data[i].value.toFixed(2);
                para.value=data[i].name+"-"+data[i].value.toFixed(2);
                para.innerHTML=data[i].name+" - "+data[i].value.toFixed(2);
                timeZone.appendChild(para);
            }else{
                var para=document.createElement("option");
                para.id=data[i].value.toFixed(2);
                para.value=data[i].name+"-"+data[i].value.toFixed(2);
                para.innerHTML=data[i].name+" - "+data[i].value.toFixed(2);
                timeZone.appendChild(para);
            }

        }

    })
    //下拉框效果
    $("#offerSource").on("click",function () {
        $("#system-son").css({"display":"block"})
    })
    $(document).on("click",function (e) {
        if(e.target.id!='offerSource'){
            $("#system-son").css({"display":"none"})
        }
    })

    //Radio box effect
    $('.selectRadio .radio-inline').on("click",function () {
        var name=this.className;
        if(name.indexOf('check')>-1){
            return false;
        }else {
            $(this).siblings(".radio-inline.check").find('input').removeAttr('checked');
            $(this).find("input").attr({"checked":"checked"});
            $(this).siblings(".radio-inline.check").removeClass("check").end().addClass('check');
        }
    })
    //Check box effect
    $('.select-list .checkbox-inline').on("click",function () {
        var name=this.className;
        if(name.indexOf('checkAgain')>-1){
            $(this).removeClass("checkAgain");
            $(this).find("input").removeAttr("checked");
        }else {
            $(this).find("input").attr({"checked":"checked"})
            $(this).addClass('checkAgain');
        }
    })

    $scope.get=function (para,para1) {
        $scope.search=para1+" - "+para;
        $scope.netid=para1;
        $("#offerSource").val(para);
        $("#offerSource").siblings('i').find('img').attr({"src":"../img/cha.png"})
    }
    $("#offerSource").siblings('i').find('img').on("click",function () {
        $scope.search="";
        $("#offerSource").val("");
        $(this).attr({"src":"../img/icon_xiala_12x7.png"});
        $scope.$apply();
    })

    //页面加载ajax
    function selectData(data,url,callbackName) {
        $.ajax({
            type:"post",
            dataType:'jsonp',
            data:data,
            url:urlInfoTwo+url,
            jsonp:"jsonpCallback",
            jsonpCallback:callbackName,
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (data) {
                //console.log(data);
                if(data.respCode=='00'){
                    if(url=="findUsrIdNameByRoleId"){
                        $scope.netWorkList=data.content;
                        $scope.$apply();
                    }else if(url=="findAllPayTypeIdName"){
                        $scope.payTypeList=data.content;
                        $scope.$apply();
                    }

                }else{
                    console.log('error')
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    selectData({
        token:token,
        userId:userData.id,
        roleId:3
    },"findUsrIdNameByRoleId","callback");
    selectData({
        token:token,
        userId:userData.id
    },"findAllPayTypeIdName","callbackPayType");

    $('.detail-btn a').on("click",function () {
        var timeZone=$("#timeZone").find("option:checked").attr("id");
        var payType=$("#payType").find("option:checked").val();
        // var offerName=
        var startDate=$("#startDate").val();
        var closeDate=$("#endDate").val();
        var kpi=$("#description").val();
        var trackingLink=$("#trackinglink").val();
        var hard,device_id,huge,inWeb,inApp,mobile,tablet;
        if($("#hardKPI").attr("checked")=="checked"){
            hard=1;
        }else{
            hard=0;
        }
        if($("#gaid").attr("checked")=="checked"){
            device_id=1;
        }else{
            device_id=0;
        }
        if($("#huge").attr("checked")=="checked"){
            huge=1;
        }else{
            huge=0;
        }
        if($("#inweb").attr("checked")=="checked"){
            inWeb=1;
        }else{
            inWeb=0;
        }
        if($("#inapp").attr("checked")=="checked"){
            inApp=1;
        }else{
            inApp=0;
        }
        if($("#phone").attr("checked")=="checked"){
            mobile=1;
        }else{
            mobile=0;
        }
        if($("#tablet").attr("checked")=="checked"){
            tablet=1;
        }else{
            tablet=0;
        }
        var data={
            system:$scope.system,
            appid:$scope.id,
            accept:$scope.accept,
            packageName:$scope.packageName,
            netid:$scope.netid,
            timeZone:timeZone,
            payType:payType,
            offerName:$scope.offerName,
            payout:$scope.payout,
            dailyCap:$scope. dailyCap,
            dailyLimit:$scope.dailyLimit,
            totalCap:$scope.totalCap,
            startDate:startDate,
            closeDate:closeDate,
            kpi:kpi,
            trackingLink:trackingLink,
            hard:hard,
            device_id:device_id,
            inWeb:inWeb,
            inApp:inApp,
            Mobile:mobile,
            Tablet:tablet,
            huge:huge,
            token:token,
            userId:userData.id
        };
        if($scope.netid==""){
            $("#offerSource").addClass("active").get(0).focus();
        }else if($scope.payout==""){
            $("#payOut").addClass("active").get(0).focus();
        }else if(trackingLink==""){
            $("#trackinglink").addClass("active").get(0).focus();
        }else {
            $.ajax({
                type:"post",
                url:urlInfoTwo+"addOffer",
                dataType:"jsonp",
                data:data,
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                cache:false,
                beforeSend :function(xmlHttp){
                    xmlHttp.setRequestHeader("If-Modified-Since","0");
                    xmlHttp.setRequestHeader("Cache-Control","no-cache");
                },
                success:function (data) {
                    if(data.respCode=="00"){
                        $(".prompt").css({"display":"block"}).html("Submit successfully");
                        setTimeout(function () {
                            $(".prompt").css({"display":"none"});
                            window.location="#!/offers/hand";
                        },2000);

                    }else{
                        console.log('error');
                    }
                },
                error:function (data) {
                    console.log(data);
                }
            })
        }


    })


}])
.controller("advAccount",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData){
    $scope.pageNo=1;
    $scope.pageSize=15;
    function affAccountAjax() {
        $.ajax({
            type:"post",
            url:urlInfoOne+"findAllwork",
            data:{
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
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
                    $scope.advAccountData=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.paginationConf.totalItems=data.content.total;
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    //页面加载 发起请求
    affAccountAjax();
    /**
     * 分页导航
     */
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            affAccountAjax();
        }
    };
}])
.controller("advAccountDetail",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
     $scope.netid=$routeParams.id;
     $scope.infoId=$routeParams.info;
     //console.log($scope.netid,$scope.infoId);
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

    //选affid的效果
    $("#AffId").on("click",function () {
        $('.affIdList').css({"display":'block'});
    })
    var num=0;
    var oldWidth;
    var newWidth;
    $(".affIdList").delegate("li","click",function () {
        $(this).css({"display":"none"});
        num=num+1;
        var span=document.createElement('span');
        oldWidth=(100-num*10);
        span.innerHTML=$(this).html();
        $(".moreIdWrap").get(0).insertBefore(span,$('#AffId').get(0));
        $('#AffId').css({"width":oldWidth+"%"});

    })
    $(".moreIdWrap").delegate("span","click",function () {
        $(this).addClass("special");
    })
    document.onkeydown=function(e) {
        var numTwo=0;
        if($(".moreIdWrap").find("span").hasClass("special")){
            $(".moreIdWrap").find("span.special").each(function (index,dom) {
                $(".affIdList li").each(function (indexLi,domLi) {
                    if($(dom).html()==$(domLi).html()){
                        $(domLi).css({"display":"block"});
                    }
                })
            })
            num=num-$(".moreIdWrap").find("span.special").length;
            numTwo=numTwo+$(".moreIdWrap").find("span.special").length;
            if(e.keyCode===8){
                $('.special').remove();
                if(num>=0){
                    newWidth=oldWidth+10*numTwo;
                    oldWidth=newWidth;
                    $('#AffId').css({"width":newWidth+"%"});
                }
            }
        }

    }
    $(document).on("click",function (e) {
        if(e.target.id!="AffId" && e.target.className!="AffIds"){
            $('.affIdList').css({"display":'none'});
        }
    });

     if($scope.netid==0){
        $scope.flag=false;
     }else{
         $scope.flag=true;
         var offerEmail,BillingEmail;
         //页面加载 发起ajax请求
         $.ajax({
             type:"post",
             url:urlInfoOne+"backfillWorkInfo",
             data:{
                 token:token,
                 userId:userData.id,
                 userid:$scope.netid
                 // infoid:$scope.infoId
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
                 //console.log(data);
                 if(data.respCode=="00"){
                     $scope.profileInfo=data.content;
                     if($scope.profileInfo!=undefined){
                         $scope.link=$scope.profileInfo.companys_link_website;
                         $scope.officePhoneNumber=$scope.profileInfo.office_phone_number;
                         $scope.phoneNumber=$scope.profileInfo.phone_number;
                         $scope.website=$scope.profileInfo.companys_website;
                         $scope.userId=$scope.profileInfo.userid;
                         //$scope.id=$scope.profileInfo.id;
                         $scope.firstName=$scope.profileInfo.firstName;
                         $scope.lastName=$scope.profileInfo.lastName;
                         $scope.company=$scope.profileInfo.company;
                         $scope.email=$scope.profileInfo.user_name;
                         $scope.offerEmail=$scope.profileInfo.offerEmail;
                         $scope.BillingEmail=$scope.profileInfo.billingEmail;
                         //$scope.apiKey=$scope.profileInfo.apikey;
                         $scope.contactInformation= $scope.profileInfo.skype;
                         $scope.affid=data.content.affid;
                         //$scope.postBack=$scope.profileInfo.postback;
                         $scope.active=$scope.profileInfo.active;
                         $scope.api=$scope.profileInfo.api
                     }

                     //console.log($scope.profileUser.offerEmail);
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
                     if($scope.affid!="" && $scope.affid!=undefined){
                         var geos=$scope.affid.split("|");
                         $("ul.affIdList li").each(function (index,dom) {
                             for(var y=0;y<geos.length;y++){
                                 if($(dom).attr("id")==geos[y]){
                                     $(dom).css({"display":"none"});
                                     num=num+1;
                                     var span=document.createElement('span');
                                     oldWidth=(100-num*10);
                                     span.innerHTML=$(dom).html();
                                     span.id=$(dom).attr("id");//获取span 的id;
                                     $(".moreIdWrap").get(0).insertBefore(span,$('#strongestGeos').get(0));
                                     $('#AffId').css({"width":oldWidth+"%"});
                                 }
                             }
                         })
                     }

                     $scope.$apply();
                 }else{
                     console.error(data.errorInfo);
                 }
             },
             error:function (data) {
                 console.log(data);
             }
         });
     }

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
    });
    function updateAndSave(data,url) {
        $.ajax({
            type:"post",
            url:urlInfoOne+url,
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (e) {
                //console.log(e);
                if(e.respCode=="00"){
                    $(".prompt").css({"display":"block"}).html("Save successfully");
                    setTimeout(function () {
                        $(".prompt").css({"display":"none"});
                        window.location="#!/advAccountPre/"+$scope.netid;
                    },2000)
                }else if(e.respCode=="mailbox is null,please check"){
                    $(".prompt").css({"display":"block"}).html("mailbox is null,please check");
                    setTimeout(function () {
                        $(".prompt").css({"display":"none"});
                    },2000)
                }else if(e.respCode=="04"){
                    $(".prompt").css({"display":"block"}).html("This address has been occupied");
                    setTimeout(function () {
                        $(".prompt").css({"display":"none"});
                    },2000)
                }
            },
            error:function(e){
                console.log(e);
            }
        })
    }
    var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    $(":button").on("click",function () {
        var OfferemailArr="";
        var billingEmailArr="";
        var active="";
        var affid="";
        var api="";
        $("#OfferemailWrap").find("input").each(function (index,dom) {
            OfferemailArr=OfferemailArr+($(dom).val())+"|";
        });
        $("#billingEmailWrap").find("input").each(function (index,dom) {
            billingEmailArr=billingEmailArr+($(dom).val())+"|";
        });
        if($("#active:checked").length>0){
            active=true;
        }else{
            active=false;
        }
        if($("#api:checked").length>0){
            api=true;
        }else{
            api=false;
        }
        $(".moreIdWrap span").each(function (index,dom) {
            affid=affid+$(dom).html()+"|";
        });
        //验证
        if($scope.firstName=="" || $scope.firstName==undefined){
            $("#firstName").addClass("active").get(0).focus();
            $("#firstName").siblings("span").css({"display":"block"});
            return;
        }else{
            $("#firstName").removeClass("active").siblings("span").css({"display":"none"});
        }
        if($scope.company=="" || $scope.company==undefined){
            $("#company").addClass("active").get(0).focus();
            $("#company").siblings("span").css({"display":"block"});
            return;
        }else{
            $("#company").removeClass("active").siblings("span").css({"display":"none"});
        }
        if($scope.email=="" || $scope.email==undefined){
            $("#email").addClass("active").get(0).focus();
            $("#email").siblings("span").css({"display":"block"});
            return;
        }else{
            $("#email").removeClass("active").siblings("span").css({"display":"none"}).html("*&nbsp;This option is required&nbsp;*");
        }
        if(!reg.test($scope.email)){
            $("#email").addClass("active").get(0).focus();
            $("#email").siblings("span").css({"display":"block"}).html("*&nbsp;The format is incorrect&nbsp;*");
            return;
        }else {
            $("#email").removeClass("active").siblings("span").css({"display":"none"});
        }
        affid=affid.slice(0,-1);
        OfferemailArr=OfferemailArr.slice(0,-1);
        billingEmailArr=billingEmailArr.slice(0,-1);
        // if($scope.netid==0){ //判断是更新还新增
            $scope.saveData={
                token:token,
                userId:userData.id,
                affid:affid,
                userid:$scope.netid,
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
                billingEmail:billingEmailArr,
                active:active,
                api:api
            };
            updateAndSave($scope.saveData,"saveWrok");
        // } else{
           // $scope.updateData={
           //     token:token,
           //     userId:userData.id,
           //     userid:$scope.netid,
           //     infoid:$scope.infoId,
           //     firstName:$scope.firstName,
           //     lastName:$scope.lastName,
           //     company:$scope.company,
           //     user_name:$scope.email,
           //     phone_number:$scope.phoneNumber,
           //     office_phone_number:$scope.officePhoneNumber,
           //     skype:$scope.contactInformation,
           //     companys_website:$scope.website,
           //     companys_link_website:$scope.link,
           //     offerEmail:OfferemailArr,
           //     billingEmail:billingEmailArr,
           //     active:active
           // };
           //  updateAndSave($scope.updateData,"updateWrok");

        // }

        
    })



}])
.controller("advAccountPre",["$scope","$routeParams","urlInfoOne","token","userData",function ($scope,$routeParams,urlInfoOne,token,userData) {
    //console.log($routeParams.id);
    var offerEmail,BillingEmail;
    //页面加载 发起ajax请求
    $.ajax({
        type:"post",
        url:urlInfoOne+"backfillWorkInfo",
        data:{
            token:token,
            userId:userData.id,
            userid:$routeParams.id
            // infoid:$scope.infoId
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
            console.log(data);
            if(data.respCode=="00"){
                $scope.profileInfo=data.content;
                if($scope.profileInfo!=undefined){
                    $scope.link=$scope.profileInfo.companys_link_website;
                    $scope.officePhoneNumber=$scope.profileInfo.office_phone_number;
                    $scope.phoneNumber=$scope.profileInfo.phone_number;
                    $scope.website=$scope.profileInfo.companys_website;
                    $scope.userId=$scope.profileInfo.userid;
                    //$scope.id=$scope.profileInfo.id;
                    $scope.firstName=$scope.profileInfo.firstName;
                    $scope.lastName=$scope.profileInfo.lastName;
                    $scope.company=$scope.profileInfo.company;
                    $scope.email=$scope.profileInfo.user_name;
                    $scope.offerEmail=$scope.profileInfo.offerEmail;
                    $scope.BillingEmail=$scope.profileInfo.billingEmail;
                    //$scope.apiKey=$scope.profileInfo.apikey;
                    $scope.contactInformation= $scope.profileInfo.skype;
                    $scope.affid=data.content.affid;
                    //$scope.postBack=$scope.profileInfo.postback;
                    $scope.active=$scope.profileInfo.active;
                    $scope.api=$scope.profileInfo.api;
                }
                $scope.$apply();
            }else{
                console.error(data.errorInfo);
            }
        },
        error:function (data) {
            console.log(data);
        }
    });
}])
.controller("affAccount",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.pageNo=1;
    $scope.pageSize=15;
    function affAccountAjax() {
        $.ajax({
            type:"post",
            url:urlInfoOne+"findOwnAff",
            data:{
                token:token,
                userId:userData.id,
                pageNo:$scope.pageNo,
                pageSize:$scope.pageSize
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
                //console.log(data);
                if(data.respCode=="00"){
                    $scope.affAccountData=data.content.dataList;
                    $scope.pages=data.content.pages;
                    $scope.paginationConf.totalItems=data.content.total;
                    $scope.$apply();
                }
            },
            error:function (data) {
                console.log(data);
            }
        })
    }
    //页面加载 发起请求
    affAccountAjax();
    /**
     * 分页导航
     **/
    $scope.paginationConf = {
        currentPage: $scope.pageNo,
        totalItems:$scope.total,
        itemsPerPage: $scope.pageSize,
        pagesLength: 9,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.pageNo=$scope.paginationConf.currentPage;
            $scope.pageSize=$scope.paginationConf.itemsPerPage;
            affAccountAjax();
        }
    };

}])
.controller("affAccountDetail",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.affId=$routeParams.id;
    $scope.styleType=$routeParams.type;
    $scope.infoId=$routeParams.info;
    //console.log($scope.infoId);
    if($scope.styleType=='a'){
        $scope.styleTypeOne=true;
    }else{
        $scope.styleTypeOne=false;
    }
    if($scope.styleType=='b'){
        $scope.styleTypeTwo=true;
    }else{
        $scope.styleTypeTwo=false;
    }
    if($scope.styleType=='c'){
        $scope.styleTypeThree=true;
    }else{
        $scope.styleTypeThree=false;
    }
    if($scope.styleType=='d'){
        $scope.styleTypeFour=true;
    }else{
        $scope.styleTypeFour=false;
    }
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
    $scope.postBack="";
    $scope.apiKey="";
    $scope.id="";
    var offerEmail,BillingEmail;
    $scope.keyFlag="";
    //页面加载 发起ajax请求
    $.ajax({
        type:"post",
        url:urlInfoOne+"findUserInfoById",
        data:{
            token:token,
            userId:userData.id,
            userid:$scope.affId,
            infoid:$scope.infoId
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
            //console.log(data);
            if(data.respCode=="00"){
                $scope.profileInfo=data.content;
                $scope.keyFlag=data.content;
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

                    $scope.apiKey=$scope.profileInfo.apikey;

                    $scope.contactInformation= $scope.profileInfo.skype;

                    $scope.postBack=$scope.profileInfo.postback;

                    $scope.active=$scope.profileInfo.active;
                    $scope.api=$scope.profileInfo.api;
                }
                //console.log($scope.profileUser.offerEmail);
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
    });

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
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function (e) {
                console.log(e);
                if(e.respCode=="00"){
                    $(".prompt").css({"display":"block"}).html("Save successfully");
                    setTimeout(function () {
                        $(".prompt").css({"display":"none"});
                        if(url=="saveUI"){
                            ///window.location="#!/affAccount";
                        }
                    },2000)
                }else if(e.respCode=="mailbox is null,please check"){
                    $(".prompt").css({"display":"block"}).html("mailbox is null,please check");
                    setTimeout(function () {
                        $(".prompt").css({"display":"none"});
                    },2000)
                }
            },
            error:function(e){
                console.log(e);
            }
        })
    }
    var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    $(":button").on("click",function () {
        var OfferemailArr="";
        var billingEmailArr="";
        var active="";
        var api="";
        $("#OfferemailWrap").find("input").each(function (index,dom) {
            OfferemailArr=OfferemailArr+($(dom).val())+"|";
        });
        $("#billingEmailWrap").find("input").each(function (index,dom) {
            billingEmailArr=billingEmailArr+($(dom).val())+"|";
        });
        if($("#active:checked").length>0){
            active=1;
        }else{
            active=0;
        }
        if($("#api:checked").length>0){
            api=1;
        }else{
            api=0;
        }
        OfferemailArr=OfferemailArr.slice(0,-1);
        billingEmailArr=billingEmailArr.slice(0,-1);
        //验证
        if($scope.firstName=="" || $scope.firstName==undefined){
            $("#firstName").addClass("active").get(0).focus();
            $("#firstName").siblings("span").css({"display":"block"});
            return;
        }else{
            $("#firstName").removeClass("active").siblings("span").css({"display":"none"});
        }
        if($scope.company=="" || $scope.company==undefined){
            $("#company").addClass("active").get(0).focus();
            $("#company").siblings("span").css({"display":"block"});
            return;
        }else{
            $("#company").removeClass("active").siblings("span").css({"display":"none"});
        }
        if($scope.email=="" || $scope.email==undefined){
            $("#email").addClass("active").get(0).focus();
            $("#email").siblings("span").css({"display":"block"});
            return;
        }else{
            $("#email").removeClass("active").siblings("span").css({"display":"none"}).html("*&nbsp;This option is required&nbsp;*");
        }
        if(!reg.test($scope.email)){
            $("#email").addClass("active").get(0).focus();
            $("#email").siblings("span").css({"display":"block"}).html("*&nbsp;The format is incorrect&nbsp;*");
            return;
        }else {
            $("#email").removeClass("active").siblings("span").css({"display":"none"});
        }
        // if($scope.keyFlag!=undefined && $scope.keyFlag!=""){
            // updateOrInsert({
            //     token:token,
            //     userId:userData.id,
            //     userid:$scope.affId,
            //     infoid:$scope.infoId,
            //     refid:userData.refid,
            //     firstName:$scope.firstName,
            //     lastName:$scope.lastName,
            //     company:$scope.company,
            //     user_name:$scope.email,
            //     phone_number:$scope.phoneNumber,
            //     office_phone_number:$scope.officePhoneNumber,
            //     skype:$scope.contactInformation,
            //     companys_website:$scope.website,
            //     companys_link_website:$scope.link,
            //     offerEmail:OfferemailArr,
            //     billingEmail:billingEmailArr,
            //     postback:$scope.postBack,
            //     active:active
            // },"updateUserInfo");
        // }else{
            updateOrInsert({
                token:token,
                userId:userData.id,
                userid:$scope.affId,
                //infoid:$scope.infoId,
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
                billingEmail:billingEmailArr,
                postback:$scope.postBack,
                active:active,
                api:api
            },"saveUI");
        // }
    })


}])
.controller("trafficInfo",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.affId=$routeParams.id;
    $scope.infoId=$routeParams.info;
    //console.log(userData);
    $scope.styleType=$routeParams.type;
    if($scope.styleType=='a'){
        $scope.styleTypeOne=true;
    }else{
        $scope.styleTypeOne=false;
    }
    if($scope.styleType=='b'){
        $scope.styleTypeTwo=true;
    }else{
        $scope.styleTypeTwo=false;
    }
    if($scope.styleType=='c'){
        $scope.styleTypeThree=true;
    }else{
        $scope.styleTypeThree=false;
    }
    if($scope.styleType=='d'){
        $scope.styleTypeFour=true;
    }else{
        $scope.styleTypeFour=false;
    }
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
        $('#strongestGeos').css({"width":oldWidth+"%"}).val("");
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
            para.value=data[i].value;
            para.innerHTML=data[i].name+"&nbsp;(UTC"+data[i].value+")";
            timeZone.appendChild(para);
        }
    });

    // var id=GetQueryString("id");
    // var name=GetQueryString("name");
    // $("#sourceOfTraffic option").eq(0).html(name);
    // $("#sourceOfTraffic option").eq(0).attr({"id":id});
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
    $scope.keyFlag="";
    //页面加载 发动ajax
    $.ajax({
        type:"post",
        url:urlInfoOne+"findUserTrafficById",
        data:{
            token:token,
            userId:userData.id,
            userid: $scope.affId,
            infoid:$scope.infoId
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
            //console.log(data);
            if(data.respCode=="00"){
                $scope.keyFlag=data.content;
                if(data.content!=undefined && data.content!=""){
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
                    })
                    //时区
                    $("#timeZone").find("option").each(function(index,dom){
                        if($(dom).val()==$scope.timeZone){
                            $(dom).attr({"selected":"selected"});
                            return;
                        }
                    })
                    //traffic
                    $("#traffic").find("option").each(function(index,dom){
                        if($(dom).val()==$scope.traffic){
                            $(dom).attr({"selected":"selected"});
                            return;
                        }
                    })
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
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
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
        // var company1=$("#company-one0").val();
        // var im1=$("#IM-one0").val();
        // var company2=$("#company-one1").val();
        // var im2=$("#IM-one1").val();
        // var company3=$("#company-one2").val();
        // var im3=$("#IM-one2").val();
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
        //console.log( timeZone);
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
            userid:$scope.affId
        };
        if($scope.keyFlag!=undefined && $scope.keyFlag!=""){
            updateOrInsert(data,"updateUserTraffic");
        }else{
            updateOrInsert(data,"saveUserTraffic");
        }

    })

}])
.controller("payInfo",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData){
    $scope.affId=$routeParams.id;
    $scope.infoId=$routeParams.info;
    $scope.styleType=$routeParams.type;
    if($scope.styleType=='a'){
        $scope.styleTypeOne=true;
    }else{
        $scope.styleTypeOne=false;
    }
    if($scope.styleType=='b'){
        $scope.styleTypeTwo=true;
    }else{
        $scope.styleTypeTwo=false;
    }
    if($scope.styleType=='c'){
        $scope.styleTypeThree=true;
    }else{
        $scope.styleTypeThree=false;
    }
    if($scope.styleType=='d'){
        $scope.styleTypeFour=true;
    }else{
        $scope.styleTypeFour=false;
    }
    $scope.keyFlag="";
    //页面载入、发起ajax
    $.ajax({
        type:"post",
        url:urlInfoOne+"findUserAccountById",
        data:{
            token:token,
            userId:userData.id,
            user_id:$scope.affId
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
            //console.log(data);
            if(data.respCode=="00"){
                $scope.keyFlag=data.content;
                if(data.content!=undefined && data.content!=""){
                    $scope.payInfoData=data.content;
                    $scope.accountHolder=$scope.payInfoData.accountHolder;
                    $scope.accountNumber=$scope.payInfoData.accountNumber;
                    $scope.swift=$scope.payInfoData.swift;
                    $scope.bankName=$scope.payInfoData.bankName;
                    $scope.bankCountry=$scope.payInfoData.bankCountry;
                    $scope.bankRoutingNumber=$scope.payInfoData.bankRoutingNumber;
                    $scope.additionalPaymentDetails=$scope.payInfoData.additionalPaymentDetails;
                    $scope.companyRegistrationNo=$scope.payInfoData.companyRegistrationNo;
                    $scope.companyRegistrationAddress=$scope.payInfoData.companyRegistrationAddress;
                    $scope.companyOfficeAddress=$scope.payInfoData.companyOfficeAddress;
                    $scope.$apply();
                }
            }else{
                console.log(data.errorInfo);
            }
        },
        error:function (data) {
            console.log(data);
        }
    });
    function updateOrInsert(data,url) {
        $.ajax({
            type:"get",
            url:urlInfoOne+url,
            type: 'post',
            data: data,
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success: function (data) {
                //console.log(data);
                if(data.respCode=="00"){
                    $('.prompt').css({"display":"block"}).html("Submit successfully");
                    setTimeout(function () {
                        $('.prompt').css({"display":"none"})
                    },2000)
                }else{
                    $('.prompt').css({"display":"block"}).html("Submission failure");
                    setTimeout(function () {
                        $('.prompt').css({"display":"none"})
                    },2000)
                }
            }, error: function () {
                console.log(data)
            }
        })
    }
    //Click to get the ajax request;
    $("button#btn").on('click',function() {
        var data={
            accountHolder:$scope.accountHolder,
            accountNumber:$scope.accountNumber,
            swift:$scope.swift,
            bankName:$scope.bankName,
            bankCountry:$scope.bankCountry,
            bankRoutingNumber:$scope.bankRoutingNumber,
            additionalPaymentDetails:$scope.additionalPaymentDetails,
            companyRegistrationNo:$scope.companyRegistrationNo,
            companyRegistrationAddress:$scope.companyRegistrationAddress,
            companyOfficeAddress:$scope.companyOfficeAddress,
            token:token,
            userId:userData.id,
            user_id:$scope.affId

        };
        if($scope.keyFlag!=undefined && $scope.keyFlag!=""){
            updateOrInsert(data,"updateUserAccount");
        }else{
            updateOrInsert(data,"addAccount");
        }

    });

    $("#confirm").click(function(){
        $("#message").hide();
    });

}])
.controller("password",["$scope","$http","$routeParams","urlInfoOne","urlInfoTwo","token","userData",function ($scope,$http,$routeParams,urlInfoOne,urlInfoTwo,token,userData) {
    $scope.affId=$routeParams.id;
    $scope.styleType=$routeParams.type;
    $scope.infoId=$routeParams.info;
    $scope.password="";
    if($scope.styleType=='a'){
        $scope.styleTypeOne=true;
    }else{
        $scope.styleTypeOne=false;
    }
    if($scope.styleType=='b'){
        $scope.styleTypeTwo=true;
    }else{
        $scope.styleTypeTwo=false;
    }
    if($scope.styleType=='c'){
        $scope.styleTypeThree=true;
    }else{
        $scope.styleTypeThree=false;
    }
    if($scope.styleType=='d'){
        $scope.styleTypeFour=true;
    }else{
        $scope.styleTypeFour=false;
    }
    $('#subBtn').bind('click',function () {

        $.ajax({
            type:"get",
            url:urlInfoOne+"OperateUpdatePassword",
            data:{
                token:token,
                userId:userData.id,
                password:$scope.password,
                affid:$scope.affId
            },
            dataType:"jsonp",
            jsonp:'jsonpCallback',
            jsonpCallback:"callback",
            cache:false,
            beforeSend :function(xmlHttp){
                xmlHttp.setRequestHeader("If-Modified-Since","0");
                xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success:function(data){
                console.log(data)
            },
            error:function(data){
                console.error(data.errorinfo)
            }
        })
    })
}])