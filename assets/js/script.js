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

//keeps track of 'score' and tail size
let tailSize = 0
let tail = [];

//setsUp original Placement and controls speed
function setUp() {
    let fruitXcoord = (Math.floor(Math.random() * rows -1) + 1) * scale;
    let fruitYcoord = (Math.floor(Math.random() * columns -1) + 1) * scale;
    

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
        };

        //fills tail 
        for (i = 0; i < tail.length; i++) {
            ctx.fillRect(tail[i].x, tail[i].y, scale, scale);

            if (tail[i].x === xCoord && tail[i].y === yCoord) {
                console.log("gotchatail");
            }
        };

    }, 250);

    //lets us use arrows to manipulate snake
    window.addEventListener('keydown',changeDirection);
};

//fillsSnake
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

//updates tail size and keeps checks location
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
        console.log("Dead Right");
    } if (xCoord < 0) {
        xCoord = canvas.width;
        console.log("Dead Left");
    } if (yCoord > canvas.height) {
        yCoord = 0;
        console.log("Dead Down");
    } if (yCoord < 0) {
        yCoord = canvas.height;
        console.log("Dead Up");
    };
}

setUp();



