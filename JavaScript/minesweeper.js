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
let solver = null

let tilesToClick = null
let clickIndex = 0

let randomClick = false
let randomProb = 0

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

    var rightDiv =  document.createElement("div");
    rightDiv.className = "right "

    var centerDiv =  document.createElement("div");
    centerDiv.className = "center "

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

    var solveButton = document.createElement("button");
    var solveText = document.createTextNode("Solve");
    solveButton.addEventListener("click",runSolver,event);
    solveButton.appendChild(solveText);



    solveButton.className = " solver"
    solveButton.style.height = boxWidth + "px ";

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

    centerDiv.appendChild(easyButton);
    centerDiv.appendChild(mediumButton);
    centerDiv.appendChild(hardButton);
    centerDiv.appendChild(expertButton);
    rightDiv.appendChild(solveButton);
    rightDiv.appendChild(bombsLeft);
    div.appendChild(centerDiv);
    centerDiv.appendChild(rightDiv);
    

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
                button: btn,
                lastClicked: false,
                knownEmpty: false,
                
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
    centerDiv.style.height = boxWidth + 1;
    $("#minesweeperHolder").css("width", 24 * boxWidth -5); //1076 - 25
    $("#minesweeperHolder").css("height", 24 * boxWidth -5);
    $("#mineSweeperContainer").css("width", 24 * boxWidth -5);
    $("#mineSweeperContainer").css("height", 24 * boxWidth -3);

    makebombs()
}  



function makebombs(event, i, j){

    

    let bombNumber;
    firstClick = true
    gameInProgress = true

    
    if(event == undefined){
        if(numberOfBombs == undefined){
            bombNumber = 20;
            difficulty["Easy"].style.textDecoration = "underline " 
            difficulty["Easy"].style.textDecorationColor = colors[0]
        }else{
            bombNumber = numberOfBombs;
            
        }
    }else{
        bombNumber = parseInt(event.target.value);
        selectedDifficulty = event.target.id
        for (var key in difficulty) {
            difficulty[key].style.textDecoration = "underline"
            difficulty[key].style.textDecorationColor = "rgb(189, 189,189)"
        }
    }
    difficulty[selectedDifficulty].style.textDecoration = "underline "
    difficulty[selectedDifficulty].style.textDecorationColor = difficultyColors[selectedDifficulty]

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
                board[i][j].bombsTouching = 0;
            }else{
                color = colors[bombCount-1];
            }
            
            
            if(board[i][j].bombsTouching != null && board[i][j].bombsTouching != 0){
                var newtext = document.createTextNode(bombCount);
                button.setAttribute("STYLE","color:"+ color);
               // button.style.borderStyle = "inset";
                button.style.left = i*boxWidth + "px";
                button.style.top = boxWidth * 20 + j*boxWidth +"px";
                while (button.firstChild) {
                    button.removeChild(button.firstChild);
                }

                // if(board[i][j].lastClicked){
                //     board[i][j].lastClicked = false
                //     button.setAttribute("STYLE","color:"+ "yellow");
                // }

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

            if(board[i][j].lastClicked){
                board[i][j].lastClicked = false
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
            board[i][j].knownEmpty = false
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
        gameInProgress = false
        alert("you win");
        showBombs();
        clearInterval(solver)
        return;
    }

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(board[i][j].type != "bomb" && board[i][j].button.disabled == false){
                return;
            }
        }
    }
    gameInProgress = false
    alert("you win");
    clearInterval(solver)
    showBombs();

}

function loose(){
    clearInterval(solver) 
    if(randomClick){
        alert("Solver Failed: random click had " + (randomProb * 100).toFixed(2) + "% chance of hitting bomb");
    }
    randomClick = false
    showBombs();
    gameInProgress = false
    
}

function showBombs(){
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            board[i][j].button.style.backgroundImage = "none";
            board[i][j].flagged = false;
            
            if(board[i][j].type == "bomb" && !board[i][j].flagged){
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
                board[x][y].lastClicked = true
                board[x][y].flagged = false;
                select(x,y);
            }
        }
       
    }
    drawMinesweeper();
}

function runSolver(){
    clearInterval(solver)
    solver = setInterval(solve, 10);
}

