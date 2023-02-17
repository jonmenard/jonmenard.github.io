
        // creating the canvas 
    const cvs = document.getElementById("snake");
    const ctx = cvs.getContext("2d");
    ctx.canvas.height  = 24 * boxWidth;
    ctx.canvas.width  = 24 * boxWidth;
    
    const textDiv = document.getElementById("SnakesTitle");
    const scoreDiv = document.getElementById("SnakesScore");
    const resetButton = document.getElementById("resetSnake");
    
    textDiv.style.font = boxWidth*2.5 + "px Changa One";
    textDiv.style.left = 9*boxWidth + "px"
    scoreDiv.style.font = boxWidth*2.5 + "px Changa One";
    scoreDiv.style.left = 3*boxWidth + "px"
    resetButton.addEventListener("click",resetSnake);
    
    const snakeColor = "rgb(86,217,0)"
    
    

    let keyPressed = null;
    let count = 10;

    // creating the snake;
    let snake = [];
    snake[0] = {
        x: 12 * boxWidth, // spwan in the middle of canvas
        y: 12 * boxWidth,
        color: snakeColor
    };  
     
    //creating the food for the game, which the snake will try to get 
    let food = {
        x: 12 * boxWidth,
        y: 13 * boxWidth
    };

    //setting the score to zero
    let score;
    setScore(0)
    
    
    let d = "stop";
    //switch the direction the snake is moving in

    function setScore(newScore){
        score = newScore
        scoreDiv.innerHTML = score
    }


    function direction(keyCode){
        switch (keyCode){
            case 83:
            case 40:  // change to move down
                if(d !="up"){
                    d = "down";
                }
				break;
				
			case 68:
            case 39: //change to move right
            if(d !="left"){
                d = "right";
            }
				break;
				
			case 87:
            case 38: //change to move up
            if(d !="down"){
                d = "up";
            }
				break;
			case 65:
            case 37: //change to move left
            if(d !="right"){
                d = "left";
            }
				break;
		}
	}  

    function endGame(game){
        clearInterval(game);
        game = false;
        cvs.style.touchAction = "auto"
    }

    //the function that draws everything to cavas 
    function draw(){

        
        if(snake[0].x % boxWidth == 0 && snake[0].y % boxWidth == 0){ // chnage Snake direction only when it at 0,0 of new box
            direction(keyPressed);
        }
        
        
        //Background
        ctx.fillStyle = "rgb(20,20,20)";
        ctx.fillRect(0,0,24 * boxWidth,24 * boxWidth);

        ctx.fillStyle = "white"
        ctx.fillRect(0,3 * boxWidth,24 * boxWidth - 2,2);


        //draw all the cells of the snake
        for(let i = snake.length-1; i >= 0; i--){
            if(i == 0){
                ctx.fillStyle = snakeColor; 
                ctx.strokeStyle = snakeColor;
                ctx.fillRect(snake[i].x,snake[i].y,boxWidth,boxWidth);
                ctx.fillStyle = "black";
                ctx.beginPath();

                if(d == "down"){
                
                    ctx.arc(snake[i].x + 1.5* boxWidth / 5, snake[i].y + 4 * boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                    ctx.arc(snake[i].x + 3.5*boxWidth / 5, snake[i].y +  4 *boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                  
                }else if(d == "right"){
                    ctx.arc(snake[i].x + 3.5* boxWidth / 5, snake[i].y + 3.5 * boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                    ctx.arc(snake[i].x + 3.5*boxWidth / 5, snake[i].y +  1.5 * boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                }else if(d == "left"){
                    ctx.arc(snake[i].x + 1.5* boxWidth / 5, snake[i].y + 1.5 * boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                    ctx.arc(snake[i].x + 1.5*boxWidth / 5, snake[i].y + 3.5 * boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
        
                }else{
                    ctx.arc(snake[i].x + 1.5* boxWidth / 5, snake[i].y + boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                    ctx.arc(snake[i].x + 3.5*boxWidth / 5, snake[i].y + boxWidth / 5, boxWidth / 8, 0, 2 * Math.PI);
                }
                ctx.fill();
                
                //ctx.strokeRect(snake[i].x,snake[i].y,boxWidth,boxWidth);
                if(collisionHead()){
                    endGame(game);  
                }    
            }else{
                ctx.fillStyle = "white";
                if(collisionBody(snake[i].x,snake[i].y)){
                    endGame(game);
                } 
                ctx.fillRect(snake[i].x,snake[i].y,boxWidth,boxWidth); 
            }  
        }

        //drawing the food
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(food.x + boxWidth / 2, food.y + boxWidth / 2, boxWidth / 2, 0, 2 * Math.PI);
        ctx.fill();

        if(d == "stop"){
            return;
        }


        //getting the current head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        //geting the current travel direction and moving in that direction;
        if(d == "up"){
            snakeY -= 2;
        }else if(d == "down"){
            snakeY += 2;
        }else if(d == "right"){
            snakeX += 2;
        }else if(d == "left"){
            snakeX -= 2;
        }

        //checking to see if the food and head of the snake are in the same spot
        if(Math.abs(food.x - snakeX) <= 3 && Math.abs(food.y - snakeY) <= 3){
            setScore(score + 1)
            count = 25;
            newFoodLocation();
        }else if(count <= 0){
           //remove the tail
            snake.pop();
            
        }
        count--; 
       
        // creating the new head of the snake
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        //adding the head to the front of the snake
        snake.unshift(newHead); 

    }


    function collisionBody(x,y){
        return (x == snake[0].x && y == snake[0].y)
    }
    function collisionHead(){
        //does the snake leave the border?
        return (snake[0].x > (23 * boxWidth) ||  snake[0].x < 0 || snake[0].y < (3* boxWidth) || snake[0].y > (23*boxWidth))
    }


    function newFoodLocation(){
        food = {
            x: Math.floor((Math.random() * 23 + 1)) * boxWidth,
            y: Math.floor((Math.random() * 19 + 1)+ 4) * boxWidth
        };

        for(let i = 0; i < snake.length; i++){
            if((food.x - snake[i].x) <= 2 && (food.y - snake[i].y) <= 2){
               newFoodLocation();
               return
            }
        }
    }

    function resetSnake(){
        snake = [];
        snake[0] = {
            x: 12 * boxWidth, 
            y: 12 * boxWidth
        };

        document.removeEventListener("keydown",setDirection);
        document.addEventListener("keydown",setDirection);
        setScore(0)
        if(!game){
            
        }else{
            endGame(game)
        }
        game =  setInterval(draw,4);
        cvs.style.touchAction = "none"
        d = "stop";

    }

    function setDirection(event){
        keyPressed = event.keyCode;
        if(keyPressed == 40 || keyPressed == 39 || keyPressed == 38 || keyPressed == 37 || keyPressed == 13 || keyPressed == 32){
           if(game){
                event.preventDefault();
           } 
        }
    }


    document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);


// suppor for mobile players

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {

    

    if ( ! xDown || ! yDown ) {
        return;
    }

    // if(game){
    //     evt.preventDefault();
    //     evt.stopPropagation();
    // } 

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

                                                                  
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
           keyPressed = 37
        } else {
            keyPressed = 39
        }                       
    } else {
        if ( yDiff > 0 ) {
            keyPressed = 38
        } else { 
            keyPressed = 40
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

     // call the draw function every 100ms;
     var game;
     draw();
     
     
    

   

    

	 
    
    
    