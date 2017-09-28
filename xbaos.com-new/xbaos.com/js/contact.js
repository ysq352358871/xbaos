$(function () {

    var paraTag = $('.contact-form #submit').parent('div');

    $(paraTag).children('button').remove();
///////////////////////////


    /////////////////////////////


    $('.contact-form #submit').click(function () {
        console.log("hello !!");
        var firstName = $('input#firstName').val();
        var lastName = $('input#lastName').val();
        var phone = $('input#phone').val();
        var message = $('textarea#message').val();
        var subject = $('input#subject').val();
        

        $.ajax({
            type: 'get',
            dateType: "jsonp",
            //processData:false,
            url: 'http://developer.xbaos.com/addFeedback',
            data: 'firstName=' + firstName + "&lastName=" + lastName + '&subject=' + subject + '&message=' + message + "&phone=" + phone,
            success: function (results) {
                $('div#response').html(results).css('display', 'block');

            }
        }); // end ajax

        // //alert����info
        setTimeout(function () {
            alert("Your feedback has been received and we are taking care of it");
            $("input[type=reset]").trigger("click");
        },0)
    });

});
