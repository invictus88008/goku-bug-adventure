// Enemies our player must avoid
var Enemy = function(y, x) {
    this.y = y;
    this.x = x;
    this.top = this.y;
    this.bottom = this.y - 100
    this.sprite = 'images/enemy-bug.png';
};

//Updates enemy location
Enemy.prototype.update = function(dt, canvas) {
    ( this.x += 2 ) * dt;

//checks for hits ends game and sends message
    if( player.y > this.bottom && player.y < this.top && this.x + 55 > player.x && this.x - 80 < player.x ) {
        endGame("You Loose! Press enter to Play again")
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Starting position for player
var xPosition = 200;
var yPosition = 400;

//Generates player
var Player = function() {
    this.x = xPosition;
    this.y = yPosition;
    this.sprite = 'images/char-boy.png';
};

//Updates the players position based on location
Player.prototype.update = function(canvas) {
    this.x = xPosition;
    this.y = yPosition;

//Ends game and sends winning message
    if(this.y < -1) {
        endGame("You Win! Press enter to Play again")
    }
};
//
Player.prototype.handleInput = function(key) {
    if(key == "left" && this.x > 0) {
        xPosition -= 100
        this.update(xPosition);
    }
    if(key == "right" && this.x <= 320) {
        xPosition += 100
        this.update(xPosition);
    }
    if(key == "up" && this.y > 0) {
        yPosition -= 100
        this.update(xPosition);

    }
    else if(key == "up" && this.y <= 0) {
        yPosition -= 50;
        console.log(this.y)
    }
    if(key == "down" && this.y < 400) {
        yPosition += 100

    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Generates coordinates for bugs to travel on
var getY = function() {
       var fig = Math.floor( Math.random() * 3);
       if(fig === 1) {
        return 50
       }
       else if(fig === 2) {
        return 120
       }
       else {
        return 220
       }
   };

   var getX = function() {
       var fig = Math.floor( Math.random() * 3);
       if(fig === 1) {
        return -50
       }
       else {
        return -50
       }
   };

//Generates bugs every few seconds
var allEnemies = [];

function addEnemy() {
    allEnemies.push( new Enemy(getY(), getX()) )
};

addEnemy();

setInterval(function(){addEnemy()}, 1400);


var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'

    };

    player.handleInput(allowedKeys[e.keyCode]);
    if(!gameOn) {
        resetGame(allowedKeys[e.keyCode]);
    }
});

//game functions

//controls the updating of game
function gameOver( outcome ) {
        if( outcome ){
            gameOn = false
        }
    }

//function to reset the game
function resetGame( key ) {
    if(key == 'enter') {
        xPosition = 200;
        yPosition = 400;
        player = new Player();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.fillRect(0,0,1000,1000);
        allEnemies = [];
        gameOn = true;
    }
}

//end of game function
function endGame( message ) {
    gameOver(true)
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText(message,0,30);
}