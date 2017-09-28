
//验证password;
// Password1.oninvalid=function() {
//     var i=this.validity;
//     if(true===i.valueMissing){
//         this.setCustomValidity("Please input your password!");
//     }else if(true===i.tooShort||true===i.tooLong){
//         this.setCustomValidity("Password length between 6 and 12");
//     }
// };
//form 验证
$(".text").blur(function () {
    var account=$('#Account').val();
    var password=$("#password1").val();
    if(account===""){
        $("#Account").attr("placeholder","please your account");
    }else{
        $("#Account").removeAttr("placeholder","please your account");
    }
    if(password===""){
        $("#Password1").attr("placeholder","please your password");
    }else{
        $("#Password1").removeAttr("placeholder","please your password");
    }
});
//enter 事件
$(".content .form-group.distance input").each(function (index,dom) {
    $(dom).bind("keypress",function (e) {
        if(e.keyCode==13){
            $("#login").click();
        }
    })
});
$("#login").click(function () {
    var account=$('#Account').val();
    var password=$("#Password1").val();
    if(account==""&&password==""){
        $("#Account").attr("placeholder","please your account");
        $("#Password1").attr("placeholder", "please your account");
        $("#Account").get(0).focus();

    }else if(password=="") {
        $("#password1").attr("placeholder", "please your password");
        $("#Password1").get(0).focus();

    }else if(account==""){
        $("#Account").attr("placeholder","please your password");
        $("#Account").get(0).focus();
    }else if(account!="" && password!=""){
        localStorage.browserToken=localStorage.browserToken?localStorage.browserToken:'';
       $.ajax({
           type:"post",
           url:"http://192.168.1.124:8080/Xbaos-account/login",
           //url:"http://account.xbaos.com/login",
           data:{
               user_name:encodeURI(account),
               user_pass:encodeURI(password)
           },
           dataType:"jsonp",
           jsonp:"jsonpCallback",
           jsonpCallback:"callback",
           success:function (data) {
               console.log(data);
               if(data.respCode=="00"){
                   localStorage.browserToken=JSON.stringify(data.content.token);
                   localStorage.userData=JSON.stringify(data.content.user);
                   //console.log(localStorage.browserToken,localStorage.userData)
                   window.location=data.content.location+"?token="+data.content.token+"&userData="+localStorage.userData;
                   //window.location="../ai.xbaos.com/tpl/index.html";
               }else{
                   $("#message").css({"display":"block"});
                   $("#words").html("Sorry, invalid login or password");
                   setTimeout(function () {
                       $("#message").css({"display":"none"});
                   },2000)
               }
           },
           error:function (data) {
               console.log(data);
           }
       })
    }
});
// window.alert = function(str)
//     {
//         var shield = document.createElement("DIV");
//         shield.id = "shield";
//         shield.style.position = "absolute";
//         shield.style.left = "0px";
//         shield.style.top = "0px";
//         shield.style.width = "100%";
//         shield.style.height = document.body.scrollHeight+"px";
//         //弹出对话框时的背景颜色
//         shield.style.background = "rgab(255,255,255,0.65)";
//         shield.style.textAlign = "center";
//         shield.style.zIndex = "25";
//         //背景透明 IE有效
//         shield.style.filter = "alpha(opacity=0)";
//         var alertFram = document.createElement("DIV");
//         alertFram.id="alertFram";
//         alertFram.style.position = "absolute";
//         alertFram.style.left = "50%";
//         alertFram.style.top = "50%";
//         alertFram.style.marginLeft = "-225px";
//         alertFram.style.marginTop = "-75px";
//         alertFram.style.width = "450px";
//         alertFram.style.height = "150px";
//         alertFram.style.background = "#ff0000";
//         alertFram.style.textAlign = "center";
//         alertFram.style.lineHeight = "150px";
//         alertFram.style.zIndex = "300";
//         strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n";
//         strHtml += " <li style=\"background:#D12121;text-align:left;padding-left:20px;font-size:14px;font-weight:bold;height:40px;line-height:40px;border:1px solid #F9CADE;\">Notice</li>\n";
//         strHtml += " <li style=\"background:#fff;text-align:center;font-size:12px;height:120px;line-height:120px;border-left:1px solid #F9CADE;border-right:1px solid #F9CADE;\">"+str+"</li>\n";
//         strHtml += " <li style=\"background:#FFF;text-align:center;font-weight:bold;height:50px;line-height:50px;\"><input  style=\"background:#D21212;border-radius:4px;border:none;font-weight:bold;height:35px;text-align:center;width: 66px;color:#fff;type=\"button\" value=\"Confirm\" onclick=\"doOk()\" /></li>\n";
//         strHtml += "</ul>\n";
//         alertFram.innerHTML = strHtml;
//         document.body.appendChild(alertFram);
//         document.body.appendChild(shield);
// //        var ad = setInterval("doAlpha()",5);
//         this.doOk = function(){
//             alertFram.style.display = "none";
//             shield.style.display = "none";
//         };
//         alertFram.focus();
//         document.body.onselectstart = function(){return false;};
//     };
//
