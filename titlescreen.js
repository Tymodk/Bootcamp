var backgroundPos = 0;
var startGameText;

MyGame.titlescreenState = function (game) {};

MyGame.titlescreenState.prototype = {
  create: function() {
    this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
      this.background.tilePosition.y = backgroundPos;
  	 var title = game.add.image(game.world.centerX, 20, 'title');
     title.scale.setTo(0.7);
     title.anchor.set(0.5, 0);
     
     startGameText = game.add.text(4, game.height - 11, 'a team JoJo creation', {font: 'Pixel', fontSize: '28px', fill: '#fff'});
     startGameText.scale.setTo(0.5);
     startGameText.anchor.set(0, 0.5);
     /*
     startGameText.inputEnabled = true;
     startGameText.events.onInputDown.add(this.startGame);
     */

     var startGameButton = game.add.button(game.width / 2, game.height - 400, 'startGame', this.startGame);
     startGameButton.scale.setTo(1);
     startGameButton.anchor.set(0.5);
     var storeButton = game.add.button(game.width / 2, game.height - 300, 'store', this.startGame);
     storeButton.scale.setTo(1);
     storeButton.anchor.set(0.5);
     var optionsButton = game.add.button(game.width / 2, game.height - 200, 'options', this.goToOptions);
     optionsButton.scale.setTo(1);
     optionsButton.anchor.set(0.5);
     var exitButton = game.add.button(game.width / 2, game.height - 100, 'exit', this.startGame);
     exitButton.scale.setTo(1);
     exitButton.anchor.set(0.5);

     //music
     
     music.play();
     music.loop = true;
     
  },
  update: function(){
    this.background.tilePosition.y += 2;
      
      backgroundPos = this.background.tilePosition.y;
  },
  startGame: function(){
    game.state.start('preGame');
  },
  goToOptions: function(){
    game.state.start('options');
  }

}
