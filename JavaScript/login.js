$(function(){

   
    //showing different screens that will go over the website
    $('#editUsername').click(function () {
        $("#popupDiv").show();
        $("#editUsernameDiv").show();
        $("#editPasswordDiv").hide();
        $("#editProfilePictureDiv").hide();
        $(".overlay").show();
    });

    $('#editPassword').click(function () {
        $("#editPasswordDiv").show();
        $("#editUsernameDiv").hide();
        $("#editProfilePictureDiv").hide();
        $(".overlay").show();
        $("#popupDiv").show();
    });

    $('#login').click(function () {
        $("#loginFormDiv").show();
        $("#createFormDiv").hide();
        $(".overlay").show();
        $("#popupDiv").show();
    });
    
    $('#exitImg').click(function () {
        $("#loginFormDiv").hide();
        $("#createFormDiv").hide();
        $("#editUsernameDiv").hide();
        $("#editPasswordDiv").hide();
        $("#resetPasswordDiv").hide();
        $("#editProfilePictureDiv").hide();
        $(".overlay").hide();
        $("#popupDiv").hide();
    });
    
    $('#createAccountButton').click(function () {
        $("#popupDiv").show();
        $("#loginFormDiv").hide();
        $("#createFormDiv").show();
        $(".overlay").show();
        
    });
    
    $('.loginButton').click(function () {
        $("#popupDiv").show();
        $("#loginFormDiv").show();
        $("#resetPasswordDiv").hide();
        $("#createFormDiv").hide();
        $("#editProfilePictureDiv").hide();
        $(".overlay").show();
    });
    
    $('#usernameButton').click(function () {
        $("#dropdown").show()
    });
        
    $('#viewUsernameChangeButton').click(function () {
        $("#editPasswordDiv").show();
        $("#editUsernameDiv").hide();
        $("#editProfilePictureDiv").hide();
    });

    $('#viewPasswordChangeButton').click(function () {
        $("#editPasswordDiv").hide();
        $("#editProfilePictureDiv").hide();
        $("#editUsernameDiv").show();
       
    });

    $('#resetPassword').click(function () {
        $("#resetPasswordDiv").show();
        $("#loginFormDiv").hide();
        $("#createFormDiv").hide();
    });

    $('#editProfilePicture').click(function () {
        $("#editProfilePictureDiv").show();
        $('#popupDiv').show();
        $(".overlay").show();
        $("#editPasswordDiv").hide();
        $("#editUsernameDiv").hide();
    });


    $('#ChangefileID').change(function () {
        $(".custom-file-input::before").css({
            height: "200px"
        });
        
        var file = document.getElementById("ChangefileID").files[0];
        if(file != undefined){
            var filename = file.name;
            var ending = filename.split('.').pop().toLowerCase();
            console.log(ending);
            var allowedEndings = ["jpeg", "jpg", "png"];
            console.log("outside");
            if(allowedEndings.includes(ending)){
                console.log("here");
                url = URL.createObjectURL(file);
                document.getElementById("loginImg").src = url;
                document.styleSheets[0].cssRules[0].style.cssText = "position:absolute;top: 2px; background-color: red; left: 75px; vertical-align: top;content: '" + filename + "';text-align: center;display: inline-block; background-color: rgb(20,20,20);color:rgb(169,169,169);font-size: 20px;-webkit-user-select: none;cursor: pointer;width: 285px;border-radius: 40px;margin: auto;padding: 8px;height: 30px;";
            }else{
            $('#profilePictureChangeError').text("This file type is not allowed");
            $('#profilePictureChangeError').show();
            }
        }
    });

    
    $('#loginForm').submit(function (event) {

        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        $.ajax({
            url : post_url,
            type: request_method,
            data : form_data
        }).done(function(response){ //
            if(response != true){
            $("#invalidLogin").text(response);
            $("#invalidLogin").show()
            }else{
            location.reload();
           
            }
        });
    });

    $('#passwordForm').submit(function (event) {

        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        $.ajax({
            url : post_url,
            type: request_method,
            data : form_data
        }).done(function(response){
            if(response != true){
                $("#passwordError").show()
                $("#passwordError").text(response);
            }else{
                $("#passwordError").text("Password changed successfully");
                location.reload();
            }
        });
    });

    $('#usernameForm').submit(function (event) {

        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission

   

        $.ajax({
            url : post_url,
            type: request_method,
            data : form_data
        }).done(function(response){
            if(response != true){
                $("#usernameChangeError").text(response);
                $("#usernameChangeError").show()
            }else{
                location.reload();
            }
        });
    });

    $('#createForm').submit(function (event) {

        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        
        $.ajax({
            url : post_url,
            type: request_method,
            data : form_data,
        }).done(function(response){ //
            if(response != true){
                $("#invalidCreateAccount").text(response);
                $("#invalidCreateAccount").show();
            }else{
                location.reload();
            }
        });

        
    });



    $('#profilePictureForm').submit(function(event){
        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var property = document.getElementById("ChangefileID").files[0];
        var imageName = property.name;
        var extension = imageName.split('.').pop().toLowerCase();
        var allowedExtentions = ["jpeg","jpg", "png"];
        if(allowedExtentions.includes(extension)){
            
            var image = document.getElementById('loginImg');
            //image.src = URL.createObjectURL(document.getElementById("fileID").files[0]);
            // let url = (URL.createObjectURL(document.getElementById("fileID").files[0]));
            var img = new FormData();
            img.append("file", property);
            // var imageSize = property.size;
            $.ajax({
                url : "uploadProfilePicture.php",
                type: request_method,
                data : img,
                contentType: false,
                cache: false,
                processData:false,
            }).done(function(response){ //
                if(response != true){
                    $("#profilePictureChangeError").text(response);
                    $("#profilePictureChangeError").show();
                }else{
                    location.reload();
                }
            });
            
        }else{
            $('#profilePictureChangeError').text("This file type is not allowed");
            $('#profilePictureChangeError').show();
        }
     });


    $('#resetPasswordForm').submit(function (event) {

        event.preventDefault(); //prevent default action 
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        // console.log($);
        $.ajax({
            url : post_url,
            type: request_method,
            data : form_data
        }).done(function(response){ //
                $("#resetPasswordMessage").text(response);
                $("#resetPasswordMessage").show();
        });

    });



    $('#logout').click(function (event) {
        event.preventDefault(); //prevent default action 
        $.ajax({
            url : "logout.php",
        }).done(function(response){ //
            location.reload();
        });
    });

    window.onclick = function(event) {

        if($(event.target).attr('class') != "menu"){
            $("#dropdown").hide()
        }

        //console.log($(event.target).attr('class'));
       // console.log($(event.target).attr('id'));


    }

    
});

