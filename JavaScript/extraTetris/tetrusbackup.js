
        // creating the canvas 
        const cvs = document.getElementById("tetrus");
        const ctx = cvs.getContext("2d");
    
        let resetButton = document.getElementById("tetrusStart");
       // resetButton.addEventListener("click",startGame);
        
       //astetics for the game
        const boxWidth = 30;
        const boxHeight = boxWidth;
        const lineHeight = 1;

        // the board holds information about each tile
        let gameBoard = [];
        let objects = [];
        let allowMovment;

        //current box is the current object that is falling down
        let currentObject = undefined;
        let nextObject = undefined;
        let holdObject = undefined;
        let aiActive = false;

        for(let i = 0; i < 200; i++){
            gameBoard[i] = {
                box: undefined
            }
        }

        // listen for input about keys being pressed
        document.addEventListener("keydown",keyPress);


        function keyPress(event){
            let keyPressed = event.keyCode;
            if(keyPressed == 40 || keyPressed == 39 || keyPressed == 38 || keyPressed == 37 || keyPressed == 13 || keyPressed == 32){
                event.preventDefault();
            }
            moveTile(keyPressed)
        }


        // move the boxes left, right, or down
        function moveTile(event ){

            let keyPressed = event
            let count = 0;
            
            if(!allowMovment){
                return
            }
            switch (keyPressed){

                
                case 1:
                case 65:
                case 37:  //change to move left
                
                // check that all the boxes in the current object can move left
                for(let i = 0; i < currentObject.length; i++){

                    let row = currentObject[i].row;
                    let column = currentObject[i].column;
                   
                    if(column> 0){
                        if(gameBoard[((row) * 10 + column - 1 )].box == undefined || currentObject.includes(gameBoard[((row) * 10 + column - 1 )].box)){
                    
                            count++;
                        
                        }
                    
                    }
                }
                // if they all can then move them
                if(count == currentObject.length){
                    for(let i = 0; i < currentObject.length; i++){

                        let row = currentObject[i].row;
                        let column = currentObject[i].column;
                        gameBoard[((row) * 10 + column  - 1)].box = currentObject[i];
                        gameBoard[row * 10 + column].box = undefined
                        currentObject[i].column -= 1
                    }
                }
                    break;

                case 2:
                case 68:
                case 39: //change to move right

                 count = 0;
                // check that all the boxes in the current object can move right
                for(let i = 0; i < currentObject.length; i++){
                    let row = currentObject[i].row;
                    let column = currentObject[i].column;

                    if(column < 9){
                        if(gameBoard[((row) * 10 + column + 1 )].box == undefined || currentObject.includes(gameBoard[((row) * 10 + column + 1 )].box )){
                            count++;
                        }
                        
                    }
                }

                if(count == currentObject.length){
                    for(let i = currentObject.length-1; i >= 0 ; i--){

                        let row = currentObject[i].row;
                        let column = currentObject[i].column;
                        gameBoard[((row) * 10 + column  + 1)].box = currentObject[i];
                        gameBoard[row * 10 + column].box = undefined
                        currentObject[i].column += 1
                    }
                }

                    break;
                case 4:
                case 83:
                case 40:  // change to move down
                moveDown()
                break;    
                case 5:
                case 65:
                case 32:
                   // swapHold();
                   ai()
                break;
                case 3:
                case 87:
                case 38:
                    rotate()
                break;
                case 6:
                case 13:
                    let r = predictLanding();
                    for(let i = currentObject.length-1; i >= 0 ; i--){
                        gameBoard[(currentObject[i].row * 10) + currentObject[i].column].box = undefined;
                        currentObject[i].row += r;
                        gameBoard[(currentObject[i].row * 10) + currentObject[i].column].box = currentObject[i];
                    }
            }

            draw()
        
        }

       


        function predictLanding(){

            let rowsDown = [];
            
                
                for(let j = 0; j < currentObject.length; j++){
                    let count = 0;
                    let spot = currentObject[j].column;
                    for(let i = currentObject[j].row + 1; i < (20); i++){
                        if(gameBoard[spot + (i * 10)].box == undefined || currentObject.includes(gameBoard[spot + ( i * 10)].box)){
                            count++;
                        }else{
                           // count--
                            break;
                        }
                    }
                    
                    rowsDown[j] = count;   
                }
            return Math.min.apply(Math,rowsDown);
        }

        //the function that draws the board and boxes 
        function draw(){
    
            
            
            
            
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,800,800);

            ctx.fillStyle = "grey";
            for(let verticalLineNumber = 0; verticalLineNumber <= 20; verticalLineNumber++){


                ctx.fillRect(266, (90 + boxHeight * verticalLineNumber) + (lineHeight * verticalLineNumber), 310, lineHeight);
            }

            for(let horizontalLineNumber = 0; horizontalLineNumber <= 10; horizontalLineNumber++){
                ctx.fillRect(266 + (boxHeight * horizontalLineNumber) + (lineHeight * horizontalLineNumber),90,lineHeight,620)
            }
    
            ctx.lineWidth = 3;
            ctx.strokeStyle="rgba(0,0,0,1)";
            ctx.strokeRect(265,89,313,623);

            //drawing boxes
            drawBox();
            drawNext();
            drawHold();
            
    
            
        }

        // draw all the boxes
        function drawBox(){

           // drawing coloured boxed
            for(let i = 199; i >= 0; i--){

                if(gameBoard[i].box != undefined){
                    let box = gameBoard[i].box
                    let column = box.column;
                    let row = box.row;
                    ctx.fillStyle = box.color;
                    ctx.fillRect(266 + (column) * (boxWidth + lineHeight) + lineHeight, 90 + (row) * (boxHeight + lineHeight )+ lineHeight,boxHeight,boxWidth)

                    ctx.fillStyle = "black"
                    ctx.fillRect(265.75 + (column) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row) * (boxHeight + lineHeight )+ lineHeight,boxHeight + 2.5 ,2.5)
                    ctx.fillRect(265.75 + (column) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row) * (boxHeight + lineHeight )+ lineHeight,2.5,boxWidth + 2,5)
                    ctx.fillRect(265.75 + (column) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row + 1) * (boxHeight + lineHeight )+ lineHeight,boxHeight + 2.5,2.5)
                    ctx.fillRect(265.75 + (column + 1) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row) * (boxHeight + lineHeight )+ lineHeight,2.5,boxWidth + 2.5)
                   
                   
                    // ctx.strokeRect(266 + (column) * (boxWidth + lineHeight) + lineHeight, 90 + (row) * (boxHeight + lineHeight )+ lineHeight,boxHeight,boxWidth)
           
                }
            }

            let rowAdded = predictLanding()
            for(let i = 0; i < currentObject.length; i++){
                    let box = currentObject[i]
                    let row = box.row + rowAdded
                    let column = box.column;
                    ctx.fillStyle = "black";
                    ctx.fillRect(265.75 + (column) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row) * (boxHeight + lineHeight )+ lineHeight,boxHeight + 2.5 ,2.5)
                    ctx.fillRect(265.75 + (column) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row) * (boxHeight + lineHeight )+ lineHeight,2.5,boxWidth + 2,5)
                    ctx.fillRect(265.75 + (column) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row + 1) * (boxHeight + lineHeight )+ lineHeight,boxHeight + 2.5,2.5)
                    ctx.fillRect(265.75 + (column + 1) * (boxWidth + lineHeight) + lineHeight, 89.75 + (row) * (boxHeight + lineHeight )+ lineHeight,2.5,boxWidth + 2.5)
    
           
            }

            
        }


        
        function drawNext(){

            ctx.lineWidth = 3;
            ctx.strokeStyle="rgba(0,0,0,1)";
            ctx.strokeRect(620,90.75,144,90);

            let blockType = nextObject[0].blockType
            let r; 
            let c;
            if(blockType == 1){
                r = 31/2;
                c = 62;
            }else if(blockType == 2){
                r = 31
                c = 62;
            }else if(blockType == 5){
                r = 31
                c = 77.5
            }else{
                r = 31
                c = 46.5
            }

           
            for(let i = 0; i < nextObject.length; i++){
                    let box = nextObject[i]
                    let column = box.column - 2;
                    let row = box.row;
                    ctx.fillStyle = box.color;
                    ctx.fillRect((660 + column * (boxWidth + lineHeight)) - c + lineHeight,  135 - r + (row) * (boxHeight + lineHeight )+ lineHeight,boxHeight,boxWidth)
                   
  
                    ctx.fillStyle = "black"
                    ctx.fillRect(660 + (column) * (boxWidth + lineHeight) - c , 135.75 - r + (row) * (boxHeight + lineHeight ),boxHeight + 2.5 ,2.5)
                    ctx.fillRect(660 + (column) * (boxWidth + lineHeight) - c , 135.75 - r + (row) * (boxHeight + lineHeight ),2.5,boxWidth + 2,5)
                    ctx.fillRect(660 + (column) * (boxWidth + lineHeight) - c , 135.75 - r + (row + 1) * (boxHeight + lineHeight ),boxHeight + 2.5,2.5)
                    ctx.fillRect(660 + (column + 1) * (boxWidth + lineHeight) - c, 135.75 - r + (row) * (boxHeight + lineHeight ),2.5,boxWidth + 2.5)
                   
            }
        }

        function drawHold(){

            ctx.lineWidth = 3;
            ctx.strokeStyle="rgba(0,0,0,1)";
            ctx.strokeRect(80,90.75,144,90);
            if(holdObject != undefined){
                let blockType = holdObject[0].blockType
                let r; 
                let c;
                if(blockType == 1){
                    r = 31/2;
                    c = 62;
                }else if(blockType == 2){
                    r = 31
                    c = 62;
                }else if(blockType == 5){
                    r = 31
                    c = 77.5
                }else{
                    r = 31
                    c = 46.5
                }

           
                for(let i = 0; i < holdObject.length; i++){
                        let box = holdObject[i]
                        let column = box.column - 2;
                        let row = box.row;
                        ctx.fillStyle = box.color;
                        ctx.fillRect((120 + column * (boxWidth + lineHeight)) - c + lineHeight,  135 - r + (row) * (boxHeight + lineHeight )+ lineHeight,boxHeight,boxWidth)
                    
    
                        ctx.fillStyle = "black"
                        ctx.fillRect(120 + (column) * (boxWidth + lineHeight) - c , 135.75 - r + (row) * (boxHeight + lineHeight ),boxHeight + 2.5 ,2.5)
                        ctx.fillRect(120 + (column) * (boxWidth + lineHeight) - c , 135.75 - r + (row) * (boxHeight + lineHeight ),2.5,boxWidth + 2,5)
                        ctx.fillRect(120 + (column) * (boxWidth + lineHeight) - c , 135.75 - r + (row + 1) * (boxHeight + lineHeight ),boxHeight + 2.5,2.5)
                        ctx.fillRect(120 + (column + 1) * (boxWidth + lineHeight) - c, 135.75 - r + (row) * (boxHeight + lineHeight ),2.5,boxWidth + 2.5)
                    
                }
           }
        }
    
        // move all the boxes down every "turn"
        function moveDown(){

           
            
            let count = 0;
                
                for(let i = 0; i < currentObject.length; i++){
                    let row = currentObject[i].row;
                    let column = currentObject[i].column;
                    if(row < 19){
                        if(gameBoard[((row+1) * 10 + column )].box == undefined || currentObject.includes(gameBoard[((row + 1) * 10 + column )].box)){
                    
                            count++;
                            
                            
                        } 
                    }
                }
            
                if(count == currentObject.length){
                    for(let i = currentObject.length - 1; i >= 0; i--){
                        for(let j = currentObject.length - 1; j >= 0; j--){
                            if(currentObject[j].blockPosition == i){
                                let row = currentObject[j].row;
                        
                                let column = currentObject[j].column;
                                    gameBoard[((row+1) * 10 + column )].box = currentObject[j];
                                    gameBoard[row * 10 + column].box = undefined
                                    currentObject[j].row += 1
                            }
                        }
                    }
                }   


                checkForRow();
                checkCurrent();
                draw();
        }


        //check to see if a row has been filed horizontaly
        function checkForRow(){
            let countToTen = 0;
            let counter = 0
            let rowsDeleted = [];
            for(let i = 199; i >= 0; i--){

                for(let j = currentObject.length - 1; j >= 0; j--){

                    if(gameBoard[i].box == currentObject[j]){
                        
                        if(checkCurrent()){
                            counter--
                           
                        }
                    }
                }

                if(gameBoard[i].box != undefined){
                    counter++;
                }

                if(counter == 10){
                    rowsDeleted[rowsDeleted.length] = (i / 10);
                    counter = 0
                    for(let j = 0; j < 10; j++){
                        gameBoard[i + j].box = undefined

                    }
                }

                countToTen++

                if(countToTen > 9){
                    countToTen = 0;
                    counter = 0;
                }
            }

            draw()
    
            for(let i = rowsDeleted.length; i > 0; i--){
                let x = 0;
                setTimeout(function(){ 
                    moveAllDown(rowsDeleted[i-1]); }, 300); 
            }
        }

        function moveAllDown(row){
            for(let i = (row * 10) - 1; i >= 0; i--){
                   
                    if(gameBoard[i + 10].box == undefined && gameBoard[i].box != undefined){ 
                        gameBoard[i + 10].box = gameBoard[i].box
                        gameBoard[i].box = undefined
                       
                        gameBoard[i+10].box.row += 1;
                    
                    }  
            }
            draw()
        }

        //check to see if the current peice being moves can fall farther
        function checkCurrent(){


            let count = 0;
                // check that all the boxes in the current object can move down
            for(let i = 0; i < currentObject.length; i++){
                let row = currentObject[i].row;
                let column = currentObject[i].column;
                if(row < 19){
                    if(gameBoard[((row+1) * 10 + column )].box == undefined || currentObject.includes(gameBoard[((row + 1) * 10 + column )].box)){
                
                        count++;
                        
                    }   
                }
            }
            if(count == currentObject.length){
                
                return true;
            }else{
               // allowMovment = false;
                return false;
            }   
        }


        function swapHold(){
            if(holdObject == undefined){
                for(let i = 0; i < currentObject.length; i++){
                    gameBoard[(currentObject[i].row * 10) + currentObject[i].column].box = undefined;
                }
                holdObject = createObject(currentObject[0].blockType);
                currentObject = undefined
                createObject(0);

            }else{
                let temp = currentObject;
                for(let i = 0; i < currentObject.length; i++){
                    gameBoard[currentObject[i].row * 10 + currentObject[i].column].box = undefined;
                }

                currentObject = holdObject;

                for(let i = 0; i < currentObject.length; i++){
                    gameBoard[currentObject[i].row * 10 + currentObject[i].column].box = currentObject[i];
                }

                holdObject = createObject(temp[0].blockType);
                
            }
        }


         //create a new box, which an object is made up of
         function createBox(){
            let boxObject = {

                width: boxWidth,
                height: boxHeight,
                row: 0,
                column: undefined,
                blockType: null,
                blockPosition: 0,
                color: undefined,
                rotation: 0,

            }
            allowMovment = true;
            return boxObject;
        }

        function createObject(objectNumber){
            let random = Math.round(Math.random() * 6 + 1)
            if(objectNumber != 0){
                random = objectNumber
            }
            let object;
         //   random = 1;
            if(random == 1){
                object =  createIBlock();
            }else if( random == 2){
                object =  createOBlock();
            }else if (random == 3){
                object = createTBlock();
            }else if (random == 4){
                object = createSBlock();
            }else if(random == 5){
                object = createZBlock();
            }else if(random == 6){
                object = createJBlock();
            }else if(random == 7){
                object = createLBlock();
            }
            if(objectNumber == 0){
                currentObject = nextObject;
                nextObject = object
                if(currentObject == undefined){
                    createObject(0);
                }else{
                    for(let i = 0; i < currentObject.length; i++){
                        gameBoard[currentObject[i].column + (currentObject[i].row * 10)].box = currentObject[i]
                    }
                }
            }

            return object;
        }

        function createIBlock(){
            let color = "rgb(0,247,245)"
            let boxes = []
            for(let i = 0; i < 4; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 1;
                boxes[i].column = i+3;
                boxes[i].blockPosition = i
                boxes[i].color = color
            }
            return boxes;
        }

        function createOBlock(){
            let color = "rgb(233,248,0)";
            let boxes = [];

            for(let i = 0; i < 2; i++){
                boxes[i] = createBox();
                boxes[i].blockType = 2;
                boxes[i].column = i+4;
                boxes[i].row = 0;
                boxes[i].blockPosition = 2 + i
                boxes[i].color = color;
            }
            for(let i = 2; i < 4; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 2;
                boxes[i].blockPosition = i 
                boxes[i].column = i+2;
                boxes[i].row = 1;
                boxes[i].color = color;
            }
        
            return boxes;
        }

        function createTBlock(){
            let color = "rgb(186,0,242)"
            let boxes = []


            for(let i = 0; i < 3; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 3;
                boxes[i].column = i+3;
                boxes[i].row = 0;
                boxes[i].color = color
            }

            boxes[1].blockPosition = 2;
            boxes[0].blockPosition = 1;
            boxes[2].blockPosition = 0;

            boxes[3] = createBox()
            boxes[3].blockType = 3;
            boxes[3].column = 4;
            boxes[3].row = 1;
            boxes[3].color = color
            boxes[3].blockPosition = 3;

            return boxes;
        }

        function createSBlock(){
            let color = "rgb(0,255,25)"
            let boxes = []

            for(let i = 0; i < 2; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 4;
                boxes[i].column = i+4;
                boxes[i].row = 0;
                boxes[i].color = color
            }
            boxes[0].blockPosition = 0;
            boxes[1].blockPosition = 3;
            for(let i = 2; i < 4; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 4;
                boxes[i].column = i+1;
                boxes[i].row = 1;
                boxes[i].blockPosition = i - 1;
                boxes[i].color = color
            }
        
            return boxes;
        }

        function createZBlock(){
            let color = "rgb(255,0,0)"
            let boxes = []

            for(let i = 0; i < 2; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 5;
                boxes[i].column = i+4;
                boxes[i].row = 0;
                boxes[i].color = color
                boxes[i].blockPosition = i;
            }
            for(let i = 2; i < 4; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 5;
                boxes[i].column = i+3;
                boxes[i].row = 1;
                boxes[i].blockPosition = i;
                boxes[i].color = color
            }
        
            return boxes;
        }

        function createJBlock(){
            let color = "rgb(65,0,243)"

            let boxes = []

            
                boxes[3] = createBox()
                boxes[3].blockType = 6;
                boxes[3].column = 5;
                boxes[3].row = 1;
                boxes[3].color = color
                          
            for(let i = 0; i < 3; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 6;
                boxes[i].column = i+3;
                boxes[i].row = 0;
                boxes[i].color = color
            }
           
            return boxes;
        }

        function createLBlock(){
            let color = "rgb(252,159,0)"

            let boxes = []

            
                boxes[3] = createBox()
                boxes[3].blockType = 7;
                boxes[3].column = 3;
                boxes[3].row = 1;
                boxes[3].color = color
               
            for(let i = 0; i < 3; i++){
                boxes[i] = createBox()
                boxes[i].blockType = 7;
                boxes[i].column = i+3;
                boxes[i].row = 0;
                boxes[i].color = color
            }
    
            return boxes;
        }

        function rotate(){
            let box = currentObject[0]
            let count = 0;
            let column = box.column;
            let row = box.row;
            
            if(box.blockType == 1){
                
                if(box.rotation == 0 || box.rotation == 2){
                    for(let i = 0; i < currentObject.length; i++){
                        if(box.row < 17){
                            if(gameBoard[(box.row + i) * 10 + box.column].box == undefined || currentObject.includes(gameBoard[(box.row + i) * 10 + box.column].box)){
                                count++;
                            }
                        }   
                    }
                    
                    if(count == currentObject.length){
                        for(let i = 0; i < currentObject.length; i++){

                            currentObject[i].row += i;
                            currentObject[i].column = box.column;
                            currentObject[i].rotation = ((currentObject[i].rotation + 1) % 4)
                            gameBoard[(box.row * 10) + box.column + i].box = undefined;
                        }
                        for(let i = 0; i < currentObject.length; i++){
                            
                            gameBoard[(currentObject[i].row * 10) + currentObject[i].column].box = currentObject[i];
                              
                        }
                    }
                }else{
                    if(box.column < 7){
                        for(let i = 0; i < currentObject.length; i++){
                            
                            if(gameBoard[(box.row) * 10 + box.column + i].box == undefined || currentObject.includes(gameBoard[(box.row) * 10 + box.column + i].box)){
                                count++;
                            }
                            
                        }

                        if(count == currentObject.length){

                            for(let i = 0; i < currentObject.length; i++){

                                currentObject[i].column += i;
                                currentObject[i].row = box.row;
                                currentObject[i].rotation = ((currentObject[i].rotation + 1) % 4)
                                gameBoard[(box.row + i * 10)+ box.column].box = undefined;
                            }

                            for(let i = 0; i < currentObject.length; i++){

                                gameBoard[(currentObject[i].row * 10) + currentObject[i].column].box = currentObject[i];     
                            }
                        }
                    }
                }
            }else if(box.blockType == 3){
                //let count = 0;
                if(box.rotation < 2 ) {
                    if(box.row > 0 && box.column < 8){
                        let peice = box.rotation + 2;
                        let spot = (column + box.rotation + 1) + (10 * (row + box.rotation - 1)); 
                    
                        if(gameBoard[spot].box == undefined){
                
                            let oldspot = (currentObject[peice].row * 10) + currentObject[peice].column;
                            gameBoard[oldspot].box = undefined;
                        
                            currentObject[peice].row = Math.floor(spot / 10);
                            currentObject[peice].column = spot % 10;
                            gameBoard[spot].box = currentObject[peice];
                
                            box.rotation = (box.rotation + 1) % 4
                        }
                    }   
                }else if(box.rotation > 1){
                
                    let spot1;
                    let spot2;
                    if(box.rotation == 2){
                        spot1 = (column) + (10 * (row - 1));
                        spot2 = (column) + (10 * (row + 1)); 
                       
                    }else{
                        spot1 = (column + 2) + (10 * (row));
                        spot2 = (column + 1) + (10 * (row + 1));  
                    }
                    
                    swap2(box,spot1,spot2,2,3);
                
                    
                }
            }else if(box.blockType == 4){
                    
                let spot1;
                let spot2;
                if(box.rotation == 0 || box.rotation == 2){
                    
                    spot1 = (column - 1) + (10 * (row));
                    spot2 = (column) + (10 * (row + 2)); 
                    swap2(box,spot1,spot2,0,1);
                   
                }else{
                    if(box.column < 8){
                        spot1 = (column + 1) + (10 * (row));
                        spot2 = (column + 2) + (10 * (row));  
                        swap2(box,spot1,spot2,0,1);
                    }
                }

        
            }else if(box.blockType == 5){
                
                    let spot1;
                    let spot2;
                    if(box.rotation == 0 || box.rotation == 2){
                        
                        spot1 = (column) + (10 * (row + 1));
                        spot2 = (column) + (10 * (row + 2)); 
                        swap2(box,spot1,spot2,0,3);
                       
                    }else{
                        if(box.column < 8){
                            spot1 = (column) + (10 * (row - 1));
                            spot2 = (column + 2) + (10 * (row));  
                            swap2(box,spot1,spot2,0,3);  
                        }
                    }

                    
                    
                }else if(box.blockType == 6){
               
                        let spot1;
                        let spot2;
                        let spot3;
                        if(box.rotation == 0){
                            if(box.row < 18){
                                spot1 = (column) + (10 * (row + 2));
                                spot2 = (column + 1) + (10 * (row + 1));
                                spot3 = (column + 1) + (10 * (row + 2));
                                
                                swap3(box,spot1,spot2,spot3,0,2,3)
                            }
                    
                        }else if(box.rotation == 1){
                            if(box.column < 8 ){
                                spot1 = (column) + (10 * (row - 2));
                                spot2 = (column) + (10 * (row - 1));
                                spot3 = (column + 2) + (10 * (row - 1));
                    
                                swap3(box,spot1,spot2,spot3,0,1,3)
                            }
                        }else if(box.rotation == 2){
                            if(box.row < 18){
                                spot1 = (column + 1) + (10 * (row));
                                spot2 = (column) + (10 * (row + 2));
                    
                                swap2(box,spot1,spot2,2,3);
                            }
                        }else if(box.rotation == 3){
                            if(box.column < 8 ){
                                spot1 = (column + 2) + (10 * (row));
                                spot2 = (column + 2) + (10 * (row + 1));
                    
                                swap2(box,spot1,spot2,1,3);
                    
                                let box2Spot = currentObject[2].row * 10 + currentObject[2].column
                                let box1 = gameBoard[box2Spot + 1].box
                    
                                currentObject[2].column += 1;
                                currentObject[1].column -= 1;
                    
                                gameBoard[box2Spot + 1].box = gameBoard[box2Spot].box; 
                                gameBoard[box2Spot].box = box1;
                            }
                    
                            
                        }
                    }else if(box.blockType == 7){
               
                        let spot1;
                        let spot2;
                        let spot3;
                        if(box.rotation == 0){
                            if(box.row < 18){
                                spot1 = (column + 1) + (10 * (row + 1));
                                spot2 = (column + 1) + (10 * (row + 2));
                                
                                swap2(box,spot1,spot2,2,3)
                            }
                        }else if(box.rotation == 1){
                            if(box.column < 8){
                                spot1 = (column) + (10 * (row + 1));
                                spot2 = (column + 2) + (10 * (row));
                                spot3 = (column + 2) + (10 * (row + 1));
                    
                                swap3(box,spot1,spot2,spot3,1,0,3)
                            }
                        }else if(box.rotation == 2){
                            if(box.row < 18){
                                spot1 = (column - 2) + (10 * (row));
                                spot2 = (column - 2) + (10 * (row + 2));
                                spot3 = (column - 1) + (10 * (row + 2));
                    
                                swap3(box,spot1,spot2,spot3,0,2,3)
                            }
                        }else if(box.rotation == 3){
                            if(box.column < 8){
                                spot1 = (column + 1) + (10 * (row));
                                spot2 = (column + 2) + (10 * (row));
                    
                                swap2(box,spot1,spot2,3,2);
                    
                                let box1Spot = currentObject[3].row * 10 + currentObject[3].column
                                let box3 = gameBoard[box1Spot + 9].box
                    
                                currentObject[1].column += 1;
                                currentObject[3].column -= 1;
                                currentObject[1].row -= 1;
                                currentObject[3].row += 1;
                    
                                gameBoard[box1Spot + 9].box = gameBoard[box1Spot].box; 
                                gameBoard[box1Spot].box = box3;
                            }
                    
                            
                        }
                    } 

        }

        function swap2(box,spot1, spot2, peice1, peice2){
            if(gameBoard[spot1].box == undefined && gameBoard[spot2].box == undefined){

                let oldspot1 = (currentObject[peice1].row * 10) + currentObject[peice1].column;
                let oldspot2 = (currentObject[peice2].row * 10) + currentObject[peice2].column;
                
                gameBoard[oldspot1].box = undefined;
                gameBoard[oldspot2].box = undefined;

                currentObject[peice1].row = Math.floor(spot1 / 10);
                currentObject[peice1].column = spot1 % 10;

                currentObject[peice2].row = Math.floor(spot2 / 10);
                currentObject[peice2].column = spot2 % 10;

                gameBoard[spot1].box = currentObject[peice1];
                gameBoard[spot2].box = currentObject[peice2];

                box.rotation = (box.rotation + 1) % 4
                
            }
        }

        function swap3(box,spot1,spot3,spot4,peice1,peice3,peice4){
            
            if(gameBoard[spot1].box == undefined && gameBoard[spot3].box == undefined && gameBoard[spot4].box == undefined){
              
                let oldspot1 = (currentObject[peice1].row * 10) + currentObject[peice1].column;
               
                let oldspot3 = (currentObject[peice3].row * 10) + currentObject[peice3].column;
                let oldspot4 = (currentObject[peice4].row * 10) + currentObject[peice4].column;
            
                gameBoard[oldspot1].box = undefined;
               
                gameBoard[oldspot3].box = undefined;
                gameBoard[oldspot4].box = undefined;


                currentObject[peice1].row = Math.floor(spot1 / 10);
                currentObject[peice1].column = spot1 % 10;

                

                currentObject[peice3].row = Math.floor(spot3 / 10);
                currentObject[peice3].column = spot3 % 10;
                
                currentObject[peice4].row = Math.floor(spot4 / 10);
                currentObject[peice4].column = spot4 % 10;

                

                gameBoard[spot1].box = currentObject[peice1];
                gameBoard[spot3].box = currentObject[peice3];
                gameBoard[spot4].box = currentObject[peice4];

                box.rotation = (box.rotation + 1) % 4
                
            
            }
        }


        
        function takeMoves(moves){
            aiActive = true;
            for(let i = moves.length - 1; i > 0; i--){
                    if(moves[i] == 1){
                        moveTile(2)
                    }else if (moves[i] == 2){
                        moveTile(1);
                    }else{
                        moveTile(moves[i])
                    }
                    
                    
        //        console.log("moving " + moves[i])
            }

            let loop = moves[0];
            for(let i = 0; i < loop; i++){
                
                    moveTile(4); 
           //     console.log("moving down")
               
            }
            
            aiActive = false;
            checkForRow();
           
            setTimeout(function(){ 
                createObject(0);
                draw();
                ai() 
            }, 300); 
        }
        
        

        function ai(){
          
             
            if(currentObject != undefined){
               
            let copyBoard = JSON.parse(JSON.stringify(gameBoard));
           
       
            let copyCurrentObject = JSON.parse(JSON.stringify(currentObject));

            for(let i = 0; i < copyCurrentObject.length; i++){
                copyBoard[copyCurrentObject[i].row * 10 + copyCurrentObject[i].column].box = undefined;
             }


                var copyHoldObject = undefined;

                if(holdObject != undefined){
                    for(i = 0; i < holdObject.length; i++){
                        copyHoldObject[i] = createObject(holdObject[0].blockType);
                    }
                }

                tetrus = new aiTetrus(copyBoard,copyCurrentObject,undefined);
                let result = tetrus.placeOneObject();
               // console.log(result)
                if(result[1].length > 0){
                    console.log(result[1])
                   takeMoves(result[1]);
               }
                
            }    
           // }

        }


       
        createObject(0)
        draw()
      
       
    
       
    
    
       
      
       
    
        
    
         
        
        
        