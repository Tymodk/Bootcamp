

MyGame.titlescreenState = function (game) {};

MyGame.titlescreenState.prototype = {
  create: function() {
    this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
  	 var title = game.add.image(game.world.centerX, 20, 'title');
     title.scale.setTo(0.7);
     title.anchor.set(0.5, 0);
     var startGameButton = game.add.button(game.width / 2, game.height - 400, 'startGame', this.startGame);
     startGameButton.scale.setTo(0.7);
     startGameButton.anchor.set(0.5);
     var storeButton = game.add.button(game.width / 2, game.height - 300, 'store', this.startGame);
     storeButton.scale.setTo(0.7);
     storeButton.anchor.set(0.5);
     var optionsButton = game.add.button(game.width / 2, game.height - 200, 'options', this.goToOptions);
     optionsButton.scale.setTo(0.7);
     optionsButton.anchor.set(0.5);
     var exitButton = game.add.button(game.width / 2, game.height - 100, 'exit', this.startGame);
     exitButton.scale.setTo(0.7);
     exitButton.anchor.set(0.5);

     //music
     
     music.play();
     
  },
  update: function(){
    this.background.tilePosition.y += 2;
    
  },
  startGame: function(){
    game.state.start('preGame');
  },
  goToOptions: function(){
    game.state.start('options');
  }

}
