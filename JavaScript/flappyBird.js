

const backgroundCanvas = document.getElementById("background");
const backgroundContex = backgroundCanvas.getContext("2d");

backgroundContex.canvas.height  = 24 * boxWidth;
backgroundContex.canvas.width  = 24 * boxWidth;

let background = new Image();
background.src = 'Images/flappyBackground.png';

let sun = {
    img: new Image(),
    x: 24 * boxWidth,
    y: 4 * boxWidth
};
sun.img.src = 'Images/sun.png';

let boat = {
    img:  new Image(),
    x: 17 * boxWidth,
    y: 20 * boxWidth
};
boat.img.src = 'Images/boat.png';

const canvas = document.getElementById("pipes");
const pipeContex = canvas.getContext("2d");

pipeContex.save();
pipeContex.fillStyle = "red";
pipeContex.canvas.height  = 24 * boxWidth;
pipeContex.canvas.width  = 24 * boxWidth;

const birdCanvas = document.getElementById("bird");
const birdContex = birdCanvas.getContext("2d");

birdContex.canvas.height  = 24 * boxWidth;
birdContex.canvas.width  = 24 * boxWidth;

const gameCanvas = document.getElementById("gameOver");
const gameContex = gameCanvas.getContext("2d");

gameContex.canvas.height  = 24 * boxWidth;
gameContex.canvas.width  = 24 * boxWidth;

let base_image = new Image();
base_image.src = 'Images/flappy.png';

let flappy2 = new Image();
flappy2.src = 'Images/flappy1.png';

let topPipeImg = new Image();
topPipeImg.src = 'Images/pipes2.png';

let bottomPipeImg = new Image();
bottomPipeImg.src = 'Images/pipes.png';
let flappyScore = 0;
let highscore = 0;
let wingflap = 0;
let time = 0;
let timeBetweenPipe = 2;
let jumpTime =  0;
let gracePeriod = 20;
let falling = 0;
let topPipes = [];
let bottomPipes = [];
let bird = {
    x: 4 * boxWidth,
    y: 12 * boxWidth,
};

function makePipe(){

    let number =  Math.floor((Math.random() * (19 * boxWidth)));
    let topPipe = {
        x: 24 * boxWidth,
        y: number
    };

    topPipes[topPipes.length] = topPipe;
    let bottomPipe = {
        x: 24 * boxWidth,
        y: number + (12 * boxWidth)
    };

    bottomPipes[bottomPipes.length] = bottomPipe;
}


function drawCanvas(){

    if(time % 4 == 0){
        drawPipes();  
    }

    if(time % 16 == 0){
        drawBackground()
        time == 0;
    }

    time++;
    drawBird();
    collisonDetection();
}

function drawPipes(){

    for(i = 0; i < topPipes.length; i++){
        
        pipeContex.clearRect(bottomPipes[i].x + boxWidth * 2,0,4,boxWidth * 24);
        pipeContex.drawImage(topPipeImg, topPipes[i].x,(topPipes[i].y - 12 * boxWidth),boxWidth * 2,12 * boxWidth);
        pipeContex.drawImage(bottomPipeImg, bottomPipes[i].x,bottomPipes[i].y,boxWidth * 2,12 * boxWidth);
        pipeContex.drawImage(bottomPipeImg, topPipes[i].x,-4 * boxWidth,boxWidth * 2,(topPipes[i].y-boxWidth * 12)+4 * boxWidth);
        pipeContex.drawImage(topPipeImg, bottomPipes[i].x,bottomPipes[i].y+2 * boxWidth,boxWidth * 2,24 * boxWidth);
        // move the pipes forward 2px
        bottomPipes[i].x = bottomPipes[i].x - 2;
        topPipes[i].x = topPipes[i].x - 2;

        if((topPipes[i].x + boxWidth*2) <= 0){
            topPipes.pop;
            bottomPipes.pop;
        }

        // if pipe is in the same area the bird could be, check for collison
        if((topPipes[i].x > boxWidth * 2 && topPipes[i].x < boxWidth * 5)){
            if((bird.y) < topPipes[i].y){
                gameOver();
            }
            if((bird.y+boxWidth*2) > bottomPipes[i].y){
                
                gameOver();
            }else if(topPipes[i].x == bird.x){
                flappyScore++;
            }

        }
    }
}


