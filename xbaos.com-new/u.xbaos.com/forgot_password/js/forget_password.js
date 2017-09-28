
var email=document.getElementById('email');
email.oninvalid=function() {
    var error_info=document.getElementsByClassName('error_info');
    var i=this.validity;
    if(true===i.valueMissing){
        this.setCustomValidity("Please input email!");

    }else if(true===i.patternMismatch){
        this.setCustomValidity("Email address format input is not correct!");
//                error_info.css("display:block");
    }
};

//点击close img
$("#off").on("click",function () {
    $(this).parent().css("display","none");
    $('.send_emial').addClass('add');
});

$(function(){
    //文本框失去焦点后
    $('form :input').blur(function(){
        var $parent = $(this).parent();
        //验证邮件
        if( $(this).is('#email') ){
            if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                $('.error_info').css('display','block');
                $('.send_emial').removeClass('add')

            }else{
                $('.error_info').css('display','none');
                $('.send_emial').addClass('add')
            }
        }
    });



});


//
//send email info;
function change() {
    setTimeout(function () {
        Popups_box.style.display = 'block';
    },0);

}
close.onclick=function () {
    Popups_box.style.display = 'none';
};


$("#forget_submit").on("click",function () {
    if($('#email').val() ===""){
        $("#email").attr("placeholder","please enter your email box");
        $("#email").get(0).focus()
    }else{
        var email=$('#email').val();
        var data={ email:encodeURI(email)};
        $.ajax({
            type:"post",
            //url:"http://192.168.1.124:8080/Xbaos-account/retrievePassword",
            url:"http://account.xbaos.com/retrievePassword",
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            success:function (data) {
                if(data.respCode=="00"){
                    $("#message").css({"display":"block"});
                    $("#words").html("Please check your email");
                    setTimeout(function () {
                        $("#message").css({"display":"none"});
                        $("#words").html("")
                    },2000);
                }else{
                    $("#message").css({"display":"block"});
                    $("#words").html("Sorry, this e-mail address is not registered in the system Check your e-mail address one more time. If it is correct then contact our technical support.");
                    setTimeout(function () {
                        $("#message").css({"display":"none"});
                        $("#words").html("")
                    },2000);
                }
            },
            error: function(data){
                console.log(data);
            }
        });
    }
});
