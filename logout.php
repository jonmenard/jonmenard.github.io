<?php

include "connectDatabase.php";

$url = $_SERVER['HTTP_REFERER'];
unset($_SESSION['username']);
session_unset();
session_destroy();
echo '<meta http-equiv="refresh" content="0;URL=' . $url . '">';
?>