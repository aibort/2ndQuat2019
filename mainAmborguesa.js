'use strict';

var PlayScene = require('./play_scene.js');
var Menu = require('./menu.js');
//var CAR= require('./player.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};

var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('toad', 'images/mapa.png');
    this.game.load.image('redcar', 'images/redcar.png');
    this.game.load.image('bluecar', 'images/bluecar.png');
    this.game.load.spritesheet('play', 'images/play.png', 194, 100, 2);
    this.game.load.image('fondomenu', 'images/fondomenu.jpg');
  },

  create: function () {
    this.game.state.start('menu');
  }
};

window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('menu', Menu);

  game.state.start('boot');
};
