let canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//get window size
let screenWidth = 630, screenHeight = 460;
if (document.body && document.body.offsetWidth) {
 screenWidth = document.body.offsetWidth;
 screenHeight = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 screenWidth = document.documentElement.offsetWidth;
 screenHeight = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 screenWidth = window.innerWidth;
 screenHeight = window.innerHeight;
}

//attributes for the ball
let ballSize = 15;
let ballPosX = (screenWidth-20)/2;
let ballPosY = (screenHeight-20)/2;
let lastBallPosX = ballPosX;
let lastBallPosY = ballPosY;

//set size of the window
canvas.height = screenHeight-20;
canvas.width = screenWidth-20;

//draw the background
ctx.fillStyle = "#000000";
ctx.fillRect(-5, -5, screenWidth-20, screenHeight-20);

window.addEventListener("load", async => {
    setInterval(drawBall,5);
})
//start drawing the ball


function drawBall(){
    //overdraw the old ball
    ctx.beginPath();
    ctx.arc(lastBallPosX, lastBallPosY, ballSize*2, 0, 2 * Math.PI);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    //draw new ball
    ctx.beginPath();
    ctx.arc(ballPosX, ballPosY, ballSize, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

    calculate();
}

function calculate(){
    lastBallPosX = ballPosX;
    lastBallPosY = ballPosY;

    ballPosX = ballPosX + 2;
    ballPosY = ballPosY + 2

    if(ballPosX >= canvas.width || ballPosX <= 0){
        ballPosX * (-1);
    }
    if(ballPosY >= canvas.height || ballPosY <= 0){
        ballPosY * (-1);
    }
    
}