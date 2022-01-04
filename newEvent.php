<?php

include "connectDatabase.php";


// right back to the referrer page from where you came.


if(!isset($_SESSION['username'])){
    return false;
}

$url = $_SERVER['HTTP_REFERER'];


$event = $_POST['event'];
$location = $_POST['location'];
$hour = $_POST['time'];
$description = $_POST['description'];
$dayID = $_POST['dayId'];
$username =  $_SESSION['username'];
$date = explode('-', $dayID);
$time =  $hour . ":00";



       
$sql2 = "INSERT INTO event (event, location, date, time, description, userID) 
        VALUES ('$event','$location','$dayID', '$time', '$description',(SELECT `users`.`iD` FROM `users` WHERE `users`.`username` = \"$username\"))";
        
if($conn->query($sql2)){
    
    echo true;
}else{
    echo "Error: ". $sql2 . "<br>". $conn->error;
}
        

?>