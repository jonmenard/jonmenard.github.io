var calendarTable = document.getElementById("calendar");
var table = document.getElementById("temp");
var date = new Date();
var viewedMonth = date.getMonth() + 1;
var viewedYear = date.getFullYear();
var dayNames = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemeber'];
var lastMonth;
var lastYear;
var nextMonth;
var nextYear;
var lastTableCell;


var ajaxCounter = undefined;
function updateDate(){

    if(viewedMonth > 12){
        viewedMonth = 1
        viewedYear = viewedYear+1;
    }else if(viewedMonth < 1){
        viewedMonth = 12;
        viewedYear = viewedYear-1;
    }

    
    if(viewedMonth == 12){
        nextMonth = 1;
        nextYear = viewedYear+1;
    }else if(viewedMonth == 1){
        lastMonth = 12;
        lastYear = viewedYear-1;
    }else{
        lastMonth = viewedMonth-1;
        lastYear = viewedYear;
        nextMonth = viewedMonth+1;
        nextYear = viewedYear;
    }

}

function makeCalendar(){
   // $('#calendar').hide();
    
    table.innerHTML = "";
  //  calendarTable.innerHTML = "";

    var list = document.getElementsByClassName("calendarBox");
    for(let i = 0; i < list.length; i++){
      
        list[i].id = null;
       
    }

    document.getElementById('lastMonthLabel').innerText = "< " + monthNames[lastMonth-1] + " " + lastYear;
    document.getElementById('thisMonthLabel').innerText = monthNames[viewedMonth -1] + " " + viewedYear;
    document.getElementById('nextMonthLabel').innerText = monthNames[nextMonth-1] + " " + nextYear + " >";



    var lengthOfLastMonth = new Date(lastYear,lastMonth,0).getDate(); 
    var lengthOfMonth = new Date(viewedYear,viewedMonth,0).getDate();
    firstDayofWeek =  new Date(viewedYear,viewedMonth-1,1).getDay();
    var counter = 1 - firstDayofWeek;
    ajaxCounter = Math.ceil((lengthOfMonth / 7)) * 7;
    // create weeks for the calendar
    for(var week = 0; counter <= lengthOfMonth; week++){
            var row = table.insertRow(-1);
            row.className = "calendarRow";
            
        // create days for the calendar
        for(var day = 1; day < 8; day++){
            // week 0 will be the header for each day of the week
            if(week == 0){
                var headerCell = document.createElement("TH");
                row.appendChild(headerCell);
                let text = document.createTextNode(dayNames[day -1]);
                headerCell.appendChild(text);
            // all other days will be numbered     
            }else{

                let day = counter;
                let month = viewedMonth;
                let year = viewedYear;

                if(counter < 1){
                    month--;
                    if(month == 0){
                        month = 12;
                        year--;
                    }
                    day = lengthOfLastMonth + counter;
                   
                }else if(counter > lengthOfMonth){
                      day  = counter - lengthOfMonth;
                      month++;
                      if(month == 13){
                          month = 1;
                          year++;
                      }
                }




                // creating the day in the calendar
                var cell1 = row.insertCell(-1);
                cell1.className = "calendarTD";

                // insert and unorder list which will be populated later with events on that day
                var eventHolder = document.createElement("div");
                
                eventHolder.className += " calendarBox";
                eventHolder.id = year + "-" + month + "-" + day + "p";

                // creating the day number in the cell
                var paragraph = document.createElement("p");
                var paragraphText;

                // get the events that match that day

              
               

                var checkDate = year + "-" + month + "-" + day
               

                    
               $.when(ajaxCall(checkDate)).done(function(){
                ajaxCounter = ajaxCounter - 1;
                if(ajaxCounter == 0){
                    $('#calendar').show();
                    calendarTable.innerHTML = table.innerHTML;
                    table.innerHTML = "";
                }
            });
              
                cell1.appendChild(eventHolder);
                paragraphText = document.createTextNode(day);
                if(day == date.getDate() && month - 1 == date.getMonth() && year == date.getFullYear()){
                
                    paragraph.style.background = "rgba(206, 12, 12, 0.75)";
                    paragraph.style.borderColor = "black";
                }

             


                


                cell1.id  = year + "-" + month + "-" + day;
                paragraph.className = "calendarNumber";
                paragraph.className += " calendarBox";
                paragraph.appendChild(paragraphText);
                cell1.appendChild(paragraph);
                counter++;
            }
        }
    }
    

}

//+ $('#eventDisplayDiv').height()/2 + id1.position().top);    // <<< use pageX and pageY tableCell.position().top +  
//

