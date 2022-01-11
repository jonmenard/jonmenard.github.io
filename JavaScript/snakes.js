
        // creating the canvas 
    const cvs = document.getElementById("snake");
    //cvs.width = cvs.getBoundingClientRect().width;
    //cvs.height = cvs.getBoundingClientRect().height;

    
    const ctx = cvs.getContext("2d");

    let resetButton = document.getElementById("resetSnake");
    resetButton.addEventListener("click",resetSnake);
    
    //creating the units for the game
    const box = 25;
    
    // importing the background and the food img      
    
    let keyPressed = null;
    let count = 10;

    // creating the snake;
    let snake = [];
    snake[0] = {
        x: 12 * box, 
        y: 12 * box,
        color: "rgb(86,217,0)"
    };  
     

    //creating the food for the game, which the snake will try to get 
    let food = {
        x: 12 * box,
        y: 13 * box
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

    //the function that draws everything to cavas 
    function draw(){

        
        if(snake[0].x % box == 0 && snake[0].y % box == 0){
            direction(keyPressed);
        }
                
        //draw the ground
        //ctx.drawImage(groundImg,0,0);
        ctx.fillStyle = "rgb(20,20,20)";
        ctx.fillRect(0,0,600,600);

        ctx.fillStyle = "white"
        ctx.fillRect(0,73,600,2);

        //drawing the name 
        ctx.fillStyle = "rgb(86,217,0)";
        ctx.font = "60px Changa One";
        ctx.fillText("Snakes", 9*box, 2.25*box);

        //draw all the cells of the snake
        for(let i = snake.length-1; i >= 0; i--){
            if(i == 0){
                ctx.fillStyle = "rgb(86,217,0)"; 
                ctx.strokeStyle="rgb(20,20,20)";
                ctx.strokeRect(snake[i].x,snake[i].y,box,box);
                if(collisionHead()){
                    clearInterval(game);
                    game = false;
                }    
               
            }else{
                ctx.fillStyle = "white";
                if(collisionBody(snake[i].x,snake[i].y)){
                    clearInterval(game);
                    game = false;
                } 
            }

            
            
            if((i +1)% box == 0){
                ctx.fillStyle="rgb(20,20,20)";
                
            }
            ctx.fillRect(snake[i].x,snake[i].y,box,box); 
            
            
        }

        
           
       
        //drawing the food
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(food.x + 12.5, food.y + 12.5, 12, 0, 2 * Math.PI);
        ctx.fill();

       if(d == stop){
        return;
        }


        //getting the current head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        //geting the current travel direction and moving in that direction;
        if(d == "up"){
            snakeY -= box / 25;

        }else if(d == "down"){
        
            snakeY += box / 25;
          
        }else if(d == "right"){
            snakeX += box / 25;
        }else if(d == "left"){
            snakeX -= box / 25;

        }

        //checking to see if the food and head of the snake are in the same spot
        if(snakeX == food.x && snakeY == food.y ){
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
        ctx.font = "60px Changa One";
        ctx.fillText(score, 3*box, 2.25*box);

    }

   

    function collisionBody(x,y){

        // does the snake hit its self?
        if(x == snake[0].x && y == snake[0].y){
            return true;
        }
    }
    function collisionHead(){
        //does the snake leave the border?
        if(snake[0].x > (23 * box) ||  snake[0].x < 0 || snake[0].y < (3* box) || snake[0].y > (23*box) ){
          return true; 
        }
        return false;
    }


    function newFoodLocation(){
        food = {
            x: Math.floor((Math.random() * 23 + 1)) * box,
            y: Math.floor((Math.random() * 19 + 1)+ 4) * box
        };

        for(let i = 0; i < snake.length; i++){
            if(food.x == snake[i].x && food.y == snake[i].y){
               newFoodLocation();
            }
        }


    }

    function resetSnake(){
        snake = [];
        snake[0] = {
            x: 12 * box, 
            y: 12 * box
        };

        document.removeEventListener("keydown",setDirection);
        document.addEventListener("keydown",setDirection);

        score = 0;
        if(!game){
            
        }else{
            clearInterval(game);
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
     document.addEventListener("keydown",setDirection);
     
     
    

   

    

	 
    
    
    