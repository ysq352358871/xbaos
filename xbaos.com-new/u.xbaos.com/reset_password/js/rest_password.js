// email

newPassword .oninvalid=function() {
    var i=this.validity;
    if(true===i.valueMissing){
        this.setCustomValidity("Please input new password!");
    }else if(true===i.tooShort||true===i.tooLong){
        this.setCustomValidity("Password length between 6 and 12");
    }
};
$("#submit").on("click",function () {
    if($('#newPassword ').val() ===""){
        $("#newPassword ").attr("placeholder","please enter your new password");
        $("#newPassword ").get(0).focus()
    }else{
        var newPassword =$('#newPassword ').val();
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r =window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
        var verify=GetQueryString("verify");
        var data={
            newPassword:encodeURI(newPassword),
            verify:encodeURI(verify)
        };
        $.ajax({
            type:"post",
            //url:"http://192.168.1.124:8080/Xbaos-account/modifyPassword",
            url:"http://account.xbaos.com/modifyPassword",
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            success:function (data) {
                if(data.respCode=="00"){
                    $("#message").css({"display":"block"});
                    $("#words").html("Password reset successful");
                    setTimeout(function () {
                        $("#message").css({"display":"none"});
                        $("#words").html("")
                    },2000);
                }else {
                    $("#message").css({"display":"block"});
                    $("#words").html("Error, please contact your account manager");
                    setTimeout(function () {
                        $("#message").css({"display":"none"});
                        $('#words ').html("");
                    },2000);
                }
            },
            error: function(data){
                console.log(data);
            }
        });
    }
});
