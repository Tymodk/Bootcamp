var fireballs;

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
      this.troopa = this.add.sprite(game.world.centerX, game.world.centerY -200, 'paratroopa');
      this.troopa.animations.add('fly',[5,6,7,8,9,15,16,17,18,19]);
      fireballs = game.add.group();
      fireballs.enableBody = true;
      
      

  },

  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
      this.troopa.animations.play('fly', 5, true, false);

      if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
        {
            this.yoshi.body.velocity.setTo(0, 0);
        }
      else{
        game.physics.arcade.moveToPointer(this.yoshi, 100);
      }
      
      this.generateFireball();
  },
    
generateFireball: function() {
    
    var fireball = fireballs.create(this.yoshi.position.x, this.yoshi.position.y, 'fireball-mini');
      fireball.animations.add('spin', [0,1,2,3]);
      fireball.animations.play('spin', 8, true, false);
      game.physics.enable(fireball, Phaser.Physics.ARCADE);
      
      fireball.body.velocity.y = -200;
    }
}
