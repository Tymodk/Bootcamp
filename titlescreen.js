MyGame.titlescreenState = function (game) {};

MyGame.titlescreenState.prototype = {
  create: function() {
  	 var title = game.add.image(game.world.centerX, 10, 'title');
     title.scale.setTo(0.7);
     title.anchor.set(0.5, 0);
     var startGameButton = game.add.button(game.width / 2, game.height - 450, 'startGame', this.startGame);
     startGameButton.anchor.set(0.5);
  },
  startGame: function(){
    game.state.start('playGame');
  }

}
