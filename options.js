var soundText;
var creditsText;
var yesNoButton;

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
     soundText = game.add.text(game.world.centerX - 50, game.height - 450, '',{font: 'Pixel', fontSize: '28px', fill: '#fff'});
     soundText.scale.setTo(0.7);
     soundText.anchor.set(0.5);
     yesNoButton = game.add.button(game.world.centerX + 50, game.height - 450, 'buttonYes', this.toggleSound);
     yesNoButton.scale.setTo(0.7);
     yesNoButton.anchor.set(0.5);
     yesNoButton.onInputDown.add(down, this);
     var exitButton = game.add.button(game.width / 2, game.height - 100, 'exit', this.exitGame);
     exitButton.scale.setTo(0.7);
     exitButton.anchor.set(0.5);
     creditsText = game.add.text( 10, game.height - 10, '',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
     creditsText.anchor.set(0, 1)
     creditsText.scale.setTo(0.7);


  },
  down: function(item){
    item.key = 'buttonNo';
  }
  /*
  toggleSound: function(){
    if(!soundEnabled){
        soundText.addColor('#ffff00', 15);
        soundText.addColor('#fff', 18);
        soundEnabled = true;
    }
    else{
        soundText.addColor('#ffff00', 21);
        soundEnabled = false;
    }
  },*/
  
  update: function(){
    this.background.tilePosition.y += 2;
    creditsText.text = 'Jens Van Assche - Jordy Pereira \nLennert Peeters - Tymo de Kock';
    soundText.text = 'enable sound - ';
  },
  
  startGame: function(){
    game.state.start('playGame');
  },
  exitGame: function(){
    game.state.start('titlescreen');
  },

}
