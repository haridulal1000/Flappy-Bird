let gameStart = document.getElementById("gameStart");
let highScoreDiv = document.getElementById("score");
let startBnt = document.getElementById("start");
let canvas = document.getElementById("viewPort");
let context = canvas.getContext("2d");
let scoreboard = document.getElementById("scoreboard");
let gameover = document.getElementById("gameOver");
let finalScore = document.getElementById("finalScore");
let currentHS = document.getElementById("currentHS");
let restartBtn = document.getElementById("restart");
let frameCount;
let point;
let highScore;
let crash = new Audio("./sounds/crash.mp3");
let bgHeight=400;
let bgWidth=600;
let bgImage=new Image();
let deck;
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
let player;
let pipes;
let animation;
let gameState = 0;
let road;

let temp = localStorage.getItem("flappy-highScore");
if (temp) {
  highScore = temp;
} else {
  highScore = 0;
}
highScoreDiv.innerHTML = `High Score: ${highScore}`;

startBnt.addEventListener("click", function () {
  gameState = 1;
  gameStart.style.display = "none";
  hints.style.display = "none";
  setup();
});

function setup() {
  // road = new Road();
  bgImage.src='./images/background.png';
  deck=new Deck();
  point = 0;
  frameCount = 0;
  pipes = [];
   pipeSpeed = -10;
  scoreboard.style.display = "block";
  scoreboard.innerHTML = `${point}`;
  canvas.style.display = "block";
  player = new Player();
  pipes.push(new Pipe());
  loop();
}

function draw() {
  if(gameState===2){
    pipes.forEach(element => {
      element.xVel=0;
    });
    if(player.edge()){
        gameOver();
    }
  }
    context.fillStyle='white';
    context.fillRect(0,0,width,height);
  for(let i=0;i<Math.ceil(width/bgWidth);i++){
    context.drawImage(bgImage,i*bgWidth,height-bgHeight,bgWidth,bgHeight);
  }
  player.show();
  player.update();
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (player.collides(pipes[i])) {
      crash.play();
     // window.cancelAnimationFrame(animation);
      gameState = 2;
      //gameOver();
    }
    if (pipes[i].pointUp(player)) {
      point++;
      scoreboard.innerHTML = `${point}`;
    }
  }
    if (player.edge()) {
      crash.play();
      gameState=2;
      //gameOver();
    }
  // }
  if (pipes[pipes.length - 1].x <width/2) {
    pipes.push(new Pipe());
  }
  for(let i=pipes.length-1;i>=0;i--){
  if (pipes[i].edge()) {
    pipes.splice(i,1);
  }
}
deck.moveDeck();
  frameCount++;
  //if (gameState === 1) {
    loop();
 // }
}
function loop() {
  animation = window.requestAnimationFrame(draw);
}
function start() {
  canvas.style.display = "hidden";
}

function gameOver() {
  window.cancelAnimationFrame(animation);
  gameover.style.display = "block";
  restartBtn.style.display = "block";
  scoreboard.style.display = "none";
  finalScore.innerHTML = `Your Score: ${point}`;
  canvas.style.display = "none";
  if (point > highScore) {
    highScore = point;
    localStorage.setItem("flappy-highScore", point);
  } else {
    localStorage.setItem("flappy-highScore", highScore);
  }
  currentHS.innerHTML = `High Score: ${highScore}`;
}
restartBtn.addEventListener("click", function () {
  gameState = 1;
  gameover.style.display = "none";
  setup();
});
window.addEventListener('keypress',function(e){
  if(e.key===' '){
    player.jump();
  }
})
