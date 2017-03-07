var creditsText;


MyGame.optionsState = function (game) {};

MyGame.optionsState.prototype = {
  create: function() {
    this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
     var title = game.add.image(game.world.centerX, 20, 'title');
     title.scale.setTo(0.7);
     title.anchor.set(0.5, 0);
/*
     var startGameButton = game.add.button(game.width / 2, game.height - 400, 'startGame', this.startGame);
     startGameButton.scale.setTo(0.7);
     startGameButton.anchor.set(0.5);
     var storeButton = game.add.button(game.width / 2, game.height - 300, 'store', this.startGame);
     storeButton.scale.setTo(0.7);
     storeButton.anchor.set(0.5);
     var optionsButton = game.add.button(game.width / 2, game.height - 200, 'options', this.startGame);
     optionsButton.scale.setTo(0.7);
     optionsButton.anchor.set(0.5);
     

     */
     var exitButton = game.add.button(game.width / 2, game.height - 100, 'exit', this.exitGame);
     exitButton.scale.setTo(0.7);
     exitButton.anchor.set(0.5);
     creditsText = game.add.text( 10, game.height - 10, 'score: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
     creditsText.anchor.set(0, 1)
     creditsText.scale.setTo(0.7);

  },
  update: function(){
    this.background.tilePosition.y += 2;
    creditsText.text = 'Jens Van Assche - Jordy Pereira \nLennert Peeters - Tymo de Kock';
  },
  startGame: function(){
    game.state.start('playGame');
  },
  exitGame: function(){
    game.state.start('titlescreen');
  },

}
