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
