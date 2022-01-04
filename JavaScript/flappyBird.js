

const backgroundCanvas = document.getElementById("background");
const backgroundContex = backgroundCanvas.getContext("2d");

let background = new Image();
background.src = 'Images/flappyBackground.png';

let sun = {
    img: new Image(),
    x: 600,
    y: 100
};
sun.img.src = 'Images/sun.png';


let boat = {
    img:  new Image(),
    x: 375,
    y: 500
};
boat.img.src = 'Images/boat.png';

const canvas = document.getElementById("pipes");
const pipeContex = canvas.getContext("2d");
pipeContex.save();
pipeContex.fillStyle = "red";


const birdCanvas = document.getElementById("bird");
const birdContex = birdCanvas.getContext("2d");

const gameCanvas = document.getElementById("gameOver");
const gameContex = gameCanvas.getContext("2d");



let base_image = new Image();
base_image.src = 'Images/flappy.png';

let flappy2 = new Image();
flappy2.src = 'Images/flappy1.png';
//base_image.id = "birdImg";


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
    x: 100,
    y: 300,
};

if(document.getElementById("usernameButton") != undefined){
    highscore = document.getElementById("flappybirdHighScore").value;
}

function makePipe(){

    let number =  Math.floor((Math.random() * 400));
    let topPipe = {
        x: 600,
        y: number
    };

    topPipes[topPipes.length] = topPipe;
    let bottomPipe = {
        x: 600,
        y: number + 150
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
        
        pipeContex.clearRect(bottomPipes[i].x + 40,0,4,600);
        
        pipeContex.drawImage(topPipeImg, topPipes[i].x,(topPipes[i].y - 300),40,300);
        pipeContex.drawImage(bottomPipeImg, bottomPipes[i].x,bottomPipes[i].y,40,300);

        pipeContex.drawImage(bottomPipeImg, topPipes[i].x,-100,40,(topPipes[i].y-300)+100);
        pipeContex.drawImage(topPipeImg, bottomPipes[i].x,bottomPipes[i].y+50,40,600);
        // move the pipes forward 2px
        bottomPipes[i].x = bottomPipes[i].x - 2;
        topPipes[i].x = topPipes[i].x - 2;

        if((topPipes[i].x + 40) <= 0){
            topPipes.pop;
            bottomPipes.pop;
        }

        // if pipe is in the same area the bird could be, check for collison
        if((topPipes[i].x > 60 && topPipes[i].x < 135)){
            if((bird.y) < topPipes[i].y){
                gameOver();
            }
            if((bird.y+40) > bottomPipes[i].y){
                
                gameOver();
            }else if(topPipes[i].x == bird.x){
                flappyScore++;
            }

        }
    }
}


function drawBackground(){
  
    backgroundContex.drawImage(background,0,0,600,600);
    backgroundContex.drawImage(sun.img, sun.x,sun.y, 50,50);
    backgroundContex.drawImage(boat.img, boat.x,boat.y, 50,50);
   
    sun.x -= 1;
    boat.x -= 1;

    if(sun.x <=-50){
        sun.x = 600;
    }

    if(boat.x <= -50){
        boat.x = 600;
    }

}


function drawBird(){

    birdContex.save();
    birdContex.clearRect(0,0,600,600);


    birdContex.fillStyle = "rgb(255,161,74)";
    birdContex.strokeStyle = "rgb(41,52,46)";
    birdContex.font = "bold 65px Changa One";
    birdContex.lineWidth = 2;
    birdContex.fillText(flappyScore, 20, 60);
    birdContex.strokeText(flappyScore, 20, 60)

    if(jumpTime > 0){
        bird.y -= 3;
        jumpTime -= 1;
        falling = 0;   
        birdContex.translate(bird.x + 17, bird.y + 17);
        birdContex.rotate(-15 * Math.PI / 180);
    }else if(gracePeriod > 0){
        gracePeriod--;
        birdContex.translate(bird.x + 17, bird.y + 17);
        birdContex.rotate(-15 * Math.PI / 180);
    }else{
        if(falling < 25){
            bird.y += 1;
            falling++;
            birdContex.translate(bird.x + 17, bird.y + 17);
            birdContex.rotate(15 * Math.PI / 180);
        }else if (falling < 50){
            bird.y += 2;
            falling++;
            birdContex.translate(bird.x + 17, bird.y + 17);
            birdContex.rotate(30 * Math.PI / 180); 
        }else if(falling < 100){
            bird.y += 3;
            birdContex.translate(bird.x + 17, bird.y + 17);
            birdContex.rotate(60 * Math.PI / 180); 
        }
    }

    if(wingflap < 30 && jumpTime > 0){
    birdContex.drawImage(base_image, -17,-17,40,40); 
    wingflap++;
    }else{
        birdContex.drawImage(flappy2, -17,-17,40,40); 
        wingflap++;
        if(wingflap > 60){
        wingflap = 0;
        }
    }
    birdContex.restore()
    
}


function collisonDetection(){
    if(bird.y > 565){
        gameOver();
    }
}



