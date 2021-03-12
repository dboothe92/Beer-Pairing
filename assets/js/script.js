//Difficulty selection
const easy = document.querySelector("#easy");
const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");
const impossible = document.querySelector("#impossible");
const playAgain = document.querySelector(".play-again")
const quit = document.querySelector(".quit");
const dead = document.querySelector("#gameDone");
const reason = document.querySelector("#deathReason");
let modal = document.querySelector("#modal-container");
let canvasContainer = document.querySelector("#canvasContainer");

let deathReason;

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

impossible.addEventListener("click", function() {
    buttonClick = impossible.textContent.toLowerCase();
    speed = 130;
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
let tempScore = JSON.parse(localStorage.getItem("score"));

//variable to hold interval
let timer;

//Sets up original placement and controls speed
function setUp() {
    //removes game start buttons
    gameContainer.removeAttribute("class", "invisible");
    main.removeChild(startOptions);

    //lets us use arrows to manipulate snake
    if (buttonClick === "impossible") {
        addEventListener('keydown', impossibleDirection);
    } else {
        addEventListener('keydown',changeDirection);
    }

    move();
};

//Holds Interval
function move() {
    timer = setInterval(gamePlay, speed);
}

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

//Changes direction on impossible mode
function impossibleDirection(event) {
    event.preventDefault();

    let direction = event.key.replace('Arrow', '');

    switch(direction) {
        case "Up":
            xSpeed = 0;
            ySpeed = scale;
            break;
        case "Down":
            xSpeed = 0;
            ySpeed = -scale;
            break;
        case "Left":
            xSpeed = scale;
            ySpeed = 0;
            break;
        case "Right":
            xSpeed = -scale;
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

        //Speeds up snake gradually for each fruit on Normal and Hard mode
        if (buttonClick === "normal") {
            speed = speed - 5;
            clearInterval(timer);
            move();

            if (speed < 10){
                speed = 10;
            };
        }; 
        if (buttonClick === "hard") {
            speed = speed - 10;
            clearInterval(timer);
            move();

            if (speed < 10){
                speed = 10;
            };
        };
        if (buttonClick === "impossible") {
            speed = speed - 20;
            clearInterval(timer);
            move();

            if (speed < 5) {
                speed = 5;
            };
        }
    };
    //fills tail 
    fillTail();
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
            deathReason = "Snake got your tail?"
            localStore();
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
        deathReason = "Can't ssslither through that."
        localStore();
        gameOver();
    } if (xCoord < 0) {
        deathReason = "Can't ssslither through that."
        xCoord = canvas.width;
        localStore();
        gameOver();
    } if (yCoord > canvas.height) {
        deathReason = "Can't ssslither through that."
        yCoord = 0;
        localStore();
        gameOver();
    } if (yCoord < 0) {
        deathReason = "Can't ssslither through that."
        yCoord = canvas.height;
        localStore();
        gameOver();
    };
};

function randomGif() {
    fetch("http://api.giphy.com/v1/gifs/random?api_key=FgQZWTJ3JSHeXHfkw5pfiRMCXjyd8kxc")
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        //console.log(response.data.image_url);
        let source = response.data.image_url;
        let gameOverImg = document.createElement("img");

        gameOverImg.setAttribute("src", source);
        gameOverImg.setAttribute("class", "mx-auto");
        gameOverImg.setAttribute("style", "max-height: 300px;");

        canvasContainer.appendChild(gameOverImg);
    })
};

// This ends game and has event listeners for high score section "buttons"
function gameOver () {
    if (tailSize > tempScore) {
        let highScore = document.createElement("p");
        highScore.textContent ="You got a High Score!";
        highScore.setAttribute("class", "font-bold text-3xl my-3 text-red-600");

        modal.appendChild(highScore);
    };

    let scoreBoard = document.querySelector(".score")
    let playerScore = localStorage.getItem("score" ,"value")
    
    //stops timer
    clearInterval(timer);

    //adds score and removes canvas
    canvasContainer.removeChild(canvas);

    randomGif();
    
    modal.removeAttribute("class", "invisible");
    dead.setAttribute("class", "font-bold text-7xl text-red-600");
    reason.setAttribute("class", "font-bold text-3xl my-3 text-red-600");
    

    reason.textContent = deathReason;

    scoreBoard.innerHTML= playerScore;
    
    //Play Again
    playAgain.addEventListener("click", function () {
        location.reload();
    });

    //Quit
    quit.addEventListener("click", function () {
        location.reload();
    });
};

function localStore () {
    localStorage.setItem("score", tailSize);
};


