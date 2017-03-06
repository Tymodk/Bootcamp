var MyGame = {};

MyGame.preloadState = function (game) {};


MyGame.preloadState.prototype = {

  preload: function() {


    this.load.image('sky', 'assets/background-tile.jpg');
    this.load.spritesheet('yoshi', 'assets/yoshi.png', 27, 50, 4);
    this.load.spritesheet('fireball', 'assets/mario_fireball.png', 45 , 55, 4);



  },
  create: function() {
    this.state.start('playGame');
  }

}
