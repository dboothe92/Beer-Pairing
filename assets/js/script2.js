const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const ctxFruit = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

//Original snake 
let xCoord = 0;
let yCoord = 0;
let xSpeed = scale;
let ySpeed = 0;

let total = 0
let tail = [];

//setsUp original Placement and controls speed
function setUp() {
    let fruitXcoord = (Math.floor(Math.random() * rows -1) + 1) * scale;
    let fruitYcoord = (Math.floor(Math.random() * columns -1) + 1) * scale;
    

    window.setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < tail.length; i++) {
            ctxFruit.fillRect(tail[i].xCoord, tail[i].yCoord, scale, scale);
            //ctxFruit.fillStyle = 
        };

        ctxFruit.fillRect(fruitXcoord, fruitYcoord, scale, scale);

        update();

        fillSnake();

        if (xCoord === fruitXcoord && yCoord === fruitYcoord) {
            fruitXcoord = (Math.floor(Math.random() * rows -1) + 1) * scale;
            fruitYcoord = (Math.floor(Math.random() * columns -1) + 1) * scale;
            total++;
            console.log(total);
        }
    }, 100);

    window.addEventListener('keydown',changeDirection);
};

//Makes snake and makes sure it stays on canvas
function fillSnake() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(xCoord, yCoord, scale, scale); 
};

//Changes Direction
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

function update() {
    for (i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    };

    tail[total -1] = {
        x: xCoord,
        y: yCoord
    };

    xCoord += xSpeed;
    yCoord += ySpeed; 

    if (xCoord > canvas.width) {
        xCoord = 0;
    } if (xCoord < 0) {
        xCoord = canvas.width;
    } if (yCoord > canvas.height) {
        yCoord = 0;
    } if (yCoord < 0) {
        yCoord = canvas.height;
    };
}

setUp();



