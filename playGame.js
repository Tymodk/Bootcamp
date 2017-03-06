
MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {


  create: function() {

    
      this.background = game.add.tileSprite(0, 0, 600, 800, "sky");
      this.yoshi = this.add.sprite(game.world.centerX, game.world.centerY +200, 'yoshi');
      this.yoshi.animations.add('ani', [0,1,2,3,4]);
      
    
    

      //Variable keyboard keys
      cursors = game.input.keyboard.createCursorKeys();



  },

  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
     


      //Move left and right
      if (cursors.left.isDown)
      {
          //  Move to the left
          this.yoshi.body.velocity.x = -150;

          //player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          this.yoshi.body.velocity.x = 150;

          //player.animations.play('right');
      }

  }

}
