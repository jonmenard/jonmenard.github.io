<?php
session_start();
//require_once('protected/config.php');

// information to connect to the database
$host = "localhost";
$dbUsername = "id12311001_jonmenard007";
$dbPassword = "123jonny123";
$dbname = "id12311001_jonmenardsportfolio";

$conn = new mysqli($host,$dbUsername,$dbPassword, $dbname);

if($conn -> connect_errno){
    die("Connection failed: " . $conn->connect_error);
}
 
?>
