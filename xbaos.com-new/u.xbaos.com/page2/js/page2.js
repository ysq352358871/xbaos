//点击多选
$("#strongestGeos").on("click",function () {
    $('.countryList').css({"display":'block'});
});
var num=0;
var oldWidth;
var newWidth;
$(".countryList").delegate("li","click",function () {
    num=num+1;
    var span=document.createElement('span');
    oldWidth=(100-num*10);
    span.innerHTML=$(this).html();
    span.id=$(this).attr("id");//获取span 的id;
    $(".moreIdWrap").get(0).insertBefore(span,$('#strongestGeos').get(0));
    $('#strongestGeos').css({"width":oldWidth+"%"});
    $(this).css({"display":"none"});
});
$(".moreIdWrap").delegate("span","click",function () {
    $(this).addClass("special");
});
document.onkeydown=function (e) {
    var numTwo=0;
    if($(".moreIdWrap").find('span').hasClass("special")){
        $(".moreIdWrap").find("span.special").each(function (index,dom) {
            $(".countryList li").each(function (indexLi,domLi) {
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

//
$("#description").on("blur",function () {
    if($("#description").val()!=""){
        $("#description").siblings(".verification").css({"display":"none"}).html("")
    }
});
$("#company-one").on("blur",function () {
    if($("#company-one").val()!=""){
        $("#company-one").parents().find(".verification").css({"display":"none"}).html("")
    }
});
$("#company-two").on("blur",function () {
    if($("#company-two").val()!=""){
        $("#company-two").parents().find(".verification").css({"display":"none"}).html("")
    }
});
$("#company-three").on("blur",function () {
    if($("#company-three").val()!=""){
        $("#company-three").parents().find(".verification").css({"display":"none"}).html("")
    }
});
$("#IM-one").on("blur",function () {
    if($("#IM-one").val()!=""){
        $("#IM-one").parents().find(".verification").css({"display":"none"}).html("")
    }
});
$("#IM-two").on("blur",function () {
    if($("#IM-two").val()!=""){
        $("#IM-two").parents().find(".verification").css({"display":"none"}).html("")
    }
});
$("#IM-three").on("blur",function () {
    if($("#IM-three").val()!=""){
        $("#IM-three").parents().find(".verification").css({"display":"none"}).html("");
    }
});
//

//
$(document).ready(function () {
    //获取国家
    var strongestGeos=$("#strongestGeos").get(0);
     var countryList=$(".countryList").get(0);
    var timeZone=$("#timeZone").get(0);
    $.getJSON('./js/country.json',function (data) {
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
    $.getJSON('./js/timeZone.json',function (data) {
        for(var i=0;i<data.length;i++){
            var para=document.createElement("option");
            para.id=data[i].id;
            para.value=data[i].value;
            para.innerHTML=data[i].name+"&nbsp;(UTC"+data[i].value+")";
            timeZone.appendChild(para);
        }
    });

    //获取url参数
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r =window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    // var userId=1;
    var verify=GetQueryString("verify");
   // var id=GetQueryString("id");
   // var name=GetQueryString("name");
   // $("#sourceOfTraffic option").eq(0).html(name);
   // $("#sourceOfTraffic option").eq(0).attr({"id":id});
    $(".radio-inline.one").on('click',function (e) {
        e.stopPropagation();
            $(".circular img.img").attr({"src":"./img/but_Radio_default.png"});
            $(this).find(".circular img.img").attr({"src":"./img/but_Radio_selected.png"});
            $("input.radio").removeAttr("checked");
            $(this).find("input.radio").attr({"checked":"checked"});
    });

    $(".radio-inline.much-num").on('click',function (e) {
        e.stopPropagation();
        $(".circular img.img-two").attr({"src":"./img/but_Radio_default.png"});;
        $(this).find(".circular img.img-two").attr({"src":"./img/but_Radio_selected.png"});
        $("input.radio-two").removeAttr("checked");
        $(this).find("input.radio-two").attr({"checked":"checked"});

    })


    $("#btn").on("click",function () {

        //验证==============
        if($("#description").val()==""){
            $("#description").siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#description").get(0).focus();
        }else if($("#company-one").val()==""){
            $("#company-one").parent().siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#company-one").get(0).focus();
        }else if($("#company-two").val()==""){
            $("#company-two").parent().siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#company-two").get(0).focus();
        }else if($("#company-three").val()==""){
            $("#company-three").parent().siblings(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#company-three").get(0).focus();
        }else if($("#IM-one").val()==""){
            $("#IM-one").parents().find(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#IM-one").get(0).focus();
        }else if($("#IM-two").val()==""){
            $("#IM-two").parents().find(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#IM-two").get(0).focus();
        }else if($("#IM-three").val()==""){
            $("#IM-three").parents().find(".verification").css({"display":"block"}).html("* Please enter your info *");
            $("#IM-three").get(0).focus();
        }

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
        //将数组转化为字符串
        console.log(geos.toString());
        var crPlacement=$("#complianceManagement").val();
        var setCampaignsDes=$("#campaigns").val();
        //work
        var company1=$("#company-one").val();
        var im1=$("#IM-one").val();
        var company2=$("#company-two").val();
        var im2=$("#IM-two").val();
        var company3=$("#company-three").val();
        var im3=$("#IM-three").val();
        var sonObject="";
        sonObject+=company1+"-"+im1+"|"+company2+"-"+im2+"|"+company3+"-"+im3;
        //two checkbox
        var arr=$(".targetsSupport").find('input:checked');
        var arrTwo=$(".campaignSupport").find("input:checked");
        var str="";
        var strTwo="";
        // targetsSuppor:str,
        //campaignSupport:strTwo
        for(var i=0;i<arr.length;i++){
            str=str+$(arr[i]).val()+"-";
        }
        str=str.slice(0,-1);
        for(var y=0;y<arrTwo.length;y++){
            strTwo=strTwo+$(arrTwo[y]).val()+"-";
        }
        strTwo=strTwo.slice(0,-1);
        var sourcesTransp=$("#transparency").val();
        var hardKpi=$(".radio-inline.much-num").find("input:checked").val();
        var timeZone=$("#timeZone").find("option:checked").val();
        console.log( timeZone);
        var data={
            traffic:encodeURI(source),
            agency_names:encodeURI(agencyNames),
            traffic_etc:encodeURI(trafficEtc),
            accept_kpi:encodeURI(acceptKpi),
            click_description:encodeURI(clickDescription),
            geos:encodeURI(geos.toString().replace(/,/g,"|")),
            cr_placement:encodeURI(crPlacement),
            set_campaigns_des:encodeURI(setCampaignsDes),
            companyIm:encodeURI(sonObject),
            targets_support:encodeURI(str),
            campaign_support:encodeURI(strTwo),
            sources_transp:encodeURI(sourcesTransp),
            revenue:encodeURI(hardKpi),
            time_zone:encodeURI(timeZone),
            verify:verify
        };
        $.ajax({
            type:"post",
            //url:"http://192.168.1.124:8080/Xbaos-account/registerPage3",
            url:"http://account.xbaos.com/registerPage3",
            data:data,
            dataType:"jsonp",
            jsonp:"jsonpCallback",
            jsonpCallback:"callback",
            success:function (e) {
                console.log(e);
                if(e.respCode=="00"){
                    // location.href="../page3/page3.html?userId="+userId
                    location.href="../page3/page3.html?verify="+verify;
                }
            },
            error:function (e) {
                console.log(e);
            }
        })
    })

});
