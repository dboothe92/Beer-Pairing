//Difficulty selection
var easy = document.querySelector("#easy");
const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");
debugger
//Keeps track of game mode
let buttonClick;

//Starts selected game mode
easy.addEventListener("click", function() {
    buttonClick = easy.textContent.toLowerCase();

    canvas.setAttribute("height", 500);
    canvas.setAttribute("width", 500);

    setUp();
});

normal.addEventListener("click", function() {
    buttonClick = normal.textContent.toLowerCase();

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
const scale = 11;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const modal = document.querySelector("#modal-container")


//Start Game
const gameContainer = document.querySelector("#gameContainer");
const startOptions = document.querySelector("#startOptions");

//Initial speed
let speed = 250;

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

//setsUp original Placement and controls speed
//debugger;
function setUp() {
    //removes game start buttons
    gameContainer.removeAttribute("class", "invisible");
    main.removeChild(startOptions);

    window.setInterval(function() {
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
            console.log(tailSize);
        };

        //fills tail 
        for (i = 0; i < tail.length; i++) {
            ctx.fillRect(tail[i].x, tail[i].y, scale, scale);
                // snakes death sb
            if (tail[i].x === xCoord && tail[i].y === yCoord) {
                console.log("gotchatail");
                gameOver();
            }
        };

    }, 250);

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

    setTimeout(gamePlay, speed);
};

//Fills snake
function fillSnake() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(xCoord, yCoord, scale, scale); 
};

//Fills tail
function fillTail() {
    for (i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x, tail[i].y, scale, scale);

        if (tail[i].x === xCoord && tail[i].y === yCoord) {
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
    // snakes death sb
    if (xCoord > canvas.width) {
        xCoord = 0;
       console.log("Dead Right");
       gameOver();
    } if (xCoord < 0) {
        xCoord = canvas.width;
        console.log("Dead Left");
        gameOver();
    } if (yCoord > canvas.height) {
        yCoord = 0;
        console.log("Dead Down");
        gameOver();
    } if (yCoord < 0) {
        yCoord = canvas.height;
        console.log("Dead Up");
        gameOver();
    };
};


setUp();

function gameOver () {
    modal.classList.remove("invisible")
    
    
 // location.reload();
};

