<?php

include "connectDatabase.php";

$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];
$newPassword2 = $_POST['newPassword2'];
$username = $_SESSION['username'];

$sql = "SELECT * FROM `Users` WHERE `username` = \"$username\"";

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

    if(strcmp($newPassword, $newPassword2) == 0){   
        $password = password_hash($newPassword, PASSWORD_DEFAULT);
        $sql1 = "UPDATE `Users` SET `password`  = \"$password\" WHERE `username` = \"$username\"";
        if ($result = mysqli_query($conn, $sql1)) {
                echo true;
        }else{
            echo "Error: ". $sql1 . "<br>". $conn->error;
        }
    }else{
        echo "The passwords did not match. Please Try again";
    }
}else {
    echo "Wrong password. Please try again";
}







?>