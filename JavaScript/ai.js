
// HTML Elements
const aiCanvas = document.getElementById("screen");
const aIContex = aiCanvas.getContext("2d");

const dotSize = Math.round(boxWidth / 8)

aIContex.canvas.height  = 24 * boxWidth;
aIContex.canvas.width  = 24 * boxWidth;

const stopButton = document.getElementById("stop");
const startButton = document.getElementById("start");
const resButton = document.getElementById("resetAI");
const removeButton = document.getElementById("remove");
const show = document.getElementById("show");
const less = document.getElementById("less");


$("#stop").css("font-size", boxWidth * .60  );
$("#start").css("font-size", boxWidth * .60 );
$("#resetAI").css("font-size", boxWidth * .60);
$("#remove").css("font-size", boxWidth * .60);
$("#show").css("font-size", boxWidth  * .60 );
$("#less").css("font-size", boxWidth  * .60 );
$("#ai").css("width", boxWidth * 24 + 10 );
$("#aiContainer").css("max-width", boxWidth * 24 );


stopButton.addEventListener("click",stopAI);
startButton.addEventListener("click",startAI);
resButton.addEventListener("click",resetAI);
removeButton.addEventListener("click",remove);
show.addEventListener("click",showMore);
less.addEventListener("click",showLess);


let drawnObjects = [];
let objectCounter = 0;
var flag = false;
var leftX = 0;
var rightX = 0;
var topY = 0;
var bottomY = 0;
var dot_flag = false;
var y = 2;
let w = aiCanvas.width;
let h = aiCanvas.height;
let runAI;
let dontRun = true;
let buttonStop = true;
let iterations = 1;


aiCanvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);
aiCanvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
aiCanvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
aiCanvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);


function stopAI(){
    buttonStop = true;
    clearInterval(runAI);
}

function startAI(){
    buttonStop = false;
    runAI = setInterval(drawAI,0); 
}


function load(){
    aIContex.fillStyle = "rgb(20,20,20)";
    aIContex.fillRect(0,0,24 * boxWidth,24 * boxWidth);
    aIContex.fillStyle = "white";
    aIContex.font = boxWidth * .66 + "px Changa One";
    aIContex.fillText("Generation: "+ number, boxWidth/2, boxWidth/2);
    if(iterations == 1){
        aIContex.fillText("Showing Every Generation", boxWidth/2, boxWidth + boxWidth/8);
    }else{
        aIContex.fillText("Showing Every " + iterations + " Generations", boxWidth/2, boxWidth+ boxWidth/8);
    }
    aIContex.fillRect(11.5 * boxWidth,2 * boxWidth,boxWidth,boxWidth);
    //if(dot.posX > boxWidth * 11 && dot.posX < boxWidth * 12 && dot.posY > boxWidth * 2 && dot.posY < boxWidth * 3){
    aIContex.fillStyle = "red";
    for(let i = 0; i < objectCounter; i++){
        let x = drawnObjects[i];
        aIContex.fillRect(x.left,x.top,x.width,x.height);
    }
}



function showMore(){
    iterations++;
    load();
}


function showLess(){
    iterations--;
    if(iterations < 1){
        iterations = 1;
    }
    load();
}

function remove(){
    objectCounter--;
    load();
}

function resetAI(){
    stopAI();
    buttonStop = true;
    drawnObjects = [];
    objectCounter = 0;
    eachInstruction = 0;
    dots = makeDots();
    number = 0;
    load();
}

function drawObject() {
    
    aIContex.fillStyle = "red";
    aIContex.strokeStyle = "red";
    aIContex.lineWidth = boxWidth / 2 + "px";
    aIContex.fillRect(leftX,topY,rightX-leftX,bottomY - topY);
}

function findxy(res, e) {
    if (res == 'down') {
        stopAI();
        let rect = aiCanvas.getBoundingClientRect()
        currX = e.pageX - (window.pageXOffset + rect.left);
        currY = e.pageY - (window.pageYOffset + rect.top);
        leftX = currX;
        topY = currY;
        rightX = currX + 4;
        bottomY = currY + 4;
        flag = true;
        buttonStop = true;
    }
    if (res == 'up' || res == 'out') {
        if(flag){
            flag = false;
            newObject = {
                left: leftX,
                top: topY,
                height: (bottomY - topY),
                width: (rightX - leftX),
            };

            drawnObjects[objectCounter++] = Object.assign({},newObject);
            leftX = 0;
            rightX = 0;
            topY = 0;
            bottomY = 0;
            
        }
        
    }
    if (res == 'move') {
        if (flag) {
            let rect = aiCanvas.getBoundingClientRect()
            currX = e.pageX - (window.pageXOffset + rect.left);
            currY = e.pageY - (window.pageYOffset + rect.top);
            if(currX < leftX){
                leftX = currX;
            };

            if(currX > rightX){
                rightX = currX;
            };


            if(currY < topY){
                topY = currY;
            };

            if(currY > bottomY){
                bottomY = currY;
            };
            drawObject();
        }
    }
}



