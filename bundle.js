(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* Classes and Libraries */
const Game = require('./game');
const Vector = require('./vector');
const Camera = require('./camera');
const Player = require('./player');
const Bullet = require('./bullet');
const Powerup = require('./powerup');
const Enemy = require('./enemy');


/* Global variables */
var enemyTimer = 1000;
var start = true;
var spawnEnemy = false;
var advanceLevel = false;
var transition = false;
var pauseGame = false;
var winGame = false;
var loseGame = false;
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var input = {
  up: false,
  down: false,
  left: false,
  right: false
}
var camera = new Camera(canvas);
var score = 0;

var enemyBullets = [];
var bullets = [];
var missiles = [];
var player = new Player(bullets, missiles);
var bulletDuration = 500;
var bulletSize = 5;
var powerups = [];
var spawned = false;
var level = 1;
var backgrounds = [
  new Image(),
  new Image(),
  new Image()
];

function init(){
  powerups = [];
  enemies = [];
  if(level == 1){
    backgrounds[2].src = 'assets2/level1.png';
    backgrounds[1].src = 'assets2/level1_layer2.png';
    backgrounds[0].src = 'assets2/level1_layer3.png';
  }
  else if(level == 2){
    backgrounds[2].src = 'assets2/level2.png';
    backgrounds[1].src = 'assets2/level2_layer2.png';
    backgrounds[0].src = 'assets2/level2_layer3.png';
    player.position.x = 500;
    player.position.y = 5000;
  }
  else if(level == 3){
    backgrounds[2].src = 'assets2/level3.png';
    backgrounds[1].src = 'assets2/level3_layer2.png';
    backgrounds[0].src = 'assets2/level3_layer3.png';
    player.position.x = 500;
    player.position.y = 5000;
  }
  else {
    transition = true;
    winGame = true;
  }
}

var enemies = [];
var enemy1 = new Enemy(level, camera.x, camera.y);
var enemy2 = new Enemy(level, camera.x, camera.y);
var enemy3 = new Enemy(level, camera.x, camera.y);
var enemy4 = new Enemy(level, camera.x, camera.y);
var enemy5 = new Enemy(level, camera.x, camera.y);
var enemy6 = new Enemy(level, camera.x, camera.y);
var enemy7 = new Enemy(level, camera.x, camera.y);
var enemy8 = new Enemy(level, camera.x, camera.y);
var enemy9 = new Enemy(level, camera.x, camera.y);
var enemy10 = new Enemy(level, camera.x, camera.y);
enemies.push(enemy1);
enemies.push(enemy2);
enemies.push(enemy3);
enemies.push(enemy4);
enemies.push(enemy5);
enemies.push(enemy6);
enemies.push(enemy7);
enemies.push(enemy8);
enemies.push(enemy9);
enemies.push(enemy10);


document.getElementById("screen").style.backgroundAttachment= "fixed";
document.getElementById("screen").style.backgroundSize="100%";
document.getElementById("screen").style.backgroundRepeat="no-repeat";

/**
 * @function onkeydown
 * Handles keydown events
 */
window.onkeydown = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = true;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = true;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = true;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = true;
      event.preventDefault();
      break;
    case "j":
      var bullet = new Bullet(player.position, bulletSize);
      bullets.push(bullet);
      setTimeout(function(){
        bullets.splice(0,1);
      }, bulletDuration);
      break;
  }
}

/**
 * @function onkeyup
 * Handles keydown events
 */
