<?php

include "connectDatabase.php";

$username = $_POST['usernameToReset'];
$sql = "SELECT * FROM `Users` WHERE `username` = \"$username\"";

if ($result = mysqli_query($conn, $sql)) {
    if($result -> num_rows == 1){
        while($row = $result->fetch_assoc()) {
            $email = $row["email"];
        }
        $pass = "d45jhk43jh5k";
        $password = password_hash($pass, PASSWORD_DEFAULT);
        $sql1 = "UPDATE `Users` SET `password`  = \"$password\" WHERE `username` = \"$username\"";
        if ($result1 = mysqli_query($conn, $sql1)) {

$headers = "From: jonmenardsportfolio.ca \r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            $htmlContent = '
            <html> 
                <head> 
                <title>Jon Meanrd\'s Portfolio</title> 
                </head> 
                <body style="background-color:rgb(20,20,20);"> 
                    <center>
                        <h1 style="color:White;">Jon Menard\'s Portfolio</h1> 
                        <p style="color: White;"> Your password has been reset to"' . $pass . '"</p>
                        <a href="http://www.jonmenardportfolio.ca/">www.jonmenardportfolio.ca</a>
                    </center>
                </body> 
            </html>';
            if(mail($email, "Password Reset",$htmlContent, $headers)){
                echo "Password Reset";
            }else{
                echo "mail failed";
            }
        }else{
            echo "Error: ". $sql . "<br>". $conn->error;
        }
    //  Free result set
    $result -> free_result();
    }else{
        echo "too many ysers";
    }
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
    echo '<meta http-equiv="refresh" content="0;URL=' . $url . '">';
}



?>