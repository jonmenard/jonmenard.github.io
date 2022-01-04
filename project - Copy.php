<?php
    include "header.php";
?>

<!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->

<body>
    
   <div class = "projectHolder" >
        <div class = "top">
            <h1 class="header">Projects </h1>
            <br> 
        </div>

        <div class = "textHolder"  >
            <h3> **Work in progress**  </h3>
        </div>

    



        <div id = "poolManagementSystemHolder">
            <div id = "calendarHolder">
                <div id = "inputHolder">   
                    <input type = "submit" class = "calendarFormInput" id = "todayButton"  value = "Today">
                    <form  id = "calendarForm" method = "post" >
                        <input type = "month" class = "calendarFormInput" id="calendarInput" required>
                        <input type = "submit" class = "calendarFormInput" id = "calendarSubmit" value = "Search">
                    </form>
                </div>
                <button class = 'monthLabel' id = 'lastMonthLabel'></button>
                <button class = 'monthLabel' id= 'thisMonthLabel'></button>
                <button class = 'monthLabel' id = 'nextMonthLabel'> </button>
                

                



                <div id = "eventAdderDiv" hidden>
                    <h3> Create New Event </h3>

                    
                    <form id = "eventAdderForm" method = "post" action = "newEvent.php">
                    
                    



                        <div class= "eventAdderInputDiv">
                            <i class="material-icons eventInformation" >	label</i>
                            <input type = "text" class = "calendarEventInput" id = "addEventName" placeholder = "Event Name" name = "event"> 
                        </div>

                        <div class= "eventAdderInputDiv">
                            <i class="material-icons eventInformation" >place</i>
                            <input type = "text" class = "calendarEventInput" id = "addEventPlace" placeholder = "Location" name = "location">
                        </div>

                        <div class= "eventAdderInputDiv">
                            <i class="material-icons eventInformation" >description</i>
                            <input type = "text" class = "calendarEventInput" id = "addEventDescription" placeholder = "Description" name = "description"> 
                        </div>

                        <div class= "eventAdderInputDiv">
                            <i class="material-icons eventInformation" >timer</i>
                            <input type = "time" class = "calendarEventInput" id = "addEventTime" value = "09:00" required name = "time">
                        </div>
                        <h5 class ="loginErrorMessage" id = "invalidCreateEvent" hidden></h5>
                        <input type = "hidden" class = "calendarEventInput" id = "dayId" name = "dayId" value = "1212">
                        <input type = "hidden" class = "calendarEventInput" id = "eventId" name = "eventId" value = "1212">                                    
                        <input type = "submit"  class = "save eventSubmit" id = "addEventSubmit" value = "Save">
                        <input type = "submit"  class = "save eventSubmit" id = "editEventSubmit" value = "Edit" hidden>      
                        
                            
                        
                    </form>
                 </div>
                
                 <div id = "eventDisplayDiv" hidden>
                        <div class = "eventAdderInformation" id = "eventName">
                            <p id = "eventNameP" class = "eventInformation"></p>     
                        </div>
                        <div class = "eventAdderInformation" id = "eventTime"> 
                            <i class="material-icons eventInformation" id = "timer">timer</i> 
                            <p id = "eventTimeP" class = "eventInformation"></p>
                        </div>
                        <div class = "eventAdderInformation" id = "eventDescription"> 
                            <p id = "eventDescriptionP" class = "eventInformation"></p>
                        </div>
                        <div class = "eventAdderInformation" id = "eventLocation"> 
                            <i class="material-icons eventInformation" id = "place">place</i>
                            <p id = "eventLocationP" class = "eventInformation" ></p>
                        </div>
                        <div class = "eventAdderInformation" id = "eventParticipents"> 
                            <i class="material-icons eventInformation" id = "person">person</i>
                            <p id = "eventParticipentsP" class = "eventInformation"></p>
                        </div>
                        <h5 class ="loginErrorMessage" id = "invalidDisplayEvent" hidden></h5>
                        <div class = "eventButtonHolder">
                            <button id = "editEventButton" class = "eventDisplayButtons"> Edit </button>
                            <button id = "deleteEventButton" class = "eventDisplayButtons"> Delete </button> 
                        </div>
                        
                        
                 </div>


                <table id = "calendar">

                </table>


                <table id = "temp" hidden>
                </table>
                <script src = "JavaScript/makeCalendar.js">
                </script>   


        </div>
    </div>


</body>

<?php


?>

<script>
    $(function(){
        $("#projects").before()
    });
</script>
<script>
    $(function(){
        $("#projects").css({
            color: 'black',
            textDecoration: 'underline'
        });
    });
</script>

</html>