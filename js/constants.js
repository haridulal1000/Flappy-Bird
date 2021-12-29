//constant values and elements used in the game
const height = 720;
const width = 1280;
const laneWidth = width / 3;
const pipeSpeed = -10;
const pipeFrequency = 120;
const deckHeight = 150;
const bgHeight = 400;
const bgWidth = 600;
const gameStart = document.getElementById("gameStart");
const highScoreDiv = document.getElementById("score");
const startBnt = document.getElementById("start");
const canvas = document.getElementById("viewPort");
const context = canvas.getContext("2d");
const scoreboard = document.getElementById("scoreboard");
const gameover = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const currentHS = document.getElementById("currentHS");
const restartBtn = document.getElementById("restart");