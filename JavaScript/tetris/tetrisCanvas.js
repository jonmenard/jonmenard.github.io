class TetrisCanvas{

    constructor(lineHeight,boxHeight,boxWidth){
        this.cvs = document.getElementById("tetrus");
        this.ctx = this.cvs.getContext("2d");
        this.offsetLeft = 7 * boxWidth - lineHeight * 6;
        this.offsetTop = 3.66 * boxWidth;
        this.lineHeight = lineHeight;
        boxWidth = boxHeight
        boxWidth = boxWidth
    }

    draw(rowsBelow,game,tilesCleared){


        this.ctx.canvas.height  = 25 * boxWidth;
        this.ctx.canvas.width  = 24 * boxWidth;

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,28 * boxWidth,29 * boxWidth);

        this.ctx.fillStyle = "grey";
        for(let verticalLineNumber = 1; verticalLineNumber <= 19; verticalLineNumber++){
            this.ctx.fillRect(this.offsetLeft, (this.offsetTop + boxWidth * verticalLineNumber) + (this.lineHeight * verticalLineNumber), 10 * boxWidth + 10, this.lineHeight);
        }

        for(let horizontalLineNumber = 0; horizontalLineNumber <= 10; horizontalLineNumber++){
            this.ctx.fillRect(this.offsetLeft + (boxWidth * horizontalLineNumber) + (this.lineHeight * horizontalLineNumber),this.offsetTop,this.lineHeight,20 * boxWidth + 20)
        }

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle="rgba(0,0,0,1)";

        this.ctx.strokeRect(this.offsetLeft + 0.75 ,this.offsetTop + 1.5 , 10 * boxWidth + 11.5 ,20 * boxWidth + 20);

        //drawing boxes
        this.drawBox(rowsBelow,game[0],game[1]);
        this.drawNext(game[2]);
        this.drawHold(game[3]);
        this.drawTitle();
        this.drawLabels();
        this.drawScore(tilesCleared)
        return true;
    }

    drawTitle(){
        let factor = 2;
        let width = boxWidth / factor;
        let height = boxWidth / factor;
        let line = this.lineHeight / factor;
        factor /= 2;
        let t = [[0,0],[0,1],[0,2],[1,1],[2,1],[3,1],[4,1]];
        let e = [[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[3,0],[4,0],[4,1],[4,2]];
        let r = [[0,0],[0,1],[0,2],[1,0],[1,3],[2,0],[2,1],[2,2],[2,3],[3,0],[3,2],[4,0],[4,3]];
        let i = [[0,1],[1,1],[2,1],[3,1],[4,1]];
        let s = [[0,0],[0,1],[0,2],[1,0],[2,1],[3,2],[4,0],[4,1],[4,2]];
        let colors = ["rgb(255,0,0)","rgb(252,159,0)","rgb(233,248,0)","rgb(0,255,25)","rgb(0,247,245)","rgb(186,0,242)"];
        let tetrisName = [t,e,t,r,i,s];
        for(let j = 0; j < tetrisName.length; j++){
            let letter = tetrisName[j];
            for(let i = 0; i < letter.length; i++){
                let column = letter[i][1] + (j * 4) - 1  ;
                if(j == tetrisName.length - 1){
                    column -= 1;
                }
                let row = letter[i][0] - 6;
                this.ctx.fillStyle = colors[j];
                this.ctx.fillRect(this.offsetLeft + (column) * (width + line) + line, this.offsetTop + (row) * (height + line )+ line,height,width)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(this.offsetLeft - 0.25 + (column) * (width + line) + line, this.offsetTop - 0.25 + (row) * (height + line )+ line,height + 2.5/factor ,2.5/factor)
                this.ctx.fillRect(this.offsetLeft - 0.25 + (column) * (width + line) + line, this.offsetTop - 0.25 + (row) * (height + line )+ line,2.5/factor,width + 2.5/factor)
                this.ctx.fillRect(this.offsetLeft - 0.25 + (column) * (width + line) + line, this.offsetTop - 0.25 + (row + 1) * (height + line )+ line,height + 2.5/factor,2.5/factor)
                this.ctx.fillRect(this.offsetLeft- 0.25  + (column + 1) * (width + line) + line, this.offsetTop - 0.25 + (row) * (height + line )+ line,2.5/factor,width + 2.5/factor)
            }
        }  
    }

    drawScore(score){

        this.ctx.fillStyle = "black";
        this.ctx.font = boxWidth*1.25 + "px VT323";
        this.ctx.textAlign = "right";
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        this.ctx.fillText(zeroPad(score, 7), this.offsetLeft + 16 * boxWidth + 12 * this.lineHeight  , this.offsetTop - .5 * boxWidth);


        

    }

    drawLabels(){
        this.ctx.fillStyle = "black";
        this.ctx.font = boxWidth*1.25 + "px VT323";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Next",this.offsetLeft - boxWidth * 3.5 ,boxWidth * 9);
        this.ctx.fillText("Hold",this.offsetLeft + boxWidth * 13.5 + 12 * this.lineHeight,boxWidth * 9);
        $("#tetrisAIStart").css("right", boxWidth/2 * 1 );
        $("#tetrisStart").css("left", boxWidth/2 * 1);
    }

    // draw all the boxes
    drawBox(rowsBelow,gameBoard,currentObject){
        for(let i = 199; i >= 0; i--){

            if(gameBoard[i].box != undefined){
                let box = gameBoard[i].box
                let column = box.column;
                let row = box.row;
                this.ctx.fillStyle = box.color;
                this.ctx.fillRect(this.offsetLeft + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,boxWidth,boxWidth)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,boxWidth + 2.5 ,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,2.5,boxWidth + 2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row + 1) * (boxWidth + this.lineHeight )+ this.lineHeight,boxWidth + 2.5,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column + 1) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,2.5,boxWidth + 2.5)
            }
        }

        let rowAdded = rowsBelow
        for(let i = 0; i < currentObject.length; i++){
                let box = currentObject[i]
                let row = box.row + rowAdded
                let column = box.column;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,boxWidth + 2.5 ,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,2.5,boxWidth + 2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row + 1) * (boxWidth + this.lineHeight )+ this.lineHeight,boxWidth + 2.5,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column + 1) * (boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (boxWidth + this.lineHeight )+ this.lineHeight,2.5,boxWidth + 2.5)
        } 
    }

    drawHold(holdObject){

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle="rgba(0,0,0,1)";
        this.ctx.strokeRect(this.offsetLeft + boxWidth * 11 + 12 * this.lineHeight, this.offsetTop + 1.5,boxWidth * 5 ,boxWidth * 4);
        let blockType = holdObject[0].blockType
        let r; 
        let c;
        if(blockType == 1){
            r = -1/2;
            c = 3;
        }else if(blockType == 2){
            r = 0
            c = 3;
        }else if(blockType == 5){
            r = 0
            c = 3.5 
        }else{
            r = 0
            c = 2.5
        }
       
        for(let i = 0; i < holdObject.length; i++){
                let box = holdObject[i]
                let column = box.column - 2;
                let row = box.row;
                this.ctx.fillStyle = box.color;
                this.ctx.fillRect(this.offsetLeft + boxWidth * (13.5 + column - c) + 12 * this.lineHeight,    boxWidth * (4.5 - r + row),     boxWidth,boxWidth)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(this.offsetLeft + boxWidth * (13.5 + column - c) + 12 * this.lineHeight,     boxWidth * (4.5  - r + row),     boxWidth + 2.5 ,2.5)
                this.ctx.fillRect(this.offsetLeft + boxWidth * (13.5 + column - c) + 12 * this.lineHeight,     boxWidth * (4.5  - r + row),     2.5,boxWidth + 2.5)
                this.ctx.fillRect(this.offsetLeft + boxWidth * (13.5 + column - c) + 12 * this.lineHeight,     boxWidth * (4.5  - r + row + 1), boxWidth + 2.5,2.5)
                this.ctx.fillRect(this.offsetLeft + boxWidth * (13.5 + column + 1 - c) + 12 * this.lineHeight, boxWidth * (4.5  - r + row),     2.5,boxWidth + 2.5)
        }
    }

    drawNext(nextObject){
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle="rgba(0,0,0,1)";
        this.ctx.strokeRect(this.offsetLeft - boxWidth * 6, this.offsetTop + 1.5 ,boxWidth * 5, boxWidth * 4);
        if(nextObject != undefined){
            let blockType = nextObject[0].blockType
            let r; 
            let c;
            if(blockType == 1){
                r = -1/2;
                c = 3;
            }else if(blockType == 2){
                r = 0
                c = 3;
            }else if(blockType == 5){
                r = 0
                c = 3.5 
            }else{
                r = 0
                c = 2.5
            }
            for(let i = 0; i < nextObject.length; i++){
                let box = nextObject[i]
                let column = box.column - 2;
                let row = box.row;
                this.ctx.fillStyle = box.color;
                this.ctx.fillRect(boxWidth * (3.5 + column - c),    boxWidth * (4.5 - r + row),     boxWidth,boxWidth)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(boxWidth * (3.5 + column - c),     boxWidth * (4.5  - r + row),     boxWidth + 2.5 ,2.5)
                this.ctx.fillRect(boxWidth * (3.5 + column - c),     boxWidth * (4.5  - r + row),     2.5,boxWidth + 2.5)
                this.ctx.fillRect(boxWidth * (3.5 + column - c),     boxWidth * (4.5  - r + row + 1), boxWidth + 2.5,2.5)
                this.ctx.fillRect(boxWidth * (3.5 + column + 1 - c), boxWidth * (4.5  - r + row),     2.5,boxWidth + 2.5)
            }
       }
    }
}