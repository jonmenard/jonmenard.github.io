var title;
var login;
login = $('#login');

$(function(){
    
    title = $('#content');
    var size = 100;
    $("#home").css({
        color: 'black',
        textDecoration: 'underline'
    });
});



$(function(){
    $(title).on('click',function(){
        $(title).fadeOut(500, function(){
            window.location.href = 'about.html';
        });
    }); 
});


    



    


