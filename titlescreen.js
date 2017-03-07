var currentCursorIndex = 0;
var currentCursorTimeLeft = 1000;

MyGame.titlescreenState = function (game) {};

MyGame.titlescreenState.prototype = {
  create: function() {
    this.background = game.add.tileSprite(0, 0, 600, 800, "sky");
  	 var title = game.add.image(game.world.centerX, 20, 'title');
     title.scale.setTo(0.7);
     title.anchor.set(0.5, 0);
     var startGameButton = game.add.button(game.width / 2, game.height - 400, 'startGame', this.startGame);
     startGameButton.scale.setTo(0.7);
     startGameButton.anchor.set(0.5);
     var storeButton = game.add.button(game.width / 2, game.height - 300, 'store', this.startGame);
     storeButton.scale.setTo(0.7);
     storeButton.anchor.set(0.5);
     var optionsButton = game.add.button(game.width / 2, game.height - 200, 'options', this.startGame);
     optionsButton.scale.setTo(0.7);
     optionsButton.anchor.set(0.5);
     var exitButton = game.add.button(game.width / 2, game.height - 100, 'exit', this.startGame);
     exitButton.scale.setTo(0.7);
     exitButton.anchor.set(0.5);
     /* selecter sprite
     this.selecterPositionsX = [120, 180, 160, 185];
     this.selecterPositionsY = [game.height - 400, game.height - 300, game.height - 200, game.height - 100];
     this.selecterSprite = game.add.sprite(this.selecterPositionsX[0], this.selecterPositionsY[0], 'selecter');
     selecterSprite.anchor.set(0.5);
     */
  },
  update: function(){
   
   this.background.tilePosition.y += 2;
   /* selecter sprite
    currentCursorTimeLeft -= game.time.elapsed;
    if(currentCursorTimeLeft <= 0){
      currentCursorIndex += 1;
      selecterSprite.x = selecterPositionsX[currentCursorIndex];
      selecterSprite.y = selecterPositionsY[currentCursorIndex];
    }
    */

  },
  startGame: function(){
    game.state.start('playGame');
  }

}
