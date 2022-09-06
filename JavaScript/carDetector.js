
const model = await tf.loadLayersModel('./machineLearning/carDetectorModel/model.json');

/**
 * Render the current state of the system on an HTML canvas.
 *
 * @param {Image} filename The instance of cart-pole system to render.
 *   the rendering will happen.
 */
 function  predictImage(filename) {
    

    let imageTensor = tf.browser.fromPixels(filename).resizeBilinear([225,400])
    imageTensor = tf.div(imageTensor.reshape([1, 225,400, 3]), tf.scalar(255))
    let x =  model.predict(imageTensor).arraySync()[0][0]
    return x
    
    // }
    // return -1
}


var dropRegion = document.getElementById("drop-region");
console.log(dropRegion)
// var formContainer = document.getElementById("formContainer");
var imagePreviewRegion = document.getElementById("image-preview");
var imageForm = document.getElementById("mlImageForm");

var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = true;

dropRegion.addEventListener('click', function(evt) {
    if(evt.target.type =="submit"){
        return
    }
	fakeInput.click();
});

imageForm.addEventListener('submit', function(evt) {
        preventDefault(evt);
        // window.history.back();
});


fakeInput.addEventListener("change", function() {
	var files = fakeInput.files;
	handleFiles(files);
});


dropRegion.addEventListener("dragenter", (e) => {
    e.preventDefault()
    dropRegion.classList.add("hover")
});

dropRegion.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropRegion.classList.add("hover")
});

dropRegion.addEventListener("dragleave", (e) => {
    e.preventDefault()
    dropRegion.classList.remove("hover")
}); 

dropRegion.addEventListener("drop", (e) => {
    e.preventDefault()
    dropRegion.classList.remove("hover")
}); 



function handleDrop(e) {
	var dt = e.dataTransfer
	var files = dt.files;

	if (files.length) {
		handleFiles(files);
	} else {
		// check for img
		var html = dt.getData('text/html')
	    var match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html)
	    var url = match && match[1]

	    if (url) {
            console.log("from url")
	        uploadImageFromURL(url);
	        return;
	    }
	}


	function uploadImageFromURL(url) {
		var img = new Image;
        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");

        img.onload = function() {
            c.width = this.naturalWidth;     // update canvas size to match image
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);       // draw in image
            c.toBlob(function(blob) {        // get content as PNG blob
            	// call our main function
                handleFiles( [blob] );
            }, "image/png");
        };
        img.onerror = function() {
            alert("Error in uploading");
        }
        img.crossOrigin = "";              // if from different origin
        img.src = url;
	}
}

dropRegion.addEventListener('drop', handleDrop, false);


function handleFiles(files) {
	for (var i = 0, len = files.length; i < len; i++) {
		if (validateImage(files[i]))
			previewAnduploadImage(files[i]);
	}
}

function validateImage(image) {
	// check the type
	var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (validTypes.indexOf( image.type ) === -1) {
		alert("Invalid File Type");
		return false;
	}

	// check the size
	var maxSizeInBytes = 10e6; // 10MB
	if (image.size > maxSizeInBytes) {
		alert("File too large");
		return false;
	}

	return true;

}

function previewAnduploadImage(image) {

	// container
	var imgView = document.createElement("div");

    var imgResult= document.createElement("div");
    imgResult.className = "imgResult";
    

    imgView.id = image.name;
	imgView.className = "image-view";
    
	imagePreviewRegion.appendChild(imgView);

	// previewing image
	var img = new Image()
	imgView.appendChild(img);
    imgView.appendChild(imgResult)

	// progress overlay
	var overlay = document.createElement("div");
	overlay.className = "overlay";

    

	imgView.appendChild(overlay);
    // imgView.appendChild(feedback);

	// read the image...
	var reader = new FileReader();
	reader.onload = function(e) {
        console.log("here!!")
		img.src = e.target.result;
	}
    var prediction
    img.onload = function() {

        prediction = predictImage(this)
        console.log(prediction)

        var car
        if(prediction < 0.5){
            car = true
            var confidence = ((0.5 - prediction) / 0.5) * 100
        }else{
            var confidence = ((prediction - 0.5) / 0.5) * 100
        }

        if(car){
            imgResult.className = "imgResult car"
            imgResult.innerHTML = "Car" 
        }else{
            imgResult.className = "imgResult no-car";
            imgResult.innerHTML = "No Car"
        }

    imgResult.innerHTML += " (" + confidence.toFixed(2) + "%)"
                // isCar = (xhr.responseText);


    }
    reader.readAsDataURL(image);
	
}


    


    