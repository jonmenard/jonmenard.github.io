class trainAI{

    constructor(a, b, c,d,e,f,g){
        this.countmoves1 = 0;
        this.gameBoard1 = [];
        this.currentObject1 = undefined;
        this.nextObject1 = undefined;
        this.holdObject1 = undefined;
        this.one = a;
        this.two = b;
        this.three = c;
        this.four = d;
        this.five = e;
        this.six = f;
        this.seven = g;
        this.bag = [];

        this.boxWidth = 30;
        this.boxHeight = this.boxWidth;

        document.addEventListener("keydown",this.keyPresstrain);
        for(let i = 0; i < 200; i++){
            this.gameBoard1[i] = {
                box: undefined
            }
        }
    }

    
   

keyPresstrain(event){
    let keyPressed = event.keyCode;
    if(keyPressed == 40 || keyPressed == 39 || keyPressed == 38 || keyPressed == 37 || keyPressed == 13 || keyPressed == 32){
        event.preventDefault();
    }
    this.moveTiletrain(keyPressed)
}


moveTiletrain(event ){

    let keyPressed = event
    let count = 0;
  //  draw();
    
    switch (keyPressed){

        
        case 1:
        case 65:
        case 37:  //change to move left
        
        // check that all the boxes in the current object can move left
        for(let i = 0; i < this.currentObject1.length; i++){

            let row = this.currentObject1[i].row;
            let column = this.currentObject1[i].column;
           
            if(column> 0){
                if(this.gameBoard1[((row) * 10 + column - 1 )].box == undefined || this.currentObject1.includes(this.gameBoard1[((row) * 10 + column - 1 )].box)){
            
                    count++;
                
                }
            
            }
        }
        // if they all can then move them
        if(count == this.currentObject1.length){
            for(let i = 0; i < this.currentObject1.length; i++){

                let row = this.currentObject1[i].row;
                let column = this.currentObject1[i].column;
                this.gameBoard1[((row) * 10 + column  - 1)].box = this.currentObject1[i];
                this.gameBoard1[row * 10 + column].box = undefined
                this.currentObject1[i].column -= 1
            }
        }
            break;

        case 2:
        case 68:
        case 39: //change to move right

         count = 0;
        // check that all the boxes in the current object can move right
        for(let i = 0; i < this.currentObject1.length; i++){
            let row = this.currentObject1[i].row;
            let column = this.currentObject1[i].column;

            if(column < 9){
                if(this.gameBoard1[((row) * 10 + column + 1 )].box == undefined || this.currentObject1.includes(this.gameBoard1[((row) * 10 + column + 1 )].box )){
                    count++;
                }
                
            }
        }

        if(count == this.currentObject1.length){
            for(let i = this.currentObject1.length-1; i >= 0 ; i--){

                let row = this.currentObject1[i].row;
                let column = this.currentObject1[i].column;
                this.gameBoard1[((row) * 10 + column  + 1)].box = this.currentObject1[i];
                this.gameBoard1[row * 10 + column].box = undefined
                this.currentObject1[i].column += 1
            }
        }

            break;
        case 4:
        case 83:
        case 40:  // change to move down
        this.moveDowntrain()
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
            this.rotatetrain()
        break;
        case 6:
        case 13:
            let r = this.predictLandingtrain();
            for(let i = this.currentObject1.length-1; i >= 0 ; i--){
                this.gameBoard1[(this.currentObject1[i].row * 10) + this.currentObject1[i].column].box = undefined;
                this.currentObject1[i].row += r;
                this.gameBoard1[(this.currentObject1[i].row * 10) + this.currentObject1[i].column].box = this.currentObject1[i];
            }
    }

}




 predictLandingtrain(){

    let rowsDown = [];
    
        
        for(let j = 0; j < this.currentObject1.length; j++){
            let count = 0;
            let spot = this.currentObject1[j].column;
            for(let i = this.currentObject1[j].row + 1; i < (20); i++){
                if(this.gameBoard1[spot + (i * 10)].box == undefined || this.currentObject1.includes(this.gameBoard1[spot + ( i * 10)].box)){
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

 moveDowntrain(){

           
            
    let count = 0;
        
        for(let i = 0; i < this.currentObject1.length; i++){
            let row = this.currentObject1[i].row;
            let column = this.currentObject1[i].column;
            if(row < 19){
                if(this.gameBoard1[((row+1) * 10 + column )].box == undefined || this.currentObject1.includes(this.gameBoard1[((row + 1) * 10 + column )].box)){
            
                    count++;
                    
                    
                } 
            }
        }
    
        if(count == this.currentObject1.length){
            for(let i = this.currentObject1.length - 1; i >= 0; i--){
                for(let j = this.currentObject1.length - 1; j >= 0; j--){
                    if(this.currentObject1[j].blockPosition == i){
                        let row = this.currentObject1[j].row;
                
                        let column = this.currentObject1[j].column;
                            this.gameBoard1[((row+1) * 10 + column )].box = this.currentObject1[j];
                            this.gameBoard1[row * 10 + column].box = undefined
                            this.currentObject1[j].row += 1
                    }
                }
            }
        }   

        this.checkForRowtrain();
        this.checkCurrenttrain();
}


//check to see if a row has been filed horizontaly
 checkForRowtrain(){
    let countToTen = 0;
    let counter = 0
    let countEmpty = 0;
    let rowsDeleted = [];
    for(let i = 199; i >= 0; i--){

        for(let j = this.currentObject1.length - 1; j >= 0; j--){

            if(this.gameBoard1[i].box == this.currentObject1[j]){
                
                if(this.checkCurrenttrain()){
                    counter--
                   
                }
            }
        }

        if(this.gameBoard1[i].box != undefined){
            counter++;
        }else{
            countEmpty++;
        }

        if(counter == 10 || countEmpty == 10){
            rowsDeleted[rowsDeleted.length] = (i / 10);
            counter = 0
            for(let j = 0; j < 10; j++){
                this.gameBoard1[i + j].box = undefined

            }
        }

        countToTen++

        if(countToTen > 9){
            countToTen = 0;
            counter = 0;
            countEmpty = 0;
        }
    }


    for(let i = rowsDeleted.length; i > 0;i--){
      //  setTimeout(function(){ 
            this.moveAllDowntrain(rowsDeleted[i-1])
        //}, 50);  
    }

    return true;
}

moveAllDowntrain(row){
    for(let i = (row * 10) - 1; i >= 0; i--){
           
            if(this.gameBoard1[i + 10].box == undefined && this.gameBoard1[i].box != undefined){ 
                this.gameBoard1[i + 10].box = this.gameBoard1[i].box
                this.gameBoard1[i].box = undefined
               
                this.gameBoard1[i+10].box.row += 1;
            
            }  
    }
}

//check to see if the current peice being moves can fall farther
checkCurrenttrain(){


    let count = 0;
        // check that all the boxes in the current object can move down
    for(let i = 0; i < this.currentObject1.length; i++){
        let row = this.currentObject1[i].row;
        let column = this.currentObject1[i].column;
        if(row < 19){
            if(this.gameBoard1[((row+1) * 10 + column )].box == undefined || this.currentObject1.includes(this.gameBoard1[((row + 1) * 10 + column )].box)){
        
                count++;
                
            }   
        }
    }
    if(count == this.currentObject1.length){
        
        return true;
    }else{
        return false;
    }   
}


swapHoldtrain(){
    if(this.holdObject1 == undefined){
        for(let i = 0; i < this.currentObject1.length; i++){
            this.gameBoard1[(this.currentObject1[i].row * 10) + this.currentObject1[i].column].box = undefined;
        }
        this.holdObject1 = this.createObjecttrain(this.currentObject1[0].blockType);
        this.currentObject1 = undefined
        this.createObjecttrain(0);

    }else{
        let temp = this.currentObject1;
        for(let i = 0; i < this.currentObject1.length; i++){
            this.gameBoard1[this.currentObject1[i].row * 10 + this.currentObject1[i].column].box = undefined;
        }

        this.currentObject1 = this.holdObject1;

        for(let i = 0; i < this.currentObject1.length; i++){
            this.gameBoard1[this.currentObject1[i].row * 10 + this.currentObject1[i].column].box = this.currentObject1[i];
        }

        this.holdObject1 = this.createObjecttrain(temp[0].blockType);
        
    }
}


 //create a new box, which an object is made up of
 createBoxtrain(){
    let boxObject = {

        width: this.boxWidth,
        height: this.boxHeight,
        row: 0,
        column: undefined,
        blockType: null,
        blockPosition: 0,
        color: undefined,
        rotation: 0,

    }
    return boxObject;
}


    randomGeneratortrain() {
                

    if (this.bag.length === 0) {
    this.bag = [1, 2, 3, 4, 5, 6, 7];
    this.bag.sort(() => Math.random() - 0.5);
    }
    return this.bag.pop();
    
    }

    createObjecttrain(objectNumber){
    let random = randomGenerator();
    if(objectNumber != 0){
        random = objectNumber
    }
    let object;
   // random = 5;
    if(random == 1){
        object =  this.createIBlocktrain();
    }else if( random == 2){
        object =  this.createOBlocktrain();
    }else if (random == 3){
        object = this.createTBlocktrain();
    }else if (random == 4){
        object = this.createSBlocktrain();
    }else if(random == 5){
        object = this.createZBlocktrain();
    }else if(random == 6){
        object = this.createJBlocktrain();
    }else if(random == 7){
        object = this.createLBlocktrain();
    }
    if(objectNumber == 0){
        this.currentObject1 = this.nextObject1;
        this.nextObject1 = object
        if(this.currentObject1 == undefined){
            this.createObjecttrain(0);
        }else{
            for(let i = 0; i < this.currentObject1.length; i++){
                this.gameBoard1[this.currentObject1[i].column + (this.currentObject1[i].row * 10)].box = this.currentObject1[i]
            }
        }
    }

    return object;
}

createIBlocktrain(){
    let color = "rgb(0,247,245)"
    let boxes = []
    for(let i = 0; i < 4; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 1;
        boxes[i].column = i+3;
        boxes[i].blockPosition = i
        boxes[i].color = color
    }
    return boxes;
}

createOBlocktrain(){
    let color = "rgb(233,248,0)";
    let boxes = [];

    for(let i = 0; i < 2; i++){
        boxes[i] = this.createBoxtrain();
        boxes[i].blockType = 2;
        boxes[i].column = i+4;
        boxes[i].row = 0;
        boxes[i].blockPosition = 2 + i
        boxes[i].color = color;
    }
    for(let i = 2; i < 4; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 2;
        boxes[i].blockPosition = i 
        boxes[i].column = i+2;
        boxes[i].row = 1;
        boxes[i].color = color;
    }

    return boxes;
}

createTBlocktrain(){
    let color = "rgb(186,0,242)"
    let boxes = []


    for(let i = 0; i < 3; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 3;
        boxes[i].column = i+3;
        boxes[i].row = 0;
        boxes[i].color = color
    }

    boxes[1].blockPosition = 2;
    boxes[0].blockPosition = 1;
    boxes[2].blockPosition = 0;

    boxes[3] = this.createBoxtrain()
    boxes[3].blockType = 3;
    boxes[3].column = 4;
    boxes[3].row = 1;
    boxes[3].color = color
    boxes[3].blockPosition = 3;

    return boxes;
}

createSBlocktrain(){
    let color = "rgb(0,255,25)"
    let boxes = []

    for(let i = 0; i < 2; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 4;
        boxes[i].column = i+4;
        boxes[i].row = 0;
        boxes[i].color = color
    }
    boxes[0].blockPosition = 0;
    boxes[1].blockPosition = 3;
    for(let i = 2; i < 4; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 4;
        boxes[i].column = i+1;
        boxes[i].row = 1;
        boxes[i].blockPosition = i - 1;
        boxes[i].color = color
    }

    return boxes;
}

createZBlocktrain(){
    let color = "rgb(255,0,0)"
    let boxes = []

    for(let i = 0; i < 2; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 5;
        boxes[i].column = i+4;
        boxes[i].row = 0;
        boxes[i].color = color
        boxes[i].blockPosition = i;
    }
    for(let i = 2; i < 4; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 5;
        boxes[i].column = i+3;
        boxes[i].row = 1;
        boxes[i].blockPosition = i;
        boxes[i].color = color
    }

    return boxes;
}

createJBlocktrain(){
    let color = "rgb(65,0,243)"

    let boxes = []

    
        boxes[3] = this.createBoxtrain()
        boxes[3].blockType = 6;
        boxes[3].column = 5;
        boxes[3].row = 1;
        boxes[3].color = color
                  
    for(let i = 0; i < 3; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 6;
        boxes[i].column = i+3;
        boxes[i].row = 0;
        boxes[i].color = color
    }
   
    return boxes;
}

createLBlocktrain(){
    let color = "rgb(252,159,0)"

    let boxes = []

    
        boxes[3] = this.createBoxtrain()
        boxes[3].blockType = 7;
        boxes[3].column = 3;
        boxes[3].row = 1;
        boxes[3].color = color
       
    for(let i = 0; i < 3; i++){
        boxes[i] = this.createBoxtrain()
        boxes[i].blockType = 7;
        boxes[i].column = i+3;
        boxes[i].row = 0;
        boxes[i].color = color
    }

    return boxes;
}

rotatetrain(){
    let box = this.currentObject1[0]
    let count = 0;
    let column = box.column;
    let row = box.row;
    
    if(box.blockType == 1){
        
        if(box.rotation == 0 || box.rotation == 2){
            for(let i = 0; i < this.currentObject1.length; i++){
                if(box.row < 17){
                    if(this.gameBoard1[(box.row + i) * 10 + box.column].box == undefined || this.currentObject1.includes(this.gameBoard1[(box.row + i) * 10 + box.column].box)){
                        count++;
                    }
                }   
            }
            
            if(count == this.currentObject1.length){
                for(let i = 0; i < this.currentObject1.length; i++){

                    this.currentObject1[i].row += i;
                    this.currentObject1[i].column = box.column;
                    this.currentObject1[i].rotation = ((this.currentObject1[i].rotation + 1) % 4)
                    this.gameBoard1[(box.row * 10) + box.column + i].box = undefined;
                }
                for(let i = 0; i < this.currentObject1.length; i++){
                    
                    this.gameBoard1[(this.currentObject1[i].row * 10) + this.currentObject1[i].column].box = this.currentObject1[i];
                      
                }
            }
        }else{
            if(box.column < 7){
                for(let i = 0; i < this.currentObject1.length; i++){
                    
                    if(this.gameBoard1[(box.row) * 10 + box.column + i].box == undefined || this.currentObject1.includes(this.gameBoard1[(box.row) * 10 + box.column + i].box)){
                        count++;
                    }
                    
                }

                if(count == this.currentObject1.length){

                    for(let i = 0; i < this.currentObject1.length; i++){

                        this.currentObject1[i].column += i;
                        this.currentObject1[i].row = box.row;
                        this.currentObject1[i].rotation = ((this.currentObject1[i].rotation + 1) % 4)
                        this.gameBoard1[(box.row + i * 10)+ box.column].box = undefined;
                    }

                    for(let i = 0; i < this.currentObject1.length; i++){

                        this.gameBoard1[(this.currentObject1[i].row * 10) + this.currentObject1[i].column].box = this.currentObject1[i];     
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
            
                if(this.gameBoard1[spot].box == undefined){
        
                    let oldspot = (this.currentObject1[peice].row * 10) + this.currentObject1[peice].column;
                    this.gameBoard1[oldspot].box = undefined;
                
                    this.currentObject1[peice].row = Math.floor(spot / 10);
                    this.currentObject1[peice].column = spot % 10;
                    this.gameBoard1[spot].box = this.currentObject1[peice];
        
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
            
            this.swap2train(box,spot1,spot2,2,3);
        
            
        }
    }else if(box.blockType == 4){
            
        let spot1;
        let spot2;
        if(box.rotation == 0 || box.rotation == 2){
            
            spot1 = (column - 1) + (10 * (row));
            spot2 = (column) + (10 * (row + 2)); 
            this.swap2train(box,spot1,spot2,0,1);
           
        }else{
            if(box.column < 8){
                spot1 = (column + 1) + (10 * (row));
                spot2 = (column + 2) + (10 * (row));  
                this.swap2train(box,spot1,spot2,0,1);
            }
        }


    }else if(box.blockType == 5){
        
            let spot1;
            let spot2;
            if(box.rotation == 0 || box.rotation == 2){
                
                spot1 = (column) + (10 * (row + 1));
                spot2 = (column) + (10 * (row + 2)); 
                this.swap2train(box,spot1,spot2,0,3);
               
            }else{
                if(box.column < 8){
                    spot1 = (column) + (10 * (row - 1));
                    spot2 = (column + 2) + (10 * (row));  
                    this.swap2train(box,spot1,spot2,0,3);  
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
                        
                        this.swap3train(box,spot1,spot2,spot3,0,2,3)
                    }
            
                }else if(box.rotation == 1){
                    if(box.column < 8 ){
                        spot1 = (column) + (10 * (row - 2));
                        spot2 = (column) + (10 * (row - 1));
                        spot3 = (column + 2) + (10 * (row - 1));
            
                        this.swap3train(box,spot1,spot2,spot3,0,1,3)
                    }
                }else if(box.rotation == 2){
                    if(box.row < 18){
                        spot1 = (column + 1) + (10 * (row));
                        spot2 = (column) + (10 * (row + 2));
            
                        this.swap2train(box,spot1,spot2,2,3);
                    }
                }else if(box.rotation == 3){
                    if(box.column < 8 ){
                        spot1 = (column + 2) + (10 * (row));
                        spot2 = (column + 2) + (10 * (row + 1));
            
                        this.swap2train(box,spot1,spot2,1,3);
            
                        let box2Spot = this.currentObject1[2].row * 10 + this.currentObject1[2].column
                        let box1 = this.gameBoard1[box2Spot + 1].box
            
                        this.currentObject1[2].column += 1;
                        this.currentObject1[1].column -= 1;
            
                        this.gameBoard1[box2Spot + 1].box = this.gameBoard1[box2Spot].box; 
                        this.gameBoard1[box2Spot].box = box1;
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
                        
                        this.swap2train(box,spot1,spot2,2,3)
                    }
                }else if(box.rotation == 1){
                    if(box.column < 8){
                        spot1 = (column) + (10 * (row + 1));
                        spot2 = (column + 2) + (10 * (row));
                        spot3 = (column + 2) + (10 * (row + 1));
            
                        this.swap3train(box,spot1,spot2,spot3,1,0,3)
                    }
                }else if(box.rotation == 2){
                    if(box.row < 18){
                        spot1 = (column - 2) + (10 * (row));
                        spot2 = (column - 2) + (10 * (row + 2));
                        spot3 = (column - 1) + (10 * (row + 2));
            
                        this.swap3train(box,spot1,spot2,spot3,0,2,3)
                    }
                }else if(box.rotation == 3){
                    if(box.column < 8){
                        spot1 = (column + 1) + (10 * (row));
                        spot2 = (column + 2) + (10 * (row));
            
                        this.swap2train(box,spot1,spot2,3,2);
            
                        let box1Spot = this.currentObject1[3].row * 10 + this.currentObject1[3].column
                        let box3 = this.gameBoard1[box1Spot + 9].box
            
                        this.currentObject1[1].column += 1;
                        this.currentObject1[3].column -= 1;
                        this.currentObject1[1].row -= 1;
                        this.currentObject1[3].row += 1;
            
                        this.gameBoard1[box1Spot + 9].box = this.gameBoard1[box1Spot].box; 
                        this.gameBoard1[box1Spot].box = box3;
                    }
            
                    
                }
            } 

}

swap2train(box,spot1, spot2, peice1, peice2){
    if(this.gameBoard1[spot1].box == undefined && this.gameBoard1[spot2].box == undefined){

        let oldspot1 = (this.currentObject1[peice1].row * 10) + this.currentObject1[peice1].column;
        let oldspot2 = (this.currentObject1[peice2].row * 10) + this.currentObject1[peice2].column;
        
        this.gameBoard1[oldspot1].box = undefined;
        this.gameBoard1[oldspot2].box = undefined;

        this.currentObject1[peice1].row = Math.floor(spot1 / 10);
        this.currentObject1[peice1].column = spot1 % 10;

        this.currentObject1[peice2].row = Math.floor(spot2 / 10);
        this.currentObject1[peice2].column = spot2 % 10;

        this.gameBoard1[spot1].box = this.currentObject1[peice1];
        this.gameBoard1[spot2].box = this.currentObject1[peice2];

        box.rotation = (box.rotation + 1) % 4
        
    }
}

swap3train(box,spot1,spot3,spot4,peice1,peice3,peice4){
    
    if(this.gameBoard1[spot1].box == undefined && this.gameBoard1[spot3].box == undefined && this.gameBoard1[spot4].box == undefined){
      
        let oldspot1 = (this.currentObject1[peice1].row * 10) + this.currentObject1[peice1].column;
       
        let oldspot3 = (this.currentObject1[peice3].row * 10) + this.currentObject1[peice3].column;
        let oldspot4 = (this.currentObject1[peice4].row * 10) + this.currentObject1[peice4].column;
    
        this.gameBoard1[oldspot1].box = undefined;
       
        this.gameBoard1[oldspot3].box = undefined;
        this.gameBoard1[oldspot4].box = undefined;


        this.currentObject1[peice1].row = Math.floor(spot1 / 10);
        this.currentObject1[peice1].column = spot1 % 10;

        

        this.currentObject1[peice3].row = Math.floor(spot3 / 10);
        this.currentObject1[peice3].column = spot3 % 10;
        
        this.currentObject1[peice4].row = Math.floor(spot4 / 10);
        this.currentObject1[peice4].column = spot4 % 10;

        

        this.gameBoard1[spot1].box = this.currentObject1[peice1];
        this.gameBoard1[spot3].box = this.currentObject1[peice3];
        this.gameBoard1[spot4].box = this.currentObject1[peice4];

        box.rotation = (box.rotation + 1) % 4
        
    
    }
}


  
  
  aitrain(){         
let game = true;      
    while(game){
          if(this.currentObject1 != undefined){
          
              let copyBoard = JSON.parse(JSON.stringify(this.gameBoard1));
              let copyCurrentObject = JSON.parse(JSON.stringify(this.currentObject1));
              let copyHoldObject = JSON.parse(JSON.stringify(this.holdObject1));
              for(let i = 0; i < copyCurrentObject.length; i++){
                  copyBoard[copyCurrentObject[i].row * 10 + copyCurrentObject[i].column].box = undefined;
              }

              let tetrus = new aiTetrus(copyBoard,copyCurrentObject,copyHoldObject);
              let result = tetrus.placeOneObject(this.one,this.two,this.three,this.four,this.five,this.six,this.seven);
              if(result === false){
                  game = false;
                  break;
              }else if(result[1].length > 0){
                  if(result[4]){
                    this.swapHoldtrain();              
                  }
                    let moves = result[1];
                    ++this.countmoves1
                    for(let i = moves.length - 1; i > 0; i--){
                        if(moves[i] == 1){
                        this.moveTiletrain(2)
                        }else if (moves[i] == 2){
                        this.moveTiletrain(1);
                        }else{
                        this.moveTiletrain(moves[i])
                        }
                    }
            
                    let loop = moves[0];
                    for(let i = 0; i < loop; i++){
                        this.moveTiletrain(4);        
                    }
                    if(this.checkForRowtrain()){
                    this.createObjecttrain(0);
                    }           
                }else{
                    game = false;
                    break;
                }  
          }else{
            this.createObjecttrain(0);
          } 
    }
    return this.countmoves1;   
  }

  returnMoves(){
      return this.countmoves1;
  }

}