const numberOfDots = 400;
const numberOfInstructions = 400;
aIContex.fillStyle = "black";
aIContex.fillRect(0,0,boxWidth * 24,boxWidth * 24);
let eachInstruction = 0;

let start = 0
let end = 1;
let offset = 0;


let dots = makeDots();
let number = 0;


function makeDots(){

    let listOfDots = [];

    for(let i = 0; i < numberOfDots; i++){
        listOfDots[i] = {
            posX: boxWidth * 12,
            posY: boxWidth * 22,
            velX: 0,
            velY: 0,
            xInstruction: makeInstructions(),
            yInstruction: makeInstructions(),
            steps: 0,
            dead: false,
            goal: false,
            score: 0,
            id: i,
            bestDot: false
        }
    }
    return Object.assign({},listOfDots);
}

function makeInstructions(){
    let listOfInstructions = [];

    for(let i = 0; i < numberOfInstructions; i++){
        listOfInstructions[i] = Math.round(Math.random() * 2) - 1;
    }
    return listOfInstructions;
}

function moveDots(dots,eachDot,eachInstruction){
    let dot = Object.assign({}, dots[eachDot]);
    if(!dot.dead){
        dot.steps += 1;
        dot.velX += dot.xInstruction[eachInstruction]; 
        dot.velY += dot.yInstruction[eachInstruction]; 
        
        if(dot.velX > 3){
           dot.velX = 3;
        }
        if(dot.velX < -3){
            dot.velX = -3;
        }

        if(dot.velY > 3){
            dot.velY = 3;
        }
        if(dot.velY < -3){
            dot.velY = -3;
        }

        dot.posX += dot.velX; 
        dot.posY += dot.velY; 
        
        for(let i = 0; i < objectCounter; i++){
            let x = drawnObjects[i];
            if(x.left < dot.posX + dotSize && (x.left + x.width) > dot.posX && x.top - dotSize < dot.posY && (x.top + x.height) > dot.posY){
                dot.dead = true;
            }
        }

        if(dot.posX >= boxWidth * 24 - dotSize || dot.posX <= 1 || dot.posY >= boxWidth * 24 - dotSize || dot.posY < boxWidth * 2.1 - dotSize){
            dot.dead = true;
        }


        // This is where the goal to reach is
        if(dot.posX > boxWidth * 11.5 && dot.posX < boxWidth * 12.5 && dot.posY > boxWidth * 2 && dot.posY < boxWidth * 3){
            dot.dead = true;
            dot.goal = true;
        }
        dots[eachDot] = Object.assign({}, dot);
    }
}


function drawAI(){
    if(buttonStop){
       return; 
    }
    if(eachInstruction >= numberOfInstructions){
        clearInterval(runAI);
        dots = rankDots();
        eachInstruction = 0;
        start = 0
        end = 1;
        number++;
        begin();
        runAI = setInterval(drawAI,0); 
    }else{
       
        load()
        offset = end
        count = 0
        for(let eachDot = 0; eachDot < numberOfDots; eachDot++){
            
            if(dots[eachDot].bestDot == true){
                aIContex.fillStyle = "blue";
                aIContex.fillRect(dots[eachDot].posX, dots[eachDot].posY,dotSize,dotSize);
            }else{
                aIContex.fillStyle = "green";
              //  contex.fillRect(dots[eachDot].posX + eachDot, dots[eachDot].posY,4,4);
              aIContex.fillRect(dots[eachDot].posX, dots[eachDot].posY,dotSize,dotSize);
            }
            if(eachDot >= start && eachDot < end){
                instructionNumber = end - count
                if(instructionNumber >= numberOfInstructions){
                    instructionNumber = numberOfInstructions-1 - count
                }
                
                moveDots(dots,eachDot,instructionNumber);
                count++
            }
            //moveDots(dots,eachDot,eachInstruction);
            
            
        }

        //eachInstruction++;
        if(end >= numberOfDots){
            start++
            eachInstruction++;
            //console.log(start)
        }

        if(end < numberOfDots*2){
            end++
        }

        

        if(start >= numberOfDots){
            
        }
    
        
    }
    
}

