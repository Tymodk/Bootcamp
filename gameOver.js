var highscore = 0;
var scoreText;
var highscoreText;

MyGame.gameOverState = function (game) {};

MyGame.gameOverState.prototype = {
  create: function() {
    this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
    var gameOverTitle = game.add.image(game.world.centerX, 20, 'gameOverTitle');
    gameOverTitle.scale.setTo(0.7);
    gameOverTitle.anchor.set(0.5, 0);
    scoreText = game.add.text( game.world.centerX, game.world.centerY - 50, 'score: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    scoreText.anchor.set(0.5);
    highscoreText = game.add.text( game.world.centerX, game.world.centerY, 'highscore: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    highscoreText.anchor.set(0.5);
    var retryButton = game.add.button(game.width / 2, game.height - 300, 'retry', this.startGame);
     retryButton.scale.setTo(1.5);
     retryButton.anchor.set(0.5);
    var exitButton = game.add.button(game.width / 2, game.height - 200, 'exit', this.exitGame);
     exitButton.scale.setTo(0.7);
     exitButton.anchor.set(0.5);
  },
  update: function(){
    this.background.tilePosition += 2;
    if(highscore < currentScore){
      highscore = currentScore;
    }
    scoreText.text = 'score: ' + currentScore;
    highscoreText.text = 'highscore: ' + highscore;
    
  },
  exitGame: function(){
    game.state.start('titlescreen');
  },
  startGame: function(){
    game.state.start('playGame');
  }

}
