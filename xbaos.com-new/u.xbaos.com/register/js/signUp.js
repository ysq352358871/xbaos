$(document).ready(function () {
    $("form :input").blur(function(){
        //验证skype;
        if($(this).is("input[type=text]")){
            if($.trim(this.value) ==""){
                $(this).attr("placeholder","Please fill in your information");
            }
            else{
                $(this).removeAttr("placeholder","Please fill in your information");
            }
        }
        //验证邮箱
        if($('this').is("#email")){
            if($.trim(this.value) == "" || ($.trim(this.value) != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($.trim(this.value)))){
                $(this).attr("placeholder","The mailbox is empty or incorrectly formatted");
            }
            else{
                $(this).removeAttr("placeholder","The mailbox is empty or incorrectly formatted");
            }
        }
    });
    $("#submit").on('click',function(){

        if($('#firstName').val() ===""){
            $("#firstName").attr("placeholder","please enter your first name");
            $("#firstName").get(0).focus()
        }else if($('#lastName').val() ===""){
            $("#lastName").attr("placeholder","please enter your last name");
            $("#lastName").get(0).focus()
        }else if($('#company').val() ===""){
            $("#company").attr("placeholder","please enter your company");
            $("#company").get(0).focus()
        }else if($('#email').val() ===""){
            $("#email").attr("placeholder","please enter your mailbox");
            $("#email").get(0).focus()
        }else if($('#skype').val() ===""){
            $("#skype").attr("placeholder","please enter your skype;");
            $("#skype").get(0).focus()
        }else{
            var firstName=$('#firstName').val();
            var lastName=$('#lastName').val();
            var company=$('#company').val();
            var email=$('#email').val();
            var mobile=$('#skype').val();
            var data={
                firstName:firstName,
                lastName:lastName,
                company:company,
                email:encodeURI(email),
                skype:mobile
            };
            $.ajax({
                type:"post",
                //url:"http://192.168.1.124:8080/Xbaos-account/registerPage1",
                url:"http://account.xbaos.com/registerPage1",
                data:data,
                dataType:"jsonp",
                jsonp:"jsonpCallback",
                jsonpCallback:"callback",
                success:function (e) {
                    if(e.respCode=="00"){
                        // $("#message").css({"display":"block"}).html(e.errorInfo);
                        $("#message").css({"display":"block"});
                        $("#words").html("We will send a link to your mail, please click on the link in the mail to verify the account, and fill out the traffic information and payment information.");
                        $("input#submit").get(0).style.backgroundColor="#D12121";
                        setTimeout(function () {
                            $("#message").css({"display":"none"}).html("");
			                location.href="index.html";
                        },3000)
                    }else{
                        // $("#message").css({"display":"block"}).html(e.errorInfo);
                        $("#message").css({"display":"block"});
                        $("#words").html("Account information already exists, please contact your account manager");
                        setTimeout(function () {
                            $("#message").css({"display":"none"});
                            $("#words").html("");
                        },3000)
                    }
                },
                error: function(e){
                    console.log(e);
                }
            })
        }


    });

    $("#confirm").click(function(){
        $("#message").hide();
    })
});
