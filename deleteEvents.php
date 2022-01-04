<?php

include "connectDatabase.php";


// right back to the referrer page from where you came.


if(!isset($_SESSION['username'])){
    echo "You must be the logged in to delete this event";
    return;
}

$username = $_SESSION['username'];

$eventID = $_POST['eventID'];    
$sql = "SELECT users.username FROM event JOIN users WHERE event.userId = users.id && event.Id = \"$eventID\"";


if ($result = mysqli_query($conn, $sql)) {
        while($row = $result->fetch_assoc()) {
            
            if($row['username'] != $username){
                echo "You must be the creator of this event inorder to delete it";
                return;
            }
        }
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
}


       
$sql2 = "DELETE FROM `event`  WHERE `event`.`Id` = \"$eventID\" ";
        
if($conn->query($sql2)){
    echo true;
}else{
    echo "Error: ". $sql2 . "<br>". $conn->error;
}
   

?>