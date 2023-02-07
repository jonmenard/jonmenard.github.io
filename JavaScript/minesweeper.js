//javascript for minesweeper

let board = [];
let height = 24;
let width = 25
let numberOfBombs = undefined;
let clock = null;
let firstClick = true;
let gameInProgress = false
let difficulty
let difficultyColors
let colors  = ["RGB(70,0,255)","RGB(0,131,7)","RGB(255,0,0)","RGB(29,0,127)","RGB(136,0,0)","RGB(0,132,131)","RGB(0,0,0)","RGB(128,128,128)"]
let selectedDifficulty
let undiscovered
var bombsLeft

function createBoard(){

    console.log("here")

    var div = document.createElement("div");
    div.id = "mineSweeperContainer";
    var body = document.getElementById("minesweeperHolder");
    body.innerHTML = '';20
    body.appendChild(div);
    var easyButton = document.createElement("button");
    var easyText = document.createTextNode("Easy");
    easyButton.addEventListener("click",makebombs,event);
    easyButton.appendChild(easyText);
    easyButton.className = "difficulty"
    easyButton.id = "Easy"
    easyButton.value = 20;
    easyButton.style.height = boxWidth + "px ";
    //easyButton.style.textDecoration = "underline green";
    var mediumButton = document.createElement("button");
    var mediumText = document.createTextNode("Medium");
    mediumButton.addEventListener("click",makebombs,event);
    mediumButton.appendChild(mediumText);
    mediumButton.className = "difficulty"
    mediumButton.id = "Medium"
    mediumButton.value = 50;
    mediumButton.style.height = boxWidth + "px ";
    var hardButton = document.createElement("button");
    var hardText = document.createTextNode("Hard");


    bombsLeft = document.createElement("div");
    bombsLeft.disabled = true;
    bombsLeft.className = "mineCounter "
    // bombsLeftText = document.createTextNode("80");
    //bombsLeftText.className = "mineCounter "
    bombsLeft.style.height = boxWidth + "px ";
    // bombsLeft.appendChild(bombsLeftText);



    hardButton.addEventListener("click",makebombs,event,);
    hardButton.appendChild(hardText);
    hardButton.className = "difficulty"
    hardButton.id = "Hard"
    hardButton.value = 80;
    hardButton.style.height = boxWidth + "px ";


    var expertButton = document.createElement("button");
    var expertText = document.createTextNode("Expert");
    expertButton.addEventListener("click",makebombs,event);
    expertButton.appendChild(expertText);
    expertButton.className = "difficulty"
    expertButton.id = "Expert"
    expertButton.value = 120;
    expertButton.style.height = boxWidth + "px ";

    difficulty = {
       "Easy": easyButton,
       "Medium":mediumButton,
       "Hard":hardButton,
       "Expert": expertButton
    };

    difficultyColors = {
        "Easy": colors[0],
        "Medium":colors[1],
        "Hard":colors[2],
        "Expert": colors[5]
     };


    selectedDifficulty = easyButton.id

    div.appendChild(easyButton);
    div.appendChild(mediumButton);
    div.appendChild(hardButton);
    div.appendChild(expertButton);
    div.appendChild(bombsLeft);
    div.appendChild(document.createElement("br"));

    for(let i = 0; i < height; i++){
        board[i] = [];  
        for(let j = 0; j < width; j++){
            var btn = document.createElement("button");
            btn.setAttribute("class","mineSweeperButton");
            if(j == 0 ){
                btn.classList.add("clear");
            }else{
                btn.classList.add("float");
            }  
            board[i][j] = {
                type: "empty",
                x: (i * boxWidth),
                y: (j * boxWidth),
                flagged: false,
                bombsTouching: null,
                button: btn
                
            };
            //btn.style.left = j*boxWidth + "px";
            //btn.style.top = boxWidth * 20 +i*boxWidth +"px";
            btn.style.height = boxWidth + "px ";
            btn.style.width = boxWidth + "px ";
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

    $("#minesweeperHolder").css("width", 24 * boxWidth -5); //1076 - 25
    $("#minesweeperHolder").css("height", 24 * boxWidth -5);
    $("#mineSweeperContainer").css("width", 24 * boxWidth -5);
    $("#mineSweeperContainer").css("height", 24 * boxWidth -5);

    makebombs()
}  



function makebombs(event, i, j){
    let bombNumber;
    firstClick = true
    gameInProgress = true

    
    if(event == undefined){
        if(numberOfBombs == undefined){
            bombNumber = 20;
            difficulty["Easy"].style.textDecoration = "underline " + colors[0]
        }else{
            bombNumber = numberOfBombs;
            
        }
    }else{
        bombNumber = parseInt(event.target.value);
        selectedDifficulty = event.target.id
        for (var key in difficulty) {
            difficulty[key].style.textDecoration = "none"
        }
    }
    difficulty[selectedDifficulty].style.textDecoration = "underline " + difficultyColors[selectedDifficulty]

    numberOfBombs = bombNumber;
    undiscovered = bombNumber;
    bombsLeft.innerHTML = undiscovered
    
    resetMineSweeper();
    
    
    drawMinesweeper();
}

function drawMinesweeper(){
   
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){

            let button = board[i][j].button;

            if(board[i][j].flagged == true){
                button.style.backgroundImage = "none"
                button.style.backgroundSize = boxWidth+ "px " + boxWidth + "px"
                button.style.backgroundImage = "URL('Images/flag.jpeg')"
            }

            if(board[i][j].type == "cleared"){
                button.style.background = "rgb(150,150,150)"
                button.disabled = true;
            }
                    
            let bombCount = board[i][j].bombsTouching;
            let color
            if(bombCount == 0){
                board[i][j].bombsTouching = null;
            }else{
                color = colors[bombCount-1];
            }
            
            
            if(board[i][j].bombsTouching != null){
                var newtext = document.createTextNode(bombCount);
                button.setAttribute("STYLE","color:"+ color);
               // button.style.borderStyle = "inset";
                button.style.left = i*boxWidth + "px";
                button.style.top = boxWidth * 20 + j*boxWidth +"px";
                while (button.firstChild) {
                    button.removeChild(button.firstChild);
                }

                //button.innerText = bombCount
                //newtext.style.margin = 0
                //newtext.style.margin = 0 + "px ";
                //newtext.style.padding = 0 + "px ";

                button.appendChild(newtext);
                button.style.height = boxWidth + "px ";
                button.style.width = boxWidth + "px ";
                button.style.width = boxWidth + "px ";
                button.style.lineheight = 0 + "px ";
                
            }
        };
    }
    if(gameInProgress){
        checkWin();
    }
}



