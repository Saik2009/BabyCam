var img = "";
status = "";
var object = [];
song="";
function preload() {
    song="pirates_of_caribbean.mp3";
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw() {
    

    image(video, 0, 0, 380, 380);

    if (status != "") {
        for (i = 0; i < object.length; i++) {
            objectDetector.detect(video, gotResult);
            r=random(255);
            g=random(255);
            b=random(255);
            percent = floor(100 * object[i].confidence);

            stroke(r,g,b);
            fill(r,g,b);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("no").innerHTML = "Number of Objects Detected: "+object.length;
    }
}

function modelReady() {
    status = "true";
    console.log("Model Loaded");
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    object = results;
    console.log(results);
    if(results[0].label!="person"){
        song.play()
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}