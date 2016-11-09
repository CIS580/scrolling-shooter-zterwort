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
