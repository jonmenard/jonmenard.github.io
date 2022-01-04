class TetrisCanvas{

    constructor(lineHeight,boxHeight,boxWidth){
        this.cvs = document.getElementById("tetrus");
        this.ctx = this.cvs.getContext("2d");
        this.offsetLeft = 266;
        this.offsetTop = 110;
        this.lineHeight = lineHeight;
        this.boxHeight = boxHeight
        this.boxWidth = boxWidth
    }

    draw(rowsBelow,game,tilesCleared){
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,800,800);

        this.ctx.fillStyle = "grey";
        for(let verticalLineNumber = 0; verticalLineNumber <= 20; verticalLineNumber++){
            this.ctx.fillRect(this.offsetLeft, (this.offsetTop + this.boxHeight * verticalLineNumber) + (this.lineHeight * verticalLineNumber), 310, this.lineHeight);
        }

        for(let horizontalLineNumber = 0; horizontalLineNumber <= 10; horizontalLineNumber++){
            this.ctx.fillRect(this.offsetLeft + (this.boxHeight * horizontalLineNumber) + (this.lineHeight * horizontalLineNumber),this.offsetTop,this.lineHeight,620)
        }

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle="rgba(0,0,0,1)";
        this.ctx.strokeRect(this.offsetLeft -1 ,this.offsetTop - 1,313,623);

        //drawing boxes
        this.drawBox(rowsBelow,game[0],game[1]);
        this.drawHold(game[2]);
        this.drawNext(game[3]);
        this.drawTitle();
        this.drawLabels();
        this.drawScore(tilesCleared)
        return true;
    }

    drawTitle(){
        let factor = 2;
        let width = this.boxWidth / factor;
        let height = this.boxHeight / factor;
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
        this.ctx.font = "50px VT323";
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        this.ctx.fillText(zeroPad(score, 8),640, 30);

    }

    drawLabels(){
        this.ctx.fillStyle = "black";
        this.ctx.font = "50px VT323";
        this.ctx.fillText("Next",655,220);
        this.ctx.fillText("Hold",105,220);
    }

    // draw all the boxes
    drawBox(rowsBelow,gameBoard,currentObject){
        for(let i = 199; i >= 0; i--){

            if(gameBoard[i].box != undefined){
                let box = gameBoard[i].box
                let column = box.column;
                let row = box.row;
                this.ctx.fillStyle = box.color;
                this.ctx.fillRect(this.offsetLeft + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight,this.boxWidth)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight + 2.5 ,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,2.5,this.boxWidth + 2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row + 1) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight + 2.5,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column + 1) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,2.5,this.boxWidth + 2.5)
            }
        }

        let rowAdded = rowsBelow
        for(let i = 0; i < currentObject.length; i++){
                let box = currentObject[i]
                let row = box.row + rowAdded
                let column = box.column;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight + 2.5 ,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,2.5,this.boxWidth + 2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row + 1) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight + 2.5,2.5)
                this.ctx.fillRect(this.offsetLeft- 0.25 + (column + 1) * (this.boxWidth + this.lineHeight) + this.lineHeight, this.offsetTop - 0.25 + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,2.5,this.boxWidth + 2.5)
        } 
    }

    drawNext(nextObject){

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle="rgba(0,0,0,1)";
        this.ctx.strokeRect(620,90.75,144,90);

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
                this.ctx.fillStyle = box.color;
                this.ctx.fillRect((660 + column * (this.boxWidth + this.lineHeight)) - c + this.lineHeight,  135 - r + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight,this.boxWidth)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(660 + (column) * (this.boxWidth + this.lineHeight) - c , 135.75 - r + (row) * (this.boxHeight + this.lineHeight ),this.boxHeight + 2.5 ,2.5)
                this.ctx.fillRect(660 + (column) * (this.boxWidth + this.lineHeight) - c , 135.75 - r + (row) * (this.boxHeight + this.lineHeight ),2.5,this.boxWidth + 2.5)
                this.ctx.fillRect(660 + (column) * (this.boxWidth + this.lineHeight) - c , 135.75 - r + (row + 1) * (this.boxHeight + this.lineHeight ),this.boxHeight + 2.5,2.5)
                this.ctx.fillRect(660 + (column + 1) * (this.boxWidth + this.lineHeight) - c, 135.75 - r + (row) * (this.boxHeight + this.lineHeight ),2.5,this.boxWidth + 2.5)     
        }
    }

    drawHold(holdObject){
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle="rgba(0,0,0,1)";
        this.ctx.strokeRect(80,90.75,144,90);
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
                this.ctx.fillStyle = box.color;
                this.ctx.fillRect((120 + column * (this.boxWidth + this.lineHeight)) - c + this.lineHeight,  135 - r + (row) * (this.boxHeight + this.lineHeight )+ this.lineHeight,this.boxHeight,this.boxWidth)

                this.ctx.fillStyle = "black"
                this.ctx.fillRect(120 + (column) * (this.boxWidth + this.lineHeight) - c , 135.75 - r + (row) * (this.boxHeight + this.lineHeight ),this.boxHeight + 2.5 ,2.5)
                this.ctx.fillRect(120 + (column) * (this.boxWidth + this.lineHeight) - c , 135.75 - r + (row) * (this.boxHeight + this.lineHeight ),2.5,this.boxWidth + 2.5)
                this.ctx.fillRect(120 + (column) * (this.boxWidth + this.lineHeight) - c , 135.75 - r + (row + 1) * (this.boxHeight + this.lineHeight ),this.boxHeight + 2.5,2.5)
                this.ctx.fillRect(120 + (column + 1) * (this.boxWidth + this.lineHeight) - c, 135.75 - r + (row) * (this.boxHeight + this.lineHeight ),2.5,this.boxWidth + 2.5)
            }
       }
    }
}