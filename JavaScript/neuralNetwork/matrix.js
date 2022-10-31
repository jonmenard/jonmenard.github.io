class Matrix{
    constructor(rowCount, colCount, values){
        if(values != undefined){
            this.values = Matrix.matrixFromArray(values);
            this.rows = this.values.length;
            this.cols = this.values[0].length;
        }else{
            this.values = []
            this.rows = rowCount
            this.cols = colCount
            for(let row = 0; row < this.rows; row++){
                this.values.push([])
            }
        }
    }

    static cloneMatrix(matrix){
       let newMatrix = new Matrix(matrix.rows, matrix.cols)
       for(let row = 0; row < matrix.rows; row++){
            for(let col = 0; col < matrix.cols; col++){
                newMatrix.setVal(row,col, matrix.getVal(row,col))
            }
        }

       return newMatrix;
    }


    static matrixFromArray(array){
        let newArray = []
        for (let i=0; i < array.length; i++) {
            if (array[i] instanceof Array) {
                newArray[i] = Matrix.matrixFromArray(array[i]);
            } else {
                newArray[i] = array[i];
            }
        }

        return newArray;

    }

    clone(){
        return Matrix.cloneMatrix(this);
    }

    map(func){
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] = func(this.values[row][col])
            }
        }

        return this
    }

    add(matrix){
        
        if(matrix.rows != this.rows || matrix.cols != this.cols){
            console.log("mismatch with add")
            return this
        }

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] += matrix.getVal(row,col);
            }
        }

        return this
    }

    subtract(matrix){
        if(matrix.rows != this.rows || matrix.cols != this.cols){
            console.log("mismatch with subtract")
            return this
        }

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] -=  matrix.getVal(row,col);
            }
        }

        return this
    }

    multiply(matrix){
        if(matrix.rows != this.rows || matrix.cols != this.cols){
            console.log("mismatch with multiply")
            return this
        }

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] *= matrix.getVal(row,col);
            }
        }

        return this
    }

    multiplyScalar(scalar){
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] *= scalar
            }
        }

        return this
    }

    addScalar(scalar){
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] += scalar
            }
        }

        return this

    }

    argMax(){
        let index = 0
        let maxValue = this.values[0][0]
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                if(this.values[row][col] > maxValue){
                    maxValue = this.values[row][col]
                    index = row * this.cols + col;
                }
            }
        }
        return index
    }

    transpose(){
        let newMatrix = new Matrix(this.cols, this.rows)
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                newMatrix.setVal(col,row, this.values[row][col])
            }
        }
        return newMatrix
    }

    reset(value){
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] = value
            }
        }
        return this
    }

    dotProduct(matrix){
        if(this.cols != matrix.rows){
            console.log("mismatch with dot product")
            return this
        }
        let newMatrix = new Matrix(this.rows, matrix.cols)
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < matrix.cols; col++){
                var productSum = 0
                for(let index = 0; index < matrix.rows; index++){
                    productSum += this.values[row][index] * matrix.getVal(index,col)
                }

                newMatrix.setVal(row, col, productSum)
            }
            
        }

        return newMatrix
    }

    PointwiseTanh(){
        return this.map(Matrix.tanH)
    }

    PointwiseSquare(){
        return this.map(x => x * x)
    }

    PointwiseDeltaTanh(){
        return this.map(Matrix.deltaTanH)
    }


    PointwiseSigmoid(){
        return this.map(Matrix.sigmoid)
    }

    
    PointwiseDeltaSigmoid(){
        return this.map(Matrix.deltaSigmoid)
    }




    initalizeMatrix(){
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.values[row][col] = (Math.random() * 2) - 1
            }
        }

        return this
    }

    setVal(row, col, value) {
        this.values[row][col] = value;
    }

    getVal(row,col) {
        return this.values[row][col];
    }

    static tanH(x){
        return (((Math.E**(x))-(Math.E**(-x)))/((Math.E**(x))+(Math.E**(-x))));
    }
    
    static deltaTanH(x){
        return 1 - (Matrix.tanH(x) ** 2);
    }

    static sigmoid(x){
        return (1 / (1 + (Math.E ** (-x))));
    }
    static deltaSigmoid(x){
        return x * (1 - x); 
    }

    toString() {
        let string = "[";
        for (let row=0; row<this.rows; row++) {
          string += "[";
          for (let col=0;col<this.cols; col++) {
            string += ""+this.getVal(row, col);
            if(col != this.cols-1) {
              string += ", ";
            } else {
              string += "]";
            }
          }
          if(row != this.rows-1) {
            string += ",\n";
          } else {
            string += "]";
          }
        }
        return string;
      }
    
      print() {
        console.log(this.toString());
      }

}