function ajaxCall1(eventObject, eventId,date){
   
    return $.ajax({                 
        type: 'POST',
        url : "getSpecificEvent.php",
        data: {id: eventId },
        success: function(response){
            if(response != false){
                var information = response.split("+");
                $("#eventTimeP").text(date + " @" + information[1]);
                $("#eventLocationP").text(information[2]);
                $("#eventDescriptionP").text(information[3]);
                $("#eventParticipentsP").text(information[4] +  " " +information[5]);
                $("#eventNameP").text(information[6]);

                var tableCell = eventObject.parent().parent();
                lastTableCell = tableCell;
                let backgroundColor = eventObject.css("backgroundColor");
               
                $("#dayId").val(date);
                $("#eventId").val(eventId);
                $('#' + eventObject.attr('id')).css('border-width', "bold");
                var xPosition = $("#calendarHolder").width() * 0.05 + 15 + tableCell.position().left + tableCell.width() + 25 + $("#eventDisplayDiv").width();
                $('#eventDisplayDiv').css('top', $("#calendar").position().top + $("#calendarHolder").position().top + tableCell.position().top +  eventObject.position().top + eventObject.height() / 2 - $('#eventDisplayDiv').height()/2 );
                 if( xPosition> $("#calendarHolder").width() || xPosition > window.innerWidth ){
                    $('#eventDisplayDiv').css('left', $("#calendarHolder").width() * 0.05 + 15 + tableCell.position().left - 45 - $("#eventDisplayDiv").width());        
                    document.styleSheets[0].cssRules[1].style.cssText = "content: ''; position: absolute; right: 0;top: 50%; width: 0; height: 0; border: 15px solid transparent; border-left-color: " + backgroundColor +  "; border-right: 0; margin-top: -20px; margin-right: -20px;";
                }else{
                    $('#eventDisplayDiv').css('left', xPosition - $("#eventDisplayDiv").width() );
                    document.styleSheets[0].cssRules[1].style.cssText = "content: '';position: absolute;left: 0;top: 50%;width: 0;height: 0;border: 15px solid transparent;border-right-color:" + backgroundColor +  ";border-left: 0;margin-top: -20px;margin-left: -20px;z-index: 6;";
                }
                $('#eventDisplayDiv').css('borderTopColor', backgroundColor);
                $('#eventDisplayDiv').css('display','inline');     
                $("#eventDisplayDiv").css("position", "absolute");  // <<< also make it absolute!
                
                $("#eventDisplayDiv").show();



            }
        }
    });
}



function ajaxCall(checkDate){
    return $.ajax({                 
    type: 'POST',
    url : "getEvents.php",
    data: { album: checkDate },
    success: function(response){
        if(response != false){
            var res = response.split("+");
            let pID = res[0];
            for(let i = 1; i < res.length - 1; i++){
                let eventID = res[i++];
                var div = document.getElementById(pID);
                var dataName = document.createElement("Li");
                dataName.id = res[0] + "" + eventID;
                dataName.className = "calendarP";
                dataName.innerHTML = res[i];
                dataName.style.backgroundColor = "pink";
                div.appendChild(dataName);
                    
            }
            
        }
    }
    });
}

function ajaxCall2(){
    return $.ajax({                 
    type: 'POST',
    url : "deleteEvents.php",
    data: { eventID: $("#eventId").val() },
    success: function(response){
        if(response != true){
            $("#invalidDisplayEvent").text(response);
            $("#invalidDisplayEvent").show();
        }else{
            location.reload();
        }
    }
});
    
}


updateDate();

window.onload = function() {
    if(viewedMonth > 9){
        $('#calendarInput').val(viewedYear + "-" + viewedMonth);
    }else{
        $('#calendarInput').val(viewedYear + "-0" + viewedMonth);
    }

  
    makeCalendar(viewedMonth,viewedYear)
   
     
}




$('#lastMonthLabel').click(function () {
    viewedMonth = viewedMonth - 1;
    updateDate();
    makeCalendar(lastMonth,viewedYear);
});

$('#nextMonthLabel').click(function () {
    viewedMonth = viewedMonth + 1;
    updateDate();
    makeCalendar(nextMonth,viewedYear);
});

