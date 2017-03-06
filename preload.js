var MyGame = {};

MyGame.preloadState = function (game) {};


MyGame.preloadState.prototype = {

  preload: function() {


    this.load.image('sky', 'assets/background-tile.jpg');
    this.load.spritesheet('yoshi', 'assets/yoshi.png', 27, 50, 4);



  },
  create: function() {
  	game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.state.start('playGame');
  }

}
