//javascript for minesweeper
const boxSize = 30;
let board = [];
let height = 13;
let width = 20
let numberOfBombs = undefined;
let clock = null;
let firstClick = true;

function createBoard(){
    var div = document.createElement("div");
    div.id = "mineSweeperContainer";
    var body = document.getElementById("minesweeperHolder");
    body.appendChild(div);
    var easyButton = document.createElement("button");
    var easyText = document.createTextNode("Easy");
    easyButton.addEventListener("click",makebombs,event);
    easyButton.appendChild(easyText);
    easyButton.className = "difficulty"
    easyButton.value = 10;
    var mediumButton = document.createElement("button");
    var mediumText = document.createTextNode("Medium");
    mediumButton.addEventListener("click",makebombs,event);
    mediumButton.appendChild(mediumText);
    mediumButton.className = "difficulty"
    mediumButton.value = 25;
    var hardButton = document.createElement("button");
    var hardText = document.createTextNode("Hard");
    hardButton.addEventListener("click",makebombs,event);
    hardButton.appendChild(hardText);
    hardButton.className = "difficulty"
    hardButton.value = 40;
    div.appendChild(easyButton);
    div.appendChild(mediumButton);
    div.appendChild(hardButton);
    div.appendChild(document.createElement("br"));

    for(let i = 0; i < height; i++){
        board[i] = [];  
        for(let j = 0; j < width; j++){
            var btn = document.createElement("button");
            btn.setAttribute("class","mineSweeperButton");
            board[i][j] = {
                type: "empty",
                x: (i * boxSize),
                y: (j * boxSize),
                flagged: false,
                bombsTouching: null,
                button: btn
                
            };
            btn.style.left = j*boxSize + "px";
            btn.style.top = 500+i*boxSize +"px";
           // btn.style.borderStyle = "outset";
            div.appendChild(btn);
            var newtext = document.createTextNode("");
            btn.appendChild(newtext);
            btn.id = j;
            btn.value =i;
            btn.addEventListener("click",clicked, MouseEvent);
            btn.addEventListener("contextmenu",clicked, MouseEvent);  
        }
        var br = document.createElement("br");
        div.appendChild(br); 
    }
}  



function makebombs(event){
    let bombNumber;
    
    if(event == undefined){
        if(numberOfBombs == undefined){
            bombNumber = 10;
        }else{
            bombNumber = numberOfBombs;
        }
    }else{
        bombNumber = parseInt(event.target.value);
    }
    numberOfBombs = bombNumber;
    if(firstClick){
        firstClick = false;
    }else{
        resetMineSweeper();
    }
    for(let i = 0; i < bombNumber; i++){
        let rowNumber = Math.floor((Math.random() * height));
        let collomNumber = Math.floor((Math.random() * width));
        if(board[rowNumber][collomNumber].type == "bomb" || board[rowNumber][collomNumber].type == "cleared"){
            i--;  
        }else{
            board[rowNumber][collomNumber].type = "bomb";
        }
    }
    drawMinesweeper();
}

function drawMinesweeper(){
   
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){

            let button = board[i][j].button;

            if(board[i][j].flagged == true){
                button.style.backgroundImage = "none"
                button.style.backgroundSize = "30px 30px"
                button.style.backgroundImage = "URL('../Images/flag.jpeg')"
            }

            if(board[i][j].type == "cleared"){
                button.style.background = "rgb(150,150,150)"
                button.disabled = true;
            }
                    
            let bombCount = board[i][j].bombsTouching;
            let color;
            if(bombCount == 0){
                board[i][j].bombsTouching = null;
            }else if(bombCount == 1){
               
                color = "RGB(70,0,255)";
            }else if(bombCount == 2){
                
                color = "RGB(0,131,7)";
            }else if(bombCount == 3){
               
                color =  "RGB(255,0,0)";
            }else if(bombCount == 4){
                
                color = "RGB(29,0,127)";
            }else if(bombCount == 5){
                
                color = "RGB(136,0,0)";
            }else if(bombCount == 6){
                
                color = "RGB(0,132,131)";
            }
            else if(bombCount == 7){
                
                color = "RGB(0,0,0)";
            }else if(bombCount == 8){
                    
                    color = "RGB(128,128,128)";
            }
            
            if(board[i][j].bombsTouching != null){
                var newtext = document.createTextNode(bombCount);
                button.setAttribute("STYLE","color:"+ color);
               // button.style.borderStyle = "inset";
                button.style.left = i*boxSize + "px";
                button.style.top = 500 + j*boxSize +"px";
                while (button.firstChild) {
                    button.removeChild(button.firstChild);
                  }
                button.appendChild(newtext);
            }
        }
    }
    checkWin();
}



