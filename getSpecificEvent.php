<?php

include "connectDatabase.php";

$id = $_POST['id'];    
$sql = "SELECT event.*, users.firstName, users.lastName  FROM event JOIN users WHERE event.userId = users.id && event.Id = \"$id\"";

if ($result = mysqli_query($conn, $sql)) {
        while($row = $result->fetch_assoc()) {
            echo $row['Id'] . "+";
            echo date("g:i a", strtotime($row['time'])). "+";
            echo $row['location']. "+";
            echo $row['description']. "+";
            echo $row['firstName']. "+";
            echo $row['lastName']. "+";
            echo $row['event'];
        }
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
}


?>