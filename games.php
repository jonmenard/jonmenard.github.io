<?php
    include "header.php";
?>



<body>
    
   <div class= "gameHolder" >
        <div class = "top">
            <h1 class="header">Games </h1>
            <br> 
        </div>

        <div class = "textHolder"  >
            <h3>1. MineSweeper </h3>
            <strong>Instructions:</strong> The objective of this game is to clear all the bombs in the grid. When a tile is left clicked it will display however many bombs
            are touching it including diagonal tiles. If the tile is not touching any tiles, it will search the tiles beside it until it finds tiles which
            are adjacent to bombs. Right clicking will place a flag on the tile. Once all the bombs are flagged, the game is won. If is bomb is left clicked
            the game is over and all the remaning bombs will be displayed. Selecting "Easy", "Medium", or "Hard" will reset the game and generate 10, 25, or 40 
            bombs respectivily.
        </div>

        <div id="minesweeperHolder">
            <script src = "JavaScript/minesweeper.js"> </script>
        </div>

        <div class="textHolder">
            <h3>2. Snakes</h3>
            <strong>Instructions:</strong> The goal of this game is to grow the snake as long as possible. Inorder to grow, the snake needs to consume food. If the snake 
            runs into the walls or its own self the game is over. Click 'reset' before starting a new game.
        </div>

        <div id = "snakeContainer">
            <button id="resetSnake">Reset</button>
            <br>
            <canvas id="snake" width="600" height="600"> </canvas>
            <script src = "JavaScript/snakes.js"></script>
        </div>

        <div class="textHolder">
            <h3>3. Flappy Bird</h3>
            <strong>Instructions:</strong> Try to get as far as possible. Press play to start and any key to jump.
        </div>

        <div id = "flappybirdContainer">
            <button id = "startFlappyBird"></button>
            <button id = "leaderboardsFlappyBird"></button>
            <table id = "leaderboardTable" hidden></table>
            <canvas id = "background" height = "600px" width = "600px"
            style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
            <canvas id = "pipes" height = "600px" width = "600px"
            style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
            <canvas id = "bird" height = "600px" width = "600px"
            style="position: absolute; left: 0; top: 0; z-index: 2;"></canvas>
            <canvas id = "gameOver" height = "600px" width = "600px"
            style="position: absolute; left: 0; top: 0; z-index: 3;"></canvas>
            <script src = "JavaScript/flappyBird.js"></script>   
        </div> 

        <div class="textHolder">
            <h3>4. Evolutionary AI</h3>
            <strong>Description: </strong>
            This is an example of an extremely simple artificial intelligence. Using a ranking system, the top half of dots from the previous 
            generation are duplicated and passed on to the next generation. Each dot's instruction is then mutated based off how well they did, 
            and another attempt to reach the destination is attempted. The process is repeated endlessly. A perfect result will never be achieved,
             since mutation will always occur. Over time the dots should make progress towards the destination, however because of how simple this algorithm
              is, it is possible for a solution to never happen.<br><br>
            <strong>Instructions: </strong>
            In order to run a simulation, press Start. Clicking and dragging will draw rectangles that the dots must avoid. Pressing Undo will remove the last 
            object drawn. Reset clears the entire screen. Pressing Stop will pause the simulation. Show More and Show Less will toggle the amount of generations 
            that are run in the background before another one is shown.

        </div>
        <div id="aiContainer">
            <div id="ai">
                <div id="aiButtons">
                    <button class = "aiButton" id= "start">Start</button>
                    <button class = "aiButton" id= "stop">Stop</button>
                    <button class = "aiButton" id= "resetAI">Reset</button>
                    <button class = "aiButton" id= "remove">Undo</button>
                    <button class = "aiButton" id= "show">Show More</button>
                    <button class = "aiButton" id= "less">Show Less</button>  
                </div>
                <canvas id = "screen" height="600px" width="600px"></canvas>
                <script src = "JavaScript/ai.js"></script>
            </div>
        </div>

        <div class="textHolder">
            <h3>5. Tetris</h3>
            <strong>Description: </strong>
            The objective of Tetris is to place as many pieces as possible. 
            The pieces will start at the top of the screen and drop down towards the bottom. 
            The pieces can be moved left, right, down or rotated. 
            Additionally, the current piece can be swapped with the piece in the hold box. 
            When a row is completely full the row will be cleared, and all tiles above will be moved down one row. 
            If a new piece can not be placed without hitting an already placed object, the game is over.
            <br><br>
            'A' and 'S' to move. W to rotate. Space to swap. Enter to fast drop.

        </div>

        <div id = "tetrisContainer">
            <br>
            <button class = "tetrisButton" id="tetrisStart">Start Game</button>
            <button class = "tetrisButton" id="tetrisAIStart">Start AI</button>
            <canvas id="tetrus" width="800px" height = "800px"> 
                <button class = "tetrisButton" id="tetrisStart">Start Game</button>
                <button class = "tetrisButton" id="tetrisAIStart">Start AI</button>
            </canvas>
            <script  src = "JavaScript/tetris/aiTetris.js"></script>
            <script  src = "JavaScript/tetris/tetrisBox.js"></script>
            <script  src = "JavaScript/tetris/tetrisObject.js"></script>
            <script  src = "JavaScript/tetris/tetrisGameBoard.js"></script>
            <script  src = "JavaScript/tetris/tetrisCanvas.js"></script>
            <script  src = "JavaScript/tetris/tetris.js"></script>
            <script  src = "JavaScript/tetris/tetrisControler.js"></script>
        </div>




    </div>
</body>

<?php


?>

<script>
    $(function(){
        $("#games").before()
    });
</script>
<script>
    $(function(){
        $("#games").css({
            color: 'black',
            textDecoration: 'underline'
        });
    });
</script>

</html>