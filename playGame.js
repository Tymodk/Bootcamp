
MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {


  create: function() {


      game.physics.startSystem(Phaser.Physics.ARCADE);

      this.background = game.add.tileSprite(0, 0, 600, 800, "sky");
      //Add Player
      this.yoshi = this.add.sprite(game.world.centerX, game.world.centerY +100, 'yoshi');
      //Add Player Animations
      this.yoshi.animations.add('ani', [0,1,2,3]);

      this.yoshi.anchor.setTo(0.5, 0.5);
      game.physics.enable(this.yoshi, Phaser.Physics.ARCADE);
      

      //Set Event Move Player
//      game.input.onDown.add(function movePlayer() {
//
//        game.physics.arcade.moveToPointer(this.yoshi, 100);
//
//      }, this);
//>>>>>>> dd4660205c396d6d0f7a7949aac49a196dcb4393

  },

  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
      if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
        {
            this.yoshi.body.velocity.setTo(0, 0);
        }
      else{
          
      game.physics.arcade.moveToPointer(this.yoshi, 100); 
      }
      

  }


}
<<<<<<< HEAD

//function movePlayer() {
//
//  game.physics.arcade.moveToPointer(this.yoshi, 100);
//
//}
=======
>>>>>>> dd4660205c396d6d0f7a7949aac49a196dcb4393