function resetMineSweeper(){
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            let button = board[i][j].button;
            var newtext = document.createTextNode("");
            board[i][j].type = "empty";
          //  button.style.borderStyle = "outset";
            button.style.left = i*boxWidth + "px";
            button.style.top = boxWidth * 20 + j*boxWidth +"px";
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
    gameInProgress = false
    
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

            button.style.backgroundImage = "URL('Images/bomb.png')"
            button.style.backgroundSize = boxWidth+ "px " + boxWidth + "px"
            //button.style.backgroundImage = "URL('https://static-s.aa-cdn.net/img/ios/1168282474/a56bd269f247d1b7cca22b0f0e912eef?v=1')";
            }
        }
    }
}

function flagButton(i,j){
    if(board[i][j].flagged){
        undiscovered++
        
        board[i][j].flagged = false;
        board[i][j].button.style.backgroundImage = "";
    } else{
        board[i][j].flagged = true;
        undiscovered--;
    }
    bombsLeft.innerHTML = undiscovered
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
    if(MouseEvent.target.tagName == "DIV"){
        let button = MouseEvent.target.parentElement;
        y = parseInt(button.id);
        x = parseInt(button.value);
        var newtext = document.createTextNode("");
        button.replaceChild(newtext,event.target);
    }else{
     y = parseInt(MouseEvent.target.id);
     x = parseInt(MouseEvent.target.value);
    }
    if(MouseEvent.button == 2){
        if(gameInProgress && !firstClick){
            flagButton(x,y);
        }
    }else{
        if(gameInProgress || firstClick){
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
       
    }
    drawMinesweeper();
}


function first(a,b){

    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if(x != 0 || y != 0 ){
                let xValue = a+x;
                let yValue = b+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    board[xValue][yValue].type == "cleared";
                }
            }
        }
    }

    makebombs(undefined);

    let bombNumber = numberOfBombs
    for(let i = 0; i < bombNumber; i++){
        let rowNumber = Math.floor((Math.random() * height));
        let collomNumber = Math.floor((Math.random() * width));
        if(board[rowNumber][collomNumber].type == "bomb" || board[rowNumber][collomNumber].type == "cleared"){
            i--;  
        }else{
            board[rowNumber][collomNumber].type = "bomb";
        }

        if(a != undefined && b != undefined){
            for(let x = -1; x < 2; x++){
                for(let y = -1; y < 2; y++){
                    if(x != 0 || y != 0 ){
                        let xValue = a+x;
                        let yValue = b+y;
                        if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                            if(board[xValue][yValue].type == "bomb"){
                                board[xValue][yValue].type = "empty"
                                i--;
                            }
                        }
                    }
                }
            }

            if(board[a][b].type == "bomb" || board[a][b].type == "cleared"){
                board[a][b].type = "empty"
                i--;
            }
        }

        drawMinesweeper();


    }




    // board[i][j].type = "empty";

    // for(let x = -1; x < 2; x++){
    //     for(let y = -1; y < 2; y++){
    //         if(x != 0 || y != 0 ){
    //             let xValue = i+x;
    //             let yValue = j+y;
    //             if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
    //                 if(board[xValue][yValue].type == "bomb" ){
    //                     undiscovered--
    //                 }
                    
    //                 board[xValue][yValue].type = "empty";
    //             }
    //         }
    //     }
    // }
    bombsLeft.innerHTML = undiscovered
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
    let i = Math.floor((e.clientX) / (boxWidth)) - 1;
    let j = Math.floor((e.clientY) / (boxWidth)) - 5;
    
    if(e.shiftKey){
        flagButton(i,j);
    }
    else if(i >= 0 && i < boxWidth && j>=0 && j < boxWidth){
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
//window.addEventListener("resize", createBoard);
createBoard();


