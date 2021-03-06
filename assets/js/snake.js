//function that controls movement of snake 
function Snake () {
    //Starting point
    this.x = 0;
    this.y= 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    // fills rectangle
    this.draw = function () {
        ctx.fillStyle = "#ffe120";
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    //checks if snake is leaving the canvas
   this.update = function () {
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
 };
 