window.onkeyup = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = false;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = false;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = false;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = false;
      event.preventDefault();
      break;
    case "Enter":
      pauseGame = !pauseGame;
      break;
  }
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  if(!pauseGame && winGame == false && loseGame == false){
    setTimeout(function(){
      game.loop(timestamp);
    }, 1000/8);
    transition = false;
  }
  else {
    transition = true;
  }

  if(start == true){
    init();
    start = false;
    pauseGame = true;
  }
  if(advanceLevel == true){
    score += 100;
    enemyTimer -= 200;
    init();
    transition = true;
    setTimeout(function(){
      transition = false;
    }, 3000);
    advanceLevel = false;
    pauseGame = true;
  }
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  if(spawned == false){
    setTimeout(function(){
      powerups.push(new Powerup(camera.x, camera.y));
      spawned = false;
      }
    , 8000);
    spawned = true;
  }

  for (var f = 0; f < enemies.length; f++) {
    if(((player.position.x - 12.5) + 23 > enemies[f].x) && (player.position.x - 12.5 < (enemies[f].x + 11))
    && ((player.position.y - 12) + 27 > enemies[f].y) && (player.position.y - 12 < (enemies[f].y + 11))){
      transition = true;
      loseGame = true;
      console.log(loseGame);
    }
  }

  if(spawnEnemy == false){
    setTimeout(function(){
      for (var v = 0; v < enemies.length; v++) {
        enemyBullets.push(enemies[v].fire());
        setTimeout(function(){
          enemyBullets.splice(0,1)}, 4000);
      }
      enemies.push(new Enemy(level, camera.x, camera.y));
      spawnEnemy = false;
      }
    , enemyTimer);
    spawnEnemy = true;
  }

  // update the player
  player.update(elapsedTime, input, level);
  if(player.position.y <= -10){
    level++;
    advanceLevel = true;
  }

  // update the camera
  camera.update(player.position);

  // Update bullets
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].update(true);
  }

  for (var b = 0; b < enemies.length; b++) {
    for (var c = 0; c < bullets.length; c++) {
      if((enemies[b].x + 10 > bullets[c].x) && (enemies[b].x < (bullets[c].x + 5))
      && (enemies[b].y + 10 > bullets[c].y) && (enemies[b].y - 12 < (bullets[c].y + 5))){
        enemies.splice(b,1);
        bullets.splice(c,1);
        break;
      }
    }
  }

  for (var k = 0; k < enemyBullets.length; k++) {
    enemyBullets[k].update(false);
    if(((player.position.x - 12.5) + 23 > enemyBullets[k].x) && (player.position.x - 12.5 < (enemyBullets[k].x + 5))
    && ((player.position.y - 12) + 27 > enemyBullets[k].y) && (player.position.y - 12 < (enemyBullets[k].y + 5))){
      player.health--;
      enemyBullets.splice(k,1);
      if(player.health == 0){
        transition = true;
        loseGame = true;
      }
      break;
    }
  }

  for (var j = 0; j < powerups.length; j++) {
    if(((player.position.x - 12.5) + 23 > powerups[j].x) && (player.position.x - 12.5 < (powerups[j].x + 11))
    && ((player.position.y - 12) + 27 > powerups[j].y) && (player.position.y - 12< (powerups[j].y + 11))){
      powerups[j].touched = true;
    }
    var action = powerups[j].update();
    if (action){
      switch (powerups[j].color) {
        case 'red':
          player.health++;
          powerups.splice(j,1);
          break;
        case 'yellow':
          bulletSize += 1;
          powerups.splice(j,1);
          break;
        case 'blue':
          bulletDuration += 100;
          powerups.splice(j,1);
          break;
        case '#00FBFF':
          powerups.splice(j,1);
          break;
        case '#FF9B00':
          powerups.splice(j,1);
          break;
      }
    }
  }

  // Update missiles
  var markedForRemoval = [];
  missiles.forEach(function(missile, i){
    missile.update(elapsedTime);
    if(Math.abs(missile.position.x - camera.x) > camera.width * 2)
      markedForRemoval.unshift(i);
  });
  // Remove missiles that have gone off-screen
  markedForRemoval.forEach(function(index){
    missiles.splice(index, 1);
  });

  for (var w = 0; w < enemies.length; w++) {
    enemies[w].update();
  }
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
    renderBackgrounds(elapsedTime, ctx);

  // TODO: Render background

  // Transform the coordinate system using
  // the camera position BEFORE rendering
  // objects in the world - that way they
  // can be rendered in WORLD cooridnates
  // but appear in SCREEN coordinates
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  renderWorld(elapsedTime, ctx);
  ctx.restore();

  // Render the GUI without transforming the
  // coordinate system
  renderGUI(elapsedTime, ctx);

  if(transition){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 960, 800);
    var healthText = "Health: "
    ctx.fillStyle = 'white';
    ctx.font="52px Arial";
    ctx.fillText(healthText, 250, 250);
    for (var z = 0; z < player.health; z++) {
      ctx.fillRect(400 + (50*(z+1)), 210 , 25, 50);
    }
    var scoreText = "Score: " + score;
    ctx.fillText(scoreText, 250, 325);
    var resumeText = "Press Enter to Play/Resume!";
    ctx.fillText(resumeText, 150, 450);
    if(winGame){
      var winText = "You Won!";
      ctx.fillText(winText, 375, 600);
    }
    if(loseGame){
      var loseText = "You Lost!";
      ctx.fillText(loseText, 375, 600);
    }
  }
}