function resetMineSweeper(){
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            let button = board[i][j].button;
            var newtext = document.createTextNode("");
            board[i][j].type = "empty";
          //  button.style.borderStyle = "outset";
            button.style.left = i*boxSize + "px";
            button.style.top = 500 + j*boxSize +"px";
            button.style.backgroundImage = "none";
            while (button.firstChild) {
                button.removeChild(button.firstChild);
              }
            button.appendChild(newtext);
            button.style.borderColor = "black";
            button.style.backgroundColor = "rgb(187,189,189)"
            button.disabled = false;
            bombCount = undefined;
            board[i][j].flagged = false;
            board[i][j].bombsTouching = null;
        }
    }

}


function checkWin(){

    let count = 0;
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(board[i][j].flagged == true && board[i][j].type == "bomb"){
                count++;
            }
       
        }
    }
    if(count == numberOfBombs){
        alert("you win");
        showBombs();
        return;
    }

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(board[i][j].type != "bomb" && board[i][j].button.disabled == false){
                return;
            }
        }
    }

    alert("you win");
    showBombs();

}

function loose(){
    showBombs();
    
}

function showBombs(){
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            board[i][j].button.style.backgroundImage = "none";
            board[i][j].flagged = false;
            if(board[i][j].type == "bomb"){
            let button = board[i][j].button;
            while (button.firstChild) {
                button.removeChild(button.firstChild);
            }

            button.style.backgroundImage = "URL('../Images/bomb.png')"
            button.style.backgroundSize = "30px 30px"
            //button.style.backgroundImage = "URL('https://static-s.aa-cdn.net/img/ios/1168282474/a56bd269f247d1b7cca22b0f0e912eef?v=1')";
            }
        }
    }
}

function flagButton(i,j){ 
    if(board[i][j].flagged){
        board[i][j].flagged = false;
    } else{
    board[i][j].flagged = true;
    }
}

function select(i,j){
    
    if(board[i][j].type == "empty"){
        board[i][j].type = "cleared";
        board[i][j].bombsTouching = checkBeside(i,j);    
        
    }else if(board[i][j].type == "bomb"){
        board[i][j].button.style.borderColor = "RGB(255,0,0)";
        loose();
    }
}

function clicked(MouseEvent){
    let x;
    let y;
    if(event.target.tagName == "DIV"){
        let button = event.target.parentElement;
        y = parseInt(button.id);
        x = parseInt(button.value);
        var newtext = document.createTextNode("");
        button.replaceChild(newtext,event.target);
    }else{
     y = parseInt(event.target.id);
     x = parseInt(event.target.value);
    }
    if(event.button == 2){
        flagButton(x,y);
    }else{
        if(firstClick){
            board[x][y].type = "cleared";
            first(x,y);
            board[x][y].bombsTouching = select(x,y);
            firstClick = false;

        }else{
            board[x][y].flagged = false;
            select(x,y);
        }
       
    }
    drawMinesweeper();
}


function first(i,j){

    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if(x != 0 || y != 0 ){
                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    board[xValue][yValue].type == "cleared";
                }
            }
        }
    }

    makebombs(undefined);
    board[i][j].type = "empty";

    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if(x != 0 || y != 0 ){
                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    board[xValue][yValue].type = "empty";
                }
            }
        }
    }
}



function checkBeside(i,j){   
    let count = 0;
    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if(x != 0 || y != 0 ){
                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    if(board[xValue][yValue].type == "bomb" ){
                        
                     count++;   
                    }
                }
            }
        }
    }
    if(count == 0){
        for(let x = -1; x < 2; x++){
            for(let y = -1; y < 2; y++){
                if(x != 0 || y != 0 ){
                    xValue = i+x;
                    yValue = j+y;
                    if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                        select(xValue,yValue);
                    }
                }
            }
        }
    }
   
    return count;
}

function rightmouse(e){
    let i = Math.floor((e.clientX) / (boxSize)) - 1;
    let j = Math.floor((e.clientY) / (boxSize)) - 5;
    
    if(e.shiftKey){
        flagButton(i,j);
    }
    else if(i >= 0 && i < boxSize && j>=0 && j < boxSize){
        select(i,j);
    }
    
}

function startNewGame(){
        clock = new Date();
        document.removeEventListener("keydown",startNewGame);
       document.addEventListener("mousedown",rightmouse,MouseEvent);
        game = setInterval(draw,10);
    
}

document.addEventListener('contextmenu', event => event.preventDefault());
createBoard();

