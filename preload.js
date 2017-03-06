var MyGame = {};

MyGame.preloadState = function (game) {};


MyGame.preloadState.prototype = {

  preload: function() {

    
    this.load.image('sky', 'assets/background-tile.jpg');
    
  },
  create: function() {
    this.state.start('playGame');
  }

}