function renderBackgrounds(elapsedTime, ctx) {
  ctx.save();

  // The background scrolls at 2% of the foreground speed
  ctx.translate(0, -camera.y * 0.2);
  ctx.drawImage(backgrounds[2], 0, 0);
  ctx.restore();

  // The midground scrolls at 60% of the foreground speed
  ctx.save();
  ctx.translate(0, -camera.y * 0.6);
  ctx.drawImage(backgrounds[1], 0, 0);
  ctx.restore();

  // The foreground scrolls in sync with the camera
  ctx.save();
  ctx.translate(0, -camera.y);
  ctx.drawImage(backgrounds[0], 0, 0);
  ctx.restore();

  var healthText = "Health: "
  ctx.font="12px Arial";
  ctx.fillStyle = 'red';
  ctx.fillText(healthText, 10, 20);
  for (var z = 0; z < player.health; z++) {
    ctx.fillRect(40 + (10*(z+1)), 10 , 5, 10);
  }
  var scoreText = "Score: " + score;
  ctx.fillText(scoreText, 10, 40);
}

/**
  * @function renderWorld
  * Renders the entities in the game world
  * IN WORLD COORDINATES
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function renderWorld(elapsedTime, ctx) {
    // Render the bullets
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].render(elapsedTime, ctx);
    }

    for (var n = 0; n < enemyBullets.length; n++) {
      enemyBullets[n].render(elapsedTime, ctx);
    }

    for (var j = 0; j < powerups.length; j++) {
      powerups[j].render(ctx);
    }

    for (var m = 0; m < enemies.length; m++) {
      enemies[m].render(ctx);
    }

    // Render the player
    player.render(elapsedTime, ctx);

    //Render player lives
}

/**
  * @function renderGUI
  * Renders the game's GUI IN SCREEN COORDINATES
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx
  */
function renderGUI(elapsedTime, ctx) {
  // TODO: Render the GUI
}

},{"./bullet":2,"./camera":3,"./enemy":4,"./game":5,"./player":6,"./powerup":7,"./vector":8}],2:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;

module.exports = exports = Bullet;

function Bullet(pos, bulletSize){
  this.x = pos.x;
  this.y = pos.y;
  this.width = bulletSize;
  this.height = bulletSize;
  this.angle = 2 * Math.PI;
  this.velocity = {
    x: 1,
    y: 1
  }
}


Bullet.prototype.update = function(up){
  var direction = {
    x: -Math.sin(this.angle) * (.1 * 80),
    y: -Math.cos(this.angle) * (.1 * 80)
  }
  if(up == false){
    direction = {
      x: Math.sin(this.angle) * (.1 * 40),
      y: Math.cos(this.angle) * (.1 * 40)
    }
  }
  this.x += direction.x;
  this.y += direction.y;
}


Bullet.prototype.render = function(time, ctx) {
  ctx.fillStyle = '#040FC3';
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

},{}],3:[function(require,module,exports){
"use strict";

/* Classes and Libraries */
const Vector = require('./vector');

/**
 * @module Camera
 * A class representing a simple camera
 */
module.exports = exports = Camera;

/**
 * @constructor Camera
 * Creates a camera
 * @param {Rect} screen the bounds of the screen
 */
function Camera(screen) {
  this.x = 0;
  this.y = 0;
  this.width = screen.width;
  this.height = screen.height;
}

/**
 * @function update
 * Updates the camera based on the supplied target
 * @param {Vector} target what the camera is looking at
 */
Camera.prototype.update = function(target) {
  // TODO: Align camera with player
  if(target.y > 700){
      this.y = target.y - 700;
  }
}

/**
 * @function onscreen
 * Determines if an object is within the camera's gaze
 * @param {Vector} target a point in the world
 * @return true if target is on-screen, false if not
 */
Camera.prototype.onScreen = function(target) {
  return (
     target.x > this.x &&
     target.x < this.x + this.width &&
     target.y > this.y &&
     target.y < this.y + this.height
   );
}

/**
 * @function toScreenCoordinates
 * Translates world coordinates into screen coordinates
 * @param {Vector} worldCoordinates
 * @return the tranformed coordinates
 */
Camera.prototype.toScreenCoordinates = function(worldCoordinates) {
  return Vector.subtract(worldCoordinates, this);
}

/**
 * @function toWorldCoordinates
 * Translates screen coordinates into world coordinates
 * @param {Vector} screenCoordinates
 * @return the tranformed coordinates
 */
Camera.prototype.toWorldCoordinates = function(screenCoordinates) {
  return Vector.add(screenCoordinates, this);
}

},{"./vector":8}],4:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;
const Bullet = require('./bullet');

