
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


      //Fireball
      this.fireball = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y, 'fireball-mini');
      this.fireball.animations.add('spin', [0,1,2,3]);
      this.fireballbig = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +100, 'fireball-big');
      this.fireballbig.animations.add('woosh', [0,1]);
      this.fireballbigger = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +200, 'fireball-bigger');
      this.fireballbigger.animations.add('woosh2', [0,1]);



  },

  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
      this.fireball.animations.play('spin', 8, true, false);
      this.fireballbig.animations.play('woosh', 4, true, false);
      this.fireballbigger.animations.play('woosh2', 4, true, false);

      if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
        {
            this.yoshi.body.velocity.setTo(0, 0);
        }
      else{
        game.physics.arcade.moveToPointer(this.yoshi, 100);
      }
  }
}
