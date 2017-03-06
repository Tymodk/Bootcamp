MyGame.titlescreenState = function (game) {};


MyGame.titlescreenState.prototype = {

  preload: function() {




  },
  create: function() {
  	 var title = game.add.image(game.world.centerX, 10, 'title');
     title.anchor.set(0.5);
     var startGameButton = game.add.button(game.width / 2, game.height - 450, 'startGame', this.startGame);
     playButton.anchor.set(0.5);
  },
  startGame: function(){
    game.state.start('playGame');
  }

}
