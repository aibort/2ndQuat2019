'use strict';

  var PlayScene = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
    this.boxCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();
    this.space = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.s = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
    this.d = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
    this.j = this.game.input.keyboard.addKey(Phaser.KeyCode.J);
    this.k = this.game.input.keyboard.addKey(Phaser.KeyCode.K);
    this.l = this.game.input.keyboard.addKey(Phaser.KeyCode.L);
    this.i = this.game.input.keyboard.addKey(Phaser.KeyCode.I);
    this.space.check = false;
    this.s.check = false;
    this.d.check = false;
    this.boxes = [];
    this.boxGroup = this.game.add.group();
    this.boxGroup.enableBody = true;
    this.boxGroup.physicsBodyType = Phaser.Physics.P2JS;
    this.elements = 4;
    this.selected = 0;
    for (var i = 0; i < this.elements; i++)
    {
        var box = this.boxGroup.create(this.game.rnd.integerInRange(100, 700), this.game.rnd.integerInRange(100, 500), 'box');
        box.body.setCollisionGroup(this.boxCollisionGroup);
        box.body.collides([this.boxCollisionGroup]);
    }
    this.originalColor = this.boxGroup.children[0].tint;
  },

  createBox: function(){
    if (!this.space.check)
    {
    this.space.check = true;
    var box = this.boxGroup.create(this.game.rnd.integerInRange(100, 700), this.game.rnd.integerInRange(100, 500), 'box');
    box.body.setCollisionGroup(this.boxCollisionGroup);
    box.body.collides([this.boxCollisionGroup]);
    this.elements += 1;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){this.space.check = false;} , this);
    }

  },
  changeBox: function()
  {
    if (!this.s.check && this.elements != 0)
    {
      this.s.check = true;
      this.boxGroup.children[this.selected].tint = this.originalColor;
      if(this.selected == this.elements-1)
      {
        this.selected = 0;
      }
      else
      {
        this.selected+=1;
      }
      this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){this.s.check = false;} , this);
    }
  },
  destroyBox: function()
  {
    if (!this.d.check)
    {
      this.d.check = true;
      this.boxGroup.remove(this.boxGroup.children[this.selected]);
      if (this.selected == this.elements-1 && this.selected != 0)
        this.selected -= 1;
      this.elements-= 1;
      this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){this.d.check = false;} , this);
    }
  },
  moveBox: function()
  {
    if (this.boxGroup.children[this.selected] != null)
    {
      if (this.j.isDown)
      {
        this.moveX(-200);
      }
      else if(this.k.isDown)
      {
        this.moveY(200);
      }
      else if (this.l.isDown)
      {
        this.moveX(200);
      }
      else if (this.i.isDown)
      {
        this.moveY(-200);
      }
    }
  },
  moveX: function(speed)
  {
    this.boxGroup.children[this.selected].body.velocity.x = speed;
    this.boxGroup.children[this.selected].body.velocity.y = 0;
  },
  moveY: function(speed)
  {
    this.boxGroup.children[this.selected].body.velocity.y = speed;
    this.boxGroup.children[this.selected].body.velocity.x = 0;
  },
  update:function(){
    if (this.boxGroup.children[this.selected] != null)
    {
      this.boxGroup.children[this.selected].tint = 0xff00ff;
    }
      if (this.space.isDown)
      {
        this.createBox();
      }
      if (this.s.isDown)
      {
        this.changeBox();
      }
      if (this.d.isDown)
      {
        this.destroyBox();
      }
      this.moveBox();
  }
};

module.exports = PlayScene;
