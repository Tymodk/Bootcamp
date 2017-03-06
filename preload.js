var MyGame = {};

MyGame.preloadState = function (game) {};


MyGame.preloadState.prototype = {

  preload: function() {


    this.load.image('sky', 'assets/background-tile.jpg');
    this.load.spritesheet('yoshi', 'assets/yoshi.png', 27, 50, 4);
    this.load.spritesheet('fireball', 'assets/mario_fireball.png', 27, 50, 4);
    this.load.image('title', 'assets/titlescreen_title.jpg');
    this.load.image('startGame', 'assets/button_startGame.png');
    this.load.spritesheet('fireball-mini', 'assets/fireballs.png', 19, 20, 4);
    this.load.spritesheet('fireball-big', 'assets/bigfireballs.png', 16, 16, 2);
    this.load.spritesheet('fireball-bigger', 'assets/biggerfireballs.png', 21, 21, 2);



  },
  create: function() {
  	game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.state.start('playGame');
  }

}