$(function(){
    window.onclick = function(event) {

        

        let tableCell = undefined;
       
        if($(event.target).hasClass("calendarBox")){
            tableCell = $(event.target).parent();
        }else if ($(event.target).hasClass("calendarTD")){
            tableCell = $(event.target);
        }else if($(event.target).hasClass("calendarEventInput")){
            
        }else if($(event.target).attr('id') == "editEventButton"){

            $("#addEventName").val($("#eventNameP").text());
            $("#addEventPlace").val($("#eventLocationP").text());
            $("#addEventDescription").val($("#eventDescriptionP").text());
            var time = $("#eventTimeP").text().split("@").pop();
            
            var hour;
            if(time.split(" ").pop().toUpperCase() == "PM"){
                hour = parseInt(time.split(":").shift(), 10);

                if(hour != 12){
                    hour += 12;
                }
                
            }else{
                hour = parseInt(time.split(":").shift(), 10);
                if(hour < 10){
                    hour = "0" + hour;
                }
                
            }

            $("#addEventTime").val(hour + ":" + time.split(" ").shift().split(":").pop());
           
            
            $("#eventDisplayDiv").hide();
            $('#eventAdderDiv').css('top', $("#calendar").position().top + $("#calendarHolder").position().top + lastTableCell.position().top - $('#eventAdderDiv').height() - 35  );     // <<< use pageX and pageY
            $('#eventAdderDiv').css('left', $("#calendarHolder").width() * 0.05 + lastTableCell.position().left + lastTableCell.width()/2 -   $('#eventAdderDiv').width()/2);
            $('#eventAdderDiv').css('display','inline');     
            $("#eventAdderDiv").css("position", "absolute");  // <<< also make it absolute!
            $("#eventAdderDiv").show();
            $("#addEventSubmit").hide();
            $("#editEventSubmit").show();
        }else if($(event.target).attr('id') == 'editEventSubmit'){
           
        }else if($(event.target).attr('id') == 'deleteEventButton'){
            ajaxCall2(); 
           
        }else if($(event.target).hasClass("calendarP")){
            $("#eventAdderDiv").hide();
            let fullID = (event.target.id).split("p")
            $("#invalidDisplayEvent").hide();
            $("#invalidCreateEvent").hide();
            ajaxCall1($(event.target), fullID.pop(),fullID.shift()); 
        }else if($(event.target).hasClass("save")){
            
        }else{
            $("#eventAdderDiv").hide();
            $("#eventDisplayDiv").hide();
        }   

        if(tableCell != undefined){
            $("#eventDisplayDiv").hide();
            $("#dayId").val(event.target.id);
            $('#' + tableCell.attr('id')).css('border-width', "bold");
            $('#eventAdderDiv').css('top', $("#calendar").position().top + $("#calendarHolder").position().top + tableCell.position().top - $('#eventAdderDiv').height() - 35  );     // <<< use pageX and pageY
            $('#eventAdderDiv').css('left', $("#calendarHolder").width() * 0.05 + tableCell.position().left + tableCell.width()/2 -   $('#eventAdderDiv').width()/2);
            $('#eventAdderDiv').css('display','inline');     
            $("#eventAdderDiv").css("position", "absolute");  // <<< also make it absolute!
            $("#addEventSubmit").show();
            $("#editEventSubmit").hide();
            $("#eventAdderDiv").show();
            
            $("#invalidCreateEvent").hide();

        }
            



        }
   
});


$('#todayButton').click(function(event){
    viewedMonth = date.getMonth() + 1;
    viewedYear = date.getFullYear();
    updateDate();
    makeCalendar(viewedMonth,viewedYear);
});









$('#calendarForm').submit(function(event){
    event.preventDefault(); //prevent default action 
   // var post_url = $(this).attr("action"); //get form action url
   // var request_method = $(this).attr("method"); //get form GET/POST method
    var requestedDate = document.getElementById("calendarInput").value.split('-');
    viewedMonth = parseInt(requestedDate.pop());
    viewedYear = parseInt(requestedDate.shift());
    updateDate();
    makeCalendar(viewedMonth,viewedYear);
 });


 $('#eventAdderForm').submit(function(event){

    event.preventDefault(); //prevent default action 
    
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = $(this).serialize(); //Encode form elements for submission
    
    if($(this).find("input[type=submit]:focus").attr("id") == "editEventSubmit"){
        $.ajax({
            url : "editEvent.php",
            type: request_method,
            data : form_data
        }).done(function(response){
            if(response != true){
                $("#invalidCreateEvent").text(response);
                $("#invalidCreateEvent").show();
            }else{
                location.reload();
            }
        });
    }else{
        $.ajax({
            url : post_url,
            type: request_method,
            data : form_data
        }).done(function(response){
            if(response != true){
                $("#invalidCreateEvent").text("You need to be logged in to create an event");
                $("#invalidCreateEvent").show();
            }else{
                location.reload();
            }
        });
    }
    

    

 });


 var colors = [
    {
        hex: '#00759A',
      name: 'Blue'
  },
    {
        hex: '#F7941D',
      name: 'Orange'
  },
    {
        hex: '#A71930',
      name: 'Red'
  },
    {
        hex: '#679146',
      name: 'Green'
  }
];
new Vue({
    el: '#color-picker',
    data: {
        active: false,
        selectedColor: '',
        selectedColorName: '',
        colors: colors
    },
    computed: {
        selector: function() {
            if(!this.selectedColor) {
                return 'Color';
            }
            else {
                return '<span style="background: ' + this.selectedColor + '"></span> ' + this.selectedColorName;
            }
        }
    },
    methods: {
        setColor: function(color, colorName) {
            this.selectedColor = color;
            this.selectedColorName = colorName;
            this.active = false;
        },
        toggleDropdown: function() {
            this.active = !this.active;
        },
    }
});

