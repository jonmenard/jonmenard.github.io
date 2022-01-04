<?php

include "connectDatabase.php";
$date = $_POST['album'];   
$sql = "SELECT * FROM `event` WHERE date = \"$date\" \n" . "ORDER BY `event` . `time` ASC";

if ($result = mysqli_query($conn, $sql)) {
    if($result -> num_rows > 0){
        echo $date . "p+"  ;
        while($row = $result->fetch_assoc()) {
            echo $row['Id'] . "+";
            echo date("g:i a", strtotime($row['time'])) . " " . $row['event'] . "+";
        }
    }else{
        echo false;
    }

}else{
    echo "Error: ". $sql . "<br>". $conn->error;
}


?>