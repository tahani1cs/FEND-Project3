// Variabiles
let score        = 0 ;
const scoreInfo  = document.querySelector('.score');
let countColl    = 0 ;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
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
  this.x = this.x + this.speed * dt;
  if (this.x >= 505) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 222 );
  }

  //collision
  if ( player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 60 &&
    player.y + 60 > this.y ) {
    player.x = 202.5; 
    player.y = 404;
    countColl++;
    if (countColl == 3) {
    collision();
    }
}
};

function collision(){
  // setTimeout('', 10000);
  alert('Game Over!');
  countColl = 0;
  score = 0;
  scoreInfo.innerHTML = score;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
};

Player.prototype.update = function() {
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {

  // Enables user on left arrow key to move left on the x axis, Also enables user not to go off the game tiles on the left side
  if( key === 'left' && this.x > 100 )  
  this.x = this.x - 90;
    // Enables user on left arrow key to move right on the x axis, Also enables user not to go off the game tiles on the right side
else if( key === 'right' && this.x < 360)
  this.x = this.x + 90;
    // Enables user on left arrow key to move up on the x axis, Also enables user not to go off the game tiles on the up side
else if( key === 'up' && this.y > 25)
  this.y = this.y - 90;
    // Enables user on left arrow key to move down on the x axis, Also enables user not to go off the game tiles on the down side
else if( key === 'down' && this.y < 350)
  this.y = this.y + 90;

  // Once the user reaches the top of the page; the water, the user is
  // Instantly reset to the starting position
  if (this.y < 0) {
      this.x = 202.5;
      this.y = 404;
     score++
     scoreInfo.innerHTML = score;
     setTimeout('', 10000);
    if (score == 3){
      win();
    }
  };
};

function win(){
    alert('Win!');
      score = 0;
      scoreInfo.innerHTML = score;
      countColl = 0;


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);

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

