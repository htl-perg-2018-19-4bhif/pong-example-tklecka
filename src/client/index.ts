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
let moveX = 1;
let moveY = 1;

//direction = true -> upper direction, direction = false -> lower direction
let direction: Boolean;

//set size of the window
canvas.height = screenHeight-20;
canvas.width = screenWidth-20;

//draw the background
ctx.fillStyle = "#000000";
ctx.fillRect(-5, -5, canvas.width, canvas.height);

window.addEventListener("load", async => {

    // Establish connection with socket.io server. Note that this just works
    // because `<script src="/socket.io/socket.io.js"></script>` is in index.html
    const socket = io();
  
    // Handle browser's keydown event
    document.addEventListener('keydown', event => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        // Send ArrowKey message to server
        socket.emit('ArrowKey', event.code);
      }
    });
  
    // Handle ArrowKey message received from server (i.e. user pressed
    // an arrow key in a different browser window).
    socket.on('ArrowKey', code => {
      // Add code of the pressed key to HTML list
      console.log(code);
    });

    //start drawing the ball
    setInterval(drawBall,1);
})

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

const angle = Math.PI / 8 + Math.random() * Math.PI / 8;

// 0 = upper right, 1 = lower right, 2 = lower left, 3 = upper left
let quadrant = Math.floor(Math.random() * 4);
let randomDir = Math.floor(Math.random() * 10);

if(randomDir > 5){
    direction = true;
}else if(randomDir <= 5){
    direction = false;
}
console.log("Direction="+direction);

function calculate(){
    lastBallPosX = ballPosX;
    lastBallPosY = ballPosY;

    
    if(quadrant === 1 || quadrant === 0){
        if(quadrant === 0){
            if(direction === true){
                moveY = 1+angle;
            }else{
                moveY = -1+angle;
            }
            
        }else if(quadrant == 1){
            if(direction === true){
                moveY = 1+angle;
            }else{
                moveY = -1+angle;
            }
        }
        moveX = 1;
    }else if(quadrant === 2 || quadrant === 3){
        if(quadrant === 2){
            if(direction === true){
                moveY = 1+angle;
            }else{
                moveY = -1+angle;
            }
        }else if(quadrant == 3){
            if(direction === true){
                moveY = 1+angle;
            }else{
                moveY = -1+angle;
            }
        }
        moveX = -1; 
    }

    if(quadrant === 0 || quadrant === 1){
        moveX = 1;
    }else{
        moveX = -1;
    }

    if(ballPosY >= canvas.height-20 || ballPosY <= 0){
        console.log("COLLISSION");
        switch(quadrant){
            case 0:{
                quadrant = 1;
                direction = false;
                break;
            }
            case 1:{
                quadrant = 0;
                direction = true;
                break;
            }
            case 2:{
                quadrant = 3;
                direction = true;
                break;
            }
            case 3:{
                quadrant = 2;
                direction = false;
                break;
            }
        }
    }

    ballPosX = ballPosX + moveX;
    ballPosY = ballPosY + moveY;
    
}
