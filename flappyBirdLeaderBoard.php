<?php

include "connectDatabase.php";


// right back to the referrer page from where you came.

$url = $_SERVER['HTTP_REFERER'];

$sql = "SELECT * FROM `Users` \n" . "ORDER BY `Users`. `FlappyBirdHighScore` DESC";

/*
                
echo '<tr>
<th>Username</th>
<th>Score</th> 
</tr>';               
           

for($count = 0; $count < 5; $count++){
    echo '
    <tr>
        <td>' . $count . '</td>
        <td>' . $count . '</td> 
    </tr>';

}

*/

///*

if ($result = mysqli_query($conn, $sql)) {
        $count = 0;
                        
    echo '<tr class="flappybirdTr">
    <th>Username</th>
    <th>Score</th> 
    </tr>';               
            
    $count = 0;
    while($row = $result->fetch_assoc()) {
        if($count == 5){
            break;
        }
        $username = $row['username'];
            
        echo '
        <tr class="flappybirdTr">
            <td>' . $username . '</td>
            <td>' . $row["FlappyBirdHighScore"] . '</td> 
        </tr>';
        $count++;
    } 
}else{
    echo "Error: ". $sql . "<br>". $conn->error;
    // echo '<meta http-equiv="refresh" content="0;URL=' . $url . '">';
}

//*/
?>