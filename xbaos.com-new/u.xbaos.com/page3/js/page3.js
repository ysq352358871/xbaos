$(document).ready(function () {


    $(".form-inline").delegate(".radio-inline",'click',function (e) {
        e.stopPropagation();

        if(e.target.className=='img'){
            $(".circular img").attr({"src":"./img/but_Radio_default.png"});
            $(this).find(".circular img").attr({"src":"./img/but_Radio_selected.png"});
        }

    })
});

//
$("#accountHolder").on("blur",function () {
    if($("#accountHolder").val()!=""){
        $("#accountHolder").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#accountNumber").on("blur",function () {
    if($("#accountNumber").val()!=""){
        $("#accountNumber").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#SWIFT").on("blur",function () {
    if($("#SWIFT").val()!=""){
        $("#SWIFT").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#bankName").on("blur",function () {
    if($("#bankName").val()!=""){
        $("#bankName").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#bankCountry").on("blur",function () {
    if($("#bankCountry").val()!=""){
        $("#bankCountry").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#bankRoutingNumber").on("blur",function () {
    if($("#bankRoutingNumber").val()!=""){
        $("#bankRoutingNumber").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#officeAddress").on("blur",function () {
    if($("#officeAddress").val()!=""){
        $("#officeAddress").siblings(".verification").css({"display":"none"}).html("")
    }
});


//Click to get the ajax request;
$("button#btn").on('click',function() {
    //驗證====
    if( $('#accountHolder').val()==""){
        $("#accountHolder").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#accountHolder").get(0).focus();
    }else if($('#accountNumber').val()==""){
        $("#accountNumber").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#accountNumber").get(0).focus();
    }else if($('#SWIFT').val()==""){
        $("#SWIFT").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#SWIFT").get(0).focus();
    }else if($('#bankName').val()==""){
        $("#bankName").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#bankName").get(0).focus();
    }else if($('#bankCountry').val()==""){
        $("#bankCountry").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#bankCountry").get(0).focus();
    }else if($('#bankRoutingNumber').val()==""){
        $("#bankRoutingNumber").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#bankRoutingNumber").get(0).focus();
    }else if( $("#officeAddress").val()==""){
        $("#officeAddress").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
        $("#officeAddress").get(0).focus();
    }else{
        //=======
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r =window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
        var verify=GetQueryString("verify");
        // console.log(user_id);
        // var user_id=1;
        var accountHolder = $('#accountHolder').val();
        var accountNumber = $('#accountNumber').val();
        var swift = $('#SWIFT').val();
        var bankName = $('#bankName').val();
        var bankCountry = $('#bankCountry').val();
        var bankRoutingNumber = $('#bankRoutingNumber').val();
        var additionalPaymentDetails = $("#additionalPaymentDetails").val();
        var companyRegistrationNo = $("#companyRegistrationNo").val();
        var companyRegistrationAddress = $("#registratioAddress").val();
        var companyOfficeAddress = $("#officeAddress").val();
        var data = {
            verify:verify,
            accountHolder: accountHolder,
            accountNumber: accountNumber,
            swift: swift,
            bankName: bankName,
            bankCountry: bankCountry,
            bankRoutingNumber: bankRoutingNumber,
            additionalPaymentDetails:additionalPaymentDetails,
            companyRegistrationNo: companyRegistrationNo,
            companyRegistrationAddress:companyRegistrationAddress,
            companyOfficeAddress:companyOfficeAddress
        };
        $.ajax({
            //url:"http://192.168.1.124:8080/Xbaos-account/registerPage4",
            url:"http://account.xbaos.com/registerPage4",
            type: 'post',
            data: data,
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            jsonpCallback:"callback",
            success: function (data) {
                console.log(data);
                if(data.respCode=="00"){
                    $("#message").css({"display":"block"});
                    $("#words").html("We have received your application information, your account manager will be within 3 working days and get in touch, please  attention to check the mail.");
                    setTimeout(function () {
                        $("#message").css({"display":"none"});
                        location.href="http://ai.xbaos.com ";
                    },2000)
                }else{
                    $("#message").css({"display":"block"});
                    $("#words").html('Submission failure');
                    setTimeout(function () {
                        $("#message").css({"display":"none"});
                        $("#words").html('Submit an error, please contact your account manager.');
                    },2000)
                }
            }, error: function () {
                console.log(data)
            }
        })
    }


});

$("#confirm").click(function(){
    $("#message").hide();
});
