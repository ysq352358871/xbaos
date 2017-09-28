$(document).ready(function () {
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r =window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    // var userId=1;
    var verify= GetQueryString("verify");
    // var userId=D3E629676A12BFE41B5EC365B3CAE1F2;

    var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var regOfficeNum=/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
    $('#passwordAgain').on('blur',function () {
        var firstCon=$('#password').val();
        var SecondCon=$(this).val();
        if(firstCon!=SecondCon){
            $('#passwordAgain').siblings(".verification").css({"display":"block"})
        }else{
            $(".verification").css({"display":"none"})
        }
    })
    $("#password").on("blur",function () {
        if($("#password").val()!=""){
            $("#password").siblings(".verification").css({"display":"none"}).html("")
        }
    })
    $("#phoneNumber").on("blur",function () {
        if($("#phoneNumber").val()!=""){
            $("#phoneNumber").siblings(".verification").css({"display":"none"}).html("")
        }
    })

    $("#website").on("blur",function () {
        if($("#website").val()!=""){
            $("#website").siblings(".verification").css({"display":"none"}).html("")
        }
    })

    
    
    $(":button").on("click",function () {
        if($("#password").val()==""){
            $("#password").siblings(".verification").css({"display":"block"}).html("* Please input a password *");
            $("#password").get(0).focus();
        }else if($("#password").val()!=$("#passwordAgain").val()) {
            $("#passwordAgain").siblings(".verification").css({"display": "block"}).html("* The two input is inconsistent *");
            $("#passwordAgain").get(0).focus();
        }
        else if($("#phoneNumber").val()==""){
            $("#phoneNumber").siblings(".verification").css({"display":"block"}).html("* Please enter your phone number *");
            $("#phoneNumber").get(0).focus();
        }else if($("#website").val()==""){
            $("#website").siblings(".verification").css({"display":"block"}).html("* Please enter your computer's website *");
            $("#website").get(0).focus();
        }else{
            var password=$("#password").val();
            var userPass=$("#passwordAgain").val();
            var phoneNumber=$("#phoneNumber").val();
            var offPhone=$("#officePhoneNumber").val();
            var webSite=$("#website").val();
            var linkWebSite=$("#link").val();
            var data={
                password:password,
                userPass:userPass,
                phone_number:phoneNumber,
                office_phone_number:offPhone,
                companys_website:webSite,
                companys_link_website:linkWebSite,
                // userId:userId
                verify:verify
            };
            //console.log(verify);
            $.ajax({
                type:"post",
                //url:"http://192.168.1.124:8080/Xbaos-account/registerPage2",
                url:"http://account.xbaos.com/registerPage2",
                data:data,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (e) {
                    //console.log(e);
                    if(e.respCode=="00"){
                        location.href="../page2/page2.html?verify="+verify;
                    }
                },
                error:function (e) {
                    console.log(e);
                }
            })
        }
    })


})
