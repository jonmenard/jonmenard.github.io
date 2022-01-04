<?php

include "connectDatabase.php";


// right back to the referrer page from where you came.

$url = $_SERVER['HTTP_REFERER'];


$username = $_POST['uName'];
$password = $_POST['password'];

$sql = "SELECT * FROM `Users` WHERE `username` = \"$username\"";

if ($result = mysqli_query($conn, $sql)) {
    if($result -> num_rows == 1){
        while($row = $result->fetch_assoc()) {
            $hashPassword = $row["password"];
            $flappybird = $row["FlappyBirdHighScore"];
            $profilePicureUrl  = $row["profilePicture"];
        }
    }
    //  Free result set
    $result -> free_result();
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
    echo '<meta http-equiv="refresh" content="0;URL=' . $url . '">';
}

if (password_verify($password, $hashPassword)) {
    if(!is_null($profilePicureUrl)){
        $_SESSION['profilePictureURL'] =  $profilePicureUrl;
    }
    $_SESSION['username'] = $username;
    $_SESSION['flappybirdScore'] = $flappybird;
    echo true;  
  // Success!
}else {
    echo "Wrong username or password. Please try again";
}
//echo '<meta http-equiv="refresh" content="0;URL=' . $url . '">';



?>