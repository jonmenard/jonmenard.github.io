<?php

include "connectDatabase.php";

$url = $_SERVER['HTTP_REFERER'];


   
    $fName =  $_POST['fName'];
    $lName =  $_POST['lName']; 
    $username =  $_POST['uName'];
    $email =  $_POST['email']; 
    $pass =  $_POST['password']; 
    $password = password_hash($pass, PASSWORD_DEFAULT);  
    $levelId = 2;
    

$sql1 = "SELECT * FROM `Users` WHERE `username` = \"$username\"";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email";
}else{
    if ($result = mysqli_query($conn, $sql1)) {
        if($result -> num_rows > 0){
            echo "This username is already taken. Please try a different one";
        }else{
            $sql2 = "INSERT INTO Users (firstName, lastName, email, username, password, level_id) 
            VALUES ('$fName','$lName','$email', '$username','$password','$levelId')";
        
            if($conn->query($sql2)){
                $_SESSION['username'] = $username;
                $_SESSION['accountMade'] = true;
                $_SESSION['flappybirdScore'] = 0;
               // echo '<img scrc = "data:image/jpeg;base64,'. base64_encode($row['profilePicture']). '"/>';
                echo true;
            }else{
                echo "Error: ". $sql2 . "<br>". $conn->error;
            }
        }
    }else{
        echo "Error: ". $sql1 . "<br>". $conn->error;
    }
}

//mysqli_autocommit($connection, FALSE);
//if ($result1 && $result2) {
/* commit transaction */
//mysqli_commit($connection);
//}
//else {
/* rollback transaction */
//mysqli_rollback($connection);
//}
//



?>