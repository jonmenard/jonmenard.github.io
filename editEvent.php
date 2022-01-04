<?php

include "connectDatabase.php";


// right back to the referrer page from where you came.


if(!isset($_SESSION['username'])){
    echo "You must be logged in to edit events";
    return false;
}

$eventID = $_POST['eventId'];    
$sql = "SELECT users.username FROM event JOIN users WHERE event.userId = users.id && event.Id = \"$eventID\"";
$event = $_POST['event'];
$location = $_POST['location'];
$hour = $_POST['time'];
$description = $_POST['description'];
$dayID = $_POST['dayId'];
$username =  $_SESSION['username'];
$time =  $hour . ":00";

if ($result = mysqli_query($conn, $sql)) {
        while($row = $result->fetch_assoc()) {
            
            if($row['username'] != $username){
                echo "You must be the creator of this event inorder to edit it";
                return;
            }
        }
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
}





       
$sql2 = "UPDATE `event` SET `event` = \"$event\", `location` = \"$location\" , `date` = \"$dayID\", `time` = \"$time\", `description` = \"$description\" WHERE `event`.`Id` = \"$eventID\" ";
        
if($conn->query($sql2)){
    
    echo true;
}else{
    echo "Error: ". $sql2 . "<br>". $conn->error;
}
   

?>