module.exports = exports = Enemy;

function Enemy(level, x, y){
  this.type = 0;
  this.sprite = new Image();
  var randomEnemy = Math.floor(Math.random() * 3) + 1;
  switch (randomEnemy) {
    case 1:
      this.type = 1;
      this.sprite.src = 'assets2/turret1.png';
      break;
    case 2:
      this.type = 2;
      this.sprite.src = 'assets2/turretred.png';
      break;
    case 3:
      this.type = 3;
      this.sprite.src = 'assets2/turretblue.png';
      break;
    case 4:
      this.type = 4;
      break;
    case 5:
      this.type = 5;
      break;
  }
  var randomX = Math.floor(Math.random() * 2) + 1;
  var randomY = Math.floor(Math.random() * 250) + y;
  this.x = -40;
  if(this.type == 3){
    randomY = Math.floor(Math.random() * 900) + y;
  }
  this.left = true;
  if(randomX == 1){
    this.x = 960;
    this.left = false;
  }
  this.y = randomY;
  this.width = 10;
  this.height = 10;
}

Enemy.prototype.update = function(){
  if(this.type == 1){
    if(this.left){
      this.x+=2;
      this.y++;
    }else {
      this.x-=2;
      this.y++;
    }
  }
  else if(this.type == 2){
    if(this.left){
      this.x+=2;
    }else {
      this.x-=2;
    }
  } else if(this.type == 3){
    if(this.left){
      this.x+=2;
      this.y-=2;
    }else {
      this.x-=2;
      this.y-=2;
    }
  }
  if(this.touched == true){
    return true;
  }
}

Enemy.prototype.fire = function(){
  return new Bullet({x: this.x, y: this.y}, 5);
}

Enemy.prototype.render = function(ctx) {
  switch (this.type) {
    case 1:
    ctx.drawImage(
      this.sprite,
      this.x, this.y, 32,32
    );
      break;
    case 2:
    ctx.drawImage(
      this.sprite,
      this.x, this.y,32,32
    );
      break;
    case 3:
    ctx.drawImage(
      this.sprite,
      this.x, this.y,32,32
    );
      break;
    case 4:
    ctx.drawImage(
      this.sprite,
      this.x, this.y,32,32
    );
      break;
    case 5:
    ctx.drawImage(
      this.sprite,
      this.x, this.y,32,32
    );
      break;
  }
}

},{"./bullet":2}],5:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],6:[function(require,module,exports){
"use strict";

/* Classes and Libraries */
const Vector = require('./vector');

/* Constants */
const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;

/**
 * @module Player
 * A class representing a player's helicopter
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a player
 * @param {BulletPool} bullets the bullet pool
 */
function Player(bullets, missiles) {
  this.missiles = missiles;
  this.missileCount = 4;
  this.bullets = bullets;
  this.angle = 0;
  this.position = {x: 500, y: 2000};
  this.velocity = {x: 0, y: 0};
  this.img = new Image()
  this.img.src = 'assets2/ship.png';
  this.health = 4;
}

/**
 * @function update
 * Updates the player based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Player.prototype.update = function(elapsedTime, input, level) {

  // set the velocity
  this.velocity.x = 0;
  if(input.left) this.velocity.x -= PLAYER_SPEED;
  if(input.right) this.velocity.x += PLAYER_SPEED;
  this.velocity.y = 0;
  if(input.up) this.velocity.y -= PLAYER_SPEED / 2;
  if(input.down) this.velocity.y += PLAYER_SPEED / 2;

  // determine player angle
  this.angle = 0;
  if(this.velocity.x < 0) this.angle = -1;
  if(this.velocity.x > 0) this.angle = 1;

  // move the player
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  // don't let the player move off-screen
  if(level == 1){
    if(this.position.x < 0) this.position.x = 0;
    if(this.position.x > 960) this.position.x = 960;
    if(this.position.y > 2000) this.position.y = 2000;
  }
  else {
    if(this.position.x < 0) this.position.x = 0;
    if(this.position.x > 960) this.position.x = 960;
    if(this.position.y > 5000) this.position.y = 5000;
  }
}

/**
 * @function render
 * Renders the player helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Player.prototype.render = function(elapasedTime, ctx) {
  var offset = this.angle * 23;
  ctx.save();
  ctx.translate(this.position.x, this.position.y);
  ctx.drawImage(this.img, 0, 0, 76, 62, -12.5, -12, 23, 27);
  ctx.restore();
}

/**
 * @function fireBullet
 * Fires a bullet
 * @param {Vector} direction
 */
Player.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

/**
 * @function fireMissile
 * Fires a missile, if the player still has missiles
 * to fire.
 */
Player.prototype.fireMissile = function() {
  if(this.missileCount > 0){
    var position = Vector.add(this.position, {x:0, y:30})
    var missile = new Missile(position);
    this.missiles.push(missile);
    this.missileCount--;
  }
}

},{"./vector":8}],7:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;

