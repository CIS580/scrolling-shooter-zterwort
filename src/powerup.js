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
