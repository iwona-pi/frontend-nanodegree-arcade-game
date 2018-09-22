// This parent class is helpful to not repeat some properties and functions.
class ObjectGame {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Enemies our player must avoid
class Enemy extends ObjectGame {
    constructor() {
    super() 
        this.x = -101;
        this.y = r[Math.floor(Math.random()*3)];
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random()*1200) + 200;
    }
    
    // Let's move our enemies...
    update(dt) {
        
        this.x += dt*this.speed;
        // and back them to start position when they rich the end of the canvas
        if (this.x > 505) {
            this.x = -101;
            this.speed = Math.floor(Math.random()*1200) + 200;
            this.y = r[Math.floor(Math.random()*3)];
        }
    }
}

// It is time to create Player class...
class Player extends ObjectGame{
    constructor() {
    super() 
        this.x = 202;
        this.y = 400;
        this.sprite = 'images/char-boy.png';
    }
   
    // Short instruction to our Player how to move on
    handleInput(keyCode) {
        
        // The code above is working when player first time rich the water.
        // It prevents Player to move across the rock image.
        if (this.sprite === 'images/char-cat-girl.png') {
            if (keyCode === 'up' && this.y === 230 && this.x === 202) {
            keyCode = 'none';
            } if (keyCode === 'left' && this.y === 145 && this.x === 302) {
                keyCode = 'none';
            } if (keyCode === 'down' && this.y === 60 && this.x === 202) {
                keyCode = 'none';
            } if (keyCode === 'right' && this.y === 145 && this.x === 102) {
                keyCode = 'none';
            }
        }

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

    // This function updates player position when something happend!
    update() {
        // When enemies and player meet face to face (collision!), the second one 
        // have to comes back to start position. 
        for (let enemy of allEnemies) {
            let t = this.x - enemy.x;
            if (this.y === enemy.y &&  t >= -73 && t <= 73 ) {
            setTimeout(function() {player.y = 400, player.x = 202}, 100);
        }}

        // When player richs the water (cool!) for the first time it also comes back to start position but
        // in completely different image.
        if (this.y === -25) {

            setTimeout(function() {
                player.x = 202,
                player.y = 400,
                player.sprite = 'images/char-cat-girl.png'
                },
            
            200)} 
    }
}

// And last but not least - Rock class. It is used to draw the stone.
class Rock extends ObjectGame{
    constructor(x, y) {
        super(x,y)
        this.sprite = 'images/Rock.png';
    }
}


const player = new Player();
const Rock1 = new Rock(202,140); // instantiate rock object with the given position
const r = [60,145,230]; // this array holds three possible y-position (number of pixels) of the enemies
const allEnemies = [];
// Instantiate three enemy objects with random position and random speed.
const enemy1 = new Enemy();
const enemy3 = new Enemy();
const enemy2 = new Enemy();
allEnemies.push(enemy1, enemy2, enemy3);



// This listens for key presses and sends the keys to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

