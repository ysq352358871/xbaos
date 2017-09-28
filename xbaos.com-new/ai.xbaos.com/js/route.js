angular.module("route",['ngRoute'])
    .config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when("/",{ //dashboard
            templateUrl:"../tpl/dashboard.html",
            controller:"dashboard"
        }).when("/appstore",{ //app storm
            templateUrl:"../tpl/appstore.html",
            controller:"appstore"
        }).when("/appDetail/:id/:payOut/:cap/:apply",{//app storm
            templateUrl:"../tpl/appDetail.html",
            controller:"appDetail"
        }).when("/myStore",{ //my Store
            templateUrl:"../tpl/myStore.html",
            controller:"myStore"
        }).when("/report",{  //report
            templateUrl:"../tpl/report.html",
            controller:"report"
        }).when("/payment",{ //Payment
            templateUrl:"../tpl/payment.html",
            controller:"payment"
        }).when("/paymentDetail/:month",{
            templateUrl:"../tpl/paymentDetail.html",
            controller:"paymentDetail"
        }).when("/profile",{//Acount
            templateUrl:"../tpl/profile.html",
            controller:"profile"
        }).when("/trafficInfo",{ //Acount
            templateUrl:"../tpl/trafficInfo.html",
            controller:"trafficInfo"
        }).when("/password",{//Acount
            templateUrl:"../tpl/password.html",
            controller:"password"
        }).when("/postBack",{ //support
            templateUrl:"../tpl/postBack.html",
            controller:"postBack"
        }).when("/apiDoc",{//support
            templateUrl:"../tpl/apiDoc.html",
            controller:"apiDoc"
        })
    }])