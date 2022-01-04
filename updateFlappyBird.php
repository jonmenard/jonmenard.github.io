<?php
include "connectDatabase.php";

$url = $_SERVER['HTTP_REFERER'];
if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];
    $flappyBird = $_POST['album'];
    $sql = "UPDATE `Users` SET `FlappyBirdHighScore` = \"$flappyBird\" WHERE `username` = \"$username\"";
    
    if ($result = mysqli_query($conn, $sql)) {
     //everything went through
    }else{
        echo "Error: ". $sql . "<br>". $conn->error;
    }
}
?>