module.exports = exports = Powerup;

function Powerup(x, y){
  var randomX = Math.floor(Math.random() * 800) + x;
  var randomY = Math.floor(Math.random() * 900) + y;
  this.x = randomX;
  this.y = randomY;
  this.touched = false;
  var randomColor = Math.floor(Math.random() * 5) + 1;
  switch (randomColor) {
    case 1:
      this.color = 'red';
      break;
    case 2:
      this.color = 'blue';
      break;
    case 3:
      this.color = 'yellow';
      break;
    case 4:
      this.color = '#00FBFF';
      break;
    case 5:
      this.color = '#FF9B00';
      break;
  }
  this.width = 10;
  this.height = 10;
}


Powerup.prototype.update = function(bulletDuration){
  if(this.touched == true){
    return true;
  }
}


Powerup.prototype.render = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

},{}],8:[function(require,module,exports){
"use strict";

/**
 * @module Vector
 * A library of vector functions.
 */
module.exports = exports = {
  add: add,
  subtract: subtract,
  scale: scale,
  rotate: rotate,
  dotProduct: dotProduct,
  magnitude: magnitude,
  normalize: normalize
}


/**
 * @function rotate
 * Scales a vector
 * @param {Vector} a - the vector to scale
 * @param {float} scale - the scalar to multiply the vector by
 * @returns a new vector representing the scaled original
 */
function scale(a, scale) {
 return {x: a.x * scale, y: a.y * scale};
}

/**
 * @function add
 * Computes the sum of two vectors
 * @param {Vector} a the first vector
 * @param {Vector} b the second vector
 * @return the computed sum
*/
function add(a, b) {
 return {x: a.x + b.x, y: a.y + b.y};
}

/**
 * @function subtract
 * Computes the difference of two vectors
 * @param {Vector} a the first vector
 * @param {Vector} b the second vector
 * @return the computed difference
 */
function subtract(a, b) {
  return {x: a.x - b.x, y: a.y - b.y};
}

/**
 * @function rotate
 * Rotates a vector about the Z-axis
 * @param {Vector} a - the vector to rotate
 * @param {float} angle - the angle to roatate by (in radians)
 * @returns a new vector representing the rotated original
 */
function rotate(a, angle) {
  return {
    x: a.x * Math.cos(angle) - a.y * Math.sin(angle),
    y: a.x * Math.sin(angle) + a.y * Math.cos(angle)
  }
}

/**
 * @function dotProduct
 * Computes the dot product of two vectors
 * @param {Vector} a the first vector
 * @param {Vector} b the second vector
 * @return the computed dot product
 */
function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y
}

/**
 * @function magnitude
 * Computes the magnitude of a vector
 * @param {Vector} a the vector
 * @returns the calculated magnitude
 */
function magnitude(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

/**
 * @function normalize
 * Normalizes the vector
 * @param {Vector} a the vector to normalize
 * @returns a new vector that is the normalized original
 */
function normalize(a) {
  var mag = magnitude(a);
  return {x: a.x / mag, y: a.y / mag};
}

},{}]},{},[1]);
