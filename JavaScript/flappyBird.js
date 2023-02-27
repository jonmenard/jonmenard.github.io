

const backgroundCanvas = document.getElementById("background");
const backgroundContex = backgroundCanvas.getContext("2d");

let moveRatio = Math.ceil(boxWidthRatio / boxWidth)

backgroundContex.canvas.height  = 24 * boxWidthRatio;
backgroundContex.canvas.width  = 24 * boxWidthRatio;

let clouds = {
    img: new Image(),
    x: -18 * boxWidthRatio,
    y: 15 * boxWidthRatio
};

clouds.img.src = 'Images/clouds.png';


let background = new Image();
background.src = 'Images/backgroundblank.png';

let sun = {
    img: new Image(),
    x: 24 * boxWidthRatio,
    y: 4 * boxWidthRatio
};
sun.img.src = 'Images/sun.png';

let boat = {
    img:  new Image(),
    x: 17 * boxWidthRatio,
    y: 20 * boxWidthRatio
};
boat.img.src = 'Images/boat.png';

const canvas = document.getElementById("pipes");
const pipeContex = canvas.getContext("2d");

pipeContex.save();
pipeContex.fillStyle = "red";
pipeContex.canvas.height  = 24 * boxWidthRatio;
pipeContex.canvas.width  = 24 * boxWidthRatio;

const birdCanvas = document.getElementById("bird");
const birdContex = birdCanvas.getContext("2d");

birdContex.canvas.height  = 24 * boxWidthRatio;
birdContex.canvas.width  = 24 * boxWidthRatio;

const gameCanvas = document.getElementById("gameOver");
const gameContex = gameCanvas.getContext("2d");

gameContex.canvas.height  = 24 * boxWidthRatio;
gameContex.canvas.width  = 24 * boxWidthRatio;

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
    x: 4 * boxWidthRatio,
    y: 12 * boxWidthRatio,
};

function makePipe(){

    let number =  Math.floor((Math.random() * (19 * boxWidthRatio)));
    let topPipe = {
        x: 24 * boxWidthRatio,
        y: number
    };

    topPipes[topPipes.length] = topPipe;
    let bottomPipe = {
        x: 24 * boxWidthRatio,
        y: number + (12 * boxWidthRatio)
    };

    bottomPipes[bottomPipes.length] = bottomPipe;
}


function drawCanvas(){

//if(time % 1 == 0){
    drawPipes();  
   // }

    if(time <= 0){
        drawBackground()
        time = 8;
    }

    time--;
    drawBird();
    collisonDetection();
}

function drawPipes(){

    for(i = 0; i < topPipes.length; i++){

        bottomPipes[i].x = bottomPipes[i].x - 2 * moveRatio  //* pixleRatio;
        topPipes[i].x = topPipes[i].x - 2  * moveRatio//* pixleRatio;
        
        pipeContex.clearRect(bottomPipes[i].x + boxWidthRatio * 2,0,4,boxWidthRatio * 24);
        pipeContex.drawImage(topPipeImg, topPipes[i].x,(topPipes[i].y - 12 * boxWidthRatio),boxWidthRatio * 2,12 * boxWidthRatio);
        pipeContex.drawImage(bottomPipeImg, bottomPipes[i].x,bottomPipes[i].y,boxWidthRatio * 2,12 * boxWidthRatio);
        pipeContex.drawImage(bottomPipeImg, topPipes[i].x,-4 * boxWidthRatio,boxWidthRatio * 2,(topPipes[i].y-boxWidthRatio * 12)+4 * boxWidthRatio);
        pipeContex.drawImage(topPipeImg, bottomPipes[i].x,bottomPipes[i].y+2 * boxWidthRatio,boxWidthRatio * 2,24 * boxWidthRatio);
        // move the pipes forward 2px
        

        if((topPipes[i].x + boxWidthRatio*2) <= 0){
            topPipes.pop;
            bottomPipes.pop;
        }

        // if pipe is in the same area the bird could be, check for collison
        if((topPipes[i].x > boxWidthRatio * 2 && topPipes[i].x < boxWidthRatio * 5)){
            if((bird.y) < topPipes[i].y){
                gameOver();
            }
            if((bird.y+boxWidthRatio*2) > bottomPipes[i].y){
                
                gameOver();
            }else if(topPipes[i].x == bird.x){
                flappyScore++;
            }

        }
    }
}


