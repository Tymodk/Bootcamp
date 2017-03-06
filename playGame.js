
MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {


  create: function() {
    
      this.background = game.add.tileSprite(0, 0, 800, 600, "sky");
    
      

  },
  
  update: function() {
      this.background.tilePosition.y += 2;
     
  }

}
