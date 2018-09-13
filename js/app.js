// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(y, speed) {
    this.x = -101;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
}
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

       /* if (this.x > 505) {
            this.x = -101;
            this.speed = 100;
            this.y = r[Math.floor(Math.random()*3)]
        }*/
    }

    update(dt) {
        
        this.x += dt*this.speed;
        if (this.x > 505) {
            this.x = -101;
            this.speed = Math.floor(Math.random()*1200) + 30;
            this.y = r[Math.floor(Math.random()*3)];
        }
}
      
};


class Player {
    constructor(x = 202, y = 400) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
    handleInput(keyCode) {

        if (keyCode === 'up' && this.y > -25) {
            this.y -= 85;
        }
        if (keyCode === 'down' && this.y < 400) {
            this.y += 85;
        }
        if (keyCode === 'right' && this.x < 402) {
            this.x += 100;
        }
        if (keyCode === 'left' && this.x >2) {
            this.x -= 100;
        }
    }

    update() {
        let t = this.x - enemy1.x;
        if (this.y === enemy1.y &&  t >= -73 && t <= 73 ) {
            setTimeout(function() {player.y = 400, player.x = 202}, 300);
        }

        if (this.y === -25) {
            setTimeout(function()
            {player.x = 202,
            player.y = 400,
            player.sprite = 'images/char-cat-girl.png'},
        200)}
        /*for (var item of allEnemies) {
            if (player.y = item.y) {
                this.y = 400;
            }
        }*/
    }
}

var player = new Player();
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
//     // all computers.
// };

// Draw the enemy on the screen, required method for game
/*Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const r = [60,145,230];
var allEnemies = [];
 
const enemy1 = new Enemy(r[Math.floor(Math.random()*3)], 20);
    // Math.floor(Math.random()*1200) + 30);
/*const enemy3 = new Enemy(r[Math.floor(Math.random()*3)], Math.floor(Math.random()*1200) + 30);
const enemy2 = new Enemy(r[Math.floor(Math.random()*3)], Math.floor(Math.random()*1200) + 30);
allEnemies.push(enemy3);
allEnemies.push(enemy2);*/
allEnemies.push(enemy1);

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

