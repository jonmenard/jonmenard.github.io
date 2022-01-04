<?php

include "connectDatabase.php";

if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];
    $sql1 = "SELECT * FROM `Users` WHERE `username` = \"$username\"";
    if ($result = mysqli_query($conn, $sql1)) {
        while($row = $result->fetch_assoc()) {
            $id = $row["iD"];
        }
        if($_FILES['file']['name'] != ''){
            $test = explode(".",$_FILES['file']['name']);
            $extension = end($test);
            if($extension == "jpeg"){
                $filename = $id . ".jpg";
            }else{
                $filename = $id . "." . $extension;
            }
            $location = '/UploadedImages/' . $filename;
            if(file_exists($location)) {
                chmod($location,0755); //Change the file permissions if allowed
                unlink($location); //remove the file
                //echo "removed the old file";
            }
            $target = getcwd() . '' . $location;
            if(move_uploaded_file($_FILES["file"]["tmp_name"],$target) . "-"){
                $sql = "UPDATE `Users` SET `profilePicture` = \"$filename\" WHERE `username` = \"$username\"";
                if ($result = mysqli_query($conn, $sql)) {
                    $_SESSION['profilePictureURL'] =  $filename;
                    echo true;
                }else{
                    echo "Error: ". $sql1 . "<br>". $conn->error;
                }
            }else{
                echo "not successfull";
            }
        }
    }else{
        echo "Error: ". $sql1 . "<br>". $conn->error;
    }
}else{
    echo "no username set";
}

?>