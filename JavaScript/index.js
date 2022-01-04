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
        $(title).fadeOut(1000);
        $(title).promise().done(function(){
            window.location.href = 'about.php';
        });
    });
    
});

