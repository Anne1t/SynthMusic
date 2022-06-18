song1="";
song2="";
song1_status="";
song2_status="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;

function preload(){
    song1=loadSound("Prologue.mp3");
    song2=loadSound("SpongeBob SquarePants Production Music - Wooden Bear.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Model is loaded! ♥️");
}

function gotPoses(results){
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log(scoreLeftWrist);
    console.log(scoreRightWrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristX=results[0].pose.leftWrist.x;
    rightWristY=results[0].pose.leftWrist.y;
    console.log(leftWristX);
    console.log(leftWristY);
    console.log(rightWristX);
    console.log(rightWristY);
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightWrist > 0.2){ 
		circle(rightWristX,rightWristY,20);
			song2.stop();
		if(song1_status == false){
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme";
		}
	}
	if(scoreLeftWrist > 0.2){
		circle(leftWristX,leftWristY,20);
			song1.stop();
		if(song2_status == false){
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Sarcastic Music";
		}
	}
}

function play(){
	song.play();
	song.setVolume(1);
	song.rate(1);
}