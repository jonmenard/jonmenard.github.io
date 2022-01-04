class runAi{
    constructor(){
        this.values = [0.2978571428571428, 0.04119047619047614, 0.02952380952380945, 0.052857142857142825, 0.02952380952380945, 0.1695238095238095, 0.3795238095238095]
    }
    run(){
        let bestScore = 0;
        let count = 0;
        for(let j = 7; j < 20; j++){
             this.testValues(50,j/2)
        }

    }



    testValues(maxIterations, j){
        let scores = [];
        for(let i = 0; i < maxIterations; i++){
            console.log("c")
            let tetrus = new trainAI(1,j,7.5,0,0,1,1.5);
            tetrus.createObjecttrain(0);
            tetrus.swapHoldtrain();
            scores[i] = tetrus.aitrain();
            tetrus = null;
        }
        console.log(scores)
        let min = Math.min.apply(Math,scores);
        let max = Math.max.apply(Math,scores);
        console.log(min);
        console.log(max)
        console.log(j)
        console.log("__________________")
        return scores;
    }

    changeValues(values,spot){
        for(let i = 0; i < values.length; i++){
            if(i == spot){
                values[i] += 0.1;
            }else{
                values[i] -= (0.1 / 6);
            }
        }
        return values;

    }
}

let runai = new runAi();
document.addEventListener("keydown",keyPress);


function keyPress(event){
    console.log("running + a + b() + f + g")
    runai.run(); 
    console.log("ending")
}


