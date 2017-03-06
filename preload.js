var MyGame = {};

MyGame.preloadState = function (game) {};


MyGame.preloadState.prototype = {

  preload: function() {


    this.load.image('sky', 'assets/background-tile.jpg');
    this.load.spritesheet('yoshi', 'assets/mario-yoshi-cape.png', 32, 48);


  },
  create: function() {
    this.state.start('playGame');
  }

}
