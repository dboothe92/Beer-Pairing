const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let snake;

//Handles where the snake is drawn and movement
(function setup() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.pickLocation();

    window.setInterval(()=> {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        fruit.draw();
        snake.update();
        snake.draw();
        
    
    }, 250);
}());

//adds ability to cvontrol snake with arrow keys
window.addEventListener('keydown',((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));