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