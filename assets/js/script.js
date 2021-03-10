

//Difficulty selection
const easy = document.querySelector("#easy");
const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");
var playAgain = document.querySelector(".play-again")
var quit = document.querySelector(".quit")
//Keeps track of game mode
let buttonClick;
//Initial speed
let speed
//Starts selected game mode
easy.addEventListener("click", function() {
    speed = 250;
    canvas.setAttribute("height", 500);
    canvas.setAttribute("width", 500);
    setUp();
});
normal.addEventListener("click", function() {
    buttonClick = normal.textContent.toLowerCase();
    speed = 250;
    canvas.setAttribute("height", 500);
    canvas.setAttribute("width", 500);
    setUp();
});
hard.addEventListener("click", function() {
    buttonClick = hard.textContent.toLowerCase();
    speed = 170;
    canvas.setAttribute("height", 300);
    canvas.setAttribute("width", 300);
    setUp();
});
//Creates canvas
const main = document.querySelector("#main");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const ctxFruit = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
//Start Game
const gameContainer = document.querySelector("#gameContainer");
const startOptions = document.querySelector("#startOptions");
//Original snake 
let xCoord = 0;
let yCoord = 0;
let xSpeed = scale;
let ySpeed = 0;
//Original fruit location
let fruitXcoord = (Math.floor(Math.random() * rows -1) + 1) * scale;
let fruitYcoord = (Math.floor(Math.random() * columns -1) + 1) * scale;
//Keeps track of 'score' and tail size
let tailSize = 0
let tail = [];
let timeOuts = [];
let timer;
//Sets up original placement and controls speed
function setUp() {
    //removes game start buttons
    gameContainer.removeAttribute("class", "invisible");
    main.removeChild(startOptions);
    window.setTimeout(gamePlay, speed);
    //lets us use arrows to manipulate snake
    window.addEventListener('keydown',changeDirection);
};
//Changes direction
function changeDirection(event) {
    event.preventDefault();
    let direction = event.key.replace('Arrow', '');
    switch(direction) {
        case "Up":
            xSpeed = 0;
            ySpeed = -scale;
            break;
        case "Down":
            xSpeed = 0;
            ySpeed = scale;
            break;
        case "Left":
            xSpeed = -scale;
            ySpeed = 0;
            break;
        case "Right":
            xSpeed = scale;
            ySpeed = 0;
            break;
    };
};
//Timer that makes game function
function gamePlay() {
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //fills 'fruit'
    ctxFruit.fillRect(fruitXcoord, fruitYcoord, scale, scale);
    //updates location
    update();
    //fills snake
    fillSnake();
    //keeps count of 'fruit' eaten
    if (xCoord === fruitXcoord && yCoord === fruitYcoord) {
        tailSize++;
        fruitXcoord = (Math.floor(Math.random() * rows -1) + 1) * scale;
        fruitYcoord = (Math.floor(Math.random() * columns -1) + 1) * scale;
        //Speeds up snake gradually for each fruit on "Normal Mode"
        if (buttonClick === "normal") {
            speed = speed - 5;
            if (speed < 10){
                speed = 10;
            };
        }; 
        if (buttonClick === "hard") {
            speed = speed - 10;
            if (speed < 10){
                speed = 10;
            };
        }
    };
    //fills tail 
    fillTail();
  timer = setTimeout(gamePlay, speed);
   timeOuts.push(timer);

};
//Fills snake
function fillSnake() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(xCoord, yCoord, scale, scale); 
};
//Fills tail
function fillTail() {
    for (i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x, tail[i].y, scale, scale);
        if (tail[i].x === xCoord && tail[i].y === yCoord) {
            gameOver();
            console.log("gotchatail");
        }
    };
};
//Updates tail size and keeps track of location
function update() {
    for (i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    };
    tail[tailSize -1] = {
        x: xCoord,
        y: yCoord
    };
    xCoord += xSpeed;
    yCoord += ySpeed; 
    if (xCoord > canvas.width) {
        xCoord = 0;
       gameOver();
        console.log("deag right");
    } if (xCoord < 0) {
        xCoord = canvas.width;
        gameOver();
        console.log("Dead Left");
    } if (yCoord > canvas.height) {
        yCoord = 0;
        gameOver();
        console.log("Dead Down");
    } if (yCoord < 0) {
        yCoord = canvas.height;
        gameOver();
        console.log("Dead Up");
    };
};
const modal = document.querySelector("#modal-container")
// this ends game and has event listeners for high score section "buttons"
function gameOver () {
    modal.classList.remove("invisible");
   gameContainer.setAttribute("class", "invisible");
   
    playAgain.addEventListener("click", function () {
        location.reload();
    })

    quit.addEventListener("click", function () {
        location.reload();
    })
 
}