function solve(){

    if(firstClick){
        var i = Math.floor(Math.random() * 10);
        var j = Math.floor(Math.random() * 10);
        board[i][j].button.click()
        //return

    }

    let checkRadius = 1
    
    let solution = true

    let counter  = 1000

    if(gameInProgress ){
        
        solution = false
        //await sleep(10);
        findButton:
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){

                if(board[i][j].bombsTouching == null || board[i][j].bombsTouching == 0){ // only check square that have a number
                    continue;
                }

 
                var bombTiles = board[i][j].bombsTouching;
                var undiscoveredTiles = 0

                for(let x = -1; x < 2; x++){
                    for(let y = -1; y < 2; y++){
                        if(x != 0 || y != 0 ){
                            let xValue = i+x;
                            let yValue = j+y;
                            if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){

                                if(board[xValue][yValue].bombsTouching == null && (!board[xValue][yValue].flagged) && board[xValue][yValue].type != "cleared"){
                                    undiscoveredTiles++;
                                }

                                if(board[xValue][yValue].flagged){
                                    bombTiles--;
                                }
                            }
                        }
                    }
                }

                if(bombTiles == undiscoveredTiles){
                    //console.log("they are equal")
                    for(let x = -1; x < 2; x++){
                        for(let y = -1; y < 2; y++){
                            if(x != 0 || y != 0 ){
                                let xValue = i+x;
                                let yValue = j+y;
                                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                                    if((!board[xValue][yValue].flagged) && board[xValue][yValue].bombsTouching == null && board[xValue][yValue].type != "cleared"){
                                        flagButton(xValue,yValue);
                                        solution = true
                                        drawMinesweeper()
                                        //console.log("click 1" + i + " " + j)
                                        break findButton
                                    }
                                }
                            }
                        }
                    }
                }

                if((bombTiles == 0 && undiscoveredTiles > 0)){
                    //console.log("they is more")
                    for(let x = -1; x < 2; x++){
                        for(let y = -1; y < 2; y++){
                            if(x != 0 || y != 0 ){
                                let xValue = i+x;
                                let yValue = j+y;
                                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                                    if( (!board[xValue][yValue].flagged) && board[xValue][yValue].bombsTouching == null && board[xValue][yValue].type != "cleared"){
                                        solution = true
                                        board[xValue][yValue].button.click()
                                        //drawMinesweeper()
                                        //console.log("click 2 " + board[i][j].bombsTouching + " " +  i + " " + j)
                                        break findButton
                                    }
                                }
                            }
                        }
                    }
                }

                if(undiscoveredTiles > 0 && bombTiles == 1){
                    for(let x = -1; x < 2; x++){
                        for(let y = -1; y < 2; y++){
                            if(x != 0 || y != 0 ){
                                let xValue = i+x;
                                let yValue = j+y;
                                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                                    if(board[xValue][yValue].bombsTouching > 0){

                                        if(solveNeighbourLimit(i, j, xValue, yValue)){
                                            //console.log("usedNeightbourSolve" + i + " " + j + " " + xValue + " " + yValue)
                                            solution = true
                                            break findButton
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                if(undiscoveredTiles > 0 && bombTiles > 1){
                    for(let x = -2; x < 3; x++){
                        for(let y = -2; y < 3; y++){
                            if(x != 0 || y != 0 ){
                                let xValue = i+x;
                                let yValue = j+y;
                                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                                    if(board[xValue][yValue].bombsTouching > 0){

                                        if(solveSelfLimit(i, j, bombTiles, xValue, yValue)){
                                            //console.log("usedSolveSelfLimt" + i + " " + j + " " + xValue + " " + yValue)
                                            solution = true
                                            break findButton
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                
                


            }
        }
        //drawMinesweeper()
    }
    if(!solution)
        bruteForce()
}




function solveBombsRemaining(){

}


function solveSelfLimit(i,j,bombTiles, a,b){


    // bombs left more than 1 
    // neighbour has 0 not shared
    // all bombs can't be



    let radius = 2
    let shared = 0
    let notShared = 0
    let remainingSquares = 0
    let bombs = board[a][b].bombsTouching

    for(let x = (-1 - radius); x < (2 + radius); x++){
        for(let y = (-1 - radius); y < (2 + radius); y++){
            
            let xValue = i+x;
            let yValue = j+y;
            if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){

                if(board[xValue][yValue].bombsTouching == null && (!board[xValue][yValue].flagged) && board[xValue][yValue].type != "cleared"){
                    if(Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1 && Math.max(Math.abs(xValue - i),Math.abs(yValue - j)) == 1){
                        shared++
                    }else if (Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1 && Math.max(Math.abs(xValue - i),Math.abs(yValue - j)) > 1){
                        notShared++
                    }else{
                        remainingSquares++
                    }
                }else if(board[xValue][yValue].flagged){
                    if(Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1){
                        bombs--
                    }
                }
            }
        }
    }


    if((notShared == 0 && shared > 0 && bombs == 1 && remainingSquares < bombTiles) ){
        for(let x = -1; x < 2; x++){
            for(let y = -1; y < 2; y++){

                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    if(Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1){
                        continue
                    }
                    if( (!board[xValue][yValue].flagged) && board[xValue][yValue].bombsTouching == null && board[xValue][yValue].type != "cleared"){
                        flagButton(xValue,yValue);
                        //board[xValue][yValue].bombsTouching * 
                        //console.log(notShared + ' ' + bombs + " " + shared)
                        drawMinesweeper()
                        return true
                    }
                }
            }
        }

    }

    return false

}

function solveNeighbourLimit(i,j, a, b){

    let radius = 1
    let shared = 0
    let notShared = 0
    let bombs = board[a][b].bombsTouching

    for(let x = (-1 - radius); x < (2 + radius); x++){
        for(let y = (-1 - radius); y < (2 + radius); y++){
            
            let xValue = i+x;
            let yValue = j+y;
            if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){

                if(board[xValue][yValue].bombsTouching == null && (!board[xValue][yValue].flagged) && board[xValue][yValue].type != "cleared"){
                    if(Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1 && Math.max(Math.abs(xValue - i),Math.abs(yValue - j)) == 1){
                        shared += 1
                    }else if (Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1 && Math.max(Math.abs(xValue - i),Math.abs(yValue - j)) > 1){
                        notShared += 1
                    }
                }else if(board[xValue][yValue].flagged){
                    if(Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1){
                        bombs--
                    }
                }
            }
        }
    }

    if((notShared < bombs && shared > 0) ){
        for(let x = -1; x < 2; x++){
            for(let y = -1; y < 2; y++){

                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    if(Math.max(Math.abs(xValue - a), Math.abs(yValue - b)) == 1){
                        continue
                    }
                    if( (!board[xValue][yValue].flagged) && board[xValue][yValue].bombsTouching == null && board[xValue][yValue].type != "cleared"){
                        board[xValue][yValue].button.click()
                    //board[xValue][yValue].bombsTouching * 
                        //console.log(notShared + ' ' + bombs + " " + shared)
                        return true
                    }
                }
            }
        }

    }

    return false
}


function isBoundaryTile(i,j){
    if(!isUnclickedTile(i,j))
        return false
    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if(x != 0 || y != 0 ){
                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    if(board[xValue][yValue].bombsTouching != 0 && board[xValue][yValue].bombsTouching != null){
                        return true
                    }
                }
            }
        }
    }
    return false
}

function isUnclickedTile(i,j){
    return (board[i][j].bombsTouching == null && (!board[i][j].flagged) && board[i][j].type != "cleared")
}

function isTouching(i,j,x,y){
    return (Math.max(Math.abs(i-x), Math.abs(j-y)) == 1)
}


function findSubsections(tiles) {
    const subSections = [];
    const visited = new Set();
    

    function dfs(tile, subsection) {
        visited.add(tile);
        subsection.push(tile);
        
        for (const nextTile of tiles) {
            if (visited.has(nextTile)) continue;
            if (isTouching(tile.height,tile.width,nextTile.height, nextTile.width)) {
                dfs(nextTile, subsection);
            }
        }
    }
    
    for (const tile of tiles) {
        if (visited.has(tile)) continue;
        const subsection = [];
        dfs(tile, subsection);
        subSections.push(subsection);
    }




    subSections.sort((a, b) => a.length - b.length);
    
    return subSections;
}


function makeSubBoard(minY, maxY, minX, maxX){
    var subBoard = []
    

    var _minHeight = Math.max(0,minY-2)
    var _maxHeight = Math.min(height,maxY+2)

    var _minWidth = Math.max(0,minX-2)
    var _maxWidth = Math.min(height,maxX+2)


    for(let i = _minHeight; i <= _maxHeight; i++){
        subBoard[i] = []
        for(let j = _minWidth; j <= _maxWidth; j++){
            if(i >= 0 && i < height && j >= 0 && j < width){

                let tile = Object.assign({}, board[i][j])
                subBoard[i][j] = tile
                subBoard[i][j].button = {"height": i, "width": j}
            }
        }
    }
    return subBoard
}


function clickBoard() {
    if(tilesToClick == null){
        clearInterval(solver)
        runSolver()
    }else{
        tilesToClick[clickIndex].button.click()
        clickIndex -= 1
        if(clickIndex == -1){
            tilesToClick = null
        }
    }
}

function bruteForce(){

    if(!gameInProgress)
        return

    console.log("inside brute force")
    let boundryTiles = []
    let unClickedTiles = []

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){

            let tile = {"height": i, "width": j}

            if(isBoundaryTile(i,j)){
                boundryTiles.push(tile)
            }else if(isUnclickedTile(i,j)){
                unClickedTiles.push(tile)
            }
        }
    }

    let subSections
    if(undiscovered < 10){
        subSections = [boundryTiles]
    }else{
        subSections = findSubsections(boundryTiles)
    }


    //let numOutSquares = emptyTiles.length - boundryTiles.length;
    
    
    console.log(subSections.length + " subsections found")
    let bombsProbArray = []
    let solved = false;
    let combinationsFound = []
    let minimumRequired = 0
    for (const subSection of subSections) {

        if(subSection.length > 41){
            continue
        }

        let possibleBombs = new Set()
        let possibleBombsArray = []
        let attempts = [0]
        let minBombs = [undiscovered]
        if(!gameInProgress)
            return

        let minHeight = subSection[0].height
        let maxHeight = minHeight

        let minWidth = subSection[0].width
        let maxWidth = minWidth


        for(const tile of subSection){
            if(tile.height < minHeight)
                minHeight = tile.height
            if(tile.height > maxHeight)
                maxHeight = tile.height
            if(tile.width < minWidth)
                minWidth = tile.width
            if(tile.width > maxWidth)
                maxWidth = tile.width
        }

        let subBoard = makeSubBoard(minHeight, maxHeight, minWidth, maxWidth)
        console.log("Attempting bruteforce for " + subSection.length + " tile large section")
        bruteForceRecursive(subSection, subBoard,minHeight,minWidth, maxHeight - minHeight,maxWidth-minWidth, 0, possibleBombs, 0, possibleBombsArray, attempts, minBombs) // fill possible bombs with valid bomb loctations
        
        if(possibleBombsArray.length > 0){
            combinationsFound.push(attempts[0])
            console.log(attempts[0] + " different bomb combinations were found")
            console.log(minBombs[0] + " is the minimum number of bombs for a solution")
            minimumRequired += minBombs[0]
            bombsProbArray.push(possibleBombsArray)
        }
        if(possibleBombs.size != 0 && gameInProgress){
            //console.log(possibleBombs)
            tilesToClick = []
            clickIndex = -1
            for(const tile of subSection){
                if(possibleBombs.has(subBoard[tile.height][tile.width].button))
                    continue

                tilesToClick.push(board[tile.height][tile.width])
                clickIndex++
                //board[tile.height][tile.width].button.click()
                //console.log("tile clicked ", tile.height, tile.width)
                solved = true
                if(solved){
                    clearInterval(solver)
                    solver = setInterval(clickBoard, 10);
                    return
                }
            }
            

            

        }
    }
    
    if(!solved && bombsProbArray.length > 0){
        

        let lowestProb = Infinity
        let selection = null
        
        for(let i = 0; i < bombsProbArray.length; i++){
            const bombs = bombsProbArray[i]
        
            let occurances = countCoordinates(bombs)
            let minCount = Infinity;
            let argMin = null;
            let maxCount = -Infinity
           
            for (let tile in occurances) {

                if (occurances[tile] < minCount) {
                    minCount = occurances[tile];
                    argMin = tile;
                }

                if (occurances[tile] > maxCount) {
                    maxCount = occurances[tile];
                }
                
        
            }
            // console.log(minCount)
            // console.log(combinationsFound[i])
            if( (minCount /combinationsFound[i]) < lowestProb || selection == null){
                lowestProb = minCount / combinationsFound[i]
                selection = argMin
            }


        }

        let [x, y] = selection.split(',').map(Number);
        if(unClickedTiles.length > 0){
            let randomUnclikedProb = (undiscovered - minimumRequired) / unClickedTiles.length
            //console.log(randomUnclikedProb)
            if(randomUnclikedProb < lowestProb){
                console.log("Non-Boundary tile had lower prob " + randomUnclikedProb +  " vs " + lowestProb)
                lowestProb = randomUnclikedProb
                let randomTile = unClickedTiles[Math.floor(Math.random()*unClickedTiles.length)];
                x = randomTile.height;
                y = randomTile.width;
            }
        }
            

        console.log("No Solution going to click lowest prob")
        randomClick = true
        randomProb = lowestProb
        board[x][y].button.click()
        randomClick = false

    }else{

        console.log("Subsection is too long to solve ")
        let randomUnclikedProb = (undiscovered) / unClickedTiles.length
        let lowestProb = randomUnclikedProb
        let randomTile = unClickedTiles[Math.floor(Math.random()*unClickedTiles.length)];
        let x = randomTile.height;
        let y = randomTile.width;
            
        randomClick = true
        randomProb = lowestProb
        board[x][y].button.click()
        randomClick = false
    }

    

    

}