function begin(){
    for(x = 1; x < iterations; x++){
        for(j = 0; j < numberOfInstructions; j++){
            for(i = 0; i < numberOfDots; i++){
                moveDots(dots,i,j); 
            }
        }
        dots = rankDots();
        eachInstruction = 0;
        start = 0;
        end = 1;
        number++
        if(buttonStop){
            return;
        }
    }
} 

function evolve(totalScore, best){
    let bestDot = Object.assign({}, best);
    let bestDotsChildren = [];
    let i = 0;
    //sort all the scores for each dot, if they are lower than 50% than keep them
    for(let eachDot = 0; eachDot < numberOfDots; eachDot++){
        let dot =  Object.assign({}, dots[eachDot]);
        if(dot.score <= totalScore){
            bestDotsChildren[i++] = Object.assign({}, dot);
        }
        dot.score = 0; 
        if(i > numberOfDots/2-1){
            break;
        }
    }

    let newDots = [];

    for(let eachDot = 0; eachDot < numberOfDots/2; eachDot++){
        let dot =  Object.assign({}, bestDotsChildren[eachDot]);
        dot.id = eachDot;
        dot.dead = false;
        const score = {};
        Object.assign(score,dot);
        if(dot.goal == false || Math.random() < 0.25){
            dot.xInstruction = mutate(Object.assign({}, dot.xInstruction),score.score);
            dot.yInstruction = mutate(Object.assign({}, dot.yInstruction),score.score);
        }
        dot.goal = false;
        newDots[eachDot] = Object.assign({}, dot);
    }

    for(let eachDot = numberOfDots/2; eachDot < numberOfDots; eachDot++){
        let dot = Object.assign({}, bestDotsChildren[eachDot-numberOfDots/2]);
        dot.id = eachDot;
        dot.dead = false;
        const score = {};
        Object.assign(score,dot);
        if(dot.goal == false){
            dot.xInstruction = mutate(Object.assign({}, dot.xInstruction),score.score);
            dot.yInstruction = mutate(Object.assign({}, dot.yInstruction),score.score);
        }
        dot.goal = false;
        newDots[eachDot] = Object.assign({}, dot);  
        newDots[eachDot] = Object.assign({}, dot);  
    }

    for(let i = (numberOfDots - 10); i < numberOfDots; i++){
        let dot = Object.assign({}, best);
        dot.dead = false;
        dot.bestDot = false;
        dot.id = i;
        const score = {};
        Object.assign(score,best);
        if(dot.goal == false){
            dot.xInstruction = mutate(Object.assign({}, dot.xInstruction),0);
            dot.yInstruction = mutate(Object.assign({}, dot.yInstruction),0);
        }
        dot.goal = false;
        newDots[i] = Object.assign({}, dot);
    }
    
    newDots[0] = Object.assign({}, bestDot);
    newDots[0].dead = false;
    newDots[0].goal = false;
    newDots[0].bestDot = true;
    newDots[0].id = 0;

    return Object.assign({}, newDots); 

}

function rankDots(){

    let totalScore = [400];
    let bestScore = 100000000000;
    let best;

    // ranking each dot with a score based off how close it got to the finishing point
    for(let eachDot = 0; eachDot < numberOfDots; eachDot++){
        let dot = Object.assign({}, dots[eachDot]);
        let xDistance = dot.posX - boxWidth * 12;
        let yDistance = dot.posY - boxWidth * 2;
        let distance = Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
        if(dot.goal){
            distance = dot.steps - numberOfInstructions
        }else if(dot.dead){
            //distance -= dot.steps;
        }

       
        
        totalScore[eachDot] = distance;
        
        dot.posX = boxWidth * 12;
        dot.posY = boxWidth * 22;
        dot.velX = 0; 
        dot.velY = 0; 
        dot.steps = 0;
        if(distance < bestScore){
            bestScore = distance;
            best = Object.assign({}, dot);
        }
        dot.bestDot = false;
        dot.score = distance;
        dots[eachDot] = Object.assign({}, dot);
    }
    totalScore.sort(function(a, b){return a-b});
    return evolve(totalScore[numberOfDots/2 - 1],best);
}


function clone(dot){
    return Object.assign({}, dot);
}

function mutate(instructions,score){
    let end = false;
    if(score == 0){
        end = true;
    }
    let limit = Math.round(Math.random() * score / 1000) + 5;
    for(let i = 0; i < limit; i++){
        if(end){
            instructions[Math.round((Math.random() * (numberOfInstructions/2 - 1)) + numberOfInstructions/2)] = Math.round(Math.random() * 2) - 1;
        }else{
            instructions[Math.round(Math.random() * (numberOfInstructions - 1))] = Math.round(Math.random() * 2) - 1;
        }
    }
    return Object.assign({}, instructions);
}
load();


 





