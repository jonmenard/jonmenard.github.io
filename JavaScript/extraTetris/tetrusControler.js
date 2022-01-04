 //astetics for the game
 const boxWidth = 30;
 const boxHeight = boxWidth;
 const lineHeight = 1;

var tetrisCanvas = new TetrisCanvas(lineHeight,boxHeight,boxWidth);
var teris = new Tetris();
let resetButton = document.getElementById("tetrusStart");
       // resetButton.addEventListener("click",startGame);

document.addEventListener("keydown",keyPress);           


function keyPress(event){
    let keyPressed = event.keyCode;
    if(keyPressed == 40 || keyPressed == 39 || keyPressed == 38 || keyPressed == 37 || keyPressed == 13 || keyPressed == 32){
        event.preventDefault();
    }
    moveTile(keyPressed)
}

function moveTile(event ){
    let keyPressed = event
    switch (keyPressed){
        case 1:
        case 65:
        case 37:  
            teris.moveLeft()
            break;
        case 2:
        case 68:
        case 39: //change to move right
            // check that all the boxes in the current object can move right
            teris.moveRight()
            break;
        case 4:
        case 83:
        case 40:  // change to move down
            teris.moveDown()
        break;    
        case 5:
        case 65:
        case 32:
            // swapHold();
            teris.ai();
            break;
        case 3:
        case 87:
        case 38:
            teris.rotate()
            break;
        case 6:
        case 13:
            teris.dropPiece();
    }
    tetrisCanvas.draw(teris.predictLanding());
}