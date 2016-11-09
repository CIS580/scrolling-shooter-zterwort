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