function drawBackground(){
  
    backgroundContex.drawImage(background,0,0,24 * boxWidth,24 * boxWidth);
    backgroundContex.drawImage(sun.img, sun.x,sun.y, 2 * boxWidth,2 * boxWidth);
    backgroundContex.drawImage(boat.img, boat.x,boat.y, 2 * boxWidth,2 * boxWidth);
   
    sun.x -= 1;
    boat.x -= 1;

    if(sun.x <=-2 * boxWidth){
        sun.x = 24 * boxWidth;
    }

    if(boat.x <= -2 * boxWidth){
        boat.x = 24 * boxWidth;
    }

}


function drawBird(){

    birdContex.save();
    birdContex.clearRect(0,0,24 * boxWidth,24 * boxWidth);
    birdContex.fillStyle = "rgb(255,161,74)";
    birdContex.strokeStyle = "rgb(41,52,46)";
    birdContex.font = "bold " + boxWidth*2.5 + "px Changa One";
    birdContex.lineWidth = 2;
    birdContex.fillText(flappyScore, boxWidth, boxWidth*2);
    birdContex.strokeText(flappyScore, boxWidth, boxWidth*2)

    if(jumpTime > 0){
        bird.y -= 3;
        jumpTime -= 1;
        falling = 0;   
        birdContex.translate(bird.x + boxWidth, bird.y + boxWidth);
        birdContex.rotate(-15 * Math.PI / 180);
    }else if(gracePeriod > 0){
        gracePeriod--;
        birdContex.translate(bird.x + boxWidth, bird.y + boxWidth);
        birdContex.rotate(-15 * Math.PI / 180);
    }else{
        if(falling < 25){
            bird.y += 1;
            falling++;
            birdContex.translate(bird.x + boxWidth, bird.y + boxWidth);
            birdContex.rotate(15 * Math.PI / 180);
        }else if (falling < 50){
            bird.y += 2;
            falling++;
            birdContex.translate(bird.x + boxWidth, bird.y + boxWidth);
            birdContex.rotate(30 * Math.PI / 180); 
        }else if(falling < 100){
            bird.y += 3;
            birdContex.translate(bird.x + boxWidth, bird.y + boxWidth);
            birdContex.rotate(60 * Math.PI / 180); 
        }
    }

    if(wingflap < 30 && jumpTime > 0){
    birdContex.drawImage(base_image, -boxWidth,-boxWidth,1.75 * boxWidth,1.75 * boxWidth); 
    wingflap++;
    }else{
        birdContex.drawImage(flappy2, -boxWidth,-boxWidth,1.75 * boxWidth,1.75 * boxWidth); 
        wingflap++;
        if(wingflap > 60){
        wingflap = 0;
        }
    }
    birdContex.restore()
    
}


function collisonDetection(){
    if(bird.y > boxWidth * 23){
        gameOver();
    }
}



function mainScreen(){

    gameContex.textAlign = "end"; 
    // rectangle that will hold score, best, leader board, and start new game
    gameContex.fillStyle = "rgb(222,215,147)";
    gameContex.fillRect(3 * boxWidth,8 * boxWidth, 18 * boxWidth,8 * boxWidth);
    gameContex.strokeRect(3 * boxWidth,8 * boxWidth, 18 * boxWidth,8 * boxWidth);

    gameContex.fillStyle = "rgb(245,245,245)";

    // making the squares for the start and leaderboard
    gameContex.fillRect(5.5 * boxWidth,10.5 * boxWidth,3 * boxWidth,3 * boxWidth);
    gameContex.strokeRect(5.5* boxWidth ,10.5 * boxWidth,3 * boxWidth,3 * boxWidth);
    
    // making the start button
    gameContex.beginPath();
    let height = 45.4663 /2;
    let length = 52.5 /2;
    gameContex.moveTo(7 * boxWidth - length, 12 * boxWidth - height);
    gameContex.lineTo(7 * boxWidth + length, 12 * boxWidth);
    gameContex.lineTo(7 * boxWidth - length, 12 * boxWidth + height );
    gameContex.closePath();

    gameContex.lineWidth =3;
    gameContex.stroke();
    gameContex.fillStyle = "green";
    gameContex.fill();

    $("#startFlappyBird").css("top", 11 * boxWidth);
    $("#startFlappyBird").css("left", 6 * boxWidth);
    
}