function drawBackground(){
  
    backgroundContex.drawImage(background,0,0,24 * boxWidthRatio,24 * boxWidthRatio);
    backgroundContex.drawImage(sun.img, sun.x,sun.y, 2 * boxWidthRatio,2 * boxWidthRatio);
    backgroundContex.drawImage(boat.img, boat.x,boat.y, 2 * boxWidthRatio,2 * boxWidthRatio);
    backgroundContex.drawImage(clouds.img, clouds.x,clouds.y, 48 * boxWidthRatio,5 * boxWidthRatio);
   
    sun.x -= 0.5 * moveRatio/2;
    boat.x -= 1 * moveRatio/2;
    clouds.x -= 1.5 * moveRatio/2;

    if(sun.x <=-2 * boxWidthRatio){
        sun.x = 24 * boxWidthRatio;
    }

    if(clouds.x <= -37 * boxWidthRatio){
        clouds.x = 24 * boxWidthRatio;
    }

    if(boat.x <= -2 * boxWidthRatio){
        boat.x = 24 * boxWidthRatio;
    }

}


function drawBird(){

    birdContex.save();
    birdContex.clearRect(0,0,24 * boxWidthRatio,24 * boxWidthRatio);
    birdContex.fillStyle = "rgb(255,161,74)";
    birdContex.strokeStyle = "rgb(41,52,46)";
    birdContex.font = "bold " + boxWidthRatio*2.5 + "px Changa One";
    birdContex.lineWidth = 2;
    birdContex.fillText(flappyScore, boxWidthRatio, boxWidthRatio*2);
    birdContex.strokeText(flappyScore, boxWidthRatio, boxWidthRatio*2)

    if(jumpTime > 0){
        bird.y -= 3 * moveRatio;
        jumpTime -= 1;
        falling = 0;   
        birdContex.translate(bird.x + boxWidthRatio, bird.y + boxWidthRatio);
        birdContex.rotate(-15 * Math.PI / 180);
    }else if(gracePeriod > 0){
        gracePeriod--;
        birdContex.translate(bird.x + boxWidthRatio, bird.y + boxWidthRatio);
        birdContex.rotate(-15 * Math.PI / 180);
    }else{
        if(falling < 25){
            bird.y += 1 * moveRatio;
            falling++;
            birdContex.translate(bird.x + boxWidthRatio, bird.y + boxWidthRatio);
            birdContex.rotate(15 * Math.PI / 180);
        }else if (falling < 50){
            bird.y += 2 * moveRatio;
            falling++;
            birdContex.translate(bird.x + boxWidthRatio, bird.y + boxWidthRatio);
            birdContex.rotate(30 * Math.PI / 180); 
        }else if(falling < 100){
            bird.y += 3 * moveRatio;
            birdContex.translate(bird.x + boxWidthRatio, bird.y + boxWidthRatio);
            birdContex.rotate(60 * Math.PI / 180); 
        }
    }

    if(wingflap < 30 && jumpTime > 0){
    birdContex.drawImage(base_image, -boxWidthRatio,-boxWidthRatio,1.75 * boxWidthRatio,1.75 * boxWidthRatio); 
    wingflap++;
    }else{
        birdContex.drawImage(flappy2, -boxWidthRatio,-boxWidthRatio,1.75 * boxWidthRatio,1.75 * boxWidthRatio); 
        wingflap++;
        if(wingflap > 60){
        wingflap = 0;
        }
    }
    birdContex.restore()
    
}