function bruteForceRecursive(subSection, _board,minHeight, minWidth, height_b, width_b, k, possibleBombs, newBombs, possibleBombsArray, attempts, minBombs){
    //console.log(subSection)
    //console.log(_board)
    let flagCount = checkBoardValidity(_board, minHeight, minWidth, height_b, width_b)
    if(flagCount < 0)
        return

    if(newBombs > bombsLeft){
        return
    }

    if(k == subSection.length){ // a valid solution was found for this subsection of boundrytiles
        

        // for(let i = 0; i <= height_b; i++){
        //     for(let j = 0; j <= width_b; j++){
        //         //console.log("Adding possible bombs")
        //         possibleBombs.add(_board[minHeight + i][minWidth + j].button) // add the x y tile to the set (no duplicates)
        //         possibleBombsArray.push(_board[minHeight + i][minWidth + j].button)
        //     }
        // }

        for (const tile of subSection){
            //console.log("Adding possible bombs")
            if(_board[tile.height][tile.width].flagged){
                possibleBombs.add(_board[tile.height][tile.width].button) // add the x y tile to the set (no duplicates)
                possibleBombsArray.push(_board[tile.height][tile.width].button)
            }

            if(minBombs[0] > newBombs){
                minBombs[0] = newBombs
            }
            
        }

        attempts[0] = attempts[0] + 1
        return
    }


    // either a tile is a mine or not. Try both
    //console.log(k)
    let tileCoord = subSection[k]
    let x = tileCoord.height
    let y = tileCoord.width

    _board[x][y].flagged = true // try with it being a mine
    bruteForceRecursive(subSection, _board, minHeight, minWidth, height_b, width_b, k+1,possibleBombs, newBombs+1, possibleBombsArray, attempts, minBombs)
    _board[x][y].flagged = false
    _board[x][y].knownEmpty = true // try with it being a known empty
    bruteForceRecursive(subSection, _board, minHeight, minWidth, height_b, width_b, k+1, possibleBombs, newBombs,possibleBombsArray, attempts,minBombs)
    _board[x][y].knownEmpty = false
}

