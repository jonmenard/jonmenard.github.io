
<?php 
session_start();
?>

<html lang="en" id = "html">

<head>
    <script src="JavaScript\jquery-3.4.1.js"></script>
    <link rel="stylesheet" type="text/css" href="CSS/websiteStyle.css">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=VT323">
    <title>Jon Menard</title>
</head>

    
<div id = "tetrisContainer">
           
    <br>
    <button class = "tetrisButton" id="tetrisStart">Start Game</button>
    <button class = "tetrisButton" id="tetrisAIStart">Start AI</button>
    <canvas id="tetrus" width="800px" height = "800px"> 
        <button class = "tetrisButton" id="tetrisStart">Start Game</button>
        <button class = "tetrisButton" id="tetrisAIStart">Start AI</button>
    
        </canvas>
    <script  src = "JavaScript/aiTetris.js"></script>
    <script  src = "JavaScript/tetrisBox.js"></script>
    <script  src = "JavaScript/tetrisObject.js"></script>
    <script  src = "JavaScript/tetrisGameBoard.js"></script>
    <script  src = "JavaScript/tetrisCanvas.js"></script>
    <script  src = "JavaScript/tetris.js"></script>
    <script  src = "JavaScript/tetrisControler.js"></script>
</div>

</body>








</html>