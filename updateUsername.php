<?php

include "connectDatabase.php";

$oldPassword = $_POST['pswrd'];
$username = $_POST['newUsername'];
$username2 = $_POST['newUsername2'];
$oldusername = $_SESSION['username'];

$sql = "SELECT * FROM `Users` WHERE `username` = \"$oldusername\"";

if ($result = mysqli_query($conn, $sql)) {
    if($result -> num_rows == 1){
        while($row = $result->fetch_assoc()) {
            $hashPassword = $row["password"];
            $flappybird = $row["FlappyBirdHighScore"];
        }
    }
    //  Free result set
    $result -> free_result();
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
    echo '<meta http-equiv="refresh" content="0;URL=' . $url . '">';
}

if (password_verify($oldPassword, $hashPassword)) {
    if(strcmp($username, $username2) == 0){
        $sql1 = "SELECT * FROM `Users` WHERE `username` = \"$username\"";
        if ($result = mysqli_query($conn, $sql1)) {
            if($result -> num_rows > 0){
                echo "This username is already taken. Please try again";
            }else{
                $sql = "UPDATE `Users` SET `username`  = \"$username\" WHERE `username` = \"$oldusername\"";

                if ($result = mysqli_query($conn, $sql)) {
                    echo true;
                    $_SESSION['username'] = $username;
                }
            }
        }   
    }else{
        echo "The usernames did not match. Please Try again";
    }
}else {
    echo "Wrong password. Please try again";
}



?>