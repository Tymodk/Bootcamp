var highscore = 0;
var scoreText;
var highscoreText;
var currentGoldText;
var totalGoldText;

MyGame.gameOverState = function (game) {};

MyGame.gameOverState.prototype = {
  create: function() {
    this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
    this.background.tilePosition.y = backgroundPos;
    var gameOverTitle = game.add.image(game.world.centerX, 20, 'gameOverTitle');
    gameOverTitle.scale.setTo(0.7);
    gameOverTitle.anchor.set(0.5, 0);
    scoreText = game.add.text( game.world.centerX, game.world.centerY - 100, 'score: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    scoreText.anchor.set(0.5);
    highscoreText = game.add.text( game.world.centerX, game.world.centerY - 50, 'highscore: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    highscoreText.anchor.set(0.5);
    currentGoldText = game.add.text( game.world.centerX, game.world.centerY, 'earned gold: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    currentGoldText.anchor.set(0.5);
    totalGoldText = game.add.text( game.world.centerX, game.world.centerY + 50, 'total gold: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    totalGoldText.anchor.set(0.5);
    var retryButton = game.add.button(game.width / 2, game.height - 250, 'retry', this.startGame);
     retryButton.scale.setTo(1.5);
     retryButton.anchor.set(0.5);
    var exitButton = game.add.button(game.width / 2, game.height - 150, 'exit', this.exitGame);
     exitButton.scale.setTo(0.7);
     exitButton.anchor.set(0.5);

     //add current gold to total gold
     totalGold += currentGold;
  },
  update: function(){
    if(highscore < currentScore){
      highscore = currentScore;
    }
    scoreText.text = 'score: ' + currentScore;
    highscoreText.text = 'highscore: ' + highscore;
    currentGoldText.text = 'earned gold: ' + currentGold;
    totalGoldText.text = 'total gold: ' + totalGold;
    
  },
  exitGame: function(){
    game.state.start('titlescreen');
  },
    
  startGame: function(){
      yoshiPosX = game.world.centerX;
      yoshiPosY = game.world.centerY + 200;
    game.state.start('playGame');
  }
}