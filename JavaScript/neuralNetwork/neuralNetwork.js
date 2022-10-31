class NeuralNetwork{

    constructor(id){
        
        //Parameters
        this.hiddenLayerCount = 2
        this.layersCount = 3
        this.hiddenNeuronCount = [16,14,12]
        this.inputNeuronCount = 784
        this.outputNeuronCount = 10

        this.learningRate = 0.001

        //this.hiddenLayers = []
        this.inputLayer;
        this.outputLayer;
        this.hiddenLayers;
        this.weights = []
        this.biases = []
        this.id = id

        this.reset()
    }

    reset(){

        this.weights = []
        this.biases = []

        this.inputLayer = new Matrix(1, this.inputNeuronCount);
        this.outputLayer = new Matrix(1, this.outputNeuronCount);

        this.weights.push(((new Matrix(this.hiddenNeuronCount[0],this.inputNeuronCount)).initalizeMatrix()))
        this.biases.push(((new Matrix(this.hiddenNeuronCount[0],1)).reset(0)))

        for(var layer = 0; layer < this.hiddenLayerCount-1; layer++){
            this.weights.push((new Matrix(this.hiddenNeuronCount[layer+1],this.hiddenNeuronCount[layer])).initalizeMatrix())
            this.biases.push((new Matrix(this.hiddenNeuronCount[layer+1],1)).reset(0))

        }
        this.weights.push(((new Matrix(this.outputNeuronCount,this.hiddenNeuronCount[this.hiddenLayerCount-1])).initalizeMatrix()))
        this.biases.push(((new Matrix(this.outputNeuronCount,1)).reset(0)))

    }
    
    forwardPropagate(inputLayer){
        var currentLayer = inputLayer.transpose()
        for(var layer = 0; layer <= this.hiddenLayerCount; layer++){
            currentLayer = ((this.weights[layer].dotProduct(currentLayer)).add(this.biases[layer])).PointwiseTanh()
        }
        
        return currentLayer.clone()
    }

    trainOnBatch(dataSet, epoches){
        for(var epoch = 0; epoch<epoches; epoch++){
            for(var index = 0; index < dataSet.length; index++){
                this.train(dataSet[index][1], dataSet[index][0]);
            }
            let accuracy = this.getAccuracy(dataSet)
            console.log("Current epoch: " + epoch +". Accuracy is: " + accuracy)
            if(accuracy > .90){
                break
            }   
        }
    }

    getAccuracy(dataSet){
        var correctCount = 0
        for(var index = 0; index < dataSet.length; index++){
            if(this.forwardPropagate(dataSet[index][1]).argMax() == dataSet[index][0].argMax()){
                correctCount++
            }
        }

        return correctCount/dataSet.length
    }

    train(inputs, targets){
        
        this.layers = [inputs.transpose()]
        this.layersUnactive = []
        for(var layer = 0; layer < this.layersCount; layer++){
            this.layersUnactive.push(((this.weights[layer].dotProduct(this.layers[layer])).add(this.biases[layer])))
            this.layers.push(this.layersUnactive[layer].clone().PointwiseTanh())
        }

        this.errors = []
        this.errors[this.layers.length-1] = (this.layers[this.layers.length-1]).clone().subtract(targets.transpose())

        var gradient = this.errors[this.layers.length-1].dotProduct(this.layers[this.layers.length-2].transpose())
        var delta = this.errors[this.layers.length-1].clone().multiplyScalar(this.learningRate)
        this.weights[this.weights.length-1].subtract(gradient.multiplyScalar(this.learningRate))
        this.biases[this.biases.length-1].subtract(delta)
       
        for(var layer = this.layers.length-2; layer > 0; layer--){
            this.errors[layer] = this.weights[layer].transpose().dotProduct(this.errors[layer+1]).multiply(this.layersUnactive[layer-1].clone().PointwiseDeltaTanh())
            this.weights[layer-1].subtract(this.errors[layer].dotProduct(this.layers[layer-1].transpose()).multiplyScalar(this.learningRate))
            this.biases[layer-1].subtract(this.errors[layer].clone().multiplyScalar(this.learningRate))
        }
    }

    print(){
        for(var layer = 0; layer < this.hiddenLayerCount+1; layer++){
            this.weights[layer].print()
            this.biases[layer].print()
        }
    }
}

