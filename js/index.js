let frameCount;
let point;
let highScore;
let bgImage = new Image();
let deck;
let player;
let pipes;
let animation;
let gameState = 0;
let temp = localStorage.getItem("flappy-highScore");
let sound;

if (temp) {
    highScore = temp;
} else {
    highScore = 0;
}
highScoreDiv.innerHTML = `High Score: ${highScore}`;

startBnt.addEventListener("click", function() {
    gameState = 1;
    gameStart.style.display = "none";
    hints.style.display = "none";
    setup();
});

//setups the whole game
function setup() {
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    bgImage = new Image();
    bgImage.src = "./images/background.png";
    deck = new Deck();
    point = 0;
    frameCount = 0;
    pipes = [];
    scoreboard.style.display = "block";
    scoreboard.innerHTML = `${point}`;
    canvas.style.display = "block";
    player = new Player();
    pipes.push(new Pipe());
    loop();
}

//draws all the components on the canvas
function draw() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    //drawing background image
    for (let i = 0; i < Math.ceil(width / bgWidth); i++) {
        context.drawImage(
            bgImage,
            i * bgWidth,
            height - bgHeight,
            bgWidth,
            bgHeight
        );
    }
    player.show();
    player.update();

    //looping through all pipes to check collision and edge conditions
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        //checking for collision with pipes
        if (player.collides(pipes[i])) {
            window.cancelAnimationFrame(animation);
            gameState = 2;
            gameOver();
        }

        //checking for point up
        if (pipes[i].pointUp(player)) {
            point++;
            scoreboard.innerHTML = `${point}`;
            sound = new Audio('./sounds/sfx_point.wav');
            sound.play();
        }
    }

    //checking for players edge condition
    if (player.edge()) {
        gameState = 2;
        gameOver();
    }

    if (pipes[pipes.length - 1].x < width / 2) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {

        if (pipes[i].edge()) {
            pipes.splice(i, 1);
        }
    }
    deck.moveDeck();
    frameCount++;

    if (gameState === 1) {
        loop();
    }
}

//runs the loop to animate
function loop() {
    animation = window.requestAnimationFrame(draw);
}

//the first function to run
function start() {
    canvas.style.display = "hidden";
}

//runs after the game is over
function gameOver() {
    window.cancelAnimationFrame(animation);
    gameover.style.display = "block";
    restartBtn.style.display = "block";
    scoreboard.style.display = "none";
    finalScore.innerHTML = `Your Score: ${point}`;
    canvas.style.display = "none";
    sound = new Audio('./sounds/sfx_die.wav');

    //setting the highscore on the localstorage
    if (point > highScore) {
        highScore = point;
        localStorage.setItem("flappy-highScore", point);
    } else {
        localStorage.setItem("flappy-highScore", highScore);
    }

    currentHS.innerHTML = `High Score: ${highScore}`;
}

//adding restart functionality to the restart button
restartBtn.addEventListener("click", function() {
    gameState = 1;
    gameover.style.display = "none";
    setup();
});

//listening for space Bar press to jump
window.addEventListener("keypress", function(e) {

    if (e.key === " ") {
        player.jump();
    }
});