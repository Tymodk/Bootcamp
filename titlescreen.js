var MyGame = {};

MyGame.titlescreenState = function (game) {};


MyGame.titlescreenState.prototype = {

  preload: function() {




  },
  create: function() {
  	this.title = this.add.image(game.world.centerX, 10, 'title');
    this.state.start('playGame');
  }

}
