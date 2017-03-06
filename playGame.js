
MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {


  create: function() {
    
      this.background = game.add.tileSprite(0, 0, 600, 800, "sky");
      this.yoshi = this.add.sprite(game.world.centerX, game.world.centerY +100, 'yoshi');
      this.yoshi.animations.add('ani', [0,1,2,3]);
      
    
      

  },
  
  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
     
  }

}
