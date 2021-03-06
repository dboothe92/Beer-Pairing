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
        
        if(snake.eat(fruit)) {
            fruit.pickLocation();
        }
    
    }, 250);
}());

//adds ability to control snake with arrow keys
document.addEventListener('keydown',((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));


//function that controls movement of snake 
function Snake () {
    //Starting point
    this.x = 0;
    this.y= 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0
    this.tail =[];

    // fills rectangle
    this.draw = function () {
        ctx.fillStyle = "#ffe120";
        for (i = 0; i < this.tail.length; i++) {
          ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    }


    //checks if snake is leaving the canvas
   this.update = function () {
    for (i = 0; i < this.tail.length -1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = {
      x: this.x,
      y: this.y
    };


    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x > canvas.width) {
        this.x = 0
    } if (this.y > canvas.height) {
      this.y = 0.
    } if (this.x < 0) {
      this.x = canvas.width
    } if (this.y < 0) {
      this.y = canvas.height
    }
  };

  //Checks direction of snake and adjusts movement
   this.changeDirection = function(direction) {
      switch(direction) {
        case "Up":
           this.xSpeed = 0;
           this.ySpeed = -scale * 1;
           break;
        case "Down":
           this.xSpeed = 0;
           this.ySpeed = scale * 1;
           break;
        case "Left":
          this.xSpeed = -scale * 1;
          this.ySpeed = 0;
          break;
        case "Right":
          this.xSpeed = scale * 1;
          this.ySpeed = 0;
          break;
      };
    };

    this.eat = function(fruit) {
      if (this.x === fruit.x && this.y === fruit.y) {
        this.total++;
        return true;
      } else {
        return false;
      };
    };
 };


 function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    };

    this.draw = function() {
        ctx.fillStyle = "000000";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
};