function collisonDetection(){
    if(bird.y > boxWidthRatio * 23){
        gameOver();
    }
}



function mainScreen(){

    gameContex.textAlign = "end"; 
    // rectangle that will hold score, best, leader board, and start new game
    gameContex.fillStyle = "rgb(222,215,147)";
    gameContex.fillRect(3 * boxWidthRatio,8 * boxWidthRatio, 18 * boxWidthRatio,8 * boxWidthRatio);
    gameContex.strokeRect(3 * boxWidthRatio,8 * boxWidthRatio, 18 * boxWidthRatio,8 * boxWidthRatio);

    gameContex.fillStyle = "rgb(245,245,245)";

    // making the squares for the start and leaderboard
    gameContex.fillRect(5.5 * boxWidthRatio,10.5 * boxWidthRatio,3 * boxWidthRatio,3 * boxWidthRatio);
    gameContex.strokeRect(5.5* boxWidthRatio ,10.5 * boxWidthRatio,3 * boxWidthRatio,3 * boxWidthRatio);
    
    // making the start button
    gameContex.beginPath();
    let height = 45.4663 /2;
    let length = 52.5 /2;
    gameContex.moveTo(7 * boxWidthRatio - length, 12 * boxWidthRatio - height);
    gameContex.lineTo(7 * boxWidthRatio + length, 12 * boxWidthRatio);
    gameContex.lineTo(7 * boxWidthRatio - length, 12 * boxWidthRatio + height );
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
    gameContex.font = "bold " + boxWidthRatio*2.5 + "px Changa One";
    gameContex.lineWidth = 2;
    gameContex.fillText("FLAPPY BIRD", 12 * boxWidthRatio, 6 * boxWidthRatio);
    gameContex.strokeText("FLAPPY BIRD", 12 * boxWidthRatio, 6 * boxWidthRatio);
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
    gameContex.font = "bold " + boxWidthRatio*2.5 + "px Changa One";
    gameContex.lineWidth = 2;
    gameContex.fillText("GAME OVER", 12 * boxWidthRatio, 6 * boxWidthRatio);
    gameContex.strokeText("GAME OVER", 12 * boxWidthRatio, 6 * boxWidthRatio);

    //diplay the main screen
    mainScreen();

    // displaying the score and best test
    gameContex.lineWidth = 1;
    gameContex.strokeStyle = "rgb(0,0,0)";
    gameContex.fillStyle = "rgb(255,122,91)";
    gameContex.font = "bold " + boxWidthRatio*1 + "px Segoe UI";
    gameContex.fillText("SCORE", 20 * boxWidthRatio, 10 * boxWidthRatio);
    gameContex.fillText("BEST", 20 * boxWidthRatio, 13 * boxWidthRatio);
    
    //displaying the numerical value of score and best
    gameContex.fillStyle = "White";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold " + boxWidthRatio*2 + "px Changa One";
    gameContex.fillText(flappyScore, 20 * boxWidthRatio, 12 * boxWidthRatio);
    gameContex.strokeText(flappyScore, 20 * boxWidthRatio, 12 * boxWidthRatio);
    gameContex.fillText(highscore, 20 * boxWidthRatio, 15 * boxWidthRatio);
    gameContex.strokeText(highscore, 20 * boxWidthRatio, 15 * boxWidthRatio);

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
        gameContex.clearRect(0,0,24 * boxWidthRatio,24 * boxWidthRatio);
        pipeContex.clearRect(0,0,24 * boxWidthRatio,24 * boxWidthRatio);
        flappyScore = 0;
        topPipes = [];
        bottomPipes = [];
        bird.x = 4 * boxWidthRatio;
        bird.y = 12 * boxWidthRatio;
        jumpTime = 30;
        gracePeriod = 30;
        //document.removeEventListener("keydown",reset);
        document.addEventListener("keydown",jump);
        document.addEventListener("click",jump);
        pipes = setInterval(makePipe,timeBetweenPipe * boxWidth * 20);
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
