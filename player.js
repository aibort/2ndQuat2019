'use strict';

var objeto= require('./gameObject.js');

//constructor
var player=function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY)
{
  this.game=game;
  this.maxVel = 600;
  this.minVel =-300; 
  this.velocity = 0;
  this.acceleration = 6;
  
  objeto.gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY);
};
player.prototype = Object.create(objeto.gameObject.prototype);
player.prototype.constructor = player;

//update de player
player.prototype.update = function(cursors,game)
{
  //rotación del coche, siempre que esté en movimiento
  if(this.velocity!=0)
  {
  if(cursors.left.isDown){ this.sprite.angle = this.sprite.angle - 4; }

  else if(cursors.right.isDown){ this.sprite.angle = this.sprite.angle + 4; }
  }

  //aceleración hasta alcanzar la velocidad maxima
   if(cursors.up.isDown)
  { 
    this.velocity = this.velocity + this.acceleration; 

    if(this.velocity > this.maxVel)
    this.velocity = this.maxVel;
  }
  //deceleración hasta alcanzar la velocidad minima
  else if(cursors.down.isDown)
  { 
    this.velocity = this.velocity - this.acceleration; 

    if(this.velocity < this.minVel)
    this.velocity = this.minVel;
  }

  //frenado del coche cuando se deja de pulsar el acelerador o el decelerador
  else if(this.velocity>0)
  {
    this.velocity= this.velocity - this.acceleration;
  }

  else if(this.velocity<0)
  {
    this.velocity = this.velocity + this.acceleration;
  } 

  game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.velocity, this.sprite.body.velocity);
};

module.exports=
{   
    player
}