function drawFlappyBird(){
    gameContex.textAlign = "center"; 

    // displaying game over
    gameContex.fillStyle = "rgb(255,161,74)";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold " + boxWidth*2.5 + "px Changa One";
    gameContex.lineWidth = 2;
    gameContex.fillText("FLAPPY BIRD", 12 * boxWidth, 6 * boxWidth);
    gameContex.strokeText("FLAPPY BIRD", 12 * boxWidth, 6 * boxWidth);
}

function gameOver(){
    clearInterval(flappyGame);
    flappyGame = null;
    clearInterval(pipes);
    $("#startFlappyBird").attr('disabled',false);
    //$("#leaderboardsFlappyBird").attr('disabled',false);



    gameContex.textAlign = "center"; 

    // displaying game over
    gameContex.fillStyle = "rgb(255,161,74)";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold " + boxWidth*2.5 + "px Changa One";
    gameContex.lineWidth = 2;
    gameContex.fillText("GAME OVER", 12 * boxWidth, 6 * boxWidth);
    gameContex.strokeText("GAME OVER", 12 * boxWidth, 6 * boxWidth);

    //diplay the main screen
    mainScreen();

    // displaying the score and best test
    gameContex.lineWidth = 1;
    gameContex.strokeStyle = "rgb(0,0,0)";
    gameContex.fillStyle = "rgb(255,122,91)";
    gameContex.font = "bold " + boxWidth*1 + "px Segoe UI";
    gameContex.fillText("SCORE", 20 * boxWidth, 10 * boxWidth);
    gameContex.fillText("BEST", 20 * boxWidth, 13 * boxWidth);
    
    //displaying the numerical value of score and best
    gameContex.fillStyle = "White";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold " + boxWidth*2 + "px Changa One";
    gameContex.fillText(flappyScore, 20 * boxWidth, 12 * boxWidth);
    gameContex.strokeText(flappyScore, 20 * boxWidth, 12 * boxWidth);
    gameContex.fillText(highscore, 20 * boxWidth, 15 * boxWidth);
    gameContex.strokeText(highscore, 20 * boxWidth, 15 * boxWidth);

    if(flappyScore > highscore){
        highscore = flappyScore;

        if(document.getElementById("flappybirdHighScore") != undefined){
            document.getElementById("flappybirdHighScore").value = highscore;
        }
    }
    document.addEventListener("keydown",resetGame);
}

let flappyGame = null;
let pipes;

function jump(event){
    jumpTime = boxWidth;
    gracePeriod = boxWidth;
    //event.preventDefault();
}

function onload(){
    drawCanvas();
    drawFlappyBird();
    mainScreen();
  
}

function resetGame(event){
    //if(!game){
        if(newgame){

        }else if(event.keyCode != 13){
            return;
        }
        gameContex.clearRect(0,0,24 * boxWidth,24 * boxWidth);
        pipeContex.clearRect(0,0,24 * boxWidth,24 * boxWidth);
        flappyScore = 0;
        topPipes = [];
        bottomPipes = [];
        bird.x = 4 * boxWidth;
        bird.y = 12 * boxWidth;
        jumpTime = 30;
        gracePeriod = 30;
        //document.removeEventListener("keydown",reset);
        document.addEventListener("keydown",jump);
        document.addEventListener("click",jump);
        pipes = setInterval(makePipe,timeBetweenPipe * boxWidth * 40);
        flappyGame = setInterval(drawCanvas, 1);
    //}
    newgame = false;
}

let newgame = false;

$('#startFlappyBird').click(function () {
    if (this.id == 'startFlappyBird') {
        if(flappyGame == null){
            $("#startFlappyBird").attr('disabled',true);
            //$("#leaderboardsFlappyBird").attr('disabled',true);
            //$('#leaderboardTable').hide()
            newgame = true;
            //document.removeEventListener("keydown",reset);
            resetGame();
        }
    }
});

//document.removeEventListener("keydown",reset);
window.addEventListener("load",onload);
