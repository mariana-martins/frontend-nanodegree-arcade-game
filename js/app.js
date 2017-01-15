// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Variables X and Y represent the Enemy location.
    this.x = Math.random() * 505;
    // this.y = (number between 1 and 3) * row height - image position fix (to look better on screen).
    this.y = (Math.round(Math.random() * 2) + 1) * 83 - 20;
    // Variable speed represents the Enemy speed.
    // It will move at most 2 columns per second.
    this.speed = Math.round(Math.random() * 2 + 1) * 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.x + this.speed * dt;
    if (newX <= 505) {
        this.x = newX;
    } else {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // Variables X and Y represent the Player location.
    this.x = 202;
    this.y = 405; // I'm subtracting 10 here to property set player on the screen.
    this.dx = 0;
    this.dy = 0;
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function(timeout) {
     setTimeout(function () {
         this.x = 202;
         this.y = 405;
    }.bind(this), timeout);
};

Player.prototype.update = function () {
    // You should add any movement by the dx and dy parameters.
    var newX = this.x + this.dx;
    if (newX >= 0 && newX <= 404) {
        this.x = newX;
    }
    this.dx = 0;
    var newY = this.y + this.dy;
    // It's -10 because I'm subtracting 10 from initial y value.
    if (newY >= -10 && newY <= 415) {
        this.y = newY;
        // If Player riach the water it will move to initial position afeter a small delay.
        if (this.y == -10) {
            this.reset(400);
        }
    }
    this.dy = 0;
    // I check if player is colliding to enemies after I update him.
    this.checkCollision();
};

Player.prototype.checkCollision = function () {

    allEnemies.forEach(function (enemy) {
        var width = 101;
        var height = 83;
        // I got the collision calculation at: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        // I'm using Axis-Aligned Bounding Box technique.
        var collide = enemy.x < this.x + width &&
            enemy.x + width > this.x &&
            enemy.y < this.y + height &&
            height + enemy.y > this.y;

        if (collide) {
            // collision detected!
           this.reset(100);
       }
    }.bind(this));

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case "left":
            this.dx = this.dx - 101;
            break;
        case "up":
            this.dy = this.dy - 83;
            break;
        case "right":
            this.dx = this.dx + 101;
            break;
        case "down":
            this.dy = this.dy + 83;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
for (var i=0; i < 5; i++) {
    allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