function countCoordinates(tiles) {
    let count = {};
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        let key = `${tile.height},${tile.width}`;
        if (count[key]) {
            count[key]++;
        } else {
            count[key] = 1;
        }
    }
    return count;
}


function checkAroundTile(_board, i, j){

    let neighbours = 0
    let flags = 0
    let undiscoveredTiles = 0
    let knownEmpty = 0

    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
            if(x != 0 || y != 0 ){
                let xValue = i+x;
                let yValue = j+y;
                if(xValue >= 0 && xValue < height && yValue >= 0 && yValue < width){
                    tile = _board[xValue][yValue]
                    
                    if(tile.bombsTouching != null && tile.bombsTouching != 0){
                        neighbours++;
                    }else if(tile.flagged){
                        flags++;
                    }else if(tile.bombsTouching == null){
                        undiscoveredTiles++;  
                        if(tile.knownEmpty){
                            knownEmpty++;
                        }
                    }
                }
            }
        }
    }

    return [neighbours, flags, undiscoveredTiles, knownEmpty]
}


function checkBoardValidity(_board, minY, minX, heightY, widthX){
    let flagged = 0


    let _minHeight = Math.max(0,minY-1)
    let _maxHeight = Math.min(height-1,minY+heightY+1)

    let _minWidth = Math.max(0,minX-1)
    let _maxWidth = Math.min(width-1,minX+widthX+1)



    for(let i = _minHeight; i <= (_maxHeight); i++){
        for(let j = _minWidth; j <= (_maxWidth); j++){
            let tile = _board[i][j]

            
        
            if(tile.bombsTouching != 0 && tile.bombsTouching != null){
                let status = checkAroundTile(_board, i, j)



                let flagCount = status[1]
                let undiscoveredTiles = status[2]
                let knownEmpty = status[3]
                
                //check 1 - are too many bombs toching this tile
                if(flagCount > tile.bombsTouching){
                    return -1
                }

                //check 2 - have we assumed too many tiles are not bombs
                if( (undiscoveredTiles - knownEmpty ) < (tile.bombsTouching- flagCount) ){ // maybe - flagCount
                    return -1
                }
            }
        }
    }

    return flagged
            

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
                let xValue = i+x;checkBeside
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


