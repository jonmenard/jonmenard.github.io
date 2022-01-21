
        // creating the canvas 
    const cvs = document.getElementById("snake");
    //cvs.width = cvs.getBoundingClientRect().width;
    //cvs.height = cvs.getBoundingClientRect().height;

    


    const ctx = cvs.getContext("2d");

    ctx.canvas.height  = 24 * boxWidth;
    ctx.canvas.width  = 24 * boxWidth;

    let resetButton = document.getElementById("resetSnake");
    resetButton.addEventListener("click",resetSnake);
    
    //creating the units for the game

    
    // importing the background and the food img      
    
    let keyPressed = null;
    let count = 10;

    // creating the snake;
    let snake = [];
    snake[0] = {
        x: 12 * boxWidth, 
        y: 12 * boxWidth,
        color: "rgb(86,217,0)"
    };  
     

    //creating the food for the game, which the snake will try to get 
    let food = {
        x: 12 * boxWidth,
        y: 13 * boxWidth
    };

    //setting the score to zero
    let score = 0;
    
    let d = stop;
    //switch the direction the snake is moving in
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
        
        //document.removeEventListener("keydown",setDirection);
    }

    //the function that draws everything to cavas 
    function draw(){

        
        if(snake[0].x % boxWidth == 0 && snake[0].y % boxWidth == 0){
            direction(keyPressed);
        }
                
        //draw the ground
        //ctx.drawImage(groundImg,0,0);
        ctx.fillStyle = "rgb(20,20,20)";

        

        ctx.fillRect(0,0,24 * boxWidth,24 * boxWidth);

        ctx.fillStyle = "white"
        ctx.fillRect(0,3 * boxWidth,24 * boxWidth - 2,2);

        //drawing the name 
        ctx.fillStyle = "rgb(86,217,0)";
        ctx.font = boxWidth*2.5 + "px Changa One";
        ctx.fillText("Snakes", 9*boxWidth, 2.25*boxWidth);

        //draw all the cells of the snake
        for(let i = snake.length-1; i >= 0; i--){
            if(i == 0){
                ctx.fillStyle = "rgb(86,217,0)"; 
                ctx.strokeStyle="rgb(20,20,20)";
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

        if(d == stop){
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
            score++;
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

        //drawing the score of the game
        ctx.fillStyle = "rgb(86,217,0)";
        ctx.font = boxWidth*2.5 + "px Changa One";
        ctx.fillText(score, 3*boxWidth, 2.25*boxWidth);

    }

   

    function collisionBody(x,y){

        // does the snake hit its self?
        if(x == snake[0].x && y == snake[0].y){
            return true;
        }
    }
    function collisionHead(){
        //does the snake leave the border?
        if(snake[0].x > (23 * boxWidth) ||  snake[0].x < 0 || snake[0].y < (3* boxWidth) || snake[0].y > (23*boxWidth) ){
          return true; 
        }
        return false;
    }


    function newFoodLocation(){
        food = {
            x: Math.floor((Math.random() * 23 + 1)) * boxWidth,
            y: Math.floor((Math.random() * 19 + 1)+ 4) * boxWidth
        };

        for(let i = 0; i < snake.length; i++){
            if((food.x - snake[i].x) <= 2 && (food.y - snake[i].y) <= 2){
               newFoodLocation();
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
        score = 0;
        if(!game){
            
        }else{
            endGame(game)
        }
        game =  setInterval(draw,4);
        d = stop;

    }

    function setDirection(event){
        keyPressed = event.keyCode;
        if(keyPressed == 40 || keyPressed == 39 || keyPressed == 38 || keyPressed == 37 || keyPressed == 13 || keyPressed == 32){
           if(game){
                event.preventDefault();
           } 
        }
    }

    //detect when the user inputs a new direction
    

//<IMG  src = 'JumpIn.gif'
   // borderStyle = "outset" ALIGN=right HSPACE=”50” VSPACE=”50”/>

     // call the draw function every 100ms;
     var game;
     draw();
     //document.addEventListener("keydown",setDirection);
     
     
    

   

    

	 
    
    
    