function mainScreen(){

    gameContex.textAlign = "end"; 
    // rectangle that will hold score, best, leader board, and start new game
    gameContex.fillStyle = "rgb(222,215,147)";
    gameContex.fillRect(75,200,450,200);
    gameContex.strokeRect(75,200,450,200);

    gameContex.fillStyle = "rgb(245,245,245)";

    // making the squares for the start and leaderboard
    gameContex.fillRect(137.5,262.5,75,75);
    gameContex.strokeRect(137.5,262.5,75,75);
    

    gameContex.fillRect(275,262.5,75,75);
    gameContex.strokeRect(275,262.5,75,75);


    // making the start button
    gameContex.beginPath();
    let height = 45.4663 /2;
    let length = 52.5 /2;
    gameContex.moveTo(175 - length, 300 - height);
    gameContex.lineTo(175 + length, 300);
    gameContex.lineTo(175 - length,300 + height );
    gameContex.closePath();

    gameContex.lineWidth =3;
    gameContex.stroke();
    gameContex.fillStyle = "green";
    gameContex.fill();


    //making leaderboard
    gameContex.beginPath();
    gameContex.moveTo(287.75, 312.75);
    gameContex.lineTo(287.75, 295.91);
    gameContex.lineTo(304.25, 295.91);
    gameContex.lineTo(304.25, 284.7956);
    gameContex.lineTo(320.75, 284.7956);
    gameContex.lineTo(320.75, 290.3528);
    gameContex.lineTo(337.25, 290.3528);
    gameContex.lineTo(337.25, 312.75);
    gameContex.closePath();

    gameContex.stroke();
    gameContex.fillStyle = "rgb(255,161,74)";
    gameContex.fill();

    gameContex.textAlign = "center"; 
    gameContex.fillStyle = "black";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.lineWidth =1;
    gameContex.font = "bold 14px Changa One";
    gameContex.fillText("3", 296, 310);
    gameContex.fillText("1", 312.5, 299);
    gameContex.fillText("2", 329, 305);

}

function drawFlappyBird(){
    gameContex.textAlign = "center"; 

    // displaying game over
    gameContex.fillStyle = "rgb(255,161,74)";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold 65px Changa One";
    gameContex.lineWidth = 2;
    gameContex.fillText("FLAPPY BIRD", 300, 140);
    gameContex.strokeText("FLAPPY BIRD", 300, 140);
}

function gameOver(){
    clearInterval(flappyGame);
    flappyGame = null;
    clearInterval(pipes);
    $("#startFlappyBird").prop('disabled',false);
    $("#leaderboardsFlappyBird").prop('disabled',false);



    gameContex.textAlign = "center"; 

    // displaying game over
    gameContex.fillStyle = "rgb(255,161,74)";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold 65px Changa One";
    gameContex.lineWidth = 2;
    gameContex.fillText("GAME OVER", 300, 140);
    gameContex.strokeText("GAME OVER", 300, 140);

   //diplay the main screen
   mainScreen();

    // displaying the score and best test
    gameContex.lineWidth = 1;
    gameContex.strokeStyle = "rgb(0,0,0)";
    gameContex.fillStyle = "rgb(255,122,91)";
    gameContex.font = "bold 18px Segoe UI";
    gameContex.fillText("SCORE", 490, 240);
    gameContex.fillText("BEST", 490, 320);
    //gameContex.strokeText("SCORE", 490, 240);
   // gameContex.strokeText("BEST", 490, 320);


    //displaying the numerical value of score and best
    
    gameContex.fillStyle = "White";
    gameContex.strokeStyle = "rgb(41,52,46)";
    gameContex.font = "bold 50px Changa One";
    gameContex.fillText(flappyScore, 490, 290);
    gameContex.strokeText(flappyScore, 490, 290);
    gameContex.fillText(highscore, 490, 370);
    gameContex.strokeText(highscore, 490, 370);

    if(flappyScore > highscore){
        highscore = flappyScore;

        $.ajax({
           type: 'POST',
           url: "updateFlappyBird.php",
           data: { album: flappyScore }
          
        });


        if(document.getElementById("flappybirdHighScore") != undefined){
            document.getElementById("flappybirdHighScore").value = highscore;
        }
    }
    document.addEventListener("keydown",reset);
}


let flappyGame = null;
let pipes;



function jump(event){
    jumpTime = 25;
    gracePeriod = 30;
    //event.preventDefault();
}

function onload(){
    drawCanvas();
    drawFlappyBird();
    mainScreen();
  
}

function reset(event){
    if(!game){
        if(newgame){

        }else if(event.keyCode != 13){
            return;
        }
        gameContex.clearRect(0,0,600,600);
        pipeContex.clearRect(0,0,600,600);
        flappyScore = 0;
        topPipes = [];
        bottomPipes = [];
        bird.x = 100;
        bird.y = 300;
        jumpTime = 30;
        gracePeriod = 30;
        document.removeEventListener("keydown",reset);
        document.addEventListener("keydown",jump);
        pipes = setInterval(makePipe,timeBetweenPipe * 1000);
        flappyGame = setInterval(drawCanvas,1);
    }
    newgame = false;
    $('#leaderboardTable').hide()
}


let newgame = false;





$('#startFlappyBird, #leaderboardsFlappyBird').click(function () {
    if (this.id == 'startFlappyBird') {
        if(flappyGame == null){
            $("#startFlappyBird").prop('disabled',true);
            $("#leaderboardsFlappyBird").prop('disabled',true);
            $('#leaderboardTable').hide()
            newgame = true;
            document.removeEventListener("keydown",start);
            reset();
        }
    }else if (this.id == 'leaderboardsFlappyBird') {
        $("#leaderboardsFlappyBird").prop('disabled',true);
        gameContex.fillStyle = "rgb(222,215,147)";
        gameContex.fillRect(270,260,90,90);

        $.ajax({
            type: 'POST',
            url: "flappyBirdLeaderBoard.php",
            data: { album: flappyScore },
            success: function(msg){
                $('#leaderboardTable').html(msg);
                $('#leaderboardTable').show()
            }
        });
    }
});

 


document.removeEventListener("keydown",reset);
window.addEventListener("load",onload);
